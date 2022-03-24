import React from "react";

function Contact({ contact }) {
    return (
        <>
            <h4 data-testid='contact-name'>{`${contact.name.first} ${contact.name.last}`}</h4>
            <p data-testid='contact-location'>{`${contact.location.city}, ${contact.location.country}`}</p>
        </>
    )
}

export default Contact;
