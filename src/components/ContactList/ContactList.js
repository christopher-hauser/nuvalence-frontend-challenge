import React from "react";
import ContactSelect from "../ContactSelect/ContactSelect";
import './ContactList.scss'

function ContactList({ contacts }) {

    return (
        <div id='contact-list'>
            {contacts?.map((contact, idx) => (
                <ContactSelect contact={contact} key={idx}/>
            ))}
        </div>
    )
}


export default ContactList;
