import React, {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../services/auth";
import {PostBody} from "../Posts/post";
import {Link} from "react-router-dom";


const UserBody = (props) => {
    let userContext = useContext(AuthContext);
    const [following, setFollowing] = useState(props.followed);


    let update_following = async () => {
        if (following) {
            let res = await fetch(`api/v1/users/${userContext.currentUser.id}/unfollow/${props.user.id}`, {
                method: 'DELETE'
            });
            if (res.ok && res.status === 204) {
                setFollowing(false);
            } else {
                console.log('could not unfollow');
            }

        } else {
            let res = await fetch(`api/v1/users/${userContext.currentUser.id}/follow/${props.user.id}`, {
                method: 'POST'
            });
            if (res.ok && res.status === 201) {
                setFollowing(true);
            } else {
                console.log('could not like');
            }
        }
    };

    return (
        <React.Fragment>
            <span>{props.user.username}</span>
            <div>
                {following ? <button onClick={() => {
                    update_following();
                }}>Unfollow</button> : <button onClick={() => {
                    update_following();
                }}>Follow</button>}
            </div>
        </React.Fragment>
    )
};

export default function WhoToFollow() {
    let userContext = useContext(AuthContext);
    const jwt = userContext.getJwt();
    const [followingCount, setFollowingCount] = useState(userContext.currentUser.following_count);
    const [suggested_users, setSuggestedUsers] = useState();

    useEffect(() => {
        loadSuggested();
    }, []);


    let updateFollowingCount = (count) => {
        setFollowingCount(count);
    };

    let loadSuggested = async () => {

        let response = await fetch(`/api/v1/users/${userContext.currentUser.id}/getSuggested`, {
            headers: {
                Authorization: `Bearer ${jwt}`,
            }
        });
        let suggested = await response.json();
        setSuggestedUsers(suggested);
    };


    return (
        <div>
            {suggested_users &&
            <React.Fragment>
                <p>Please follow some users in order to enjoy the full experience: </p>
                {[...suggested_users.rows].map((user, index) => {
                    console.log('usr: ', user);
                    let followed = false;
                    for (const follower of user.followed_by) {

                        if (follower.id == userContext.currentUser.id) {
                            followed = true;
                        }
                    }
                    return (
                        <UserBody
                            key={index}
                            user={user}
                            followed={followed}
                        />
                    )
                })}
                <Link to={`/${userContext.currentUser.username}`}>Next</Link>
            </React.Fragment>
            }

        </div>

    )

}