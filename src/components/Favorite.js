import axios from 'axios';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

function Favorite () {
    const favorites = useSelector(store => store.giphySearchResults)
    const dispatch = useDispatch();

    useEffect(() => {
        fetchFavorites();
    }, []);

    const fetchFavorites = () => {
        axios.get('/placeholderRoute')
        .then(response => {
            setFavorites(response.data);
        }).catch(error => {
            console.log(`Error in fetchFavorites${error}`);
            // res.sendStatus(500);
        })

        //move GET request to index in saga, write dispatch code here
    }

    // Function to dispatch to saga to update favorites database onClick on button to select category

    return (
        <>
            <h1>Favorites:</h1>
            {favorites.map((favorite) => (
                <div key={favorite.id}>
                    {favorite.url}
                    {/* button to select category */}
                </div>
            ))}
        </>
    );
}
export default Favorite;