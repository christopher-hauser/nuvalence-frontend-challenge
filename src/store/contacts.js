const LOAD_CONTACTS = 'contacts/LOAD_CONTACTS';
const SELECT_CONTACT = 'contacts/SELECT_CONTACT';
const LOAD_FAVORITES = 'contacts/LOAD_FAVORITES';
const ADD_FAVORITE = 'contacts/ADD_FAVORITE';
const REMOVE_FAVORITE = 'contacts/REMOVE_FAVORITE';

const loadContacts = contacts => ({
    type: LOAD_CONTACTS,
    payload: contacts
})

const loadSelectedContact = contact => ({
    type: SELECT_CONTACT,
    payload: contact
})

const loadFavorites = favorites => ({
    type: LOAD_FAVORITES,
    payload: favorites
})

const addFavorite = favorite => ({
    type: ADD_FAVORITE,
    payload: favorite
})

const removeFavorite = favorite => ({
    type: REMOVE_FAVORITE,
    payload: favorite
})


export const getContacts = (pageNo) => async dispatch => {

    const response = await fetch(`https://randomuser.me/api/?page=${pageNo}&results=20&seed=abc&inc=name,location,email,phone,cell,picture`);
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

export const selectContact = (contact) => dispatch => {
    dispatch(loadSelectedContact(contact));
    return contact;
}

export const storeFavorites = (favorites) => dispatch => {
    dispatch(loadFavorites(favorites));
    return favorites;
}

export const addThisFavorite = (favorite) =>  dispatch => {
    dispatch(addFavorite(favorite));
    return favorite;
}

export const removeThisFavorite = (favorite) =>  dispatch => {
    dispatch(removeFavorite(favorite));
    return favorite;
}

const initialState = {'contacts': [], 'selectedContact': {}, 'favoriteContacts': []};

export default function (state = initialState, action) {
    let newState = {...state};
    switch (action.type) {
        case LOAD_CONTACTS:
            newState.contacts = action.payload;
            return newState;
        case SELECT_CONTACT:
            newState.selectedContact = action.payload;
            return newState;
        case LOAD_FAVORITES:
            newState.favoriteContacts = action.payload;
            return newState;
        case ADD_FAVORITE:
            newState.favoriteContacts = [...newState.favoriteContacts, action.payload];
            return newState;
        case REMOVE_FAVORITE:
            const removeIdx = newState.favoriteContacts.findIndex(el => (
                el.name.first === action.payload.name.first && el.name.last === action.payload.name.last
            ));
            newState.favoriteContacts = [...newState.favoriteContacts.slice(0, removeIdx), ...newState.favoriteContacts.slice(removeIdx + 1, newState.favoriteContacts.length)];
            return newState;
        default:
            return state;
    }
}
