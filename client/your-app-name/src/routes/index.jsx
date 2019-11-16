import React from 'react';
import {Switch} from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Posts from '../pages/Posts';
import Home from '../pages/Home';
import Profile from "../pages/Profile";

export default function Routes(){
    return(
        <Switch>
            <Route path ='/' exact component={Home} />
            <Route path ='/signIn' component={SignIn}/>
            <Route path ='/signUp' component={SignUp}/>
            <Route path='/posts' component={Posts} />
            <Route path='/profile' component={Profile} isPrivate/>

            <Route component={SignIn}/>
        </Switch>
    )
}


