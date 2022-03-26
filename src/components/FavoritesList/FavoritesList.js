import React from "react";
import { useSelector } from "react-redux";
import FavoriteContact from "../FavoriteContacts/FavoriteContact";

function FavoritesList() {
    const favorites = useSelector(state => state.contacts.favoriteContacts)

    return (
        <div id='favorites-block'>
            <i className="bi bi-star-fill favorite static" style={{'fontSize': '30px'}}></i>
            <div id='favorites-scroll'>
                {favorites.map((contact, idx )=> (
                    <FavoriteContact contact={contact} idx={idx} />
                ))}
            </div>
        </div>
    )
}

export default FavoritesList
