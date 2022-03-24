import React from "react";
import Contact from "../Contact/Contact";
import { TransitionGroup } from 'react-transition-group';

function ContactList({ contacts, sendSelectedContact }) {

    return (
        <div id='contact-list'>
            {contacts?.map((contact, idx) => (
                <div className="contact-block"
                    key={idx}
                    onClick={() => {
                        sendSelectedContact(contact);
                    }}>
                    <Contact contact={contact} />
                </div>
            ))}
        </div>
    )
}


export default ContactList;
