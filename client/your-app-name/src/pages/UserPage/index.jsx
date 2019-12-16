import React, {useContext, useEffect, useRef, useState} from "react";
import {AuthContext} from "../../services/auth";
import {useParams} from "react-router";

import UserPosts from "./user_posts";
import "../../assets/js/back-to-top"
import {Link} from "react-router-dom";


const usePrevious = current => {
    const ref = useRef();
    useEffect(() => {
        ref.current = current
    });
    return ref.current
};


const UserPage = (props) => {
    let slug = useParams();
    let username_from_path = slug.username;
    let userContext = useContext(AuthContext);
    const [user, setUser] = useState({username: username_from_path});
    const [following, setFollowing] = useState(false);
    const [followers_count, setFollowersCount] = useState(0);
    const [followed_count, setFollowedCount] = useState(0);
    const prev_username = usePrevious(slug.username);


    useEffect(() => {
            loadUser();
        }, [username_from_path]
    );


    let is_following = () => {
        fetch(`/api/v1/users/${userContext.currentUser.id}/isfollowing/${user.id}`)
            .then(response => {
                if (response.ok && response.status === 200) {
                    setFollowing(true);
                } else if (!response.ok && response.status === 404) {
                    setFollowing(false);
                }
            })
    };

    const jwt = userContext.getJwt();
    let loadUser = async () => {

        try {
            let r = await fetch(`/api/v1/users/getByUsername/${user.username}`, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                }
            });
            let loaded_user = await r.json();
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

            setFollowedCount(stored_user.following_count);
            setFollowersCount(stored_user.followers_count);
            let is_following_resp = await fetch(`/api/v1/users/${userContext.currentUser.id}/isfollowing/${stored_user.id}`);
            if (is_following_resp.ok && is_following_resp.status === 200) {
                setFollowing(true);
            } else if (!is_following_resp.ok && is_following_resp.status === 404) {
                setFollowing(false);
            }

            setUser(stored_user);
        } catch (error) {
            console.error(error);
            console.log('Loading user\'s page failed')
        }

    };

    let update_following = async (id) => {
        if (following) {
            let res = await fetch(`api/v1/users/${userContext.currentUser.id}/unfollow/${id}`, {
                method: 'DELETE'
            });
            if (res.ok && res.status === 204) {
                setFollowersCount(followers_count - 1);
                setFollowing(false);
            } else {
                console.log('could not unfollow');
            }

        } else {
            let res = await fetch(`api/v1/users/${userContext.currentUser.id}/follow/${id}`, {
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

        <React.Fragment key={username_from_path}>

            <divf
                className="fixed-sidebar open">
                <div
                    className="fixed-sidebar-left sidebar--small"
                    id="sidebar-left"
                    style={{"-webkit-transform": "translateX(0%)", "transform": "translateX(0 %)", marginTop: "-56%"}}>

                    <a
                        href="https://html.crumina.net/html-olympus/02-ProfilePage.html"
                        className="logo">
                        < div
                            className="img-wrap">
                            <img
                                src="https://res.cloudinary.com/dv0smnf2u/image/upload/v1576474159/safe/logo_uwdarw.png"
                                alt=""/>
                        </div>
                    </a>

                    <div className="mCustomScrollbar ps ps--theme_default ps--active-x" data-mcs-theme="dark"
                         data-ps-id="ec16cdd5-39b8-7f34-c5fe-226c4a5a2537">
                        <ul className="left-menu">

                            <li>
                                <a href="https://html.crumina.net/html-olympus/03-Newsfeed.html">
                                    <i className="material-icons" style={{marginLeft: "-8px"}}>
                                        menu_book
                                    </i>
                                </a>
                            </li>
                            <li>
                                <a href="https://html.crumina.net/html-olympus/16-FavPagesFeed.html">
                                    <svg className="olymp-star-icon left-menu-icon" data-toggle="tooltip"
                                         data-placement="right" data-original-title="FAV PAGE">
                                        <use xlinkHref="assets/img/./icons.svg#olymp-star-icon"></use>
                                    </svg>
                                </a>
                            </li>


                        </ul>
                        <div className="ps__scrollbar-x-rail" style={{"width": "70px", "left": "0px", "bottom": "0px"}}>
                            <div className="ps__scrollbar-x" tabIndex="0"
                                 style={{"left": "0px", "width": "64px"}}></div>
                        </div>
                        <div className="ps__scrollbar-y-rail" style={{"top": "0px", "right": "0px"}}>
                            <div className="ps__scrollbar-y" tabIndex="0" style={{"top": "0px", "height": "0px"}}></div>
                        </div>
                    </div>
                </div>


            </divf>


            <div className="fixed-sidebar fixed-sidebar-responsive">

                <div className="fixed-sidebar-left sidebar--small" id="sidebar-left-responsive">
                    <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                       className="logo js-sidebar-open">
                        <img src="https://res.cloudinary.com/dv0smnf2u/image/upload/v1576474159/safe/logo_uwdarw.png"
                             alt=""/>
                    </a>

                </div>


            </div>


            <div className="fixed-sidebar right">
                <div className="fixed-sidebar-right sidebar--small" id="sidebar-right">

                    <div className="mCustomScrollbar ps ps--theme_default" data-mcs-theme="dark"
                         data-ps-id="2aeed418-f9b3-df80-43bd-52acdf206d8c">
                        <ul className="chat-users">
                            <li className="inline-items js-chat-open">
                                <div className="author-thumb">
                                    <img alt="author" src={user.avaUrl} className="avatar" style={{"width": "100%"}}/>
                                    <span className="icon-status online"></span>
                                </div>
                            </li>
                            <li className="inline-items js-chat-open">
                                <div className="author-thumb">
                                    <img alt="author" src={user.avaUrl} className="avatar"/>
                                    <span className="icon-status online"></span>
                                </div>
                            </li>
                            <span className="icon-status away"></span>
                            <span className="icon-status away"></span>

                            <li className="inline-items js-chat-open">
                                <div className="author-thumb">
                                    <img alt="author" src={user.avaUrl} className="avatar"/>

                                </div>
                            </li>
                            <li className="inline-items js-chat-open">
                                <div className="author-thumb">
                                    <img alt="author" src={user.avaUrl} className="avatar"/>
                                    <span className="icon-status away"></span>
                                </div>
                            </li>

                        </ul>
                        <div className="ps__scrollbar-x-rail" style={{"left": "0px", "bottom": "0px"}}>
                            <div className="ps__scrollbar-x" tabIndex="0" style={{"left": "0px", "width": "0px"}}></div>
                        </div>
                        <div className="ps__scrollbar-y-rail" style={{"top": "0px", "right": "0px"}}>
                            <div className="ps__scrollbar-y" tabIndex="0" style={{"top": "0px", "height": "0px"}}></div>
                        </div>
                    </div>

                    <div className="search-friend inline-items">
                        <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                           className="js-sidebar-open">
                            <i style={{color: "#3d5fbf"}} className="material-icons">
                                menu
                            </i>
                        </a>
                    </div>

                    <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                       className="olympus-chat inline-items js-chat-open">
                        <i className="material-icons" style={{
                            color: "#fff",


                            marginLeft: "35%"
                        }}>
                            mail
                        </i>
                    </a>

                </div>

                <div className="fixed-sidebar-right sidebar--large" id="sidebar-right-1">

                    <div className="mCustomScrollbar ps ps--theme_default ps--active-y" data-mcs-theme="dark"
                         data-ps-id="17b33866-bbec-35a0-79cd-6f70f3ca7152">

                        <div className="ui-block-title ui-block-title-small">
                            <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#" className="title">Close
                                Friends</a>
                            <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#">Settings</a>
                        </div>

                        <ul className="chat-users">
                            <li className="inline-items js-chat-open">

                                <div className="author-thumb">
                                    <img alt="author" src="assets/img/./avatar67-sm.jpg" className="avatar"
                                         style={{"width": "100%"}}/>
                                    <span className="icon-status online"></span>
                                </div>

                                <div className="author-status">
                                    <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                                       className="h6 author-name">Carol Summers</a>
                                    <span className="status">ONLINE</span>
                                </div>

                                <div className="more">
                                    <i class="material-icons">
                                        more_horiz
                                    </i>

                                    <ul className="more-icons">
                                        <li>
                                            <svg data-toggle="tooltip" data-placement="top"
                                                 data-original-title="START CONVERSATION"
                                                 className="olymp-comments-post-icon">
                                                <use xlinkHref="assets/img/./icons.svg#olymp-comments-post-icon"></use>
                                            </svg>
                                        </li>

                                        <li>
                                            <svg data-toggle="tooltip" data-placement="top"
                                                 data-original-title="ADD TO CONVERSATION"
                                                 className="olymp-add-to-conversation-icon">
                                                <use
                                                    xlinkHref="assets/img/./icons.svg#olymp-add-to-conversation-icon"></use>
                                            </svg>
                                        </li>

                                        <li>
                                            <svg data-toggle="tooltip" data-placement="top"
                                                 data-original-title="BLOCK FROM CHAT"
                                                 className="olymp-block-from-chat-icon">
                                                <use
                                                    xlinkHref="assets/img/./icons.svg#olymp-block-from-chat-icon"></use>
                                            </svg>
                                        </li>
                                    </ul>

                                </div>

                            </li>
                            <li className="inline-items js-chat-open">

                                <div className="author-thumb">
                                    <img alt="author" src="assets/img/./avatar62-sm.jpg" className="avatar"/>
                                    <span className="icon-status online"></span>
                                </div>

                                <div className="author-status">
                                    <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                                       className="h6 author-name">Mathilda Brinker</a>
                                    <span className="status">AT WORK!</span>
                                </div>

                                <div className="more">
                                    <i class="material-icons">
                                        more_horiz
                                    </i>

                                    <ul className="more-icons">
                                        <li>
                                            <svg data-toggle="tooltip" data-placement="top"
                                                 data-original-title="START CONVERSATION"
                                                 className="olymp-comments-post-icon">
                                                <use xlinkHref="assets/img/./icons.svg#olymp-comments-post-icon"></use>
                                            </svg>
                                        </li>

                                        <li>
                                            <svg data-toggle="tooltip" data-placement="top"
                                                 data-original-title="ADD TO CONVERSATION"
                                                 className="olymp-add-to-conversation-icon">
                                                <use
                                                    xlinkHref="assets/img/./icons.svg#olymp-add-to-conversation-icon"></use>
                                            </svg>
                                        </li>

                                        <li>
                                            <svg data-toggle="tooltip" data-placement="top"
                                                 data-original-title="BLOCK FROM CHAT"
                                                 className="olymp-block-from-chat-icon">
                                                <use
                                                    xlinkHref="assets/img/./icons.svg#olymp-block-from-chat-icon"></use>
                                            </svg>
                                        </li>
                                    </ul>

                                </div>

                            </li>

                            <li className="inline-items js-chat-open">


                                <div className="author-thumb">
                                    <img alt="author" src="assets/img/./avatar68-sm.jpg" className="avatar"/>
                                    <span className="icon-status online"></span>
                                </div>

                                <div className="author-status">
                                    <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                                       className="h6 author-name">{user.username} {user.verified}</a>
                                    <span className="status">ONLINE</span>
                                </div>

                                <div className="more">
                                    <i class="material-icons">
                                        more_horiz
                                    </i>

                                    <ul className="more-icons">
                                        <li>
                                            <svg data-toggle="tooltip" data-placement="top"
                                                 data-original-title="START CONVERSATION"
                                                 className="olymp-comments-post-icon">
                                                <use xlinkHref="assets/img/./icons.svg#olymp-comments-post-icon"></use>
                                            </svg>
                                        </li>

                                        <li>
                                            <svg data-toggle="tooltip" data-placement="top"
                                                 data-original-title="ADD TO CONVERSATION"
                                                 className="olymp-add-to-conversation-icon">
                                                <use
                                                    xlinkHref="assets/img/./icons.svg#olymp-add-to-conversation-icon"></use>
                                            </svg>
                                        </li>

                                        <li>
                                            <svg data-toggle="tooltip" data-placement="top"
                                                 data-original-title="BLOCK FROM CHAT"
                                                 className="olymp-block-from-chat-icon">
                                                <use
                                                    xlinkHref="assets/img/./icons.svg#olymp-block-from-chat-icon"></use>
                                            </svg>
                                        </li>
                                    </ul>

                                </div>


                            </li>

                            <li className="inline-items js-chat-open">


                                <div className="author-thumb">
                                    <img alt="author" src={user.avaUrl} className="avatar"/>
                                    <span className="icon-status away"></span>
                                </div>

                                <div className="author-status">
                                    <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                                       className="h6 author-name">{user.username} {user.verified}</a>
                                    <span className="status">AWAY</span>
                                </div>

                                <div className="more">
                                    <i class="material-icons">
                                        more_horiz
                                    </i>

                                    <ul className="more-icons">
                                        <li>
                                            <svg data-toggle="tooltip" data-placement="top"
                                                 data-original-title="START CONVERSATION"
                                                 className="olymp-comments-post-icon">
                                                <use xlinkHref="assets/img/./icons.svg#olymp-comments-post-icon"></use>
                                            </svg>
                                        </li>

                                        <li>
                                            <svg data-toggle="tooltip" data-placement="top"
                                                 data-original-title="ADD TO CONVERSATION"
                                                 className="olymp-add-to-conversation-icon">
                                                <use
                                                    xlinkHref="assets/img/./icons.svg#olymp-add-to-conversation-icon"></use>
                                            </svg>
                                        </li>

                                        <li>
                                            <svg data-toggle="tooltip" data-placement="top"
                                                 data-original-title="BLOCK FROM CHAT"
                                                 className="olymp-block-from-chat-icon">
                                                <use
                                                    xlinkHref="assets/img/./icons.svg#olymp-block-from-chat-icon"></use>
                                            </svg>
                                        </li>
                                    </ul>

                                </div>


                            </li>

                            <li className="inline-items js-chat-open">


                                <div className="author-thumb">
                                    <img alt="author" src={user.avaUrl} className="avatar"/>
                                    <span className="icon-status disconected"></span>
                                </div>

                                <div className="author-status">
                                    <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                                       className="h6 author-name">{user.username} {user.verified}</a>
                                    <span className="status">OFFLINE</span>
                                </div>

                                <div className="more">
                                    <i class="material-icons">
                                        more_horiz
                                    </i>

                                    <ul className="more-icons">
                                        <li>
                                            <svg data-toggle="tooltip" data-placement="top"
                                                 data-original-title="START CONVERSATION"
                                                 className="olymp-comments-post-icon">
                                                <use xlinkHref="assets/img/./icons.svg#olymp-comments-post-icon"></use>
                                            </svg>
                                        </li>

                                        <li>
                                            <svg data-toggle="tooltip" data-placement="top"
                                                 data-original-title="ADD TO CONVERSATION"
                                                 className="olymp-add-to-conversation-icon">
                                                <use
                                                    xlinkHref="assets/img/./icons.svg#olymp-add-to-conversation-icon"></use>
                                            </svg>
                                        </li>

                                        <li>
                                            <svg data-toggle="tooltip" data-placement="top"
                                                 data-original-title="BLOCK FROM CHAT"
                                                 className="olymp-block-from-chat-icon">
                                                <use
                                                    xlinkHref="assets/img/./icons.svg#olymp-block-from-chat-icon"></use>
                                            </svg>
                                        </li>
                                    </ul>

                                </div>


                            </li>
                        </ul>


                        <div className="ui-block-title ui-block-title-small">
                            <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#" className="title">MY
                                FAMILY</a>
                            <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#">Settings</a>
                        </div>

                        <ul className="chat-users">
                            <li className="inline-items js-chat-open">

                                <div className="author-thumb">
                                    <img alt="author" src="{user.avaUrl}}" className="avatar"/>
                                    <span className="icon-status online"></span>
                                </div>

                                <div className="author-status">
                                    <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                                       className="h6 author-name">{user.username} {user.verified}</a>
                                    <span className="status">ONLINE</span>
                                </div>

                                <div className="more">
                                    <i class="material-icons">
                                        more_horiz
                                    </i>

                                    <ul className="more-icons">
                                        <li>
                                            <svg data-toggle="tooltip" data-placement="top"
                                                 data-original-title="START CONVERSATION"
                                                 className="olymp-comments-post-icon">
                                                <use xlinkHref="assets/img/./icons.svg#olymp-comments-post-icon"></use>
                                            </svg>
                                        </li>

                                        <li>
                                            <svg data-toggle="tooltip" data-placement="top"
                                                 data-original-title="ADD TO CONVERSATION"
                                                 className="olymp-add-to-conversation-icon">
                                                <use
                                                    xlinkHref="assets/img/./icons.svg#olymp-add-to-conversation-icon"></use>
                                            </svg>
                                        </li>

                                        <li>
                                            <svg data-toggle="tooltip" data-placement="top"
                                                 data-original-title="BLOCK FROM CHAT"
                                                 className="olymp-block-from-chat-icon">
                                                <use
                                                    xlinkHref="assets/img/./icons.svg#olymp-block-from-chat-icon"></use>
                                            </svg>
                                        </li>
                                    </ul>

                                </div>
                            </li>
                        </ul>


                        <div className="ui-block-title ui-block-title-small">
                            <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                               className="title">UNCATEGORIZED</a>
                            <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#">Settings</a>
                        </div>

                        <ul className="chat-users">
                            <li className="inline-items js-chat-open">

                                <div className="author-thumb">
                                    <img alt="author" src={user.avaUrl} className="avatar"/>
                                    <span className="icon-status online"></span>
                                </div>

                                <div className="author-status">
                                    <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                                       className="h6 author-name">{user.username} {user.verified}</a>
                                    <span className="status">ONLINE</span>
                                </div>

                                <div className="more">
                                    <i class="material-icons">
                                        more_horiz
                                    </i>

                                    <ul className="more-icons">
                                        <li>
                                            <svg data-toggle="tooltip" data-placement="top"
                                                 data-original-title="START CONVERSATION"
                                                 className="olymp-comments-post-icon">
                                                <use xlinkHref="assets/img/./icons.svg#olymp-comments-post-icon"></use>
                                            </svg>
                                        </li>

                                        <li>
                                            <svg data-toggle="tooltip" data-placement="top"
                                                 data-original-title="ADD TO CONVERSATION"
                                                 className="olymp-add-to-conversation-icon">
                                                <use
                                                    xlinkHref="assets/img/./icons.svg#olymp-add-to-conversation-icon"></use>
                                            </svg>
                                        </li>

                                        <li>
                                            <svg data-toggle="tooltip" data-placement="top"
                                                 data-original-title="BLOCK FROM CHAT"
                                                 className="olymp-block-from-chat-icon">
                                                <use
                                                    xlinkHref="assets/img/./icons.svg#olymp-block-from-chat-icon"></use>
                                            </svg>
                                        </li>
                                    </ul>

                                </div>


                            </li>
                            <li className="inline-items js-chat-open">

                                <div className="author-thumb">
                                    <img alt="author" src={user.avaUrl} className="avatar"/>
                                    <span className="icon-status away"></span>
                                </div>

                                <div className="author-status">
                                    <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                                       className="h6 author-name">{user.username} {user.verified}</a>
                                    <span className="status">AWAY</span>
                                </div>

                                <div className="more">
                                    <i class="material-icons">
                                        more_horiz
                                    </i>

                                    <ul className="more-icons">
                                        <li>
                                            <svg data-toggle="tooltip" data-placement="top"
                                                 data-original-title="START CONVERSATION"
                                                 className="olymp-comments-post-icon">
                                                <use xlinkHref="assets/img/./icons.svg#olymp-comments-post-icon"></use>
                                            </svg>
                                        </li>

                                        <li>
                                            <svg data-toggle="tooltip" data-placement="top"
                                                 data-original-title="ADD TO CONVERSATION"
                                                 className="olymp-add-to-conversation-icon">
                                                <use
                                                    xlinkHref="assets/img/./icons.svg#olymp-add-to-conversation-icon"></use>
                                            </svg>
                                        </li>

                                        <li>
                                            <svg data-toggle="tooltip" data-placement="top"
                                                 data-original-title="BLOCK FROM CHAT"
                                                 className="olymp-block-from-chat-icon">
                                                <use
                                                    xlinkHref="assets/img/./icons.svg#olymp-block-from-chat-icon"></use>
                                            </svg>
                                        </li>
                                    </ul>

                                </div>

                            </li>
                            <li className="inline-items js-chat-open">

                                <div className="author-thumb">
                                    <img alt="author" src={user.avaUrl} className="avatar"/>
                                    <span className="icon-status status-invisible"></span>
                                </div>

                                <div className="author-status">
                                    <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                                       className="h6 author-name">{user.username} {user.verified}</a>
                                    <span className="status">INVISIBLE</span>
                                </div>

                                <div className="more">
                                    <i class="material-icons">
                                        more_horiz
                                    </i>

                                    <ul className="more-icons">
                                        <li>
                                            <svg data-toggle="tooltip" data-placement="top"
                                                 data-original-title="START CONVERSATION"
                                                 className="olymp-comments-post-icon">
                                                <use xlinkHref="assets/img/./icons.svg#olymp-comments-post-icon"></use>
                                            </svg>
                                        </li>

                                        <li>
                                            <svg data-toggle="tooltip" data-placement="top"
                                                 data-original-title="ADD TO CONVERSATION"
                                                 className="olymp-add-to-conversation-icon">
                                                <use
                                                    xlinkHref="assets/img/./icons.svg#olymp-add-to-conversation-icon"></use>
                                            </svg>
                                        </li>

                                        <li>
                                            <svg data-toggle="tooltip" data-placement="top"
                                                 data-original-title="BLOCK FROM CHAT"
                                                 className="olymp-block-from-chat-icon">
                                                <use
                                                    xlinkHref="assets/img/./icons.svg#olymp-block-from-chat-icon"></use>
                                            </svg>
                                        </li>
                                    </ul>

                                </div>
                            </li>
                            <li className="inline-items js-chat-open">

                                <div className="author-thumb">
                                    <img alt="author" src={user.avaUrl} className="avatar"/>
                                    <span className="icon-status away"></span>
                                </div>

                                <div className="author-status">
                                    <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                                       className="h6 author-name">{user.username} {user.verified}</a>
                                    <span className="status">AWAY</span>
                                </div>

                                <div className="more">
                                    <i class="material-icons">
                                        more_horiz
                                    </i>

                                    <ul className="more-icons">
                                        <li>
                                            <svg data-toggle="tooltip" data-placement="top"
                                                 data-original-title="START CONVERSATION"
                                                 className="olymp-comments-post-icon">
                                                <use xlinkHref="assets/img/./icons.svg#olymp-comments-post-icon"></use>
                                            </svg>
                                        </li>

                                        <li>
                                            <svg data-toggle="tooltip" data-placement="top"
                                                 data-original-title="ADD TO CONVERSATION"
                                                 className="olymp-add-to-conversation-icon">
                                                <use
                                                    xlinkHref="assets/img/./icons.svg#olymp-add-to-conversation-icon"></use>
                                            </svg>
                                        </li>

                                        <li>
                                            <svg data-toggle="tooltip" data-placement="top"
                                                 data-original-title="BLOCK FROM CHAT"
                                                 className="olymp-block-from-chat-icon">
                                                <use
                                                    xlinkHref="assets/img/./icons.svg#olymp-block-from-chat-icon"></use>
                                            </svg>
                                        </li>
                                    </ul>

                                </div>
                            </li>
                            <li className="inline-items js-chat-open">

                                <div className="author-thumb">
                                    <img alt="author" src={user.avaUrl} className="avatar"/>
                                    <span className="icon-status online"></span>
                                </div>

                                <div className="author-status">
                                    <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                                       className="h6 author-name">{user.username} {user.verified}</a>
                                    <span className="status">ONLINE</span>
                                </div>

                                <div className="more">
                                    <i class="material-icons">
                                        more_horiz
                                    </i>

                                    <ul className="more-icons">
                                        <li>
                                            <svg data-toggle="tooltip" data-placement="top"
                                                 data-original-title="START CONVERSATION"
                                                 className="olymp-comments-post-icon">
                                                <use xlinkHref="assets/img/./icons.svg#olymp-comments-post-icon"></use>
                                            </svg>
                                        </li>

                                        <li>
                                            <svg data-toggle="tooltip" data-placement="top"
                                                 data-original-title="ADD TO CONVERSATION"
                                                 className="olymp-add-to-conversation-icon">
                                                <use
                                                    xlinkHref="assets/img/./icons.svg#olymp-add-to-conversation-icon"></use>
                                            </svg>
                                        </li>

                                        <li>
                                            <svg data-toggle="tooltip" data-placement="top"
                                                 data-original-title="BLOCK FROM CHAT"
                                                 className="olymp-block-from-chat-icon">
                                                <use
                                                    xlinkHref="assets/img/./icons.svg#olymp-block-from-chat-icon"></use>
                                            </svg>
                                        </li>
                                    </ul>

                                </div>
                            </li>
                        </ul>

                        <div className="ps__scrollbar-x-rail" style={{"left": "0px", "bottom": "0px"}}>
                            <div className="ps__scrollbar-x" tabIndex="0" style={{"left": "0px", "width": "0px"}}></div>
                        </div>
                        <div className="ps__scrollbar-y-rail" style={{"top": "0px", "height": "766px", "right": "0px"}}>
                            <div className="ps__scrollbar-y" tabIndex="0"
                                 style={{"top": "0px", "height": "709px"}}></div>
                        </div>
                    </div>

                    <div className="search-friend inline-items">
                        <form className="form-group is-empty">
                            <input className="form-control" placeholder="Search Friends..." value="" type="text"/>
                            <span className="material-input"></span></form>

                        <a href="https://html.crumina.net/html-olympus/29-YourAccount-AccountSettings.html"
                           className="settings">
                            <i className="material-icons">
                                settings_applications
                            </i>
                        </a>

                        <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                           className="js-sidebar-open">
                            <svg className="olymp-close-icon">
                                <use xlinkHref="assets/img/./icons.svg#olymp-close-icon"></use>
                            </svg>
                        </a>
                    </div>

                    <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                       className="olympus-chat inline-items js-chat-open">

                        <h6 className="olympus-chat-title">OLYMPUS CHAT</h6>
                        <i className="material-icons">
                            mail
                        </i>
                    </a>

                </div>
            </div>


            <div className="fixed-sidebar right fixed-sidebar-responsive" id="sidebar-right-responsive">

                <div className="fixed-sidebar-right sidebar--small">
                    <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#" className="js-sidebar-open">
                        <svg className="olymp-menu-icon">
                            <use xlinkHref="assets/img/./icons.svg#olymp-menu-icon"></use>
                        </svg>
                        <svg className="olymp-close-icon">
                            <use xlinkHref="assets/img/./icons.svg#olymp-close-icon"></use>
                        </svg>
                    </a>
                </div>

                <div className="fixed-sidebar-right sidebar--large">
                    <div className="mCustomScrollbar ps ps--theme_default" data-mcs-theme="dark"
                         data-ps-id="341df9fc-8163-bca9-c65f-185299d570a6">

                        <div className="ui-block-title ui-block-title-small">
                            <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#" className="title">Close
                                Friends</a>
                            <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#">Settings</a>
                        </div>

                        <ul className="chat-users">
                            <li className="inline-items js-chat-open">

                                <div className="author-thumb">
                                    <img alt="author" src={user.avaUrl} className="avatar"/>
                                    <span className="icon-status online"></span>
                                </div>

                                <div className="author-status">
                                    <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                                       className="h6 author-name">{user.username} {user.verified}</a>
                                    <span className="status">ONLINE</span>
                                </div>

                                <div className="more">
                                    <i class="material-icons">
                                        more_horiz
                                    </i>

                                    <ul className="more-icons">
                                        <li>
                                            <svg data-toggle="tooltip" data-placement="top"
                                                 data-original-title="START CONVERSATION"
                                                 className="olymp-comments-post-icon">
                                                <use xlinkHref="assets/img/./icons.svg#olymp-comments-post-icon"></use>
                                            </svg>
                                        </li>

                                        <li>
                                            <svg data-toggle="tooltip" data-placement="top"
                                                 data-original-title="ADD TO CONVERSATION"
                                                 className="olymp-add-to-conversation-icon">
                                                <use
                                                    xlinkHref="assets/img/./icons.svg#olymp-add-to-conversation-icon"></use>
                                            </svg>
                                        </li>

                                        <li>
                                            <svg data-toggle="tooltip" data-placement="top"
                                                 data-original-title="BLOCK FROM CHAT"
                                                 className="olymp-block-from-chat-icon">
                                                <use
                                                    xlinkHref="assets/img/./icons.svg#olymp-block-from-chat-icon"></use>
                                            </svg>
                                        </li>
                                    </ul>

                                </div>

                            </li>
                            <li className="inline-items js-chat-open">

                                <div className="author-thumb">
                                    <img alt="author" src={user.avaUrl} className="avatar"/>
                                    <span className="icon-status online"></span>
                                </div>

                                <div className="author-status">
                                    <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                                       className="h6 author-name">{user.username} {user.verified}</a>
                                    <span className="status">AT WORK!</span>
                                </div>

                                <div className="more">
                                    <i class="material-icons">
                                        more_horiz
                                    </i>

                                    <ul className="more-icons">
                                        <li>
                                            <svg data-toggle="tooltip" data-placement="top"
                                                 data-original-title="START CONVERSATION"
                                                 className="olymp-comments-post-icon">
                                                <use xlinkHref="assets/img/./icons.svg#olymp-comments-post-icon"></use>
                                            </svg>
                                        </li>

                                        <li>
                                            <svg data-toggle="tooltip" data-placement="top"
                                                 data-original-title="ADD TO CONVERSATION"
                                                 className="olymp-add-to-conversation-icon">
                                                <use
                                                    xlinkHref="assets/img/./icons.svg#olymp-add-to-conversation-icon"></use>
                                            </svg>
                                        </li>

                                        <li>
                                            <svg data-toggle="tooltip" data-placement="top"
                                                 data-original-title="BLOCK FROM CHAT"
                                                 className="olymp-block-from-chat-icon">
                                                <use
                                                    xlinkHref="assets/img/./icons.svg#olymp-block-from-chat-icon"></use>
                                            </svg>
                                        </li>
                                    </ul>

                                </div>

                            </li>

                            <li className="inline-items js-chat-open">


                                <div className="author-thumb">
                                    <img alt="author" src={user.avaUrl} className="avatar"/>
                                    <span className="icon-status online"></span>
                                </div>

                                <div className="author-status">
                                    <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                                       className="h6 author-name">{user.username} {user.verified}</a>
                                    <span className="status">ONLINE</span>
                                </div>

                                <div className="more">
                                    <i class="material-icons">
                                        more_horiz
                                    </i>

                                    <ul className="more-icons">
                                        <li>
                                            <svg data-toggle="tooltip" data-placement="top"
                                                 data-original-title="START CONVERSATION"
                                                 className="olymp-comments-post-icon">
                                                <use xlinkHref="assets/img/./icons.svg#olymp-comments-post-icon"></use>
                                            </svg>
                                        </li>

                                        <li>
                                            <svg data-toggle="tooltip" data-placement="top"
                                                 data-original-title="ADD TO CONVERSATION"
                                                 className="olymp-add-to-conversation-icon">
                                                <use
                                                    xlinkHref="assets/img/./icons.svg#olymp-add-to-conversation-icon"></use>
                                            </svg>
                                        </li>

                                        <li>
                                            <svg data-toggle="tooltip" data-placement="top"
                                                 data-original-title="BLOCK FROM CHAT"
                                                 className="olymp-block-from-chat-icon">
                                                <use
                                                    xlinkHref="assets/img/./icons.svg#olymp-block-from-chat-icon"></use>
                                            </svg>
                                        </li>
                                    </ul>

                                </div>


                            </li>

                            <li className="inline-items js-chat-open">


                                <div className="author-thumb">
                                    <img alt="author" src="{{user.avaUrl}}" className="avatar"/>
                                    <span className="icon-status away"></span>
                                </div>

                                <div className="author-status">
                                    <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                                       className="h6 author-name">{user.username} {user.verified}</a>
                                    <span className="status">AWAY</span>
                                </div>

                                <div className="more">
                                    <i class="material-icons">
                                        more_horiz
                                    </i>

                                    <ul className="more-icons">
                                        <li>
                                            <svg data-toggle="tooltip" data-placement="top"
                                                 data-original-title="START CONVERSATION"
                                                 className="olymp-comments-post-icon">
                                                <use xlinkHref="assets/img/./icons.svg#olymp-comments-post-icon"></use>
                                            </svg>
                                        </li>

                                        <li>
                                            <svg data-toggle="tooltip" data-placement="top"
                                                 data-original-title="ADD TO CONVERSATION"
                                                 className="olymp-add-to-conversation-icon">
                                                <use
                                                    xlinkHref="assets/img/./icons.svg#olymp-add-to-conversation-icon"></use>
                                            </svg>
                                        </li>

                                        <li>
                                            <svg data-toggle="tooltip" data-placement="top"
                                                 data-original-title="BLOCK FROM CHAT"
                                                 className="olymp-block-from-chat-icon">
                                                <use
                                                    xlinkHref="assets/img/./icons.svg#olymp-block-from-chat-icon"></use>
                                            </svg>
                                        </li>
                                    </ul>

                                </div>


                            </li>

                            <li className="inline-items js-chat-open">


                                <div className="author-thumb">
                                    <img alt="author" src={user.avaUrl} className="avatar"/>
                                    <span className="icon-status disconected"></span>
                                </div>

                                <div className="author-status">
                                    <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                                       className="h6 author-name">{user.username} {user.verified}</a>
                                    <span className="status">OFFLINE</span>
                                </div>

                                <div className="more">
                                    <i class="material-icons">
                                        more_horiz
                                    </i>

                                    <ul className="more-icons">
                                        <li>
                                            <svg data-toggle="tooltip" data-placement="top"
                                                 data-original-title="START CONVERSATION"
                                                 className="olymp-comments-post-icon">
                                                <use xlinkHref="assets/img/./icons.svg#olymp-comments-post-icon"></use>
                                            </svg>
                                        </li>

                                        <li>
                                            <svg data-toggle="tooltip" data-placement="top"
                                                 data-original-title="ADD TO CONVERSATION"
                                                 className="olymp-add-to-conversation-icon">
                                                <use
                                                    xlinkHref="assets/img/./icons.svg#olymp-add-to-conversation-icon"></use>
                                            </svg>
                                        </li>

                                        <li>
                                            <svg data-toggle="tooltip" data-placement="top"
                                                 data-original-title="BLOCK FROM CHAT"
                                                 className="olymp-block-from-chat-icon">
                                                <use
                                                    xlinkHref="assets/img/./icons.svg#olymp-block-from-chat-icon"></use>
                                            </svg>
                                        </li>
                                    </ul>

                                </div>


                            </li>
                        </ul>


                        <div className="ui-block-title ui-block-title-small">
                            <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#" className="title">MY
                                FAMILY</a>
                            <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#">Settings</a>
                        </div>

                        <ul className="chat-users">
                            <li className="inline-items js-chat-open">

                                <div className="author-thumb">
                                    <img alt="author" src={user.avaUrl} className="avatar"/>
                                    <span className="icon-status online"></span>
                                </div>

                                <div className="author-status">
                                    <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                                       className="h6 author-name">{user.username} {user.verified}</a>
                                    <span className="status">ONLINE</span>
                                </div>

                                <div className="more">
                                    <i class="material-icons">
                                        more_horiz
                                    </i>

                                    <ul className="more-icons">
                                        <li>
                                            <svg data-toggle="tooltip" data-placement="top"
                                                 data-original-title="START CONVERSATION"
                                                 className="olymp-comments-post-icon">
                                                <use xlinkHref="assets/img/./icons.svg#olymp-comments-post-icon"></use>
                                            </svg>
                                        </li>

                                        <li>
                                            <svg data-toggle="tooltip" data-placement="top"
                                                 data-original-title="ADD TO CONVERSATION"
                                                 className="olymp-add-to-conversation-icon">
                                                <use
                                                    xlinkHref="assets/img/./icons.svg#olymp-add-to-conversation-icon"></use>
                                            </svg>
                                        </li>

                                        <li>
                                            <svg data-toggle="tooltip" data-placement="top"
                                                 data-original-title="BLOCK FROM CHAT"
                                                 className="olymp-block-from-chat-icon">
                                                <use
                                                    xlinkHref="assets/img/./icons.svg#olymp-block-from-chat-icon"></use>
                                            </svg>
                                        </li>
                                    </ul>

                                </div>
                            </li>
                        </ul>


                        <div className="ui-block-title ui-block-title-small">
                            <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                               className="title">UNCATEGORIZED</a>
                            <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#">Settings</a>
                        </div>

                        <ul className="chat-users">
                            <li className="inline-items js-chat-open">

                                <div className="author-thumb">
                                    <img alt="author" src={user.avaUrl} className="avatar"/>
                                    <span className="icon-status online"></span>
                                </div>

                                <div className="author-status">
                                    <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                                       className="h6 author-name">{user.username} {user.verified}</a>
                                    <span className="status">ONLINE</span>
                                </div>

                                <div className="more">
                                    <i class="material-icons">
                                        more_horiz
                                    </i>

                                    <ul className="more-icons">
                                        <li>
                                            <svg data-toggle="tooltip" data-placement="top"
                                                 data-original-title="START CONVERSATION"
                                                 className="olymp-comments-post-icon">
                                                <use xlinkHref="assets/img/./icons.svg#olymp-comments-post-icon"></use>
                                            </svg>
                                        </li>

                                        <li>
                                            <svg data-toggle="tooltip" data-placement="top"
                                                 data-original-title="ADD TO CONVERSATION"
                                                 className="olymp-add-to-conversation-icon">
                                                <use
                                                    xlinkHref="assets/img/./icons.svg#olymp-add-to-conversation-icon"></use>
                                            </svg>
                                        </li>

                                        <li>
                                            <svg data-toggle="tooltip" data-placement="top"
                                                 data-original-title="BLOCK FROM CHAT"
                                                 className="olymp-block-from-chat-icon">
                                                <use
                                                    xlinkHref="assets/img/./icons.svg#olymp-block-from-chat-icon"></use>
                                            </svg>
                                        </li>
                                    </ul>

                                </div>


                            </li>
                            <li className="inline-items js-chat-open">

                                <div className="author-thumb">
                                    <img alt="author" src={user.avaUrl} className="avatar"/>
                                    <span className="icon-status away"></span>
                                </div>

                                <div className="author-status">
                                    <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                                       className="h6 author-name">{user.username} {user.verified}</a>
                                    <span className="status">AWAY</span>
                                </div>

                                <div className="more">
                                    <i class="material-icons">
                                        more_horiz
                                    </i>

                                    <ul className="more-icons">
                                        <li>
                                            <svg data-toggle="tooltip" data-placement="top"
                                                 data-original-title="START CONVERSATION"
                                                 className="olymp-comments-post-icon">
                                                <use xlinkHref="assets/img/./icons.svg#olymp-comments-post-icon"></use>
                                            </svg>
                                        </li>

                                        <li>
                                            <svg data-toggle="tooltip" data-placement="top"
                                                 data-original-title="ADD TO CONVERSATION"
                                                 className="olymp-add-to-conversation-icon">
                                                <use
                                                    xlinkHref="assets/img/./icons.svg#olymp-add-to-conversation-icon"></use>
                                            </svg>
                                        </li>

                                        <li>
                                            <svg data-toggle="tooltip" data-placement="top"
                                                 data-original-title="BLOCK FROM CHAT"
                                                 className="olymp-block-from-chat-icon">
                                                <use
                                                    xlinkHref="assets/img/./icons.svg#olymp-block-from-chat-icon"></use>
                                            </svg>
                                        </li>
                                    </ul>

                                </div>

                            </li>
                            <li className="inline-items js-chat-open">

                                <div className="author-thumb">
                                    <img alt="author" src="{user.avaUrl}}" className="avatar"/>
                                    <span className="icon-status status-invisible"></span>
                                </div>

                                <div className="author-status">
                                    <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                                       className="h6 author-name">{user.username} {user.verified}</a>
                                    <span className="status">INVISIBLE</span>
                                </div>

                                <div className="more">
                                    <i class="material-icons">
                                        more_horiz
                                    </i>

                                    <ul className="more-icons">
                                        <li>
                                            <svg data-toggle="tooltip" data-placement="top"
                                                 data-original-title="START CONVERSATION"
                                                 className="olymp-comments-post-icon">
                                                <use xlinkHref="assets/img/./icons.svg#olymp-comments-post-icon"></use>
                                            </svg>
                                        </li>

                                        <li>
                                            <svg data-toggle="tooltip" data-placement="top"
                                                 data-original-title="ADD TO CONVERSATION"
                                                 className="olymp-add-to-conversation-icon">
                                                <use
                                                    xlinkHref="assets/img/./icons.svg#olymp-add-to-conversation-icon"></use>
                                            </svg>
                                        </li>

                                        <li>
                                            <svg data-toggle="tooltip" data-placement="top"
                                                 data-original-title="BLOCK FROM CHAT"
                                                 className="olymp-block-from-chat-icon">
                                                <use
                                                    xlinkHref="assets/img/./icons.svg#olymp-block-from-chat-icon"></use>
                                            </svg>
                                        </li>
                                    </ul>

                                </div>
                            </li>
                            <li className="inline-items js-chat-open">

                                <div className="author-thumb">
                                    <img alt="author" src={user.avaUrl} className="avatar"/>
                                    <span className="icon-status away"></span>
                                </div>

                                <div className="author-status">
                                    <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                                       className="h6 author-name">{user.username} {user.verified}</a>
                                    <span className="status">AWAY</span>
                                </div>

                                <div className="more">
                                    <i class="material-icons">
                                        more_horiz
                                    </i>

                                    <ul className="more-icons">
                                        <li>
                                            <svg data-toggle="tooltip" data-placement="top"
                                                 data-original-title="START CONVERSATION"
                                                 className="olymp-comments-post-icon">
                                                <use xlinkHref="assets/img/./icons.svg#olymp-comments-post-icon"></use>
                                            </svg>
                                        </li>

                                        <li>
                                            <svg data-toggle="tooltip" data-placement="top"
                                                 data-original-title="ADD TO CONVERSATION"
                                                 className="olymp-add-to-conversation-icon">
                                                <use
                                                    xlinkHref="assets/img/./icons.svg#olymp-add-to-conversation-icon"></use>
                                            </svg>
                                        </li>

                                        <li>
                                            <svg data-toggle="tooltip" data-placement="top"
                                                 data-original-title="BLOCK FROM CHAT"
                                                 className="olymp-block-from-chat-icon">
                                                <use
                                                    xlinkHref="assets/img/./icons.svg#olymp-block-from-chat-icon"></use>
                                            </svg>
                                        </li>
                                    </ul>

                                </div>
                            </li>
                            <li className="inline-items js-chat-open">

                                <div className="author-thumb">
                                    <img alt="author" src={user.avaUrl} className="avatar"/>
                                    <span className="icon-status online"></span>
                                </div>

                                <div className="author-status">
                                    <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                                       className="h6 author-name">{user.username} {user.verified}</a>
                                    <span className="status">ONLINE</span>
                                </div>

                                <div className="more">
                                    <i class="material-icons">
                                        more_horiz
                                    </i>

                                    <ul className="more-icons">
                                        <li>
                                            <svg data-toggle="tooltip" data-placement="top"
                                                 data-original-title="START CONVERSATION"
                                                 className="olymp-comments-post-icon">
                                                <use xlinkHref="assets/img/./icons.svg#olymp-comments-post-icon"></use>
                                            </svg>
                                        </li>

                                        <li>
                                            <svg data-toggle="tooltip" data-placement="top"
                                                 data-original-title="ADD TO CONVERSATION"
                                                 className="olymp-add-to-conversation-icon">
                                                <use
                                                    xlinkHref="assets/img/./icons.svg#olymp-add-to-conversation-icon"></use>
                                            </svg>
                                        </li>

                                        <li>
                                            <svg data-toggle="tooltip" data-placement="top"
                                                 data-original-title="BLOCK FROM CHAT"
                                                 className="olymp-block-from-chat-icon">
                                                <use
                                                    xlinkHref="assets/img/./icons.svg#olymp-block-from-chat-icon"></use>
                                            </svg>
                                        </li>
                                    </ul>

                                </div>
                            </li>
                        </ul>

                        <div className="ps__scrollbar-x-rail" style={{"left": "0px", "bottom": "0px"}}>
                            <div className="ps__scrollbar-x" tabIndex="0" style={{"left": "0px", "width": "0px"}}></div>
                        </div>
                        <div className="ps__scrollbar-y-rail" style={{"top": "0px", "right": "0px"}}>
                            <div className="ps__scrollbar-y" tabIndex="0" style={{"top": "0px", "height": "0px"}}></div>
                        </div>
                    </div>

                    <div className="search-friend inline-items">
                        <form className="form-group is-empty">
                            <input className="form-control" placeholder="Search Friends..." value="" type="text"/>
                            <span className="material-input"></span></form>

                        <a href="https://html.crumina.net/html-olympus/29-YourAccount-AccountSettings.html"
                           className="settings">
                            <i className="material-icons">
                                settings_applications
                            </i>
                        </a>

                        <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                           className="js-sidebar-open">
                            <svg className="olymp-close-icon">
                                <use xlinkHref="assets/img/./icons.svg#olymp-close-icon"></use>
                            </svg>
                        </a>
                    </div>

                    <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                       className="olympus-chat inline-items js-chat-open">

                        <h6 className="olympus-chat-title">CHAT</h6>
                        <svg className="olymp-chat---messages-icon">
                            <use xlinkHref="assets/img/./icons.svg#olymp-chat---messages-icon"></use>
                        </svg>
                    </a>
                </div>

            </div>


            <header className="header" id="site-header">

                <div className="page-title">
                    <h6>Notice Me</h6>
                </div>

                <div className="header-content-wrapper">
                    <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#" className="link-find-friend">Find
                        Friends</a>
                    <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#" className="link-find-friend">Find
                        Friends</a>

                    <form className="search-bar w-search notification-list friend-requests">

                        <div className="form-group with-button is-empty">
                            <button style={{"backgroundColor": "transparent"}}>
                                <svg className="olymp-magnifying-glass-icon">
                                    <use xlinkHref="assets/img/./icons.svg#olymp-magnifying-glass-icon"></use>
                                </svg>
                            </button>
                            <input className="form-control js-user-search selectized"
                                   placeholder="Search here people or pages..." type="text" tabIndex="-1"
                                   style={{"display": "none"}} value=""/>
                            <div className="selectize-control form-control js-user-search multi">
                                <div className="selectize-input items not-full has-options"><input type="text"
                                                                                                   autoComplete="off"
                                                                                                   tabIndex=""
                                                                                                   placeholder="Search here people or pages..."
                                                                                                   style={{"color": "#fff"}}/>
                                </div>
                                <div className="selectize-dropdown multi form-control js-user-search"
                                     style={{"display": "none", "width": "500px", "top": "66px", "left": "0px"}}>
                                    <div className="selectize-dropdown-content"></div>
                                </div>
                            </div>

                            <span className="material-input"></span></div>
                    </form>


                    <div className="control-block">


                        <div className="author-page author vcard inline-items more">
                            <div className="author-thumb" style={{"maxWidth": "40px", "overflow": "hidden"}}>
                                <img alt="author" src={userContext.currentUser.avaUrl} className="avatar"
                                     style={{"width": "100%"}}/>
                                <span className="icon-status online"></span>
                                <div className="more-dropdown more-with-triangle">
                                    <div className="mCustomScrollbar ps ps--theme_default" data-mcs-theme="dark"
                                         data-ps-id="da9ec53d-81e9-a000-abc3-343d8f0b5feb">
                                        <div className="ui-block-title ui-block-title-small">
                                            <h6 className="title">Your Account</h6>
                                        </div>

                                        <ul className="account-settings">
                                            <li>
                                                <Link to={`/${userContext.currentUser.username}`}>

                                                    <i className="material-icons">
                                                        settings_applications
                                                    </i>

                                                    <span>Profile</span>
                                                </Link>
                                            </li>

                                            <li>
                                                <a onClick={() => {
                                                    fetchLogOut();
                                                    userContext.handleLogOut();
                                                }} href={'#'}>
                                                    <svg className="olymp-logout-icon">
                                                        <use xlinkHref="assets/img/./icons.svg#olymp-logout-icon"></use>
                                                    </svg>

                                                    <span>Log Out</span>
                                                </a>
                                            </li>
                                        </ul>



                                        <div className="ps__scrollbar-x-rail" style={{"left": "0px", "bottom": "0px"}}>
                                            <div className="ps__scrollbar-x" tabIndex="0"
                                                 style={{"left": "0px", "width": "0px"}}></div>
                                        </div>
                                        <div className="ps__scrollbar-y-rail" style={{"top": "0px", "right": "0px"}}>
                                            <div className="ps__scrollbar-y" tabIndex="0"
                                                 style={{"top": "0px", "height": "0px"}}></div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html"
                               className="author-name fn">
                                <div className="author-title">
                                    {userContext.currentUser.username} {userContext.currentUser.verified}
                                    <svg className="olymp-dropdown-arrow-icon">
                                        <use xlinkHref="assets/img/./icons.svg#olymp-dropdown-arrow-icon"></use>
                                    </svg>
                                </div>
                                <span className="author-subtitle">{userContext.currentUser.handle}</span>

                            </a>
                        </div>


                    </div>
                </div>

            </header>


            <header className="header header-responsive" id="site-header-responsive">

                <div className="header-content-wrapper">
                    <ul className="nav nav-tabs mobile-app-tabs" role="tablist">
                        <li className="nav-item">
                            <a className="nav-link" data-toggle="tab"
                               href="https://html.crumina.net/html-olympus/02-ProfilePage.html#request" role="tab">
                                <div className="control-icon has-items">
                                    <svg className="olymp-happy-face-icon">
                                        <use xlinkHref="assets/img/./icons.svg#olymp-happy-face-icon"></use>
                                    </svg>
                                    <div className="label-avatar bg-blue">6</div>
                                </div>
                            </a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link" data-toggle="tab"
                               href="https://html.crumina.net/html-olympus/02-ProfilePage.html#chat" role="tab">
                                <div className="control-icon has-items">
                                    <svg className="olymp-chat---messages-icon">
                                        <use xlinkHref="assets/img/./icons.svg#olymp-chat---messages-icon"></use>
                                    </svg>
                                    <div className="label-avatar bg-purple">2</div>
                                </div>
                            </a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link" data-toggle="tab"
                               href="https://html.crumina.net/html-olympus/02-ProfilePage.html#notification" role="tab">
                                <div className="control-icon has-items">
                                    <svg className="olymp-thunder-icon">
                                        <use xlinkHref="assets/img/./icons.svg#olymp-thunder-icon"></use>
                                    </svg>
                                    <div className="label-avatar bg-primary">8</div>
                                </div>
                            </a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link" data-toggle="tab"
                               href="https://html.crumina.net/html-olympus/02-ProfilePage.html#search" role="tab">
                                <svg className="olymp-magnifying-glass-icon">
                                    <use xlinkHref="assets/img/./icons.svg#olymp-magnifying-glass-icon"></use>
                                </svg>
                                <svg className="olymp-close-icon">
                                    <use xlinkHref="assets/img/./icons.svg#olymp-close-icon"></use>
                                </svg>
                            </a>
                        </li>
                    </ul>
                </div>


                <div className="tab-content tab-content-responsive">

                    <div className="tab-pane " id="request" role="tabpanel">

                        <div className="mCustomScrollbar ps ps--theme_default" data-mcs-theme="dark"
                             data-ps-id="96e14b06-6b49-ed10-64b8-48a43af7d2be">
                            <div className="ui-block-title ui-block-title-small">
                                <h6 className="title">FRIEND REQUESTS</h6>
                                <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#">Find Friends</a>
                                <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#">Settings</a>
                            </div>


                            <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                               className="view-all bg-purple">View All Messages</a>
                            <div className="ps__scrollbar-x-rail" style={{"left": "0px", "bottom": "0px"}}>
                                <div className="ps__scrollbar-x" tabIndex="0"
                                     style={{"left": "0px", "width": "0px"}}></div>
                            </div>
                            <div className="ps__scrollbar-y-rail" style={{"top": "0px", "right": "0px"}}>
                                <div className="ps__scrollbar-y" tabIndex="0"
                                     style={{"top": "0px", "height": "0px"}}></div>
                            </div>
                        </div>

                    </div>


                    <div className="tab-pane " id="search" role="tabpanel">


                        <form className="search-bar w-search notification-list friend-requests">
                            <div className="form-group with-button is-empty">
                                <input className="form-control js-user-search selectized"
                                       placeholder="Search here people or pages..." type="text" tabIndex="-1"
                                       style={{"display": "none"}} value=""/>
                                <div className="selectize-control form-control js-user-search multi">
                                    <div className="selectize-input items not-full has-options"><input type="text"
                                                                                                       autoComplete="off"
                                                                                                       tabIndex=""
                                                                                                       placeholder="Search here people or pages..."
                                                                                                       style={{"width": "229.969px;"}}/>
                                    </div>
                                    <div className="selectize-dropdown multi form-control js-user-search"
                                         style={{"display": "none", "width": "0px", "top": "70px", "left": "0px"}}>
                                        <div className="selectize-dropdown-content"></div>
                                    </div>
                                </div>
                                <span className="material-input"></span></div>
                        </form>


                    </div>

                </div>
                {/* ... end  Tab panes */}

            </header>


            <div className="header-spacer"></div>


            <div className="container">
                <div className="row">
                    <div className="col col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <div className="ui-block">
                            <div className="top-header">
                                <div className="top-header-thumb">
                                    <img style={{height: "300px"}}
                                         src={'https://res.cloudinary.com/dv0smnf2u/image/upload/v1576470477/safe/header-midnightBlue_iwmokh.jpg'}
                                         alt="nature"/>
                                </div>
                                <div className="profile-section">
                                    <div className="row">
                                        <div className="col col-lg-5 col-md-5 col-sm-12 col-12">
                                            <ul className="profile-menu">
                                                <li>
                                                    <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html"
                                                       className="active">Timeline</a>
                                                </li>
                                                {user.id !== userContext.currentUser.id &&
                                                <li>

                                                    {following ?
                                                        <button className="btn btn-link btn-block text-capitalize"
                                                                type="button" style={{
                                                            "width": "87px",
                                                            "height": "26px",
                                                            "padding": "0px",
                                                            "marginRight": "0",
                                                            "marginBottom": "0px",
                                                            "marginLeft": "0",
                                                            "fontSize": "14px",
                                                            "color": "#3d5fbf",
                                                            "border": "1px solid #3d5fbf"
                                                        }}
                                                                onClick={() => {
                                                                    update_following(user.id);
                                                                }}>Unfollow
                                                        </button> :
                                                        <button className="btn btn-link btn-block text-capitalize"
                                                                type="button" style={{
                                                            "width": "87px",
                                                            "height": "26px",
                                                            "padding": "0px",
                                                            "marginRight": "0",
                                                            "marginBottom": "0px",
                                                            "marginLeft": "0",
                                                            "fontSize": "14px",
                                                            "color": "#3d5fbf",
                                                            "border": "1px solid #3d5fbf"
                                                        }}
                                                                onClick={() => {
                                                                    update_following(user.id);
                                                                }}>Follow
                                                        </button>}


                                                </li>}

                                            </ul>
                                        </div>
                                        <div className="col col-lg-5 ml-auto col-md-5 col-sm-12 col-12">
                                            <ul className="profile-menu">
                                                <li>
                                                    <div className="more">
                                                        <svg className="olymp-three-dots-icon">
                                                            <use
                                                                xlinkHref="assets/img/./icons.svg#olymp-three-dots-icon"></use>
                                                        </svg>
                                                        <ul className="more-dropdown more-with-triangle">
                                                            <li>
                                                                <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#">Report
                                                                    Profile</a>
                                                            </li>
                                                            <li>
                                                                <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#">Block
                                                                    Profile</a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="control-block-button">


                                        <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                                           className="btn btn-control bg-purple">
                                            <i className="material-icons" style={{color: "#fff"}}> mail </i>
                                        </a>

                                        <div className="btn btn-control  more" style={{"backgroundColor": "#3d5fbf"}}>

                                            <i style={{"color": "#fff"}} className="material-icons">
                                                settings_applications
                                            </i>

                                            <ul className="more-dropdown more-with-triangle triangle-bottom-right">
                                                <li>
                                                    <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                                                       data-toggle="modal" data-target="#update-header-photo">Update
                                                        Profile Photo</a>
                                                </li>
                                                <li>
                                                    <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                                                       data-toggle="modal" data-target="#update-header-photo">Update
                                                        Header Photo</a>
                                                </li>
                                                <li>
                                                    <a href="https://html.crumina.net/html-olympus/29-YourAccount-AccountSettings.html">Account
                                                        Settings</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="top-header-author">
                                    <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html"
                                       className="author-thumb">
                                        <img src={user.avaUrl} alt="author" style={{"width": "100%"}}/>
                                    </a>
                                    <div className="author-content">
                                        <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html"
                                           className="h4 author-name">{user.username} {user.verified}</a>
                                        <div
                                            className="country">Following: {followed_count} &nbsp; Followers: {followers_count}</div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ... end Top Header-Profile */}
            <div className="container">
                <div className="row">

                    {/* Main Content */}

                    <div className="col col-xl-6 order-xl-2 col-lg-12 order-lg-1 col-md-12 col-sm-12 col-12">
                        <div id="newsfeed-items-grid" style={{"position": "relative", "marginTop": "-30px"}}>


                            {user.id &&
                            <UserPosts userId={user.id} history={props.history}/>
                            }


                        </div>

                        <a id="load-more-button" href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                           className="btn btn-control btn-more hidden-xs-up" data-load-link="items-to-load.html"
                           data-container="newsfeed-items-grid">
                            <i class="material-icons">
                                more_horiz
                            </i>
                            <div className="ripple-container"></div>
                        </a>
                    </div>

                    {/* ... end Main Content */}


                    {/* Left Sidebar */}

                    <div className="col col-xl-3 order-xl-1 col-lg-6 order-lg-2 col-md-6 col-sm-6 col-12">

                        <div className="ui-block">
                            <div className="ui-block-title">
                                <h6 className="title">Profile Intro</h6>
                            </div>
                            <div className="ui-block-content">

                                {/* W-Personal-Info */}

                                <ul className="widget w-personal-info item-block">
                                    <li>
                                        <span className="title" style={{"color": "#3d5fbf"}}>About Me:</span>
                                        <span className="text">{user.aboutMe}</span>
                                    </li>
                                    <li>
                                        <span className="title" style={{"color": "#3d5fbf"}}>Favourite TV Shows:</span>
                                        <span className="text">Breaking Good, RedDevil, People of Interest, The Running Dead, Found,  American Guy.</span>
                                    </li>
                                    <li>
                                        <span className="title" style={{"color": "#3d5fbf"}}>Favourite Music Bands / Artists:</span>
                                        <span className="text">Iron Maid, DC/AC, Megablow, The Ill, Kung Fighters, System of a Revenge.</span>
                                    </li>
                                </ul>

                                {/* .. end W-Personal-Info */}
                                {/* W-Socials */}

                                <div className="widget w-socials">
                                    <h6 className="title">Other Social Networks:</h6>
                                    <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                                       className="social-item bg-facebook">
                                        <svg className="svg-inline--fa fa-facebook-f fa-w-9" aria-hidden="true"
                                             data-prefix="fab" data-icon="facebook-f" role="img"
                                             xmlns="http://www.w3.org/2000/svg" viewBox="0 0 264 512" data-fa-i2svg=""
                                             style={{height: "30px", marginTop: "3px"}}>
                                            <path fill="currentColor"
                                                  d="M76.7 512V283H0v-91h76.7v-71.7C76.7 42.4 124.3 0 193.8 0c33.3 0 61.9 2.5 70.2 3.6V85h-48.2c-37.8 0-45.1 18-45.1 44.3V192H256l-11.7 91h-73.6v229"></path>
                                        </svg>
                                        {/* <i class="fab fa-facebook-f" aria-hidden="true"></i> */}

                                    </a>
                                    <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                                       className="social-item bg-twitter">
                                        <svg className="svg-inline--fa fa-twitter fa-w-16" aria-hidden="true"
                                             data-prefix="fab" data-icon="twitter" role="img"
                                             xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""
                                             style={{height: "30px", marginTop: "3px"}}>
                                            <path fill="currentColor"
                                                  d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"></path>
                                        </svg>
                                        {/* <i class="fab fa-twitter" aria-hidden="true"></i> */}

                                    </a>

                                </div>


                                {/* ... end W-Socials */}
                            </div>
                        </div>


                        {/* .. end W-Playlist */}


                        <div className="ui-block">
                            <div className="ui-block-title">
                                <h6 className="title">Twitter Feed</h6>
                            </div>

                            {/* W-Twitter */}

                            <ul className="widget w-twitter">
                                <li className="twitter-item">
                                    <div className="author-folder">
                                        <img src={user.avaUrl} style={{width: "30px"}} alt="avatar"/>
                                        <div className="author">
                                            <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                                               className="author-name">{user.username}</a>
                                            <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                                               className="group">{user.handle}</a>
                                        </div>
                                    </div>
                                    <p>Tomorrow with the agency we will run 5 km for charity. Come and give us your
                                        support!
                                        <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                                           className="link-post">#Daydream5K</a></p>
                                    <span className="post__date">
<time className="published" dateTime="2017-03-24T18:18">
2 hours ago
</time>
</span>
                                </li>
                                <li className="twitter-item">
                                    <div className="author-folder">
                                        <img src={user.avaUrl} style={{width: "30px"}} alt="avatar"/>
                                        <div className="author">
                                            <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                                               className="author-name">{user.username}</a>
                                            <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                                               className="group">{user.handle}</a>
                                        </div>
                                    </div>
                                    <p>Check out the new website of “The Bebop Bar”! <a
                                        href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                                        className="link-post">bytle/thbp53f</a></p>
                                    <span className="post__date">
<time className="published" dateTime="2017-03-24T18:18">
16 hours ago
</time>
</span>
                                </li>
                                <li className="twitter-item">
                                    <div className="author-folder">
                                        <img src={user.avaUrl} style={{width: "30px"}} alt="avatar"/>
                                        <div className="author">
                                            <a href="#"
                                               className="author-name">{user.username}</a>
                                            <a href="#"
                                               className="group">{user.handle}</a>
                                        </div>
                                    </div>
                                    <p>The Sunday is the annual agency camping trip and I still haven’t got a tent
                                        <a href="#"
                                           className="link-post">#TheWild #Indoors</a></p>
                                    <span className="post__date">
<time className="published" dateTime="2017-03-24T18:18">
Yesterday
</time>
</span>
                                </li>
                            </ul>


                            {/* .. end W-Twitter */}
                        </div>

                    </div>

                    {/* ... end Left Sidebar */}


                    {/* Right Sidebar */}

                    <div className="col col-xl-3 order-xl-3 col-lg-6 order-lg-3 col-md-6 col-sm-6 col-12">


                        {/* .. end W-Friend-Pages-Added */}

                        <div className="ui-block">
                            <div className="ui-block-title">
                                <h6 className="title">My Spotify Playlist</h6>
                            </div>

                            {/* W-Playlist */}

                            <ol className="widget w-playlist">
                                <li className="js-open-popup" data-popup-target=".playlist-popup">
                                    <div className="playlist-thumb">
                                        <img
                                            src="https://res.cloudinary.com/dv0smnf2u/image/upload/v1576474642/safe/playlist6_lmlvyo.jpg"
                                            alt="thumb-composition"/>
                                        <div className="overlay"></div>
                                        <a href="#"
                                           className="play-icon">
                                            <svg className="olymp-music-play-icon-big">
                                                <use
                                                    xlinkHref="assets/img/./icons-music.svg#olymp-music-play-icon-big"></use>
                                            </svg>
                                        </a>
                                    </div>

                                    <div className="composition">
                                        <a href="#"
                                           className="composition-name">The Past Starts Slow...</a>
                                        <a href="#"
                                           className="composition-author">System of a Revenge</a>
                                    </div>

                                    <div className="composition-time">
                                        <time className="published" dateTime="2017-03-24T18:18">3:22</time>
                                        <div className="more">
                                            <i class="material-icons">
                                                more_horiz
                                            </i>
                                            <ul className="more-dropdown">
                                                <li>
                                                    <a href="#">Add
                                                        Song to Player</a>
                                                </li>
                                                <li>
                                                    <a href="#">Add
                                                        Playlist to Player</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>

                                </li>

                                <li className="js-open-popup" data-popup-target=".playlist-popup">
                                    <div className="playlist-thumb">
                                        <img
                                            src="https://res.cloudinary.com/dv0smnf2u/image/upload/v1576474642/safe/playlist6_lmlvyo.jpg"
                                            alt="thumb-composition"/>
                                        <div className="overlay"></div>
                                        <a href="#"
                                           className="play-icon">
                                            <svg className="olymp-music-play-icon-big">
                                                <use
                                                    xlinkHref="assets/img/./icons-music.svg#olymp-music-play-icon-big"></use>
                                            </svg>
                                        </a>
                                    </div>

                                    <div className="composition">
                                        <a href="#"
                                           className="composition-name">The Pretender</a>
                                        <a href="#"
                                           className="composition-author">Kung Fighters</a>
                                    </div>

                                    <div className="composition-time">
                                        <time className="published" dateTime="2017-03-24T18:18">5:48</time>
                                        <div className="more">
                                            <i class="material-icons">
                                                more_horiz
                                            </i>
                                            <ul className="more-dropdown">
                                                <li>
                                                    <a href="#">Add
                                                        Song to Player</a>
                                                </li>
                                                <li>
                                                    <a href="#">Add
                                                        Playlist to Player</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>

                                </li>
                                <li className="js-open-popup" data-popup-target=".playlist-popup">
                                    <div className="playlist-thumb">
                                        <img
                                            src="https://res.cloudinary.com/dv0smnf2u/image/upload/v1576474642/safe/playlist6_lmlvyo.jpg"
                                            alt="thumb-composition"/>
                                        <div className="overlay"></div>
                                        <a href="#"
                                           className="play-icon">
                                            <svg className="olymp-music-play-icon-big">
                                                <use
                                                    xlinkHref="assets/img/./icons-music.svg#olymp-music-play-icon-big"></use>
                                            </svg>
                                        </a>
                                    </div>

                                    <div className="composition">
                                        <a href="#"
                                           className="composition-name">Blood Brothers</a>
                                        <a href="#"
                                           className="composition-author">Iron Maid</a>
                                    </div>

                                    <div className="composition-time">
                                        <time className="published" dateTime="2017-03-24T18:18">3:06</time>
                                        <div className="more">
                                            <i class="material-icons">
                                                more_horiz
                                            </i>
                                            <ul className="more-dropdown">
                                                <li>
                                                    <a href="#">Add
                                                        Song to Player</a>
                                                </li>
                                                <li>
                                                    <a href="#">Add
                                                        Playlist to Player</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>

                                </li>
                                <li className="js-open-popup" data-popup-target=".playlist-popup">
                                    <div className="playlist-thumb">
                                        <img
                                            src="https://res.cloudinary.com/dv0smnf2u/image/upload/v1576474642/safe/playlist6_lmlvyo.jpg"
                                            alt="thumb-composition"/>
                                        <div className="overlay"></div>
                                        <a href="#"
                                           className="play-icon">
                                            <svg className="olymp-music-play-icon-big">
                                                <use
                                                    xlinkHref="assets/img/./icons-music.svg#olymp-music-play-icon-big"></use>
                                            </svg>
                                        </a>
                                    </div>

                                    <div className="composition">
                                        <a href="#"
                                           className="composition-name">Seven Nation Army</a>
                                        <a href="#"
                                           className="composition-author">The Black Stripes</a>
                                    </div>

                                    <div className="composition-time">
                                        <time className="published" dateTime="2017-03-24T18:18">6:17</time>
                                        <div className="more">
                                            <i class="material-icons">
                                                more_horiz
                                            </i>
                                            <ul className="more-dropdown">
                                                <li>
                                                    <a href="#">Add
                                                        Song to Player</a>
                                                </li>
                                                <li>
                                                    <a href="#">Add
                                                        Playlist to Player</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>

                                </li>
                                <li className="js-open-popup" data-popup-target=".playlist-popup">
                                    <div className="playlist-thumb">
                                        <img
                                            src="https://res.cloudinary.com/dv0smnf2u/image/upload/v1576474642/safe/playlist6_lmlvyo.jpg"
                                            alt="thumb-composition"/>
                                        <div className="overlay"></div>
                                        <a href="#"
                                           className="play-icon">
                                            <svg className="olymp-music-play-icon-big">
                                                <use
                                                    xlinkHref="assets/img/./icons-music.svg#olymp-music-play-icon-big"></use>
                                            </svg>
                                        </a>
                                    </div>

                                    <div className="composition">
                                        <a href="#"
                                           className="composition-name">Killer Queen</a>
                                        <a href="#"
                                           className="composition-author">Archiduke</a>
                                    </div>

                                    <div className="composition-time">
                                        <time className="published" dateTime="2017-03-24T18:18">5:40</time>
                                        <div className="more">
                                            <i class="material-icons">
                                                more_horiz
                                            </i>
                                            <ul className="more-dropdown">
                                                <li>
                                                    <a href="#">Add
                                                        Song to Player</a>
                                                </li>
                                                <li>
                                                    <a href="#">Add
                                                        Playlist to Player</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>

                                </li>
                            </ol>


                        </div>

                        {/* ... end Right Sidebar */}

                    </div>
                </div>

                {/* Window-popup Update Header Photo */}

                <div className="modal fade" id="update-header-photo" tabIndex="-1" role="dialog"
                     aria-labelledby="update-header-photo" aria-hidden="true">
                    <div className="modal-dialog window-popup update-header-photo" role="document">
                        <div className="modal-content">
                            <a href="#"
                               className="close icon-close" data-dismiss="modal" aria-label="Close">
                                <svg className="olymp-close-icon">
                                    <use xlinkHref="assets/img/./icons.svg#olymp-close-icon"></use>
                                </svg>
                            </a>

                            <div className="modal-header" style={{"backgroundColor": "#3d5fbf"}}>
                                <h6 className="title">Update Header Photo</h6>
                            </div>

                            <div className="modal-body">
                                <a href="#"
                                   className="upload-photo-item">
                                    <svg className="olymp-computer-icon">
                                        <use xlinkHref="assets/img/./icons.svg#olymp-computer-icon"></use>
                                    </svg>

                                    <h6>Upload Photo</h6>
                                    <span>Browse your computer.</span>
                                </a>

                                <a href="#"
                                   className="upload-photo-item" data-toggle="modal"
                                   data-target="#choose-from-my-photo">

                                    <svg className="olymp-photos-icon">
                                        <use xlinkHref="assets/img/./icons.svg#olymp-photos-icon"></use>
                                    </svg>

                                    <h6>Choose from My Photos</h6>
                                    <span>Choose from your uploaded photos</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>


                {/* ... end Window-popup Update Header Photo */}

                {/* Window-popup Choose from my Photo */}

                <div className="modal fade" id="choose-from-my-photo" tabIndex="-1" role="dialog"
                     aria-labelledby="choose-from-my-photo" aria-hidden="true">
                    <div className="modal-dialog window-popup choose-from-my-photo" role="document">

                        <div className="modal-content">
                            <a href="#"
                               className="close icon-close" data-dismiss="modal" aria-label="Close">
                                <svg className="olymp-close-icon">
                                    <use xlinkHref="assets/img/./icons.svg#olymp-close-icon"></use>
                                </svg>
                            </a>
                            <div className="modal-header">
                                <h6 className="title">Choose from My Photos</h6>

                                {/* Nav tabs */}
                                <ul className="nav nav-tabs" role="tablist">
                                    <li className="nav-item">
                                        <a className="nav-link active" data-toggle="tab"
                                           href="#"
                                           role="tab" aria-expanded="true">
                                            <svg className="olymp-photos-icon">
                                                <use xlinkHref="assets/img/./icons.svg#olymp-photos-icon"></use>
                                            </svg>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" data-toggle="tab"
                                           href="#"
                                           role="tab" aria-expanded="false">
                                            <svg className="olymp-albums-icon">
                                                <use xlinkHref="assets/img/./icons.svg#olymp-albums-icon"></use>
                                            </svg>
                                        </a>
                                    </li>
                                </ul>
                            </div>

                            <div className="modal-body">
                                {/* Tab panes */}
                                <div className="tab-content">
                                    <div className="tab-pane active" id="home" role="tabpanel" aria-expanded="true">

                                        {/*                        <div class="choose-photo-item" data-mh="choose-item" style="height: 175.984px;">
<div class="radio">
<label class="custom-radio">
<img src="assets/img/./choose-photo1.jpg" alt="photo">
<input type="radio" name="optionsRadios"><span class="circle"></span><span class="check"></span>
</label>
</div>
</div>
<div class="choose-photo-item" data-mh="choose-item" style="height: 175.984px;">
<div class="radio">
<label class="custom-radio">
<img src="assets/img/./choose-photo2.jpg" alt="photo">
<input type="radio" name="optionsRadios"><span class="circle"></span><span class="check"></span>
</label>
</div>
</div>
<div class="choose-photo-item" data-mh="choose-item" style="height: 175.984px;">
<div class="radio">
<label class="custom-radio">
<img src="assets/img/./choose-photo3.jpg" alt="photo">
<input type="radio" name="optionsRadios"><span class="circle"></span><span class="check"></span>
</label>
</div>
</div>

<div class="choose-photo-item" data-mh="choose-item" style="height: 175.984px;">
<div class="radio">
<label class="custom-radio">
<img src="assets/img/./choose-photo4.jpg" alt="photo">
<input type="radio" name="optionsRadios"><span class="circle"></span><span class="check"></span>
</label>
</div>
</div>
<div class="choose-photo-item" data-mh="choose-item" style="height: 175.984px;">
<div class="radio">
<label class="custom-radio">
<img src="assets/img/./choose-photo5.jpg" alt="photo">
<input type="radio" name="optionsRadios"><span class="circle"></span><span class="check"></span>
</label>
</div>
</div>
<div class="choose-photo-item" data-mh="choose-item" style="height: 175.984px;">
<div class="radio">
<label class="custom-radio">
<img src="assets/img/./choose-photo6.jpg" alt="photo">
<input type="radio" name="optionsRadios"><span class="circle"></span><span class="check"></span>
</label>
</div>
</div>

<div class="choose-photo-item" data-mh="choose-item" style="height: 175.984px;">
<div class="radio">
<label class="custom-radio">
<img src="assets/img/./choose-photo7.jpg" alt="photo">
<input type="radio" name="optionsRadios"><span class="circle"></span><span class="check"></span>
</label>
</div>
</div>
<div class="choose-photo-item" data-mh="choose-item" style="height: 175.984px;">
<div class="radio">
<label class="custom-radio">
<img src="assets/img/./choose-photo8.jpg" alt="photo">
<input type="radio" name="optionsRadios"><span class="circle"></span><span class="check"></span>
</label>
</div>
</div>
<div class="choose-photo-item" data-mh="choose-item" style="height: 175.984px;">
<div class="radio">
<label class="custom-radio">
<img src="assets/img/./choose-photo9.jpg" alt="photo">
<input type="radio" name="optionsRadios"><span class="circle"></span><span class="check"></span>
</label>
</div>
</div> */}


                                        <a href="#"
                                           className="btn btn-secondary btn-lg btn--half-width">Cancel</a>
                                        <a href="#"
                                           className="btn btn-primary btn-lg btn--half-width">Confirm Photo</a>

                                    </div>


                                    <a href="#"
                                       className="btn btn-secondary btn-lg btn--half-width">Cancel</a>
                                    <a href="#"
                                       className="btn btn-primary btn-lg disabled btn--half-width">Confirm Photo</a>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* ... end Window-popup Choose from my Photo */}


            <a className="back-to-top" id="backttop" href="#">
                <i className="material-icons" style={{
                    marginTop: "25%",

                    marginLeft: "25%", color: "#fff"
                }}>
                    arrow_upward
                </i>
            </a>


            {/* Window-popup-CHAT for responsive min-width: 768px */}

            <div className="ui-block popup-chat popup-chat-responsive" tabIndex="-1" role="dialog"
                 aria-labelledby="popup-chat-responsive" aria-hidden="true">

                <div className="modal-content">
                    <div className="modal-header">
                        <span className="icon-status online"></span>
                        <h6 className="title">Chat</h6>
                        <div className="more">
                            <i class="material-icons">
                                more_horiz
                            </i>
                            <svg className="olymp-little-delete js-chat-open">
                                <use xlinkHref="assets/img/./icons.svg#olymp-little-delete"></use>
                            </svg>
                        </div>
                    </div>
                    <div className="modal-body">
                        <div className="mCustomScrollbar ps ps--theme_default ps--active-y"
                             data-ps-id="fafb82c6-4cd5-6b4c-2723-7f72413aa868">
                            <ul className="notification-list chat-message chat-message-field">
                                <li>
                                    <div className="author-thumb">
                                        <img src="assets/img/./avatar14-sm.jpg" alt="author"
                                             className="mCS_img_loaded"/>
                                    </div>
                                    <div className="notification-event">
                                        <span className="chat-message-item">Hi James! Please remember to buy the food for tomorrow! I’m gonna be handling the gifts and Jake’s gonna get the drinks</span>
                                        <span className="notification-date"><time className="entry-date updated"
                                                                                  dateTime="2004-07-24T18:18">Yesterday at 8:10pm</time></span>
                                    </div>
                                </li>

                                <li>
                                    <div className="author-thumb">
                                        <img src="assets/img/./author-page.jpg" alt="author"
                                             className="mCS_img_loaded"/>
                                    </div>
                                    <div className="notification-event">
                                        <span className="chat-message-item">Don’t worry Mathilda!</span>
                                        <span className="chat-message-item">I already bought everything</span>
                                        <span className="notification-date"><time className="entry-date updated"
                                                                                  dateTime="2004-07-24T18:18">Yesterday at 8:29pm</time></span>
                                    </div>
                                </li>

                                <li>
                                    <div className="author-thumb">
                                        <img src="assets/img/./avatar14-sm.jpg" alt="author"
                                             className="mCS_img_loaded"/>
                                    </div>
                                    <div className="notification-event">
                                        <span className="chat-message-item">Hi James! Please remember to buy the food for tomorrow! I’m gonna be handling the gifts and Jake’s gonna get the drinks</span>
                                        <span className="notification-date"><time className="entry-date updated"
                                                                                  dateTime="2004-07-24T18:18">Yesterday at 8:10pm</time></span>
                                    </div>
                                </li>
                            </ul>
                            <div className="ps__scrollbar-x-rail" style={{"left": "0px", "bottom": "-289px"}}>
                                <div className="ps__scrollbar-x" tabIndex="0"
                                     style={{"left": "0px", "width": "0px"}}></div>
                            </div>
                            <div className="ps__scrollbar-y-rail"
                                 style={{"top": "289px", "height": "150px", "right": "0px"}}>
                                <div className="ps__scrollbar-y" tabIndex="0"
                                     style={{"top": "99px", "height": "51px"}}></div>
                            </div>
                        </div>

                        <form className="need-validation">

                            <div className="form-group label-floating is-empty">
                                <label className="control-label">Press enter to post...</label>
                                <textarea className="form-control" placeholder=""></textarea>
                                <div className="add-options-message">
                                    <a href="#" className="options-message">


                                        <svg className="olymp-computer-icon">
                                            <use xlinkHref="assets/img/./icons.svg#olymp-computer-icon"></use>
                                        </svg>
                                    </a>
                                    <div className="options-message smile-block">

                                        <svg className="olymp-happy-sticker-icon">
                                            <use xlinkHref="assets/img/./icons.svg#olymp-happy-sticker-icon"></use>
                                        </svg>

                                        <ul className="more-dropdown more-with-triangle triangle-bottom-right">
                                            <li>
                                                <a href="#">
                                                    <img src="assets/img/./icon-chat1.png" alt="icon"/>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <img src="assets/img/./icon-chat2.png" alt="icon"/>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <img src="assets/img/./icon-chat3.png" alt="icon"/>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <img src="assets/img/./icon-chat4.png" alt="icon"/>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <img src="assets/img/./icon-chat5.png" alt="icon"/>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <img src="assets/img/./icon-chat6.png" alt="icon"/>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <img src="assets/img/./icon-chat7.png" alt="icon"/>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <img src="assets/img/./icon-chat8.png" alt="icon"/>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <img src="assets/img/./icon-chat9.png" alt="icon"/>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#">
                                                    <img src="assets/img/./icon-chat10.png" alt="icon"/>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#">
                                                    <img src="assets/img/./icon-chat11.png" alt="icon"/>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#">
                                                    <img src="assets/img/./icon-chat12.png" alt="icon"/>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#">
                                                    <img src="assets/img/./icon-chat13.png" alt="icon"/>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#">
                                                    <img src="assets/img/./icon-chat14.png" alt="icon"/>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#">
                                                    <img src="assets/img/./icon-chat15.png" alt="icon"/>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#">
                                                    <img src="assets/img/./icon-chat16.png" alt="icon"/>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#">
                                                    <img src="assets/img/./icon-chat17.png" alt="icon"/>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#">
                                                    <img src="assets/img/./icon-chat18.png" alt="icon"/>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#">
                                                    <img src="assets/img/./icon-chat19.png" alt="icon"/>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#">
                                                    <img src="assets/img/./icon-chat20.png" alt="icon"/>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#">
                                                    <img src="assets/img/./icon-chat21.png" alt="icon"/>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#">
                                                    <img src="assets/img/./icon-chat22.png" alt="icon"/>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#">
                                                    <img src="assets/img/./icon-chat23.png" alt="icon"/>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#">
                                                    <img src="assets/img/./icon-chat24.png" alt="icon"/>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#">
                                                    <img src="assets/img/./icon-chat25.png" alt="icon"/>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#">
                                                    <img src="assets/img/./icon-chat26.png" alt="icon"/>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#">
                                                    <img src="assets/img/./icon-chat27.png" alt="icon"/>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <span className="material-input"></span></div>

                        </form>
                    </div>
                </div>

            </div>
        </React.Fragment>
    );

}

let fetchLogOut = () => {


    localStorage.removeItem('currentUser');
    sessionStorage.removeItem('currentUser');
    console.log('All must be deleted');
    return ({message: 'Logout successful'});

};

export default function User(props) {

    let slug = useParams();
    let username_from_path = slug.username;
    console.log('render key (functional):');
    return (
        <UserPage {...props} key={username_from_path}/>
    )
}
