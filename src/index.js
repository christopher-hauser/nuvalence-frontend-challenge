import React from "react";
import { hydrate } from "react-dom";
import App from './App';

import { Provider } from 'react-redux';
import configureStore from './store';

const store = configureStore();

// ReactDOM.render(
//     <React.StrictMode>
//         <Provider store={store}>
//             <App />
//         </Provider>
//     </React.StrictMode>,
//     document.getElementById('root')
// );


hydrate(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  )
