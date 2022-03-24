import React, { useState } from "react";

function ContactDetails() {
    const [contact, setContact] = useState(null);

    return (
        <div className="contact-details-block">
            {!contact && (
                <h4>Select a user to view their contact information.</h4>
            )}

            {contact && (
                <>
                    <img src={contact.picture.thumbnail} alt={`${contact.name.first}-${contact.name.last}-photo`} style={{ width: '400px', height: '400px' }} />
                    <h3>{`${contact.name.first} ${contact.name.last}`}</h3>
                </>
            )}
        </div>
    )

}

export default ContactDetails;
