import React from "react";
import Contact from "../ContactSelect/ContactSelect";
import './ContactList.scss'

function ContactList({ contacts }) {

    return (
        <div id='contact-list'>
            {contacts?.map((contact, idx) => (
                <Contact contact={contact} key={idx}/>
            ))}
        </div>
    )
}


export default ContactList;
