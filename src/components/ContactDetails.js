import React from "react";

function ContactDetails( { contact } ) {
    console.log('contact', contact);

    return (
        <div className="contact-details-block">
            {!contact && (
                <h4>Select a user to view their contact information.</h4>
            )}

            {contact && (
                <>
                    <img src={contact.picture.large} alt={`${contact.name.first}-${contact.name.last}`} className='contact-photo' />
                    <h3>{`${contact.name.first} ${contact.name.last}`}</h3>
                    <p>{`${contact.phone}`}</p>
                    <p>{`${contact.location.street.number} ${contact.location.street.name}`}</p>
                    <p>{`${contact.location.city}, ${contact.location.state}`}</p>
                    <p>{`${contact.location.country}`}</p>
                </>
            )}
        </div>
    )

}

export default ContactDetails;
