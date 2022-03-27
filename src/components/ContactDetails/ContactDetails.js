import React from "react";
import { useSelector } from 'react-redux';
import './ContactDetails.scss'
import "bootstrap-icons/font/bootstrap-icons.css"

function ContactDetails() {
    const contact = useSelector(state => state.contacts.selectedContact);

    return (
        <div className="contact-details-outer">
            <div className="contact-details-block">
                {!Object.keys(contact).length && (
                    <div className="no-user-selected">
                        <i className="bi bi-person-circle no-user" style={{ fontSize: '80px' }}></i>
                        <h4>Select a user to view their contact information.</h4>
                    </div>
                )}

                {Object.keys(contact).length > 0 && (
                    <>
                        <div className="contact-details-top">
                            <img src={contact.picture.large} alt={`${contact.name.first}-${contact.name.last}`} className='contact-photo' />
                            <h3>{`${contact.name.first} ${contact.name.last}`}</h3>
                        </div>
                        <div className="contact-details-bottom">
                            <div className="contact-detail-block phone-container">
                                <div className="inner-phone-container">
                                    <i className="bi bi-tablet-fill contact-detail-icon"></i>
                                    <p>{`${contact.cell}`}</p>
                                </div>
                                <div className="inner-phone-container">
                                    <i className="bi bi-telephone-fill contact-detail-icon"></i>
                                    <p>{`${contact.phone}`}</p>
                                </div>
                            </div>
                            <div className="contact-detail-block">
                                <i className="bi bi-envelope-fill contact-detail-icon"></i>
                                <a href={`mailto:${contact.email}`} className="contact-email">{`${contact.email}`}</a>
                            </div>
                            <div className="contact-detail-block">
                                <i className="bi bi-geo-alt-fill contact-detail-icon"></i>
                                <div>
                                    <p>{`${contact.location.street.number} ${contact.location.street.name}`}</p>
                                    <p>{`${contact.location.city}, ${contact.location.state}`}</p>
                                    <p>{`${contact.location.country}`}</p>

                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    )

}

export default ContactDetails;
