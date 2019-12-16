import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import $ from 'jquery'
// import 'semantic-ui-css/semantic.min.css';
import './assets/css/styles.min.css';
 // import './assets/js/jquery.min'
 // import './assets/js/script.min'
import './assets/js/back-to-top';


ReactDOM.render(<App/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
