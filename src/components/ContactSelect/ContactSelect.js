import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectContact, addThisFavorite, removeThisFavorite } from '../../store/contacts'
import './ContactSelect.scss'

function Contact({ contact }) {
    const dispatch = useDispatch();
    const selected = useSelector(state => state.contacts.selectedContact);
    const favorites = useSelector(state => state.contacts.favoriteContacts);
    const isSelected = contact.name.last === selected.name?.last && contact.name.first === selected?.name.first;

    let alreadyFavorited = favorites?.find(person => person.name.last === contact.name.last && person.name.first === contact.name.first);
    const [isFavorite, setIsFavorite] = useState(Boolean(alreadyFavorited))

    const handleClick = () => {
        dispatch(selectContact(contact))
    }


    const addFavorite = (contact) => {
        dispatch(addThisFavorite(contact));
        return contact;
    }

    const removeFavorite = () => {
        dispatch(removeThisFavorite(contact));
        return contact;
    }


    const handleFavorite = e => {
        e.stopPropagation();
        isFavorite ? removeFavorite(contact) : addFavorite(contact);
        setIsFavorite(!isFavorite);
    }

    useEffect(() => {
        alreadyFavorited = favorites?.find(person => person.name.last === contact.name.last && person.name.first === contact.name.first);
        setIsFavorite(alreadyFavorited)
    }, [contact])

    useEffect(() => {
        window.localStorage.setItem('address-book-favorites', JSON.stringify(favorites))
    }, [favorites])



    return (
        <>
            <div id={`contact-${contact.name.first}-${contact.name.last}`} className={isSelected ? "contact-block selected" : "contact-block"}
                onClick={handleClick}>
                <div className="contact-block-info">
                    <h4 data-testid='contact-name'>{`${contact?.name.first} ${contact.name.last}`}</h4>
                    <p data-testid='contact-location'>{`${contact?.location.state}, ${contact.location.country}`}</p>
                </div>
                <div className="favorite-block">
                    <i className={isFavorite ? "bi bi-star-fill favorite" : "bi bi-star favorite"} onClick={handleFavorite} style={{ 'fontSize': '18px' }}></i>
                </div>
            </div>
        </>
    )
}

export default Contact;
