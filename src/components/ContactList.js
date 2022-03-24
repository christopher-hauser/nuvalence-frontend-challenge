import React, { useState, useEffect } from "react";

import Contact from "./Contact";

function ContactList() {
    const [contacts, setContacts] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('https://randomuser.me/api/?results=100');
            let jsonData = await response.json();
            jsonData = jsonData.results.sort((a, b) => {
                if (a.name.last.toLowerCase() < b.name.last.toLowerCase()) return -1;
                if (a.name.last.toLowerCase() > b.name.last.toLowerCase()) return 1;
                return 0;
            })

            setContacts(jsonData);
        }

        fetchData().catch(console.error);

    }, [])

    return (
        <div id='contacts-sidebar'>
            <h2>Contacts</h2>
            {contacts?.map((contact, idx) => (
                <Contact contact={contact} key={idx} />
            ))}
        </div>
    )
}


export default ContactList;
