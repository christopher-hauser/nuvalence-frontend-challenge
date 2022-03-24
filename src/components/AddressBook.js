import React, { useState, useEffect } from 'react';
import ContactList from './ContactList';
import ContactDetails from './ContactDetails';

function AddressBook() {
    const [contacts, setContacts] = useState([])
    const [selectedContact, setSelectedContact] = useState(null);

    const sendSelectedContact = (contact) => {
        setSelectedContact(contact);
    }


    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('https://randomuser.me/api/?results=50')
            let data = await response.json();

            data = data.results.sort((a, b) => {
                if (a.name.last.toLowerCase() < b.name.last.toLowerCase()) {
                    return -1;
                }
                if (a.name.last.toLowerCase() > b.name.last.toLowerCase()) {
                    return 1;
                }
                return 0;
            });

            setContacts(data);
            return data;
        }

        fetchData();

    }, [])

    return (
        <div id='address-book-container'>
            <ContactList contacts={contacts} sendSelectedContact={sendSelectedContact} />
            <ContactDetails contact={selectedContact} />
        </div>
    )
}

export default AddressBook;
