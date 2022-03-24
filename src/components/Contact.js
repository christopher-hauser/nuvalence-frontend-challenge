import React from "react";

function Contact({ contact }) {

    return (
        <div className="contact-block">
            <h3>{`${contact.name.first} ${contact.name.last}`}</h3>
            <p>{`${contact.location.city}, ${contact.location.country}`}</p>
        </div>
    )
}

export default Contact;
