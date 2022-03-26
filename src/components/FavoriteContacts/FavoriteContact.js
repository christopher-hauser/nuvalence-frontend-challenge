import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectContact } from '../../store/contacts';

function FavoriteContact( { contact }) {
    const selected = useSelector(state => state.contacts.selectedContact);
    const isSelected = contact.name.last === selected.name?.last && contact.name.first === selected?.name.first;
    const dispatch = useDispatch();

    const handleChange = () => {
        dispatch(selectContact(contact))
    }

    return (
        <div className={isSelected ? "favorite-individual-block selected" : "favorite-individual-block"} onClick={handleChange}>
            <img src={contact.picture.large} alt={`${contact.name.first}-${contact.name.last}`} className='contact-photo-favorites' />
            <h4 data-testid='contact-name'>{`${contact?.name.first}`}</h4>
        </div>
    )
}

export default FavoriteContact;
