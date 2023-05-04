import {useState, useEffect} from 'react';
import axios from 'axios'
import { usedispatch, useSelector } from 'react-redux'

function Search () {
    const [searchedGiphy, setSearchedGiphy] = useState('');
    
    function handleChange(event) {
        setSearchedGiphy(event.target.value);
    }

    function submitSearch
    return (
        <>
        <h2>Search for your giphy</h2>
        <input type= 'text' value = {searchedGiphy} onChange = {handleChange} ></input>
        </>
    )
}
export default Search