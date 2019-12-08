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
import DirectChat from "../pages/Chat/direct_chat";


export default function Routes() {
    return (
        <Switch>
            <Route path='/' exact component={Home}/>
            <Route path='/signIn' component={SignIn}/>
            <Route path='/signUp' component={SignUp}/>
            <Route path='/posts' component={Posts}/>
            <Route path='/profile' component={UserPage} isPrivate/>
            <Route path='/chat' component={Chat}/>
            {/*<Route path='/chat/:username'  component={DirectChat}/>*/}
            <Route path='/:username/posts/:postId' component={PostPage}/>
            <Route path='/:username' component={UserPage}/>

            <Route component={SignIn}/>
        </Switch>
    )
}


