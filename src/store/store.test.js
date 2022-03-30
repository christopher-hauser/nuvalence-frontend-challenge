import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import contactsReducer,
{
    getContacts, selectContact, storeFavorites, addThisFavorite, removeThisFavorite,
    loadContacts, loadSelectedContact, addFavorite, removeFavorite, loadFavorites
} from './contacts';

const middleWares = [thunk];
const mockStore = configureMockStore(middleWares);
const mockResponse = ( status, statusText, response ) => {
    return new window.Response(response, {
        status: status,
        headers: {
            'Content-type': 'application/json'
        }
    })
};

describe('store', () => {
    it('should return the initial state', () => {
        expect(contactsReducer(undefined, {})).toEqual({
            'contacts': [],
            'selectedContact': {},
            'favoriteContacts': []
        })
    })
})

describe('actions', () => {
    let store;

    beforeEach(() => {
        store = mockStore({
            'contacts': [],
            'selectedContact': {},
            'favoriteContacts': []
        })
    })

    it('dispatches getContacts with a successful API call', () => {
        window.fetch = jest.fn().mockImplementation(() => (
            Promise.resolve(mockResponse(200, null, '{"results": [{"name": {"first": "joe", "last": "smith"}}]}'))
        ))

        return store.dispatch(getContacts(1)).then(() => {
            const expectedActions = store.getActions();
            expect(expectedActions.length).toBe(1);
            expect(expectedActions).toContainEqual({
                'type': 'contacts/LOAD_CONTACTS',
                'payload': [{name: {first: "joe", last: "smith"}}]
            })
        })
    })


    it('dispatches selectContact', () => {
        store.dispatch(selectContact({ name: 'test' }))
        expect(store.getActions()).toContainEqual({
            'type': 'contacts/SELECT_CONTACT',
            'payload': { name: 'test' }
        })
    })

    it('dispatches loadFavorite', () => {
        store.dispatch(storeFavorites([{ name: 'test' }]))
        expect(store.getActions()).toContainEqual({
            'type': 'contacts/LOAD_FAVORITES',
            'payload': [{ name: 'test' }]
        })
    })

    it('dispatches addThisFavorite', () => {
        store.dispatch(addThisFavorite({ name: 'test' }))
        expect(store.getActions()).toContainEqual({
            'type': 'contacts/ADD_FAVORITE',
            'payload': { name: 'test' }
        })
    })

    it('dispatches removeThisFavorite', () => {
        store.dispatch(removeThisFavorite({ name: 'test' }))
        expect(store.getActions()).toContainEqual({
            'type': 'contacts/REMOVE_FAVORITE',
            'payload': { name: 'test' }
        })
    })

})

describe('reducer', () => {
    let state;

    beforeEach(() => {
        state = {
            'contacts': [],
            'selectedContact': {},
            'favoriteContacts': []
        }
    })

    it('updates contacts on loadContacts', () => {
        const action = loadContacts([{ name: "test" }]);
        let finalState = contactsReducer(state, action);
        expect(finalState).toStrictEqual({
            'contacts': [{ name: "test" }],
            'selectedContact': {},
            'favoriteContacts': []
        })
    })


    it('updates selectedContact on selectContact', () => {
        const action = loadSelectedContact({ name: "test" });
        let finalState = contactsReducer(state, action);
        expect(finalState).toStrictEqual({
            'contacts': [],
            'selectedContact': { name: 'test' },
            'favoriteContacts': []
        })
    })

    it('updates favorites on loadFavorites', () => {
        const action = loadFavorites([{ name: "test" }, { name: 'test2' }]);
        let finalState = contactsReducer(state, action);
        expect(finalState).toStrictEqual({
            'contacts': [],
            'selectedContact': {},
            'favoriteContacts': [{ name: "test" }, { name: 'test2' }]
        })
    })

    it('updates favorites on addFavorite', () => {
        state = {
            'contacts': [],
            'selectedContact': {},
            'favoriteContacts': [{ name: "test" }]
        }


        const action = addFavorite({ name: 'test2' });
        let finalState = contactsReducer(state, action);
        expect(finalState).toStrictEqual({
            'contacts': [],
            'selectedContact': {},
            'favoriteContacts': [{ name: "test" }, { name: 'test2' }]
        })
    })

    it('updates favorites on removeFavorite', () => {
        state = {
            'contacts': [],
            'selectedContact': {},
            'favoriteContacts': [
                {
                    name: {
                        first: "firstname",
                        last: "lastname"
                    }
                },
                {
                    name: {
                        first: "firstname2",
                        last: "lastname2"
                    }
                }]
        }

        const action = removeFavorite({
            name: {
                first: "firstname2",
                last: "lastname2"
            }
        });

        let finalState = contactsReducer(state, action);
        expect(finalState).toStrictEqual({
            'contacts': [],
            'selectedContact': {},
            'favoriteContacts': [{
                name: {
                    first: "firstname",
                    last: "lastname"
                }
            }]
        })
    })
})
