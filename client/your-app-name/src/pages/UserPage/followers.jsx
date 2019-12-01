import React, {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../services/auth";


export default function Followers(props) {
    let userContext = useContext(AuthContext);
    const [following, setFollowing] = useState(props.liked);
    const [followers_count, setFollowersCount] = useState(props.followers_count);
    const [followed_count, setFollowedCount] = useState(props.followed_count);
    let render_follow_button = userContext.currentUser.id !== props.userId;


    useEffect(() => {
        is_following();
    }, []);

    let is_following = () => {
        fetch(`/api/v1/users/${userContext.currentUser.id}/isfollowing/${props.userId}`)
            .then(response => {
                if (response.ok && response.status === 200) {
                    setFollowing(true);
                } else if (!response.ok && response.status === 404) {
                    setFollowing(false);
                }
            })
    };

    let update_following = async () => {
        if (following) {
            let res = await fetch(`api/v1/users/${userContext.currentUser.id}/unfollow/${props.userId}`, {
                method: 'DELETE'
            });
            if (res.ok && res.status === 204) {
                setFollowersCount(followers_count - 1);
                setFollowing(false);
            } else {
                console.log('could not unfollow');
            }

        } else {
            let res = await fetch(`api/v1/users/${userContext.currentUser.id}/follow/${props.userId}`, {
                method: 'POST'
            });
            if (res.ok && res.status === 201) {
                setFollowersCount(followers_count + 1);
                setFollowing(true);
            } else {
                console.log('could not like');
            }
        }
    };

    return (
        <div>
            <p>Followers: {followers_count}</p>
            <p>Following: {followed_count}</p>

            {render_follow_button &&
            <div>
                {following ? <button onClick={() => {
                    update_following();
                }}>Unfollow</button> : <button onClick={() => {
                    update_following();
                }}>Follow</button>}
            </div>
            }

        </div>
    )
};