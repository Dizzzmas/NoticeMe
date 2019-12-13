import React, {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../services/auth";
import {PostBody} from "../Posts/post";
import {Link} from "react-router-dom";

const UserBody = (props) => {
    let userContext = useContext(AuthContext);
    const [following, setFollowing] = useState(props.followed);


    let update_following = async () => {
        if (following) {
            let res = await fetch(`/api/v1/users/${userContext.currentUser.id}/unfollow/${props.user.id}`, {
                method: 'DELETE'
            });
            if (res.ok && res.status === 204) {
                setFollowing(false);
            } else {
                console.log('could not unfollow');
            }

        } else {
            let res = await fetch(`/api/v1/users/${userContext.currentUser.id}/follow/${props.user.id}`, {
                method: 'POST'
            });
            if (res.ok && res.status === 201) {
                setFollowing(true);
            } else {
                console.log('could not follow');
            }
        }
    };

    return (


        <React.Fragment>
            <div>
                <div className="media d-xl-flex align-items-xl-center" style={{"margin": "16px", "padding": "8px"}}><img
                    className="float-none d-sm-flex flex-grow-0 flex-shrink-0 justify-content-center align-items-center align-content-center align-self-center flex-wrap justify-content-sm-center mr-3"
                    style={{
                        "width": "50px",
                        "height": "50px",
                        "borderRadius": "25px",
                        "margin": "0 0 0 0",
                        "marginRight": "0px",
                        "marginTop": "0",
                        "marginBottom": "0",
                        "marginLeft": "0"
                    }}
                    src={props.user.ava_url}/>
                    <div
                        className="d-flex float-left d-sm-flex align-content-center align-self-center flex-wrap justify-content-sm-start align-items-sm-center">
                        <h6 className="d-block float-none"
                            style={{
                                "margin": "0px",
                                "marginTop": "0",
                                "marginRight": "0",
                                "marginLeft": "0"
                            }}>{props.user.username}
                            <block className="verified">
                                <svg id="svg_1">
                                    <g id="g_2" id="scale">
                                        <path id="path_3" id="scale">
                                        </path>
                                    </g>
                                </svg>
                            </block>
                            <span className="d-block d-xl-flex justify-content-xl-start"
                                  style={{
                                      "margin": "00",
                                      "marginBottom": "0px",
                                      "marginTop": "0",
                                      "marginLeft": "0",
                                      "fontSize": "10px"
                                  }}>{props.user.handle}</span>
                        </h6>
                    </div>
                    <div
                        className="d-flex float-right d-sm-flex align-self-center flex-wrap justify-content-sm-end align-items-sm-center">


                        {following ?
                            <button
                                onClick={() => {
                                    update_following();
                                }}

                                className="btn btn-link btn-block text-capitalize text-primary border rounded border-primary d-sm-flex d-xl-flex align-self-center justify-content-sm-center justify-content-xl-center align-items-xl-center"
                                type="button"
                                style={{
                                    "width": "87px",
                                    "height": "26px",
                                    "marginTop": "0",
                                    "padding": "0px",
                                    "opacity": "0.51",
                                    "marginRight": "0",
                                    "marginLeft": "0",
                                    "fontSize": "14px",
                                    "color": "rgb(118,97,99)"
                                }}>Unfollow
                            </button> :
                            <button
                                onClick={() => {
                                    update_following();
                                }}

                                className="btn btn-link btn-block text-capitalize text-primary border rounded border-primary d-sm-flex d-xl-flex align-self-center justify-content-sm-center justify-content-xl-center align-items-xl-center"
                                type="button"
                                style={{
                                    "width": "87px",
                                    "height": "26px",
                                    "marginTop": "0",
                                    "padding": "0px",
                                    "opacity": "0.51",
                                    "marginRight": "0",
                                    "marginLeft": "0",
                                    "fontSize": "14px",
                                    "color": "rgb(118,97,99)"
                                }}>Follow
                            </button>}
                    </div>
                </div>
            </div>
        </React.Fragment>
    )


    // return (
    //     <React.Fragment>
    //         <span>{props.user.username}</span>
    //         <div>
    //             {following ? <button onClick={() => {
    //                 update_following();
    //             }}>Unfollow</button> : <button onClick={() => {
    //                 update_following();
    //             }}>Follow</button>}
    //         </div>
    //     </React.Fragment>
    // )
};

export default function WhoToFollow(props) {
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
        <div className="who-to-follow">
            <React.Fragment>
                {suggested_users &&
                <React.Fragment>

                    <div className="d-xl-flex align-items-xl-center contact-clean" style={{"height": "100vh"}}>
                        <form id="slide-in-blurred-top">
                            <h2 className="text-center d-xl-flex justify-content-xl-start">Accounts you may know...</h2>
                            <p>Here's the list of accounts we think could be interesting to you. We really hope
                                so.&nbsp;</p>
                            <div className="border rounded flex-wrap"
                                 style={{"padding": "0px", "margin": "0px", "maxHeight": "346px", "overflowY": "auto"}}>


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


                            </div>
                            <div class="form-group">
                                <button class="btn btn-primary" type="submit" onClick={() => {
                                    props.history.push(`/${userContext.currentUser.username}`);
                                }}>okay
                                </button>
                            </div>
                        </form>
                    </div>
                </React.Fragment>
                }

            </React.Fragment>
        </div>

    )

}