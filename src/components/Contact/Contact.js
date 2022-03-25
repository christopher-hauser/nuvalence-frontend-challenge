import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectContact } from '../../store/contacts'

function Contact({ contact }) {
    const dispatch = useDispatch();
    const selected = useSelector(state => state.contacts.selectedContact)
    const isSelected = contact.name.last === selected.name?.last && contact.name.first === selected?.name.first;
    let favorited = window.localStorage.getItem(`favorite-${contact.name.last}-${contact.name.first}`);
    const [isFavorite, setIsFavorite] = useState(favorited)


    const handleClick = () => {
        dispatch(selectContact(contact))
    }

    const handleFavorite = e => {
        e.stopPropagation();

        isFavorite ? window.localStorage.removeItem(`favorite-${contact.name.last}-${contact.name.first}`) :
        window.localStorage.setItem(`favorite-${contact.name.last}-${contact.name.first}`, !isFavorite);

        setIsFavorite(!isFavorite);
    }

    useEffect(()=> {
        favorited = window.localStorage.getItem(`favorite-${contact.name.last}-${contact.name.first}`);
        setIsFavorite(favorited)
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
