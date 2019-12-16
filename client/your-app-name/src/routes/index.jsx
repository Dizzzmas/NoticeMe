import React from 'react';
import {Switch} from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Posts from '../pages/Posts';
import Home from '../pages/Home';
import User from "../pages/UserPage";
import PostPage from "../pages/Post";
import Chat from "../pages/Chat";
import WhoToFollow from "../pages/whoToFollow";
import MyNavBar from "../pages/MyNavbar";
import EditPage from "../pages/UserPage/edit_page";


export default function Routes() {
    return (

        <React.Fragment>
            <Switch>

                <Route path='/' exact component={MyNavBar}/>
                <Route path='/signIn' component={WhoToFollow}/>
                <Route path='/signUp' component={SignUp}/>
                <Route path='/posts' component={Posts} isPrivate/>
                <Route path='/chat' component={Chat} isPrivate/>
                <Route path='/:username/posts/:postId' component={PostPage} isPrivate/>
                <Route path='/:username/edit' component={EditPage} isPrivate/>
                <Route path='/:username' component={User} isPrivate/>


                <Route component={MyNavBar}/>

            </Switch>
        </React.Fragment>
    )
}


