import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux';
import {createStore, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {userReducer} from './reducers/userReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

// const rootReducer = combineReducers({
//   auth: userReducer
// })
const store = createStore(userReducer, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();
