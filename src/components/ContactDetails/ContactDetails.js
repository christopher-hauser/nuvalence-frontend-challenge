import React from "react";

function ContactDetails({ contact }) {

    return (
        <div className="contact-details-block">
            {!contact && (
                <h4>Select a user to view their contact information.</h4>
            )}

            {contact && (
                <>
                    <div className="contact-details-top">
                        <img src={contact.picture.large} alt={`${contact.name.first}-${contact.name.last}`} className='contact-photo' />
                        <h3>{`${contact.name.first} ${contact.name.last}`}</h3>
                    </div>
                    <div className="contact-details-bottom">
                        <div className="contact-detail-block">
                            <p>{`${contact.cell}`}</p>
                        </div>
                        <div className="contact-detail-block">
                            <p>{`${contact.phone}`}</p>
                        </div>
                        <div className="contact-detail-block">
                            <p>{`${contact.location.street.number} ${contact.location.street.name}`}</p>
                            <p>{`${contact.location.city}, ${contact.location.state}`}</p>
                            <p>{`${contact.location.country}`}</p>
                        </div>
                    </div>
                </>
            )}
        </div>
    )

}

export default ContactDetails;
