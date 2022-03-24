import React, { useState, useEffect } from 'react';
import ContactList from './ContactList';
import ContactDetails from './ContactDetails';

function AddressBook() {
    const [originalContacts, setOriginalContacts] = useState();
    const [contacts, setContacts] = useState([])
    const [selectedContact, setSelectedContact] = useState(null);
    const [searchValue, setSearchValue] = useState('');

    const sendSelectedContact = (contact) => {
        setSelectedContact(contact);
    }

    const handleChange = event => {
        setSearchValue(event.target.value);
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
            setOriginalContacts(data);
            return data;
        }
        fetchData();
    }, [])

    useEffect(() => {
        const handleSearch = () => {
            if (searchValue === '') {
                setContacts(originalContacts)
            } else {
                let searchResults = originalContacts.filter(contact => {
                    const matchesQuery =
                        contact.name.first.toLowerCase().includes(searchValue.toLowerCase()) ||
                        contact.name.last.toLowerCase().includes(searchValue.toLowerCase())
                    return matchesQuery;
                })
                setContacts(searchResults);
            }
        }

        handleSearch();
    }, [searchValue])

    return (
        <div id='address-book-container'>
            <div id='search-list'>
                <form id='search-bar'>
                    <input
                        value={searchValue}
                        onChange={handleChange}
                        placeholder={"Search . . ."}
                    />
                </form>
                <ContactList contacts={contacts} sendSelectedContact={sendSelectedContact} />
            </div>
            <ContactDetails contact={selectedContact} />
        </div>
    )
}

export default AddressBook;
