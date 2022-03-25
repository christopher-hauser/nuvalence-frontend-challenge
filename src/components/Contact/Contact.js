import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectContact, storeFavorites } from '../../store/contacts'

function Contact({ contact }) {
    const dispatch = useDispatch();
    const selected = useSelector(state => state.contacts.selectedContact)
    const favorites = useSelector(state => state.contacts.favoriteContacts);
    const isSelected = contact.name.last === selected.name?.last && contact.name.first === selected?.name.first;

    let alreadyFavorited = favorites?.find(person => person.name.last === contact.name.last && person.name.first === contact.name.first);
    const [isFavorite, setIsFavorite] = useState(Boolean(alreadyFavorited))

    const handleClick = () => {
        dispatch(selectContact(contact))
    }

    const addFavorite = () => {
        console.log('before: ', favorites)
        let favoritesCopy = favorites;
        favorites.push(contact);
        dispatch(storeFavorites(favoritesCopy));
        window.localStorage.setItem('address-book-favorites', JSON.stringify(favoritesCopy));
        return favoritesCopy;
    }

    const removeFavorite = () => {
        let favoritesCopy = favorites.filter(favorite => {
            return favorite.name.last !== contact.name.last && favorite.name.first !== contact.name.first
        })
        dispatch(storeFavorites(favoritesCopy));
        window.localStorage.setItem('address-book-favorites', JSON.stringify(favoritesCopy));
        return favoritesCopy;
    }


    const handleFavorite = e => {
        e.stopPropagation();
        isFavorite ? removeFavorite() : addFavorite();
        setIsFavorite(!isFavorite);
    }

    useEffect(() => {
        alreadyFavorited = favorites?.find(person => person.name.last === contact.name.last && person.name.first === contact.name.first);
        setIsFavorite(alreadyFavorited)
    }, [contact])


    return (
        <>
            <div className={isSelected ? "contact-block selected" : "contact-block"}
                onClick={handleClick}>
                <div className="contact-block-info">
                    <h4 data-testid='contact-name'>{`${contact?.name.first} ${contact.name.last}`}</h4>
                    <p data-testid='contact-location'>{`${contact?.location.state}, ${contact.location.country}`}</p>
                </div>
                <i className={isFavorite ? "bi bi-star-fill favorite" : "bi bi-star favorite"} onClick={handleFavorite}></i>
            </div>
        </>
    )
}

export default Contact;
