import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AddressBook from './components/AddressBook/AddressBook';
import Nav from './components/Nav/Nav';
import './styles.scss'

function App() {

    return (
        <BrowserRouter>
            <Nav />
            <AddressBook />
        </BrowserRouter>
    )
}

export default App;
