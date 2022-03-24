import React, { useState } from "react";
import Contact from "./Contact";

function ContactList({ contacts, sendSelectedContact }) {

    return (
        <div id='contacts-sidebar'>
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
        </div>
    )
}


export default ContactList;
