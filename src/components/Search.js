import {useState, useEffect} from 'react';
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'

function Search () {
    const [searchedGiphy, setSearchedGiphy] = useState('');
    const dispatch = useDispatch();
    const giphySearchResults = useSelector(store => store.giphySearchResults);
    const searchWord = useSelector(store => store.searchWord)
    
    function handleChange(event) {
        dispatch({
            type: 'SET_SEARCH',
            payload: event.target.value
        })
    }

    const submitSearch = () => {
        dispatch({
            type: 'FETCH_SEARCH_RESULTS',
            payload: searchWord,
        })
        console.log(searchWord);
        // console.log(giphySearchResults);
    }
    console.log(giphySearchResults);
    return (
        <>
            <h2>Search for your giphy</h2>
            <input type= 'text' onChange = {handleChange} ></input>
            <h5>{searchWord}</h5>
            <button onClick={submitSearch}>Search</button>
                <ul>
                {
                    giphySearchResults.map((giphy) => (
                            // <img key={giphy.id} src={giphy.data.data[i].images.downsized_medium.url}/>
                            <li key={giphy.id}>
                                <img src={giphy.images.downsized_medium.url} />
                            </li>
                    ))
                }
                </ul>
        </>
            
    )
}
export default Search;

{/* <img src={giphySearchResults.data[0].images.downsized_medium.url} /> */}