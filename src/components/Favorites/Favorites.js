import React from "react";
import { useSelector } from "react-redux";

import ContactList from "../ContactList/ContactList";

function Favorites() {
    const favorites = useSelector(state => state.contacts.favoriteContacts)
    console.log(favorites)

    // const getAllFavorites = () => {
    //     let keys = Object.keys(localStorage);
    //     keys = keys.filter(key => {
    //         return key.startsWith('favorite-');
    //     })
    // }

    // getAllFavorites();

    return (
        <div>
            <p>Favorites:</p>
        </div>
    )
}

export default Favorites
