import React, {useEffect} from 'react';
import {Router} from 'react-router-dom';
import history from "./services/history";
import Routes from "./routes";
import {AuthContextProvider} from "./services/auth";
import MyNavBar from "./pages/MyNavbar";

import $ from 'jquery'
// import $ from 'jquery'
// import './assets/js/jquery.min'
// import './assets/js/script.min'
// import './assets/css/Footer-Basic.css'
// import './assets/css/Header-Blue.css'
// import './assets/css/Registration-Form-with-Photo.css'
// import './assets/css/util.css'

const useScript = url => {
    useEffect(() => {
        const script = document.createElement('script');

        script.src = url;
        script.async = true;
        script.type = 'text/javascript';

        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        }
    }, [url]);
};

function App() {

    // useScript('/home/dizzzmas/PycharmProjects/webprogbase2/client/your-app-name/src/assets/js/jquery.min.js');
    // useScript('/home/dizzzmas/PycharmProjects/webprogbase2/client/your-app-name/src/assets/js/script.min.js');
    return (
        <AuthContextProvider>
            <Router history={history}>
                <Routes/>
            </Router>
        </AuthContextProvider>

    );
}

export default App;
