import React from 'react';
import {Router} from 'react-router-dom';
import history from "./services/history";
import Routes from "./routes";
import {AuthContextProvider} from "./services/auth";
import MyNavBar from "./pages/MyNavbar";
import './assets/css/styles.min.css'
// import './assets/css/Footer-Basic.css'
// import './assets/css/Header-Blue.css'
// import './assets/css/Registration-Form-with-Photo.css'
// import './assets/css/util.css'



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
