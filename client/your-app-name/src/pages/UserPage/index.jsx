import React, {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../services/auth";
import {useParams} from "react-router";

export default function UserPage(props) {
    let slug = useParams();
    let username_from_path = slug.username;
    let authCont = useContext(AuthContext);
    const [user, setUser] = useState({username: username_from_path});

    useEffect(() => {
            loadUser();
        }, []
    );


    let loadUser = () => {
        fetch(`/api/v1/users/getByUsername/${user.username}`)
            .then(response => response.json())
            .then(loaded_user => {
                    let stored_user = {
                        id: loaded_user.id,
                        username: loaded_user.username,
                        email: loaded_user.email,
                        aboutMe: loaded_user.aboutMe,
                        role: loaded_user.role,
                        avaUrl: loaded_user.avaUrl,
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
            <p>Username: {user.username}</p>
            <img src={user.avaUrl}/>
        </div>
    );
}

