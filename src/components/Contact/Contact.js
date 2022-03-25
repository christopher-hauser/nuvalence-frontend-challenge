import React from "react";
import { useDispatch } from "react-redux";
import { selectContact } from '../../store/contacts'

function Contact({ contact }) {
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(selectContact(contact))
    }

    return (
        <>
            <div className="contact-block"
                onClick={handleClick}>
                <h4 data-testid='contact-name'>{`${contact?.name.first} ${contact.name.last}`}</h4>
                <p data-testid='contact-location'>{`${contact?.location.city}, ${contact.location.country}`}</p>
            </div>
        </>
    )
}

export default Contact;
