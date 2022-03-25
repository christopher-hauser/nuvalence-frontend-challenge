import React, { useState, useEffect } from 'react';
import ContactList from '../ContactList/ContactList';
import ContactDetails from '../ContactDetails/ContactDetails';
import { getContacts } from '../../store/contacts';
import { useDispatch, useSelector } from 'react-redux';

function AddressBook() {
    const dispatch = useDispatch();
    const contacts = useSelector(state => state.contacts.contacts)
    const [pageNo, setPageNo] = useState(1);
    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        async function loadAllContacts() {
            await dispatch(getContacts(pageNo));
        }

        loadAllContacts();

    }, [])

    return (
        <div id='address-book-container'>
            <div id='search-list'>
                <form id='search-bar'>
                    <input
                        // value={searchValue}
                        // onChange={handleChange}
                        placeholder={"Search . . ."}
                    />
                </form>
                <ContactList contacts={contacts} />
            </div>
            <ContactDetails />
        </div>
    )
}

export default AddressBook;
