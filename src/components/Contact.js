import React from "react";

function Contact({ contact }) {

    return (
        <>
            <h4>{`${contact.name.first} ${contact.name.last}`}</h4>
            <p>{`${contact.location.city}, ${contact.location.country}`}</p>
        </>
    )
}

export default Contact;
