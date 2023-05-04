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

// Reducer 3

// Sagas

// Saga 1
function* fetchFavorites() {
    try {
        const favorites = yield axios.get('/api/favorite');
        yield put({ type: 'SET' })
    } catch (error) {

    }
}

// Saga 2
// Saga to 

// Saga 3

// Root Saga
function* rootSaga() {
    // yield takeEvery('DISPATCH_NAME', sagaName);
    yield takeEvery('FETCH_FAVORITES', fetchFavorites); 
}

// Saga Middleware
const sagaMiddleware = createSagaMiddleware();

// Redux store
const storeInstance = createStore(
    combineReducers(
        {
            //reducers added here
            // 1
            // 2
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
