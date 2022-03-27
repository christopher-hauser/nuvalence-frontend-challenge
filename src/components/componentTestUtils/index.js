import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';

const middleWares = [thunk];

export const mockStore = configureStore(middleWares);

export const testState = {
    pageNo: 3,
    contacts: {
        contacts: [{
            "name": {
                "title": "mr",
                "first": "brad",
                "last": "gibson"
            },
            "location": {
                "street": {
                    "number": "9278",
                    "name": "new road"
                },
                "city": "kilcoole",
                "state": "waterford",
                "country": "ireland",
            },
            "email": "brad.gibson@example.com",
            "phone": "011-962-7516",
            "cell": "081-454-0666",
            "id": {
                "name": "PPS",
                "value": "0390511T"
            },
            "picture": {
                "large": "https://randomuser.me/api/portraits/men/75.jpg",
                "medium": "https://randomuser.me/api/portraits/med/men/75.jpg",
                "thumbnail": "https://randomuser.me/api/portraits/thumb/men/75.jpg"
            },
            "nat": "IE"
        }],
        selectedContact: {
            "name": {
                "title": "mr",
                "first": "brad",
                "last": "gibson"
            },
            "location": {
                "street": {
                    "number": "9278",
                    "name": "new road"
                },
                "city": "kilcoole",
                "state": "waterford",
                "country": "ireland",
            },
            "email": "brad.gibson@example.com",
            "phone": "011-962-7516",
            "cell": "081-454-0666",
            "id": {
                "name": "PPS",
                "value": "0390511T"
            },
            "picture": {
                "large": "https://randomuser.me/api/portraits/men/75.jpg",
                "medium": "https://randomuser.me/api/portraits/med/men/75.jpg",
                "thumbnail": "https://randomuser.me/api/portraits/thumb/men/75.jpg"
            },
            "nat": "IE"
        },
        favoriteContacts: [],
    }
}
