import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import contactsReducer,
{
    getContacts, selectContact, storeFavorites, addThisFavorite, removeThisFavorite,
    loadContacts, loadSelectedContact, addFavorite, removeFavorite, loadFavorites
} from './contacts';

const middleWares = [thunk];
const mockStore = configureMockStore(middleWares);

describe('store', () => {
    test('should return the initial state', () => {
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

    it('updates selectedContact correctly', () => {
        const action = loadSelectedContact({ name: "test" });
        let finalState = contactsReducer(state, action);
        expect(finalState).toStrictEqual({
            'contacts': [],
            'selectedContact': { name: 'test' },
            'favoriteContacts': []
        })
    })

    it('updates loadFavorites correctly', () => {
        const action = loadFavorites([{ name: "test" }, { name: 'test2' }]);
        let finalState = contactsReducer(state, action);
        expect(finalState).toStrictEqual({
            'contacts': [],
            'selectedContact': {},
            'favoriteContacts': [{ name: "test" }, { name: 'test2' }]
        })
    })

    it('updates addFavorite correctly', () => {
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

    it('updates removeFavorite correctly', () => {
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
            'favoriteContacts': [{name: {
                first: "firstname",
                last: "lastname"
            }}]
        })
    })
})
