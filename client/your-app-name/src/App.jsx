import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Router} from 'react-router-dom';
import history from "./services/history";
import Routes from "./routes";
import 'bootstrap/dist/css/bootstrap.min.css';
import MyNavBar from "./components/MyNavBar";



function App() {
    console.log(MyNavBar);
    return (

        <Router history={history}>

            <MyNavBar/>
            <Routes/>
        </Router>
    );
}

export default App;
