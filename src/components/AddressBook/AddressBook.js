import React, { useState, useEffect } from 'react';
import ContactList from '../ContactList/ContactList';
import ContactDetails from '../ContactDetails/ContactDetails';
import Favorites from '../FavoritesList/FavoritesList';
import { getContacts, storeFavorites } from '../../store/contacts';
import { useDispatch, useSelector } from 'react-redux';

function AddressBook() {
    const dispatch = useDispatch();
    const contacts = useSelector(state => state.contacts.contacts);
    const [pageNo, setPageNo] = useState(1);
    const [searchValue, setSearchValue] = useState('');

    async function loadAllContacts() {
        await dispatch(getContacts(pageNo));
    }

    const handleChange = (e) => {
        setSearchValue(e.target.value);
    }

    useEffect(() => {
        loadAllContacts();
    }, [pageNo])

    useEffect(() => {
        dispatch(storeFavorites(JSON.parse(window.localStorage.getItem('address-book-favorites'))))
    }, [])


    return (
        <div id='address-book-container'>
            <div id='search-list'>
                {/* <form id='search-bar'>
                    <input
                        value={searchValue}
                        onChange={handleChange}
                        placeholder={"Search . . ."}
                    />
                </form> */}
                <Favorites />
                <ContactList contacts={contacts} />
                <div id='pagination-container'>
                    <button onClick={e => pageNo === 1 ? '' : setPageNo(pageNo => pageNo -= 1)}>&larr;</button>
                    <button onClick={e => setPageNo(parseInt(e.target.innerText))} className={pageNo === 1 ? 'page-selected' : ''} >{pageNo === 1 ? 1 : pageNo - 1}</button>
                    <button onClick={e => setPageNo(parseInt(e.target.innerText))} className={pageNo === 1 ? '' : 'page-selected'}>{pageNo === 1 ? 2 : pageNo}</button>
                    <button onClick={e => setPageNo(parseInt(e.target.innerText))}>{pageNo === 1 ? 3 : pageNo + 1}</button>
                    <button onClick={e => setPageNo(pageNo => pageNo += 1)}>&rarr;</button>
                </div>
            </div>
            <ContactDetails />
        </div>
    )
}

export default AddressBook;
