import React, {useReducer, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {Router} from 'react-router-dom';
import history from "./services/history";
import Routes from "./routes";
import 'bootstrap/dist/css/bootstrap.min.css';
import MyNavBar from "./components/MyNavBar";
import {AuthContextProvider} from "./services/auth";


// const AuthContext = React.createContext();

const initialState = {
    currentUser: {username: "Billy",
                    email: 'Password'},
    signed: false
};


function App() {


    return (
        <AuthContextProvider user={initialState.currentUser}>
            {/*<AuthContext.Consumer>*/}
            {/*    {props => (*/}
                    <Router history={history}>
                        <MyNavBar/>

                        <Routes/>

                  {/*      <div>*/}
                  {/*          <h1>{props.currentUser.username}</h1>*/}
                  {/*          <span>{props.signed.toString()}</span>*/}
                  {/*      </div>*/}
                  {/*      <div>*/}
                  {/*          <p>*/}
                  {/*  {!props.signed ? (*/}
                  {/*    <button onClick={props.handleSignIn}>*/}
                  {/*      Subscribe*/}
                  {/*    </button>*/}
                  {/*  ) : (*/}
                  {/*    <button onClick={props.handleLogOut}>*/}
                  {/*      Unsubscribe*/}
                  {/*    </button>*/}
                  {/*  )}*/}
                  {/*</p>*/}
                  {/*      </div>*/}

                    </Router>
            {/*    )}*/}
            {/*</AuthContext.Consumer>*/}
        </AuthContextProvider>

    );
}

export default App;
