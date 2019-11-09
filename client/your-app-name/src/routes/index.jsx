import React from 'react';
import {Switch} from 'react-router-dom';
import Route from './Route';


import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Posts from '../pages/Posts';
import Home from '../pages/Home';

export default function Routes(){
    return(
        <Switch>
            <Route path ='/' exact component={Home}/>
            <Route path ='/signUp' component={SignUp}/>
            <Route path='/posts' component={Posts} isPrivate/>
            <Route path ='/signIn' exact component={SignIn}/>
            <Route component={Home}/> // Later refactor to redirecting to Home by default
        </Switch>
    )
}


