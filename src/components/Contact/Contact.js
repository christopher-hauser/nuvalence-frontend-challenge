import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectContact } from '../../store/contacts'

function Contact({ contact }) {
    const dispatch = useDispatch();
    const selected = useSelector(state => state.contacts.selectedContact)
    const isSelected = contact.name.last === selected.name?.last && contact.name.first === selected?.name.first;

    const handleClick = () => {
        dispatch(selectContact(contact))
    }

    return (
        <>
            <div className={isSelected ? "contact-block selected" : "contact-block"}
                onClick={handleClick}>
                <h4 data-testid='contact-name'>{`${contact?.name.first} ${contact.name.last}`}</h4>
                <p data-testid='contact-location'>{`${contact?.location.city}, ${contact.location.country}`}</p>
            </div>
        </>
    )
}

export default Contact;
