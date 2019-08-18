import 'react-app-polyfill/ie9';
import React from 'react';
import ReactDOM from 'react-dom';
import '../node_modules/spectre.css/dist/spectre.min.css';
import '../node_modules/spectre.css/dist/spectre-exp.min.css';
import '../node_modules/spectre.css/dist/spectre-icons.min.css';
import './index.css';
import App from './container/App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
