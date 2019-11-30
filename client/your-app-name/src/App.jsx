import React from 'react';
import './App.css';
import {Router} from 'react-router-dom';
import history from "./services/history";
import Routes from "./routes";
import 'bootstrap/dist/css/bootstrap.min.css';
import MyNavBar from "./components/MyNavBar";
import {AuthContextProvider} from "./services/auth";
import './App.css';



// const AuthContext = React.createContext();


function App() {


    return (
        <AuthContextProvider>
            <Router history={history}>
                <MyNavBar history={history}/>
                <Routes/>
            </Router>
        </AuthContextProvider>

    );
}

export default App;
