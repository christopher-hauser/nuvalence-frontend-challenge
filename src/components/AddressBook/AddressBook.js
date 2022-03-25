import React, { useState, useEffect } from 'react';
import ContactList from '../ContactList/ContactList';
import ContactDetails from '../ContactDetails/ContactDetails';
import { getContacts } from '../../store/contacts';
import { useDispatch, useSelector } from 'react-redux';
import { MultiSelect } from 'react-multi-select-component';

function AddressBook() {
    const dispatch = useDispatch();
    const contacts = useSelector(state => state.contacts.contacts)
    const [pageNo, setPageNo] = useState(1);
    const [searchValue, setSearchValue] = useState('');
    const [selectedNats, setSelectedNats] = useState([]);

    const nationalities = [
        { label: "United States", value: "US" },
        { label: "Australia", value: "AU" },
        { label: "Brazil", value: "BR" },
        { label: "Canada", value: "CA" },
        { label: "Switzerland", value: "CH" },
        { label: "Germany", value: "DE" },
        { label: "Denmark", value: "DK" },
        { label: "Spain", value: "ES" },
        { label: "Finland", value: "FI" },
        { label: "France", value: "FR" },
        { label: "United Kingdom", value: "GB" },
        { label: "Ireland", value: "IE" },
        { label: "Iran", value: "IR" },
        { label: "Norway", value: "NO" },
        { label: "Netherlands", value: "NL" },
        { label: "New Zealand", value: "NZ" },
        { label: "Turkey", value: "TR" },
    ]

    async function loadAllContacts() {
        await dispatch(getContacts(pageNo, selectedNats));
    }

    const handleChange = (e) => {
        setSearchValue(e.target.value);
    }

    useEffect(() => {
        loadAllContacts();
    }, [pageNo, selectedNats])

    return (
        <div id='address-book-container'>
            <div id='search-list'>
                <MultiSelect
                    options={nationalities}
                    value={selectedNats}
                    onChange={setSelectedNats}
                    labelledBy="Select"
                />
                {/* <form id='search-bar'>
                    <input
                        value={searchValue}
                        onChange={handleChange}
                        placeholder={"Search . . ."}
                    />
                </form> */}
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
