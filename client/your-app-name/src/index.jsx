import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import $ from 'jquery'
// import 'semantic-ui-css/semantic.min.css';
import './assets/css/styles.min.css';
import './assets/css/styles.css';
import './assets/css/Contact-Form-Clean.css';
import './assets/css/css.css';
import './assets/css/vierified.css';

 // import './assets/js/jquery.min'
 // import './assets/js/script.min'


ReactDOM.render(<App/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
