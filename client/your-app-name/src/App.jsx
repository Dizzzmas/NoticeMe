import React from 'react';
import './App.css';
import {Router} from 'react-router-dom';
import history from "./services/history";
import Routes from "./routes";
import 'bootstrap/dist/css/bootstrap.min.css';
import MyNavBar from "./components/MyNavBar";
import {AuthContextProvider} from "./services/auth";
import './App.css';
import {ChatContextProvider} from "./services/chat";


// const AuthContext = React.createContext();


function App() {


    return (
        <AuthContextProvider>
            <ChatContextProvider>
                <Router history={history}>
                    <MyNavBar history={history}/>
                    <Routes/>
                </Router>
            </ChatContextProvider>
        </AuthContextProvider>

    );
}

export default App;
