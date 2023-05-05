import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App/App';

// Imports for redux
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger';

// Imports for saga
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

// Reducers

// Reducer 1
// Reducer to store results from Giphy API search
const giphySearchResults = (state = [], action) => {
    switch (action.type) {
        case 'SET_SEARCH_RESULTS':
            return action.payload;
        default:
            return state;
    }
}

// Reducer 2
const giphyFavorites = (state = [], action) => {
    if (action.type === 'SET_FAVORITES') {
        return action.payload;
    }
    return state;
} 
// Reducer 3
const searchWord = (state = '', action) => {
    if (action.type === 'SET_SEARCH') {
        return action.payload;
    }
    return state;
}

// Sagas

// Saga 1
function* fetchFavorites() {
    try {
        const favorites = yield axios.get('/api/favorite');
        yield put({ type: 'SET_FAVORITES', payload: favorites.data });
    } catch (error) {
        console.log(`Error in GET${error}`);
        alert('Something went wrong.');
    }
}

// Saga 2
// Saga to get GIPHY search results
function* fetchGiphySearch(action) {
    console.log(action.payload)
    try {
        const searchWord = action.payload;
        const results = yield axios.get(`/search/${searchWord}`); 
        console.log('Get search results', results.data);
        yield put({ type: 'SET_SEARCH_RESULTS', payload: results.data.data })
    } catch (error) {
        console.log(`Error in fetchGiphySearch ${error}`);
        alert('Something went wrong.')
    }
}

// Saga 3

// Root Saga
function* rootSaga() {
    // yield takeEvery('DISPATCH_NAME', sagaName);
    yield takeEvery('FETCH_FAVORITES', fetchFavorites); 
    yield takeEvery('FETCH_SEARCH_RESULTS', fetchGiphySearch)
}

// Saga Middleware
const sagaMiddleware = createSagaMiddleware();

// Redux store
const storeInstance = createStore(
    combineReducers(
        {
            //reducers added here
            // 1
            giphySearchResults,
            searchWord,
            giphyFavorites,
            // 3
        }
    ),
    applyMiddleware(sagaMiddleware, logger)
);

// Root saga to middleware
sagaMiddleware.run(rootSaga);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={storeInstance}>
            <App />
        </Provider>
    </React.StrictMode>
);
