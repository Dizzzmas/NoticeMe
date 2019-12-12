import React, {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../services/auth";
import {useParams} from "react-router";
import {Button} from "react-bootstrap";
import Followers from "./followers";
import UserPosts from "./user_posts";
import EditModal from "./edit_modal";


export default function UserPage(props) {
    let slug = useParams();
    let username_from_path = slug.username;
    let userContext = useContext(AuthContext);
    const [user, setUser] = useState({username: username_from_path});

    useEffect(() => {
            loadUser();
        }, []
    );


    const jwt = userContext.getJwt();
    let loadUser = () => {
        fetch(`/api/v1/users/getByUsername/${user.username}`, {
            headers: {
                Authorization: `Bearer ${jwt}`,
            }
        })
            .then(response => response.json())
            .then(loaded_user => {
                    console.log(loaded_user);
                    let stored_user = {
                        id: loaded_user.id,
                        username: loaded_user.username,
                        handle: loaded_user.handle,
                        email: loaded_user.email,
                        aboutMe: loaded_user.about_me,
                        role: loaded_user.role,
                        avaUrl: loaded_user.ava_url,
                        followers_count: loaded_user.followed_by.length,
                        following_count: loaded_user.following.length,
                        createdAt: loaded_user.createdAt,
                        updatedAt: loaded_user.updatedAt,
                    };
                    setUser(stored_user);
                }
            )
            .catch((err) => {
                console.error(err);
                console.log('Loading user\'s page failed')
            });
    };

    return (

        <div>
            {user.id &&
            <div>
                <p>Id: {user.id}</p>
                <p>Username: {user.username}</p>
                <p>{user.handle}</p>
                <img src={user.avaUrl}/>

                <Followers followers_count={user.followers_count} followed_count={user.following_count}
                           userId={user.id}/>
                <p>About_me: {user.aboutMe}</p>
                {user.username === userContext.currentUser.username &&
                <EditModal history={props.history}/>}
                <Button variant='success' onClick={() => {
                    props.history.push({
                        pathname: '/chat',
                        search: `?user=${user.username}`
                    })
                }}>Message</Button>

                <p>Posts: </p>

                <UserPosts userId={user.id} history={props.history}/>


            </div>}
        </div>

    );
}

