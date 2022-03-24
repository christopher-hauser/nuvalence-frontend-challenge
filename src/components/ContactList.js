import React, { useState, useEffect } from "react";
import Contact from "./Contact";

function ContactList() {
    const [contacts, setContacts] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('https://randomuser.me/api/?results=100')
            let data = await response.json();

            data = data.results.sort((a, b) => {
                    if ( a.name.last.toLowerCase() < b.name.last.toLowerCase()){
                      return -1;
                    }
                    if ( a.name.last.toLowerCase() > b.name.last.toLowerCase()){
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
        <div id='contacts-sidebar'>
            <h2>Contacts</h2>
            <div id='contact-list'>
                {contacts?.map((contact, idx) => (
                    <Contact contact={contact} key={idx} />
                ))}
            </div>
        </div>
    )
}


export default ContactList;
