import React from 'react';
import ReactDOM from 'react-dom';
import {Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';

import App from './components/App';
import reducers from './reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducers, 
  composeEnhancers(applyMiddleware(reduxThunk))
  );


ReactDOM.render(
<Provider store={store}>
  <App/>
</Provider>,
  document.querySelector('#root')
)

// REDUX DEBUG 
// allows you to persist data in redux dev-tools after a page refresh
// websiteaddress?debug_session=some_string
// example:  http://localhost:3000?debug_session=some_string