const LOAD_CONTACTS = 'contacts/LOAD_CONTACTS';
const SELECT_CONTACT = 'contacts/SELECT_CONTACT';

const loadContacts = contacts => ({
    type: LOAD_CONTACTS,
    payload: contacts
})

const loadSelectedContact = contact => ({
    type: SELECT_CONTACT,
    payload: contact
})


export const getContacts = (pageNo) => async dispatch => {
    const response = await fetch(`https://randomuser.me/api/?page=${pageNo}&results=20&seed=abc&inc=name,location,email,phone,cell,picture`)
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
    dispatch(loadContacts(data));
    return data;
}

export const selectContact = (contact) => async dispatch => {
    dispatch(loadSelectedContact(contact));
    return contact;
}

const initialState = {'contacts': [], 'selectedContact': {}, 'searchResults': []};

export default function (state = initialState, action) {
    let newState = {...state};
    switch (action.type) {
        case LOAD_CONTACTS:
            newState.contacts = action.payload;
            return newState;
        case SELECT_CONTACT:
            newState.selectedContact = action.payload;
            return newState;
        default:
            return state;
    }
}
