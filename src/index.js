import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Store from './Store';
import GlobalStateChanger from './GlobalStateChanger';

// renders App.js to the DOM
ReactDOM.render(<Store><App /><GlobalStateChanger /></Store>, document.getElementById('root'));
