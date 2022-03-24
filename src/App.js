import React from 'react';

import ContactList from './components/ContactList';
import ContactDetails from './components/ContactDetails';
import './styles.scss'

function App() {

    return (
        <div id='app'>
            <div id='address-book-container'>
                <ContactList />
                <ContactDetails />
            </div>
        </div>
    )
}

export default App;
