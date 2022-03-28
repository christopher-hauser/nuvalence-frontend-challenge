import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import contacts from './contacts';

const rootReducer = combineReducers({
    contacts
})

let enhancer = applyMiddleware(thunk);;

// if (process.env.NODE_ENV === 'production') {
//     enhancer = applyMiddleware(thunk);
// } else {
//     const logger = require('redux-logger').default;
//     const composeEnhancers =
//         window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//     enhancer = composeEnhancers(applyMiddleware(thunk, logger));
// }

const configureStore = () => {
    return createStore(rootReducer, window.__PRELOADED_STATE_, enhancer);
};

export default configureStore;
