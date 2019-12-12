import React from 'react';
import {Switch} from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Posts from '../pages/Posts';
import Home from '../pages/Home';
import UserPage from "../pages/UserPage";
import PostPage from "../pages/Post";
import Chat from "../pages/Chat";
import WhoToFollow from "../pages/whoToFollow";


export default function Routes() {
    return (

        <React.Fragment>
            <Switch>

                <Route path='/' exact component={Home}/>
                <Route path='/signIn/follow' component={WhoToFollow}/>
                <Route path='/signIn' component={SignIn}/>
                <Route path='/signUp' component={SignUp}/>
                <Route path='/posts' component={Posts} isPrivate/>
                <Route path='/chat' component={Chat} isPrivate/>
                <Route path='/:username/posts/:postId' component={PostPage} isPrivate/>
                <Route path='/:username' component={UserPage} isPrivate/>


                <Route component={SignIn}/>

            </Switch>
        </React.Fragment>
    )
}


