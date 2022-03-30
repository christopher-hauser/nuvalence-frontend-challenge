import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import contacts from './contacts';

const rootReducer = combineReducers({
    contacts
});

const logger = require('redux-logger').default;
const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
let enhancer = composeEnhancers(applyMiddleware(thunk, logger));


const configureStore = () => {
    return createStore(rootReducer, enhancer);
};

export default configureStore;
