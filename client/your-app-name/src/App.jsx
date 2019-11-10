import React, {useReducer, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {Router} from 'react-router-dom';
import history from "./services/history";
import Routes from "./routes";
import 'bootstrap/dist/css/bootstrap.min.css';
import MyNavBar from "./components/MyNavBar";

const AuthContext = React.createContext();
const initialState = {
    currentUser: {username: "Billy",
                    email: 'Password'},
    signed: false
};

const reducer = (state, action) => {
    console.log(action.payload);
    switch (action.type) {
        case 'signInUser':
            return {
                ...state,
                currentUser: action.payload,
                signed: true
            };
        case 'logoutUser':
            return {
                ...state,
                currentUser: {username: "Guest"},
                signed: false
            };
        default:
            return state;
    }
};

const AuthContextProvider = ({user, ...props}) => {
    console.log(props.email);
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <AuthContext.Provider
            value={{
                ...state,
                handleSignIn: () => dispatch({type: 'signInUser', payload: user}),
                handleLogOut: () => dispatch({type: 'logoutUser', payload: user})
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )
};

function App() {


    return (
        <AuthContextProvider user={initialState.currentUser}>
            <AuthContext.Consumer>
                {props => (
                    <Router history={history}>
                        <MyNavBar/>

                        <Routes/>
                        <div>
                            <h1>{props.currentUser.username}</h1>
                            <span>{props.signed.toString()}</span>
                        </div>
                        <div>
                            <p>
                    {!props.signed ? (
                      <button onClick={props.handleSignIn}>
                        Subscribe
                      </button>
                    ) : (
                      <button onClick={props.handleLogOut}>
                        Unsubscribe
                      </button>
                    )}
                  </p>
                        </div>

                    </Router>
                )}
            </AuthContext.Consumer>
        </AuthContextProvider>

    );
}

export default App;
