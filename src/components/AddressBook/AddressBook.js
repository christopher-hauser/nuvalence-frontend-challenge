import React, { useState, useEffect } from 'react';
import ContactList from '../ContactList/ContactList';
import ContactDetails from '../ContactDetails/ContactDetails';
import FavoritesList from '../FavoritesList/FavoritesList';
import './AddressBook.scss'

import { getContacts, storeFavorites } from '../../store/contacts';
import { useDispatch, useSelector } from 'react-redux';

function AddressBook() {
    const dispatch = useDispatch();
    const contacts = useSelector(state => state.contacts.contacts);
    const [pageNo, setPageNo] = useState(1);

    async function loadAllContacts() {
        await dispatch(getContacts(pageNo));
    }

    useEffect(() => {
        loadAllContacts();
    }, [pageNo])

    useEffect(() => {
        const storedFavorites = window.localStorage.getItem('address-book-favorites') ? JSON.parse(window.localStorage.getItem('address-book-favorites')) : [];
        dispatch(storeFavorites(storedFavorites));
    }, [])


    return (
        <div id='address-book-container'>
            <FavoritesList />
            <div id='list-details-container'>
                <div id='contact-sidebar'>
                    <ContactList contacts={contacts} />
                    <div id='pagination-container'>
                        <button onClick={e => pageNo === 1 ? '' : setPageNo(pageNo => pageNo -= 1)} className='left-arrow' aria-label='Go to previous page'>←</button>
                        <button onClick={e => setPageNo(parseInt(e.target.innerText))} className={pageNo === 1 ? 'page-selected' : ''} aria-label='Go to page 1' >1</button>
                        <button onClick={e => setPageNo(parseInt(e.target.innerText))} className={pageNo === 2 ? 'page-selected' : ''} aria-label='Go to page 2'>2</button>
                        {pageNo <= 4 && (
                            <button onClick={e => setPageNo(parseInt(e.target.innerText))} className={pageNo === 3 ? 'page-selected' : ''} aria-label='Go to page 3'>3</button>
                        )}
                        {pageNo > 4 && (
                            <p id='page-ellipses'>. . .</p>
                        )}
                        <button onClick={
                            e => setPageNo(parseInt(e.target.innerText))}
                            className={pageNo === 4 || pageNo > 4 ? 'page-selected' : ''}
                            aria-label={`Go to page ${pageNo}`}
                        >
                            {pageNo <= 4 ? 4 : pageNo}
                        </button>
                        <button
                            onClick={e => setPageNo(parseInt(e.target.innerText))}
                            aria-label={`Go to page ${pageNo + 1}`}
                        >
                            {pageNo <= 4 ? 5 : pageNo + 1}
                        </button>
                        <button onClick={e => setPageNo(pageNo => pageNo += 1)} className='right-arrow' aria-label='next page'>&rarr;</button>
                    </div>
                </div>
                <div id='details-sidebar'>
                    <ContactDetails />
                </div>
            </div>
        </div>
    )
}

export default AddressBook;
