import React from "react";

function Contact({ contact }) {

    // const handleChange = (e) => {

    // }

    return (
        <div className="contact-block">
            <h4>{`${contact.name.first} ${contact.name.last}`}</h4>
            <p>{`${contact.location.city}, ${contact.location.country}`}</p>
        </div>
    )
}

export default Contact;
