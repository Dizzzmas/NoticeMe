import React, {useEffect} from 'react';
import {Router} from 'react-router-dom';
import history from "./services/history";
import Routes from "./routes";
import {AuthContextProvider} from "./services/auth";



function App() {


    return (
        <AuthContextProvider>
            <Router history={history}>
                <Routes/>
            </Router>
        </AuthContextProvider>

    );
}

export default App;
