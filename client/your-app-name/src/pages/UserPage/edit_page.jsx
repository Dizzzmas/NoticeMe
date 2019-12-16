import React, {useContext, useState} from "react";
import {Alert, Button, Modal} from "react-bootstrap";
import * as Yup from "yup";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {AuthContext} from "../../services/auth";
import {useParams} from "react-router";


export default function EditPage(props) {
    let slug = useParams();
    let username_from_path = slug.username;
    const userContext = useContext(AuthContext);
    const jwt = userContext.getJwt();


    const CreateEditSchema = Yup.object().shape({
        username: Yup.string()
            .required("Cannot create empty post"),
        email: Yup.string()
            .email("Invalid email address format")
            .required("Email is required"),
        about_me: Yup.string()
    });

    let loadUser = async () => {
        try {
            let r = await fetch(`/api/v1/users/getByUsername/${userContext.currentUser.username}`, {
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


        } catch (error) {
            console.error(error);
            console.log('Loading user\'s page failed')
        }

    };

    return (
        <div>
            {/* Fixed Sidebar Left */}

            <div className="fixed-sidebar open">
                <div className="fixed-sidebar-left sidebar--small" id="sidebar-left"
                     style={{"WebkitTransform": "translateX(0%)", "transform": "translateX(0%)"}}>

                    <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html" className="logo">
                        <div className="img-wrap">
                            <img src="assets/img/./logo.png" alt=""/>
                        </div>
                    </a>

                    <div className="mCustomScrollbar ps ps--theme_default ps--active-x" data-mcs-theme="dark"
                         data-ps-id="ec16cdd5-39b8-7f34-c5fe-226c4a5a2537">
                        <ul className="left-menu">
                            <li>
                                <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                                   className="js-sidebar-open active">
                                    <svg className="olymp-menu-icon left-menu-icon" data-toggle="tooltip"
                                         data-placement="right" data-original-title="OPEN MENU"
                                         aria-describedby="tooltip404315">
                                        <use xlinkHref="http://www.w3.org/1999/xlink"
                                             xlinkHref="assets/img/./icons.svg#olymp-menu-icon"></use>
                                    </svg>
                                </a>
                            </li>
                            <li>
                                <a href="https://html.crumina.net/html-olympus/03-Newsfeed.html">
                                    <svg className="olymp-newsfeed-icon left-menu-icon" data-toggle="tooltip"
                                         data-placement="right" data-original-title="NEWSFEED">
                                        <use xlinkHref="http://www.w3.org/1999/xlink"
                                             xlinkHref="assets/img/./icons.svg#olymp-newsfeed-icon"></use>
                                    </svg>
                                </a>
                            </li>
                            <li>
                                <a href="https://html.crumina.net/html-olympus/16-FavPagesFeed.html">
                                    <svg className="olymp-star-icon left-menu-icon" data-toggle="tooltip"
                                         data-placement="right" data-original-title="FAV PAGE">
                                        <use xlinkHref="http://www.w3.org/1999/xlink"
                                             xlinkHref="assets/img/./icons.svg#olymp-star-icon"></use>
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


            </div>

            {/* ... end Fixed Sidebar Left */}


            {/* Fixed Sidebar Left */}

            <div className="fixed-sidebar fixed-sidebar-responsive">

                <div className="fixed-sidebar-left sidebar--small" id="sidebar-left-responsive">
                    <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                       className="logo js-sidebar-open">
                        <img src="assets/img/./logo.png" alt="Olympus"/>
                    </a>

                </div>

                <div className="fixed-sidebar-left sidebar--large" id="sidebar-left-1-responsive">
                    <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#" className="logo">
                        <div className="img-wrap">
                            <img src="assets/img/./logo.png" alt="Olympus"/>
                        </div>
                        <div className="title-block">
                            <h6 className="logo-title">NoticeMe</h6>
                        </div>
                    </a>

                    <div className="mCustomScrollbar ps ps--theme_default" data-mcs-theme="dark"
                         data-ps-id="06dcb267-9570-64f4-9dfb-111bc0c82a05">

                        <div className="control-block">
                            <div className="author-page author vcard inline-items">
                                <div className="author-thumb">
                                    <img alt="author" src="assets/img/./author-page.jpg" className="avatar"/>
                                    <span className="icon-status online"></span>
                                </div>
                                <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html"
                                   className="author-name fn">
                                    <div className="author-title">
                                        {userContext.currentUser.username} {userContext.currentUser.verified}
                                        <svg className="olymp-dropdown-arrow-icon">
                                            <use xlinkHref="http://www.w3.org/1999/xlink"
                                                 xlinkHref="assets/img/./icons.svg#olymp-dropdown-arrow-icon"></use>
                                        </svg>
                                    </div>
                                    <span className="author-subtitle">{userContext.currentUser.handle}</span>
                                </a>
                            </div>
                        </div>

                        <div className="ui-block-title ui-block-title-small">
                            <h6 className="title">MAIN SECTIONS</h6>
                        </div>

                        <ul className="left-menu">
                            <li>
                                <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                                   className="js-sidebar-open">
                                    <svg className="olymp-close-icon left-menu-icon">
                                        <use xlinkHref="http://www.w3.org/1999/xlink"
                                             xlinkHref="assets/img/./icons.svg#olymp-close-icon"></use>
                                    </svg>
                                    <span className="left-menu-title">Collapse Menu</span>
                                </a>
                            </li>
                            <li>
                                <a href="https://html.crumina.net/html-olympus/mobile-index.html">
                                    <svg className="olymp-newsfeed-icon left-menu-icon" data-toggle="tooltip"
                                         data-placement="right" data-original-title="NEWSFEED">
                                        <use xlinkHref="http://www.w3.org/1999/xlink"
                                             xlinkHref="assets/img/./icons.svg#olymp-newsfeed-icon"></use>
                                    </svg>
                                    <span className="left-menu-title">Newsfeed</span>
                                </a>
                            </li>
                            <li>
                                <a href="https://html.crumina.net/html-olympus/Mobile-28-YourAccount-PersonalInformation.html">
                                    <svg className="olymp-star-icon left-menu-icon" data-toggle="tooltip"
                                         data-placement="right" data-original-title="FAV PAGE">
                                        <use xlinkHref="http://www.w3.org/1999/xlink"
                                             xlinkHref="http://www.w3.org/1999/xlink"
                                             xlinkHref="assets/img/./icons.svg#olymp-star-icon"></use>
                                    </svg>
                                    <span className="left-menu-title">Fav Pages Feed</span>
                                </a>
                            </li>


                        </ul>

                        <div className="ui-block-title ui-block-title-small">
                            <h6 className="title">YOUR ACCOUNT</h6>
                        </div>

                        <ul className="account-settings">
                            <li>
                                <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#">

                                    <svg className="olymp-menu-icon">
                                        <use xlinkHref="http://www.w3.org/1999/xlink"
                                             xlinkHref="assets/img/./icons.svg#olymp-menu-icon"></use>
                                    </svg>

                                    <span>Profile Settings</span>
                                </a>
                            </li>
                            <li>
                                <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#">
                                    <svg className="olymp-star-icon left-menu-icon" data-toggle="tooltip"
                                         data-placement="right" data-original-title="FAV PAGE">
                                        <use xlinkHref="http://www.w3.org/1999/xlink"
                                             xlinkHref="assets/img/./icons.svg#olymp-star-icon"></use>
                                    </svg>

                                    <span>Create Fav Page</span>
                                </a>
                            </li>
                            <li>
                                <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#">
                                    <svg className="olymp-logout-icon">
                                        <use xlinkHref="http://www.w3.org/1999/xlink"
                                             xlinkHref="assets/img/./icons.svg#olymp-logout-icon"></use>
                                    </svg>

                                    <span>Log Out</span>
                                </a>
                            </li>
                        </ul>

                        <div className="ui-block-title ui-block-title-small">
                            <h6 className="title">About Olympus</h6>
                        </div>

                        <ul className="about-olympus">
                            <li>
                                <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#">
                                    <span>Terms and Conditions</span>
                                </a>
                            </li>
                            <li>
                                <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#">
                                    <span>FAQs</span>
                                </a>
                            </li>
                            <li>
                                <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#">
                                    <span>Careers</span>
                                </a>
                            </li>
                            <li>
                                <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#">
                                    <span>Contact</span>
                                </a>
                            </li>
                        </ul>

                        <div className="ps__scrollbar-x-rail" style={{"left":"0px","bottom":"0px"}}>
                            <div className="ps__scrollbar-x" tabIndex="0" style={{"left": "0px", "width": "0px"}}></div>
                        </div>
                        <div className="ps__scrollbar-y-rail" style={{"top": "0px", "right": "0px"}}>
                            <div className="ps__scrollbar-y" tabIndex="0" style={{"top": "0px", "height": "0px"}}></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ... end Fixed Sidebar Left */}


            {/* Fixed Sidebar Right */}

            <div className="fixed-sidebar right">
                <div className="fixed-sidebar-right sidebar--small" id="sidebar-right">

                    <div className="mCustomScrollbar ps ps--theme_default" data-mcs-theme="dark"
                         data-ps-id="2aeed418-f9b3-df80-43bd-52acdf206d8c">
                        <ul className="chat-users">
                            <li className="inline-items js-chat-open">
                                <div className="author-thumb">
                                    <img alt="author" src="assets/img/./avatar70-sm.jpg" className="avatar"/>
                                    <span className="icon-status disconected"></span>
                                </div>
                            </li>
                            <li className="inline-items js-chat-open">
                                <div className="author-thumb">
                                    <img alt="author" src="assets/img/./avatar64-sm.jpg" className="avatar"/>
                                    <span className="icon-status online"></span>
                                </div>
                            </li>


                            <li className="inline-items js-chat-open">
                                <div className="author-thumb">
                                    <img alt="author" src="assets/img/./avatar63-sm.jpg" className="avatar"/>
                                    <span className="icon-status status-invisible"></span>
                                </div>
                            </li>
                            <li className="inline-items js-chat-open">
                                <div className="author-thumb">
                                    <img alt="author" src="assets/img/./avatar72-sm.jpg" className="avatar"/>
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
                            <svg className="olymp-menu-icon">
                                <use xlinkHref="http://www.w3.org/1999/xlink"
                                     xlinkHref="assets/img/./icons.svg#olymp-menu-icon"></use>
                            </svg>
                        </a>
                    </div>

                    <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                       className="olympus-chat inline-items js-chat-open">
                        <svg className="olymp-chat---messages-icon">
                            <use xlinkHref="http://www.w3.org/1999/xlink"
                                 xlinkHref="assets/img/./icons.svg#olymp-chat---messages-icon"></use>
                        </svg>
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
                                    <img alt="author" src="assets/img/./avatar67-sm.jpg" className="avatar"/>
                                    <span className="icon-status online"></span>
                                </div>

                                <div className="author-status">
                                    <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                                       className="h6 author-name">Carol Summers</a>
                                    <span className="status">ONLINE</span>
                                </div>

                                <div className="more">
                                    <svg className="olymp-three-dots-icon">
                                        <use xlinkHref="http://www.w3.org/1999/xlink"
                                             xlinkHref="assets/img/./icons.svg#olymp-three-dots-icon"></use>
                                    </svg>

                                    <ul className="more-icons">
                                        <li>
                                            <svg data-toggle="tooltip" data-placement="top"
                                                 data-original-title="START CONVERSATION"
                                                 className="olymp-comments-post-icon">
                                                <use xlinkHref="http://www.w3.org/1999/xlink"
                                                     xlinkHref="assets/img/./icons.svg#olymp-comments-post-icon"></use>
                                            </svg>
                                        </li>

                                        <li>
                                            <svg data-toggle="tooltip" data-placement="top"
                                                 data-original-title="ADD TO CONVERSATION"
                                                 className="olymp-add-to-conversation-icon">
                                                <use xlinkHref="http://www.w3.org/1999/xlink"
                                                     xlinkHref="assets/img/./icons.svg#olymp-add-to-conversation-icon"></use>
                                            </svg>
                                        </li>

                                        <li>
                                            <svg data-toggle="tooltip" data-placement="top"
                                                 data-original-title="BLOCK FROM CHAT"
                                                 className="olymp-block-from-chat-icon">
                                                <use xlinkHref="http://www.w3.org/1999/xlink"
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
                                    <svg className="olymp-three-dots-icon">
                                        <use xlinkHref="http://www.w3.org/1999/xlink"
                                             xlinkHref="assets/img/./icons.svg#olymp-three-dots-icon"></use>
                                    </svg>

                                    <ul className="more-icons">
                                        <li>
                                            <svg data-toggle="tooltip" data-placement="top"
                                                 data-original-title="START CONVERSATION"
                                                 className="olymp-comments-post-icon">
                                                <use xlinkHref="http://www.w3.org/1999/xlink"
                                                     xlinkHref="assets/img/./icons.svg#olymp-comments-post-icon"></use>
                                            </svg>
                                        </li>

                                        <li>
                                            <svg data-toggle="tooltip" data-placement="top"
                                                 data-original-title="ADD TO CONVERSATION"
                                                 className="olymp-add-to-conversation-icon">
                                                <use xlinkHref="http://www.w3.org/1999/xlink"
                                                     xlinkHref="assets/img/./icons.svg#olymp-add-to-conversation-icon"></use>
                                            </svg>
                                        </li>

                                        <li>
                                            <svg data-toggle="tooltip" data-placement="top"
                                                 data-original-title="BLOCK FROM CHAT"
                                                 className="olymp-block-from-chat-icon">
                                                <use xlinkHref="http://www.w3.org/1999/xlink"
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
                                       className="h6 author-name">Carol Summers</a>
                                    <span className="status">ONLINE</span>
                                </div>

                                <div className="more">
                                    <svg className="olymp-three-dots-icon">
                                        <use xlinkHref="http://www.w3.org/1999/xlink"
                                             xlinkHref="assets/img/./icons.svg#olymp-three-dots-icon"></use>
                                    </svg>

                                    <ul className="more-icons">
                                        <li>
                                            <svg data-toggle="tooltip" data-placement="top"
                                                 data-original-title="START CONVERSATION"
                                                 className="olymp-comments-post-icon">
                                                <use xlinkHref="http://www.w3.org/1999/xlink"
                                                     xlinkHref="assets/img/./icons.svg#olymp-comments-post-icon"></use>
                                            </svg>
                                        </li>

                                        <li>
                                            <svg data-toggle="tooltip" data-placement="top"
                                                 data-original-title="ADD TO CONVERSATION"
                                                 className="olymp-add-to-conversation-icon">
                                                <use xlinkHref="http://www.w3.org/1999/xlink"
                                                     xlinkHref="assets/img/./icons.svg#olymp-add-to-conversation-icon"></use>
                                            </svg>
                                        </li>

                                        <li>
                                            <svg data-toggle="tooltip" data-placement="top"
                                                 data-original-title="BLOCK FROM CHAT"
                                                 className="olymp-block-from-chat-icon">
                                                <use xlinkHref="http://www.w3.org/1999/xlink"
                                                     xlinkHref="assets/img/./icons.svg#olymp-block-from-chat-icon"></use>
                                            </svg>
                                        </li>
                                    </ul>

                                </div>


                            </li>

                            <li className="inline-items js-chat-open">


                                <div className="author-thumb">
                                    <img alt="author" src="assets/img/./avatar69-sm.jpg" className="avatar"/>
                                    <span className="icon-status away"></span>
                                </div>

                                <div className="author-status">
                                    <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                                       className="h6 author-name">Michael Maximoff</a>
                                    <span className="status">AWAY</span>
                                </div>

                                <div className="more">
                                    <svg className="olymp-three-dots-icon">
                                        <use xlinkHref="http://www.w3.org/1999/xlink"
                                             xlinkHref="assets/img/./icons.svg#olymp-three-dots-icon"></use>
                                    </svg>

                                    <ul className="more-icons">
                                        <li>
                                            <svg data-toggle="tooltip" data-placement="top"
                                                 data-original-title="START CONVERSATION"
                                                 className="olymp-comments-post-icon">
                                                <use xlinkHref="http://www.w3.org/1999/xlink"
                                                     xlinkHref="assets/img/./icons.svg#olymp-comments-post-icon"></use>
                                            </svg>
                                        </li>

                                        <li>
                                            <svg data-toggle="tooltip" data-placement="top"
                                                 data-original-title="ADD TO CONVERSATION"
                                                 className="olymp-add-to-conversation-icon">
                                                <use xlinkHref="http://www.w3.org/1999/xlink"
                                                     xlinkHref="assets/img/./icons.svg#olymp-add-to-conversation-icon"></use>
                                            </svg>
                                        </li>

                                        <li>
                                            <svg data-toggle="tooltip" data-placement="top"
                                                 data-original-title="BLOCK FROM CHAT"
                                                 className="olymp-block-from-chat-icon">
                                                <use xlinkHref="http://www.w3.org/1999/xlink"
                                                     xlinkHref="assets/img/./icons.svg#olymp-block-from-chat-icon"></use>
                                            </svg>
                                        </li>
                                    </ul>

                                </div>


                            </li>

                            <li className="inline-items js-chat-open">


                                <div className="author-thumb">
                                    <img alt="author" src="assets/img/./avatar70-sm.jpg" className="avatar"/>
                                    <span className="icon-status disconected"></span>
                                </div>

                                <div className="author-status">
                                    <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                                       className="h6 author-name">Rachel Howlett</a>
                                    <span className="status">OFFLINE</span>
                                </div>

                                <div className="more">
                                    <svg className="olymp-three-dots-icon">
                                        <use xlinkHref="http://www.w3.org/1999/xlink"
                                             xlinkHref="assets/img/./icons.svg#olymp-three-dots-icon"></use>
                                    </svg>

                                    <ul className="more-icons">
                                        <li>
                                            <svg data-toggle="tooltip" data-placement="top"
                                                 data-original-title="START CONVERSATION"
                                                 className="olymp-comments-post-icon">
                                                <use xlinkHref="http://www.w3.org/1999/xlink"
                                                     xlinkHref="assets/img/./icons.svg#olymp-comments-post-icon"></use>
                                            </svg>
                                        </li>

                                        <li>
                                            <svg data-toggle="tooltip" data-placement="top"
                                                 data-original-title="ADD TO CONVERSATION"
                                                 className="olymp-add-to-conversation-icon">
                                                <use xlinkHref="http://www.w3.org/1999/xlink"
                                                     xlinkHref="assets/img/./icons.svg#olymp-add-to-conversation-icon"></use>
                                            </svg>
                                        </li>

                                        <li>
                                            <svg data-toggle="tooltip" data-placement="top"
                                                 data-original-title="BLOCK FROM CHAT"
                                                 className="olymp-block-from-chat-icon">
                                                <use xlinkHref="http://www.w3.org/1999/xlink"
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
                                    <img alt="author" src="assets/img/./avatar64-sm.jpg" className="avatar"/>
                                    <span className="icon-status online"></span>
                                </div>

                                <div className="author-status">
                                    <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                                       className="h6 author-name">Sarah Hetfield</a>
                                    <span className="status">ONLINE</span>
                                </div>

                                <div className="more">
                                    <svg className="olymp-three-dots-icon">
                                        <use xlinkHref="http://www.w3.org/1999/xlink"
                                             xlinkHref="assets/img/./icons.svg#olymp-three-dots-icon"></use>
                                    </svg>

                                    <ul className="more-icons">
                                        <li>
                                            <svg data-toggle="tooltip" data-placement="top"
                                                 data-original-title="START CONVERSATION"
                                                 className="olymp-comments-post-icon">
                                                <use xlinkHref="http://www.w3.org/1999/xlink"
                                                     xlinkHref="assets/img/./icons.svg#olymp-comments-post-icon"></use>
                                            </svg>
                                        </li>

                                        <li>
                                            <svg data-toggle="tooltip" data-placement="top"
                                                 data-original-title="ADD TO CONVERSATION"
                                                 className="olymp-add-to-conversation-icon">
                                                <use xlinkHref="http://www.w3.org/1999/xlink"
                                                     xlinkHref="assets/img/./icons.svg#olymp-add-to-conversation-icon"></use>
                                            </svg>
                                        </li>

                                        <li>
                                            <svg data-toggle="tooltip" data-placement="top"
                                                 data-original-title="BLOCK FROM CHAT"
                                                 className="olymp-block-from-chat-icon">
                                                <use xlinkHref="http://www.w3.org/1999/xlink"
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
                                    <img alt="author" src="assets/img/./avatar71-sm.jpg" className="avatar"/>
                                    <span className="icon-status online"></span>
                                </div>

                                <div className="author-status">
                                    <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                                       className="h6 author-name">Bruce Peterson</a>
                                    <span className="status">ONLINE</span>
                                </div>

                                <div className="more">
                                    <svg className="olymp-three-dots-icon">
                                        <use xlinkHref="http://www.w3.org/1999/xlink"
                                             xlinkHref="assets/img/./icons.svg#olymp-three-dots-icon"></use>
                                    </svg>

                                    <ul className="more-icons">
                                        <li>
                                            <svg data-toggle="tooltip" data-placement="top"
                                                 data-original-title="START CONVERSATION"
                                                 className="olymp-comments-post-icon">
                                                <use xlinkHref="http://www.w3.org/1999/xlink"
                                                     xlinkHref="assets/img/./icons.svg#olymp-comments-post-icon"></use>
                                            </svg>
                                        </li>

                                        <li>
                                            <svg data-toggle="tooltip" data-placement="top"
                                                 data-original-title="ADD TO CONVERSATION"
                                                 className="olymp-add-to-conversation-icon">
                                                <use xlinkHref="http://www.w3.org/1999/xlink"
                                                     xlinkHref="assets/img/./icons.svg#olymp-add-to-conversation-icon"></use>
                                            </svg>
                                        </li>

                                        <li>
                                            <svg data-toggle="tooltip" data-placement="top"
                                                 data-original-title="BLOCK FROM CHAT"
                                                 className="olymp-block-from-chat-icon">
                                                <use xlinkHref="http://www.w3.org/1999/xlink"
                                                     xlinkHref="assets/img/./icons.svg#olymp-block-from-chat-icon"></use>
                                            </svg>
                                        </li>
                                    </ul>

                                </div>


                            </li>
                            <li className="inline-items js-chat-open">

                                <div className="author-thumb">
                                    <img alt="author" src="assets/img/./avatar72-sm.jpg" className="avatar"/>
                                    <span className="icon-status away"></span>
                                </div>

                                <div className="author-status">
                                    <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                                       className="h6 author-name">Chris Greyson</a>
                                    <span className="status">AWAY</span>
                                </div>

                                <div className="more">
                                    <svg className="olymp-three-dots-icon">
                                        <use xlinkHref="http://www.w3.org/1999/xlink"
                                             xlinkHref="assets/img/./icons.svg#olymp-three-dots-icon"></use>
                                    </svg>

                                    <ul className="more-icons">
                                        <li>
                                            <svg data-toggle="tooltip" data-placement="top"
                                                 data-original-title="START CONVERSATION"
                                                 className="olymp-comments-post-icon">
                                                <use xlinkHref="http://www.w3.org/1999/xlink"
                                                     xlinkHref="assets/img/./icons.svg#olymp-comments-post-icon"></use>
                                            </svg>
                                        </li>

                                        <li>
                                            <svg data-toggle="tooltip" data-placement="top"
                                                 data-original-title="ADD TO CONVERSATION"
                                                 className="olymp-add-to-conversation-icon">
                                                <use xlinkHref="http://www.w3.org/1999/xlink"
                                                     xlinkHref="assets/img/./icons.svg#olymp-add-to-conversation-icon"></use>
                                            </svg>
                                        </li>

                                        <li>
                                            <svg data-toggle="tooltip" data-placement="top"
                                                 data-original-title="BLOCK FROM CHAT"
                                                 className="olymp-block-from-chat-icon">
                                                <use xlinkHref="http://www.w3.org/1999/xlink"
                                                     xlinkHref="assets/img/./icons.svg#olymp-block-from-chat-icon"></use>
                                            </svg>
                                        </li>
                                    </ul>

                                </div>

                            </li>
                            <li className="inline-items js-chat-open">

                                <div className="author-thumb">
                                    <img alt="author" src="assets/img/./avatar63-sm.jpg" className="avatar"/>
                                    <span className="icon-status status-invisible"></span>
                                </div>

                                <div className="author-status">
                                    <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                                       className="h6 author-name">{userContext.currentUser.username} {userContext.currentUser.verified}</a>
                                    <span className="status">INVISIBLE</span>
                                </div>

                                <div className="more">
                                    <svg className="olymp-three-dots-icon">
                                        <use xlinkHref="http://www.w3.org/1999/xlink"
                                             xlinkHref="assets/img/./icons.svg#olymp-three-dots-icon"></use>
                                    </svg>

                                    <ul className="more-icons">
                                        <li>
                                            <svg data-toggle="tooltip" data-placement="top"
                                                 data-original-title="START CONVERSATION"
                                                 className="olymp-comments-post-icon">
                                                <use xlinkHref="http://www.w3.org/1999/xlink"
                                                     xlinkHref="assets/img/./icons.svg#olymp-comments-post-icon"></use>
                                            </svg>
                                        </li>

                                        <li>
                                            <svg data-toggle="tooltip" data-placement="top"
                                                 data-original-title="ADD TO CONVERSATION"
                                                 className="olymp-add-to-conversation-icon">
                                                <use xlinkHref="http://www.w3.org/1999/xlink"
                                                     xlinkHref="assets/img/./icons.svg#olymp-add-to-conversation-icon"></use>
                                            </svg>
                                        </li>

                                        <li>
                                            <svg data-toggle="tooltip" data-placement="top"
                                                 data-original-title="BLOCK FROM CHAT"
                                                 className="olymp-block-from-chat-icon">
                                                <use xlinkHref="http://www.w3.org/1999/xlink"
                                                     xlinkHref="assets/img/./icons.svg#olymp-block-from-chat-icon"></use>
                                            </svg>
                                        </li>
                                    </ul>

                                </div>
                            </li>
                            <li className="inline-items js-chat-open">

                                <div className="author-thumb">
                                    <img alt="author" src="assets/img/./avatar72-sm.jpg" className="avatar"/>
                                    <span className="icon-status away"></span>
                                </div>

                                <div className="author-status">
                                    <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                                       className="h6 author-name">Chris Greyson</a>
                                    <span className="status">AWAY</span>
                                </div>

                                <div className="more">
                                    <svg className="olymp-three-dots-icon">
                                        <use xlinkHref="http://www.w3.org/1999/xlink"
                                             xlinkHref="assets/img/./icons.svg#olymp-three-dots-icon"></use>
                                    </svg>

                                    <ul className="more-icons">
                                        <li>
                                            <svg data-toggle="tooltip" data-placement="top"
                                                 data-original-title="START CONVERSATION"
                                                 className="olymp-comments-post-icon">
                                                <use xlinkHref="http://www.w3.org/1999/xlink"
                                                     xlinkHref="assets/img/./icons.svg#olymp-comments-post-icon"></use>
                                            </svg>
                                        </li>

                                        <li>
                                            <svg data-toggle="tooltip" data-placement="top"
                                                 data-original-title="ADD TO CONVERSATION"
                                                 className="olymp-add-to-conversation-icon">
                                                <use xlinkHref="http://www.w3.org/1999/xlink"
                                                     xlinkHref="assets/img/./icons.svg#olymp-add-to-conversation-icon"></use>
                                            </svg>
                                        </li>

                                        <li>
                                            <svg data-toggle="tooltip" data-placement="top"
                                                 data-original-title="BLOCK FROM CHAT"
                                                 className="olymp-block-from-chat-icon">
                                                <use xlinkHref="http://www.w3.org/1999/xlink"
                                                     xlinkHref="assets/img/./icons.svg#olymp-block-from-chat-icon"></use>
                                            </svg>
                                        </li>
                                    </ul>

                                </div>
                            </li>
                            <li className="inline-items js-chat-open">

                                <div className="author-thumb">
                                    <img alt="author" src="assets/img/./avatar71-sm.jpg" className="avatar"/>
                                    <span className="icon-status online"></span>
                                </div>

                                <div className="author-status">
                                    <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                                       className="h6 author-name">Bruce Peterson</a>
                                    <span className="status">ONLINE</span>
                                </div>

                                <div className="more">
                                    <svg className="olymp-three-dots-icon">
                                        <use xlinkHref="http://www.w3.org/1999/xlink"
                                             xlinkHref="assets/img/./icons.svg#olymp-three-dots-icon"></use>
                                    </svg>

                                    <ul className="more-icons">
                                        <li>
                                            <svg data-toggle="tooltip" data-placement="top"
                                                 data-original-title="START CONVERSATION"
                                                 className="olymp-comments-post-icon">
                                                <use xlinkHref="http://www.w3.org/1999/xlink"
                                                     xlinkHref="assets/img/./icons.svg#olymp-comments-post-icon"></use>
                                            </svg>
                                        </li>

                                        <li>
                                            <svg data-toggle="tooltip" data-placement="top"
                                                 data-original-title="ADD TO CONVERSATION"
                                                 className="olymp-add-to-conversation-icon">
                                                <use xlinkHref="http://www.w3.org/1999/xlink"
                                                     xlinkHref="assets/img/./icons.svg#olymp-add-to-conversation-icon"></use>
                                            </svg>
                                        </li>

                                        <li>
                                            <svg data-toggle="tooltip" data-placement="top"
                                                 data-original-title="BLOCK FROM CHAT"
                                                 className="olymp-block-from-chat-icon">
                                                <use xlinkHref="http://www.w3.org/1999/xlink"
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
                            <svg className="olymp-settings-icon">
                                <use xlinkHref="http://www.w3.org/1999/xlink"
                                     xlinkHref="assets/img/./icons.svg#olymp-settings-icon"></use>
                            </svg>
                        </a>

                        <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                           className="js-sidebar-open">
                            <svg className="olymp-close-icon">
                                <use xlinkHref="http://www.w3.org/1999/xlink"
                                     xlinkHref="assets/img/./icons.svg#olymp-close-icon"></use>
                            </svg>
                        </a>
                    </div>

                    <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                       className="olympus-chat inline-items js-chat-open">

                        <h6 className="olympus-chat-title">OLYMPUS CHAT</h6>
                        <svg className="olymp-chat---messages-icon">
                            <use xlinkHref="http://www.w3.org/1999/xlink"
                                 xlinkHref="assets/img/./icons.svg#olymp-chat---messages-icon"></use>
                        </svg>
                    </a>

                </div>
            </div>

            {/* ... end Fixed Sidebar Right */}


            {/* Fixed Sidebar Right-Responsive */}

            <div className="fixed-sidebar right fixed-sidebar-responsive" id="sidebar-right-responsive">

                <div className="fixed-sidebar-right sidebar--small">
                    <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#" className="js-sidebar-open">
                        <svg className="olymp-menu-icon">
                            <use xlinkHref="http://www.w3.org/1999/xlink"
                                 xlinkHref="assets/img/./icons.svg#olymp-menu-icon"></use>
                        </svg>
                        <svg className="olymp-close-icon">
                            <use xlinkHref="http://www.w3.org/1999/xlink"
                                 xlinkHref="assets/img/./icons.svg#olymp-close-icon"></use>
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
                                    <img alt="author" src="assets/img/./avatar67-sm.jpg" className="avatar"/>
                                    <span className="icon-status online"></span>
                                </div>

                                <div className="author-status">
                                    <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                                       className="h6 author-name">Carol Summers</a>
                                    <span className="status">ONLINE</span>
                                </div>

                                <div className="more">
                                    <svg className="olymp-three-dots-icon">
                                        <use xlinkHref="http://www.w3.org/1999/xlink"
                                             xlinkHref="assets/img/./icons.svg#olymp-three-dots-icon"></use>
                                    </svg>

                                    <ul className="more-icons">
                                        <li>
                                            <svg data-toggle="tooltip" data-placement="top"
                                                 data-original-title="START CONVERSATION"
                                                 className="olymp-comments-post-icon">
                                                <use xlinkHref="http://www.w3.org/1999/xlink"
                                                     xlinkHref="assets/img/./icons.svg#olymp-comments-post-icon"></use>
                                            </svg>
                                        </li>

                                        <li>
                                            <svg data-toggle="tooltip" data-placement="top"
                                                 data-original-title="ADD TO CONVERSATION"
                                                 className="olymp-add-to-conversation-icon">
                                                <use xlinkHref="http://www.w3.org/1999/xlink"
                                                     xlinkHref="assets/img/./icons.svg#olymp-add-to-conversation-icon"></use>
                                            </svg>
                                        </li>

                                        <li>
                                            <svg data-toggle="tooltip" data-placement="top"
                                                 data-original-title="BLOCK FROM CHAT"
                                                 className="olymp-block-from-chat-icon">
                                                <use xlinkHref="http://www.w3.org/1999/xlink"
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
                                    <svg className="olymp-three-dots-icon">
                                        <use xlinkHref="http://www.w3.org/1999/xlink"
                                             xlinkHref="assets/img/./icons.svg#olymp-three-dots-icon"></use>
                                    </svg>

                                    <ul className="more-icons">
                                        <li>
                                            <svg data-toggle="tooltip" data-placement="top"
                                                 data-original-title="START CONVERSATION"
                                                 className="olymp-comments-post-icon">
                                                <use xlinkHref="http://www.w3.org/1999/xlink"
                                                     xlinkHref="assets/img/./icons.svg#olymp-comments-post-icon"></use>
                                            </svg>
                                        </li>

                                        <li>
                                            <svg data-toggle="tooltip" data-placement="top"
                                                 data-original-title="ADD TO CONVERSATION"
                                                 className="olymp-add-to-conversation-icon">
                                                <use xlinkHref="http://www.w3.org/1999/xlink"
                                                     xlinkHref="assets/img/./icons.svg#olymp-add-to-conversation-icon"></use>
                                            </svg>
                                        </li>

                                        <li>
                                            <svg data-toggle="tooltip" data-placement="top"
                                                 data-original-title="BLOCK FROM CHAT"
                                                 className="olymp-block-from-chat-icon">
                                                <use xlinkHref="http://www.w3.org/1999/xlink"
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
                                       className="h6 author-name">Carol Summers</a>
                                    <span className="status">ONLINE</span>
                                </div>

                                <div className="more">
                                    <svg className="olymp-three-dots-icon">
                                        <use xlinkHref="http://www.w3.org/1999/xlink"
                                             xlinkHref="assets/img/./icons.svg#olymp-three-dots-icon"></use>
                                    </svg>

                                    <ul className="more-icons">
                                        <li>
                                            <svg data-toggle="tooltip" data-placement="top"
                                                 data-original-title="START CONVERSATION"
                                                 className="olymp-comments-post-icon">
                                                <use xlinkHref="http://www.w3.org/1999/xlink"
                                                     xlinkHref="assets/img/./icons.svg#olymp-comments-post-icon"></use>
                                            </svg>
                                        </li>

                                        <li>
                                            <svg data-toggle="tooltip" data-placement="top"
                                                 data-original-title="ADD TO CONVERSATION"
                                                 className="olymp-add-to-conversation-icon">
                                                <use xlinkHref="http://www.w3.org/1999/xlink"
                                                     xlinkHref="assets/img/./icons.svg#olymp-add-to-conversation-icon"></use>
                                            </svg>
                                        </li>

                                        <li>
                                            <svg data-toggle="tooltip" data-placement="top"
                                                 data-original-title="BLOCK FROM CHAT"
                                                 className="olymp-block-from-chat-icon">
                                                <use xlinkHref="http://www.w3.org/1999/xlink"
                                                     xlinkHref="assets/img/./icons.svg#olymp-block-from-chat-icon"></use>
                                            </svg>
                                        </li>
                                    </ul>

                                </div>


                            </li>

                            <li className="inline-items js-chat-open">


                                <div className="author-thumb">
                                    <img alt="author" src="assets/img/./avatar69-sm.jpg" className="avatar"/>
                                    <span className="icon-status away"></span>
                                </div>

                                <div className="author-status">
                                    <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                                       className="h6 author-name">Michael Maximoff</a>
                                    <span className="status">AWAY</span>
                                </div>

                                <div className="more">
                                    <svg className="olymp-three-dots-icon">
                                        <use xlinkHref="http://www.w3.org/1999/xlink"
                                             xlinkHref="assets/img/./icons.svg#olymp-three-dots-icon"></use>
                                    </svg>

                                    <ul className="more-icons">
                                        <li>
                                            <svg data-toggle="tooltip" data-placement="top"
                                                 data-original-title="START CONVERSATION"
                                                 className="olymp-comments-post-icon">
                                                <use xlinkHref="http://www.w3.org/1999/xlink"
                                                     xlinkHref="assets/img/./icons.svg#olymp-comments-post-icon"></use>
                                            </svg>
                                        </li>

                                        <li>
                                            <svg data-toggle="tooltip" data-placement="top"
                                                 data-original-title="ADD TO CONVERSATION"
                                                 className="olymp-add-to-conversation-icon">
                                                <use xlinkHref="http://www.w3.org/1999/xlink"
                                                     xlinkHref="assets/img/./icons.svg#olymp-add-to-conversation-icon"></use>
                                            </svg>
                                        </li>

                                        <li>
                                            <svg data-toggle="tooltip" data-placement="top"
                                                 data-original-title="BLOCK FROM CHAT"
                                                 className="olymp-block-from-chat-icon">
                                                <use xlinkHref="http://www.w3.org/1999/xlink"
                                                     xlinkHref="assets/img/./icons.svg#olymp-block-from-chat-icon"></use>
                                            </svg>
                                        </li>
                                    </ul>

                                </div>


                            </li>

                            <li className="inline-items js-chat-open">


                                <div className="author-thumb">
                                    <img alt="author" src="assets/img/./avatar70-sm.jpg" className="avatar"/>
                                    <span className="icon-status disconected"></span>
                                </div>

                                <div className="author-status">
                                    <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                                       className="h6 author-name">Rachel Howlett</a>
                                    <span className="status">OFFLINE</span>
                                </div>

                                <div className="more">
                                    <svg className="olymp-three-dots-icon">
                                        <use xlinkHref="http://www.w3.org/1999/xlink"
                                             xlinkHref="assets/img/./icons.svg#olymp-three-dots-icon"></use>
                                    </svg>

                                    <ul className="more-icons">
                                        <li>
                                            <svg data-toggle="tooltip" data-placement="top"
                                                 data-original-title="START CONVERSATION"
                                                 className="olymp-comments-post-icon">
                                                <use xlinkHref="http://www.w3.org/1999/xlink"
                                                     xlinkHref="assets/img/./icons.svg#olymp-comments-post-icon"></use>
                                            </svg>
                                        </li>

                                        <li>
                                            <svg data-toggle="tooltip" data-placement="top"
                                                 data-original-title="ADD TO CONVERSATION"
                                                 className="olymp-add-to-conversation-icon">
                                                <use xlinkHref="http://www.w3.org/1999/xlink"
                                                     xlinkHref="assets/img/./icons.svg#olymp-add-to-conversation-icon"></use>
                                            </svg>
                                        </li>

                                        <li>
                                            <svg data-toggle="tooltip" data-placement="top"
                                                 data-original-title="BLOCK FROM CHAT"
                                                 className="olymp-block-from-chat-icon">
                                                <use xlinkHref="http://www.w3.org/1999/xlink"
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
                                    <img alt="author" src="assets/img/./avatar64-sm.jpg" className="avatar"/>
                                    <span className="icon-status online"></span>
                                </div>

                                <div className="author-status">
                                    <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                                       className="h6 author-name">Sarah Hetfield</a>
                                    <span className="status">ONLINE</span>
                                </div>

                                <div className="more">
                                    <svg className="olymp-three-dots-icon">
                                        <use xlinkHref="http://www.w3.org/1999/xlink"
                                             xlinkHref="assets/img/./icons.svg#olymp-three-dots-icon"></use>
                                    </svg>

                                    <ul className="more-icons">
                                        <li>
                                            <svg data-toggle="tooltip" data-placement="top"
                                                 data-original-title="START CONVERSATION"
                                                 className="olymp-comments-post-icon">
                                                <use xlinkHref="http://www.w3.org/1999/xlink"
                                                     xlinkHref="assets/img/./icons.svg#olymp-comments-post-icon"></use>
                                            </svg>
                                        </li>

                                        <li>
                                            <svg data-toggle="tooltip" data-placement="top"
                                                 data-original-title="ADD TO CONVERSATION"
                                                 className="olymp-add-to-conversation-icon">
                                                <use xlinkHref="http://www.w3.org/1999/xlink"
                                                     xlinkHref="assets/img/./icons.svg#olymp-add-to-conversation-icon"></use>
                                            </svg>
                                        </li>

                                        <li>
                                            <svg data-toggle="tooltip" data-placement="top"
                                                 data-original-title="BLOCK FROM CHAT"
                                                 className="olymp-block-from-chat-icon">
                                                <use xlinkHref="http://www.w3.org/1999/xlink"
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
                                    <img alt="author" src="assets/img/./avatar71-sm.jpg" className="avatar"/>
                                    <span className="icon-status online"></span>
                                </div>

                                <div className="author-status">
                                    <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                                       className="h6 author-name">Gay Furry</a>
                                    <span className="status">ONLINE</span>
                                </div>

                                <div className="more">
                                    <svg className="olymp-three-dots-icon">
                                        <use xlinkHref="http://www.w3.org/1999/xlink"
                                             xlinkHref="assets/img/./icons.svg#olymp-three-dots-icon"></use>
                                    </svg>

                                    <ul className="more-icons">
                                        <li>
                                            <svg data-toggle="tooltip" data-placement="top"
                                                 data-original-title="START CONVERSATION"
                                                 className="olymp-comments-post-icon">
                                                <use xlinkHref="http://www.w3.org/1999/xlink"
                                                     xlinkHref="assets/img/./icons.svg#olymp-comments-post-icon"></use>
                                            </svg>
                                        </li>

                                        <li>
                                            <svg data-toggle="tooltip" data-placement="top"
                                                 data-original-title="ADD TO CONVERSATION"
                                                 className="olymp-add-to-conversation-icon">
                                                <use xlinkHref="http://www.w3.org/1999/xlink"
                                                     xlinkHref="assets/img/./icons.svg#olymp-add-to-conversation-icon"></use>
                                            </svg>
                                        </li>

                                        <li>
                                            <svg data-toggle="tooltip" data-placement="top"
                                                 data-original-title="BLOCK FROM CHAT"
                                                 className="olymp-block-from-chat-icon">
                                                <use xlinkHref="http://www.w3.org/1999/xlink"
                                                     xlinkHref="assets/img/./icons.svg#olymp-block-from-chat-icon"></use>
                                            </svg>
                                        </li>
                                    </ul>

                                </div>


                            </li>
                            <li className="inline-items js-chat-open">

                                <div className="author-thumb">
                                    <img alt="author" src="assets/img/./avatar72-sm.jpg" className="avatar"/>
                                    <span className="icon-status away"></span>
                                </div>

                                <div className="author-status">
                                    <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                                       className="h6 author-name">Ilya Gay Son</a>
                                    <span className="status">AWAY</span>
                                </div>

                                <div className="more">
                                    <svg className="olymp-three-dots-icon">
                                        <use xlinkHref="http://www.w3.org/1999/xlink"
                                             xlinkHref="assets/img/./icons.svg#olymp-three-dots-icon"></use>
                                    </svg>

                                    <ul className="more-icons">
                                        <li>
                                            <svg data-toggle="tooltip" data-placement="top"
                                                 data-original-title="START CONVERSATION"
                                                 className="olymp-comments-post-icon">
                                                <use xlinkHref="http://www.w3.org/1999/xlink"
                                                     xlinkHref="assets/img/./icons.svg#olymp-comments-post-icon"></use>
                                            </svg>
                                        </li>

                                        <li>
                                            <svg data-toggle="tooltip" data-placement="top"
                                                 data-original-title="ADD TO CONVERSATION"
                                                 className="olymp-add-to-conversation-icon">
                                                <use xlinkHref="http://www.w3.org/1999/xlink"
                                                     xlinkHref="assets/img/./icons.svg#olymp-add-to-conversation-icon"></use>
                                            </svg>
                                        </li>

                                        <li>
                                            <svg data-toggle="tooltip" data-placement="top"
                                                 data-original-title="BLOCK FROM CHAT"
                                                 className="olymp-block-from-chat-icon">
                                                <use xlinkHref="http://www.w3.org/1999/xlink"
                                                     xlinkHref="assets/img/./icons.svg#olymp-block-from-chat-icon"></use>
                                            </svg>
                                        </li>
                                    </ul>

                                </div>

                            </li>
                            <li className="inline-items js-chat-open">

                                <div className="author-thumb">
                                    <img alt="author" src="assets/img/./avatar63-sm.jpg" className="avatar"/>
                                    <span className="icon-status status-invisible"></span>
                                </div>

                                <div className="author-status">
                                    <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                                       className="h6 author-name">Dima The Cumslut</a>
                                    <span className="status">INVISIBLE</span>
                                </div>

                                <div className="more">
                                    <svg className="olymp-three-dots-icon">
                                        <use xlinkHref="http://www.w3.org/1999/xlink"
                                             xlinkHref="assets/img/./icons.svg#olymp-three-dots-icon"></use>
                                    </svg>

                                    <ul className="more-icons">
                                        <li>
                                            <svg data-toggle="tooltip" data-placement="top"
                                                 data-original-title="START CONVERSATION"
                                                 className="olymp-comments-post-icon">
                                                <use xlinkHref="http://www.w3.org/1999/xlink"
                                                     xlinkHref="assets/img/./icons.svg#olymp-comments-post-icon"></use>
                                            </svg>
                                        </li>

                                        <li>
                                            <svg data-toggle="tooltip" data-placement="top"
                                                 data-original-title="ADD TO CONVERSATION"
                                                 className="olymp-add-to-conversation-icon">
                                                <use xlinkHref="http://www.w3.org/1999/xlink"
                                                     xlinkHref="assets/img/./icons.svg#olymp-add-to-conversation-icon"></use>
                                            </svg>
                                        </li>

                                        <li>
                                            <svg data-toggle="tooltip" data-placement="top"
                                                 data-original-title="BLOCK FROM CHAT"
                                                 className="olymp-block-from-chat-icon">
                                                <use xlinkHref="http://www.w3.org/1999/xlink"
                                                     xlinkHref="assets/img/./icons.svg#olymp-block-from-chat-icon"></use>
                                            </svg>
                                        </li>
                                    </ul>

                                </div>
                            </li>
                            <li className="inline-items js-chat-open">

                                <div className="author-thumb">
                                    <img alt="author" src="assets/img/./avatar72-sm.jpg" className="avatar"/>
                                    <span className="icon-status away"></span>
                                </div>

                                <div className="author-status">
                                    <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                                       className="h6 author-name">Chris Gay Son</a>
                                    <span className="status">AWAY</span>
                                </div>

                                <div className="more">
                                    <svg className="olymp-three-dots-icon">
                                        <use xlinkHref="http://www.w3.org/1999/xlink"
                                             xlinkHref="assets/img/./icons.svg#olymp-three-dots-icon"></use>
                                    </svg>

                                    <ul className="more-icons">
                                        <li>
                                            <svg data-toggle="tooltip" data-placement="top"
                                                 data-original-title="START CONVERSATION"
                                                 className="olymp-comments-post-icon">
                                                <use xlinkHref="http://www.w3.org/1999/xlink"
                                                     xlinkHref="assets/img/./icons.svg#olymp-comments-post-icon"></use>
                                            </svg>
                                        </li>

                                        <li>
                                            <svg data-toggle="tooltip" data-placement="top"
                                                 data-original-title="ADD TO CONVERSATION"
                                                 className="olymp-add-to-conversation-icon">
                                                <use xlinkHref="http://www.w3.org/1999/xlink"
                                                     xlinkHref="assets/img/./icons.svg#olymp-add-to-conversation-icon"></use>
                                            </svg>
                                        </li>

                                        <li>
                                            <svg data-toggle="tooltip" data-placement="top"
                                                 data-original-title="BLOCK FROM CHAT"
                                                 className="olymp-block-from-chat-icon">
                                                <use xlinkHref="http://www.w3.org/1999/xlink"
                                                     xlinkHref="assets/img/./icons.svg#olymp-block-from-chat-icon"></use>
                                            </svg>
                                        </li>
                                    </ul>

                                </div>
                            </li>
                            <li className="inline-items js-chat-open">

                                <div className="author-thumb">
                                    <img alt="author" src="assets/img/./avatar71-sm.jpg" className="avatar"/>
                                    <span className="icon-status online"></span>
                                </div>

                                <div className="author-status">
                                    <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                                       className="h6 author-name">Dima The Cumslut</a>
                                    <span className="status">ONLINE</span>
                                </div>

                                <div className="more">
                                    <svg className="olymp-three-dots-icon">
                                        <use xlinkHref="http://www.w3.org/1999/xlink"
                                             xlinkHref="assets/img/./icons.svg#olymp-three-dots-icon"></use>
                                    </svg>

                                    <ul className="more-icons">
                                        <li>
                                            <svg data-toggle="tooltip" data-placement="top"
                                                 data-original-title="START CONVERSATION"
                                                 className="olymp-comments-post-icon">
                                                <use xlinkHref="http://www.w3.org/1999/xlink"
                                                     xlinkHref="assets/img/./icons.svg#olymp-comments-post-icon"></use>
                                            </svg>
                                        </li>

                                        <li>
                                            <svg data-toggle="tooltip" data-placement="top"
                                                 data-original-title="ADD TO CONVERSATION"
                                                 className="olymp-add-to-conversation-icon">
                                                <use xlinkHref="http://www.w3.org/1999/xlink"
                                                     xlinkHref="assets/img/./icons.svg#olymp-add-to-conversation-icon"></use>
                                            </svg>
                                        </li>

                                        <li>
                                            <svg data-toggle="tooltip" data-placement="top"
                                                 data-original-title="BLOCK FROM CHAT"
                                                 className="olymp-block-from-chat-icon">
                                                <use xlinkHref="http://www.w3.org/1999/xlink"
                                                     xlinkHref="assets/img/./icons.svg#olymp-block-from-chat-icon"></use>
                                            </svg>
                                        </li>
                                    </ul>

                                </div>
                            </li>
                        </ul>

                        <div className="ps__scrollbar-x-rail" style={{"left":"0px","bottom":"0px"}}>
                            <div className="ps__scrollbar-x" tabIndex="0" style={{"left":"0px","width":"0px"}}></div>
                        </div>
                        <div className="ps__scrollbar-y-rail" style={{"top":"0px","right":"0px"}}>
                            <div className="ps__scrollbar-y" tabIndex="0" style={{"top":"0px","height":"0px"}}></div>
                        </div>
                    </div>

                    <div className="search-friend inline-items">
                        <form className="form-group is-empty">
                            <input className="form-control" placeholder="Search Friends..." value="" type="text"/>
                            <span className="material-input"></span></form>

                        <a href="https://html.crumina.net/html-olympus/29-YourAccount-AccountSettings.html"
                           className="settings">
                            <svg className="olymp-settings-icon">
                                <use xlinkHref="http://www.w3.org/1999/xlink"
                                     xlinkHref="assets/img/./icons.svg#olymp-settings-icon"></use>
                            </svg>
                        </a>

                        <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                           className="js-sidebar-open">
                            <svg className="olymp-close-icon">
                                <use xlinkHref="http://www.w3.org/1999/xlink"
                                     xlinkHref="assets/img/./icons.svg#olymp-close-icon"></use>
                            </svg>
                        </a>
                    </div>

                    <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                       className="olympus-chat inline-items js-chat-open">

                        <h6 className="olympus-chat-title">OLYMPUS CHAT</h6>
                        <svg className="olymp-chat---messages-icon">
                            <use xlinkHref="http://www.w3.org/1999/xlink"
                                 xlinkHref="assets/img/./icons.svg#olymp-chat---messages-icon"></use>
                        </svg>
                    </a>
                </div>

            </div>

            {/* ... end Fixed Sidebar Right-Responsive */}


            {/* Header-BP */}

            <header className="header" id="site-header">

                <div className="page-title">
                    <h6>Profile Page</h6>
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
                                    <use xlinkHref="http://www.w3.org/1999/xlink"
                                         xlinkHref="assets/img/./icons.svg#olymp-magnifying-glass-icon"></use>
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
                            <div className="author-thumb">
                                <img alt="author" src="assets/img/./author-page.jpg" className="avatar"/>
                                <span className="icon-status online"></span>
                                <div className="more-dropdown more-with-triangle">
                                    <div className="mCustomScrollbar ps ps--theme_default" data-mcs-theme="dark"
                                         data-ps-id="da9ec53d-81e9-a000-abc3-343d8f0b5feb">
                                        <div className="ui-block-title ui-block-title-small">
                                            <h6 className="title">Your Account</h6>
                                        </div>

                                        <ul className="account-settings">
                                            <li>
                                                <a href="https://html.crumina.net/html-olympus/29-YourAccount-AccountSettings.html">

                                                    <svg className="olymp-menu-icon">
                                                        <use xlinkHref="http://www.w3.org/1999/xlink"
                                                             xlinkHref="assets/img/./icons.svg#olymp-menu-icon"></use>
                                                    </svg>

                                                    <span>Profile Settings</span>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="https://html.crumina.net/html-olympus/36-FavPage-SettingsAndCreatePopup.html">
                                                    <svg className="olymp-star-icon left-menu-icon"
                                                         data-toggle="tooltip" data-placement="right"
                                                         data-original-title="FAV PAGE">
                                                        <use xlinkHref="http://www.w3.org/1999/xlink"
                                                             xlinkHref="assets/img/./icons.svg#olymp-star-icon"></use>
                                                    </svg>

                                                    <span>Create Fav Page</span>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#">
                                                    <svg className="olymp-logout-icon">
                                                        <use xlinkHref="http://www.w3.org/1999/xlink"
                                                             xlinkHref="assets/img/./icons.svg#olymp-logout-icon"></use>
                                                    </svg>

                                                    <span>Log Out</span>
                                                </a>
                                            </li>
                                        </ul>


                                        <div className="ui-block-title ui-block-title-small">
                                            <h6 className="title">About</h6>
                                        </div>

                                        <ul>
                                            <li>
                                                <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#">
                                                    <span>Documentation</span>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#">
                                                    <span>FAQs</span>
                                                </a>
                                            </li>

                                            <li>
                                                <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#">
                                                    <span>Support</span>
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
                                        <use xlinkHref="http://www.w3.org/1999/xlink"
                                             xlinkHref="assets/img/./icons.svg#olymp-dropdown-arrow-icon"></use>
                                    </svg>
                                </div>
                                <span className="author-subtitle">{userContext.currentUser.handle}</span>
                            </a>
                        </div>

                    </div>
                </div>

            </header>

            {/* ... end Header-BP */}


            {/* Responsive Header-BP */}

            <header className="header header-responsive" id="site-header-responsive">

                <div className="header-content-wrapper">
                    <ul className="nav nav-tabs mobile-app-tabs" role="tablist">
                        <li className="nav-item">
                            <a className="nav-link" data-toggle="tab"
                               href="https://html.crumina.net/html-olympus/02-ProfilePage.html#request" role="tab">
                                <div className="control-icon has-items">
                                    <svg className="olymp-happy-face-icon">
                                        <use xlinkHref="http://www.w3.org/1999/xlink"
                                             xlinkHref="assets/img/./icons.svg#olymp-happy-face-icon"></use>
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
                                        <use xlinkHref="http://www.w3.org/1999/xlink"
                                             xlinkHref="assets/img/./icons.svg#olymp-chat---messages-icon"></use>
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
                                        <use xlinkHref="http://www.w3.org/1999/xlink"
                                             xlinkHref="assets/img/./icons.svg#olymp-thunder-icon"></use>
                                    </svg>
                                    <div className="label-avatar bg-primary">8</div>
                                </div>
                            </a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link" data-toggle="tab"
                               href="https://html.crumina.net/html-olympus/02-ProfilePage.html#search" role="tab">
                                <svg className="olymp-magnifying-glass-icon">
                                    <use xlinkHref="http://www.w3.org/1999/xlink"
                                         xlinkHref="assets/img/./icons.svg#olymp-magnifying-glass-icon"></use>
                                </svg>
                                <svg className="olymp-close-icon">
                                    <use xlinkHref="http://www.w3.org/1999/xlink"
                                         xlinkHref="assets/img/./icons.svg#olymp-close-icon"></use>
                                </svg>
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Tab panes */}
                <div className="tab-content tab-content-responsive">

                    <div className="tab-pane " id="request" role="tabpanel">

                        <div className="mCustomScrollbar ps ps--theme_default" data-mcs-theme="dark"
                             data-ps-id="96e14b06-6b49-ed10-64b8-48a43af7d2be">
                            <div className="ui-block-title ui-block-title-small">
                                <h6 className="title">FRIEND REQUESTS</h6>
                                <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#">Find Friends</a>
                                <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#">Settings</a>
                            </div>
                            <ul className="notification-list friend-requests">
                                <li>
                                    <div className="author-thumb">
                                        <img src="assets/img/./avatar55-sm.jpg" alt="author"/>
                                    </div>
                                    <div className="notification-event">
                                        <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                                           className="h6 notification-friend">Tamara Romanoff</a>
                                        <span className="chat-message-item">Mutual Friend: Sarah Hetfield</span>
                                    </div>
                                    <span className="notification-icon">
										<a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                                           className="accept-request">
											<span className="icon-add without-text">
												<svg className="olymp-happy-face-icon"><use
                                                    xlinkHref="http://www.w3.org/1999/xlink"
                                                    xlinkHref="assets/img/./icons.svg#olymp-happy-face-icon"></use></svg>
											</span>
										</a>

										<a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                                           className="accept-request request-del">
											<span className="icon-minus">
												<svg className="olymp-happy-face-icon"><use
                                                    xlinkHref="http://www.w3.org/1999/xlink"
                                                    xlinkHref="assets/img/./icons.svg#olymp-happy-face-icon"></use></svg>
											</span>
										</a>

									</span>

                                    <div className="more">
                                        <svg className="olymp-three-dots-icon">
                                            <use xlinkHref="http://www.w3.org/1999/xlink"
                                                 xlinkHref="assets/img/./icons.svg#olymp-three-dots-icon"></use>
                                        </svg>
                                    </div>
                                </li>
                                <li>
                                    <div className="author-thumb">
                                        <img src="assets/img/./avatar56-sm.jpg" alt="author"/>
                                    </div>
                                    <div className="notification-event">
                                        <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                                           className="h6 notification-friend">Tony Stevens</a>
                                        <span className="chat-message-item">4 Friends in Common</span>
                                    </div>
                                    <span className="notification-icon">
										<a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                                           className="accept-request">
											<span className="icon-add without-text">
												<svg className="olymp-happy-face-icon"><use
                                                    xlinkHref="http://www.w3.org/1999/xlink"
                                                    xlinkHref="assets/img/./icons.svg#olymp-happy-face-icon"></use></svg>
											</span>
										</a>

										<a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                                           className="accept-request request-del">
											<span className="icon-minus">
												<svg className="olymp-happy-face-icon"><use
                                                    xlinkHref="http://www.w3.org/1999/xlink"
                                                    xlinkHref="assets/img/./icons.svg#olymp-happy-face-icon"></use></svg>
											</span>
										</a>

									</span>

                                    <div className="more">
                                        <svg className="olymp-three-dots-icon">
                                            <use xlinkHref="http://www.w3.org/1999/xlink"
                                                 xlinkHref="assets/img/./icons.svg#olymp-three-dots-icon"></use>
                                        </svg>
                                    </div>
                                </li>
                                <li className="accepted">
                                    <div className="author-thumb">
                                        <img src="assets/img/./avatar57-sm.jpg" alt="author"/>
                                    </div>
                                    <div className="notification-event">
                                        You and <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                                                   className="h6 notification-friend">Mary Jane Stark</a> just became
                                        friends. Write on <a
                                        href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                                        className="notification-link">her wall</a>.
                                    </div>
                                    <span className="notification-icon">
										<svg className="olymp-happy-face-icon"><use
                                            xlinkHref="http://www.w3.org/1999/xlink"
                                            xlinkHref="assets/img/./icons.svg#olymp-happy-face-icon"></use></svg>
									</span>

                                    <div className="more">
                                        <svg className="olymp-three-dots-icon">
                                            <use xlinkHref="http://www.w3.org/1999/xlink"
                                                 xlinkHref="assets/img/./icons.svg#olymp-three-dots-icon"></use>
                                        </svg>
                                        <svg className="olymp-little-delete">
                                            <use xlinkHref="http://www.w3.org/1999/xlink"
                                                 xlinkHref="assets/img/./icons.svg#olymp-little-delete"></use>
                                        </svg>
                                    </div>
                                </li>
                                <li>
                                    <div className="author-thumb">
                                        <img src="assets/img/./avatar58-sm.jpg" alt="author"/>
                                    </div>
                                    <div className="notification-event">
                                        <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                                           className="h6 notification-friend">Stagg Clothing</a>
                                        <span className="chat-message-item">9 Friends in Common</span>
                                    </div>
                                    <span className="notification-icon">
										<a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                                           className="accept-request">
											<span className="icon-add without-text">
												<svg className="olymp-happy-face-icon"><use
                                                    xlinkHref="http://www.w3.org/1999/xlink"
                                                    xlinkHref="assets/img/./icons.svg#olymp-happy-face-icon"></use></svg>
											</span>
										</a>

										<a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                                           className="accept-request request-del">
											<span className="icon-minus">
												<svg className="olymp-happy-face-icon"><use
                                                    xlinkHref="http://www.w3.org/1999/xlink"
                                                    xlinkHref="assets/img/./icons.svg#olymp-happy-face-icon"></use></svg>
											</span>
										</a>

									</span>

                                    <div className="more">
                                        <svg className="olymp-three-dots-icon">
                                            <use xlinkHref="http://www.w3.org/1999/xlink"
                                                 xlinkHref="assets/img/./icons.svg#olymp-three-dots-icon"></use>
                                        </svg>
                                    </div>
                                </li>
                            </ul>
                            <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                               className="view-all bg-blue">Check all your Events</a>
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

                    <div className="tab-pane " id="chat" role="tabpanel">

                        <div className="mCustomScrollbar ps ps--theme_default" data-mcs-theme="dark"
                             data-ps-id="b91a44b8-7e24-8448-42b5-5cf21d1aa0f6">
                            <div className="ui-block-title ui-block-title-small">
                                <h6 className="title">Chat / Messages</h6>
                                <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#">Mark all as
                                    read</a>
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
                                                                                                       style={{"width": "229.969px"}}/>
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

            {/* ... end Responsive Header-BP */}
            <div className="header-spacer"></div>


            {/* Top Feed button */}

            <div className="container">
                <div className="row">
                    <div className="col col-xl-9 order-xl-2 col-lg-9 order-lg-2 col-md-12 order-md-1 col-sm-12 col-12">
                        <div className="ui-block">
                            <div className="ui-block-title">
                                <h6 className="title">Personal Information</h6>
                            </div>
                            <div className="ui-block-content">


                                {/* Personal Information Form  */}

                                <Formik
                                    initialValues={{
                                        username: userContext.currentUser.username,
                                        email: userContext.currentUser.email,
                                        about_me: userContext.currentUser.aboutMe
                                    }}
                                    validationSchema={CreateEditSchema}
                                    onSubmit={async (values, actions) => {
                                        if (userContext.currentUser.username === values.username && userContext.currentUser.email === values.email && userContext.currentUser.aboutMe === values.about_me) {
                                            return;
                                        }
                                        const old_username = userContext.currentUser.username;
                                        console.log('Val: ', values);
                                        let res = await fetch(`/api/v1/users/${userContext.currentUser.id}`, {
                                            method: 'PUT',
                                            headers: {
                                                'Content-Type': 'application/json',
                                            },
                                            body: JSON.stringify({
                                                "username": values.username,
                                                "handle": `@${values.username}`,
                                                "email": values.email,
                                                "about_me": values.about_me
                                            })
                                        });


                                        if (res.ok && res.status === 200) {
                                            let txt = await res.json();
                                            let stored_user = {
                                                id: txt.id,
                                                username: txt.username,
                                                email: txt.email,
                                                aboutMe: txt.about_me,
                                                role: txt.role,
                                                avaUrl: txt.ava_url,
                                                createdAt: txt.createdAt,
                                                updatedAt: txt.updatedAt,
                                                signed: true,
                                            };
                                            let payload = {
                                                user: stored_user
                                            };

                                            if (localStorage.getItem('currentUser')) {
                                                await localStorage.setItem('currentUser', JSON.stringify(payload.user));
                                            } else if (sessionStorage.getItem('currentUser')) {
                                                await sessionStorage.setItem('currentUser', JSON.stringify(payload.user));
                                            }


                                            if (old_username !== payload.user.username) {
                                                await fetch(`/api/v1/chatkit/update`, {
                                                    method: 'PUT',
                                                    headers: {
                                                        'Content-Type': 'application/json',
                                                    },
                                                    body: JSON.stringify({
                                                        "old_username": old_username,
                                                        "user_id": payload.user.id,
                                                        "username": payload.user.username,
                                                    })
                                                });
                                            }
                                            userContext.handleSignIn(payload);
                                            console.log(props.history);
                                            // props.history.push('/');
                                            // props.history.push(`/${txt.username}`);
                                            actions.setSubmitting(false);
                                        }
                                    }
                                    }

                                >
                                    {({touched, errors, isSubmitting, status}) => (
                                        <Form>
                                            <div className="row">

                                                <div className="col col-lg-6 col-md-6 col-sm-12 col-12">
                                                    <div className="form-group label-floating">
                                                        <label className="control-label">Username</label>
                                                        <Field
                                                            type="text"
                                                            name="username"
                                                            placeholder="Your new username..."
                                                            className={`form-control ${
                                                                touched.content && errors.content ? "is-invalid" : ""
                                                            }`}
                                                        />
                                                        <ErrorMessage
                                                            component="div"
                                                            name="username"
                                                            className="invalid-feedback"
                                                        />
                                                        <span className="material-input"></span></div>

                                                    <div className="form-group label-floating">
                                                        <label className="control-label">Email</label>
                                                        <Field
                                                            type="email"
                                                            name="email"
                                                            placeholder="Write your new email..."
                                                            className={`form-control ${
                                                                touched.content && errors.content ? "is-invalid" : ""
                                                            }`}
                                                        />
                                                        <ErrorMessage
                                                            component="div"
                                                            name="email"
                                                            className="invalid-feedback"
                                                        />
                                                        <span className="material-input"></span></div>


                                                </div>

                                                <div className="col col-lg-6 col-md-6 col-sm-12 col-12">
                                                    <div className="form-group label-floating">
                                                        <label className="control-label">Handle</label>
                                                        <input className="form-control" placeholder="" type="text"
                                                               value="{userContext.currentUser.handle}"/>
                                                        <span className="material-input"></span></div>


                                                    <div className="form-group label-floating is-empty">
                                                        <label className="control-label">Phone Number</label>
                                                        <input className="form-control" placeholder="" type="text"/>
                                                        <span className="material-input"></span></div>
                                                </div>


                                                <div className="col col-lg-6 col-md-6 col-sm-12 col-12">
                                                    <div className="form-group label-floating">
                                                        <label className="control-label">Bio:</label>
                                                        <Field
                                                            type="text"
                                                            name="about_me"
                                                            component="textarea"
                                                            placeholder="Your new bio..."
                                                            className={`form-control ${
                                                                touched.content && errors.content ? "is-invalid" : ""
                                                            }`}
                                                        />
                                                        <ErrorMessage
                                                            component="div"
                                                            name="about_me"
                                                            className="invalid-feedback"
                                                        />
                                                        <span className="material-input"></span></div>

                                                    <div className="form-group label-floating is-select">
                                                        <label className="control-label">Gender</label>
                                                        <div className="btn-group bootstrap-select form-control">
                                                            {/*                                         <button type="button" className="btn dropdown-toggle btn-secondary" data-toggle="dropdown" role="button" title="Male">
                                                                                            <span className="filter-option pull-left">
                                                                                                Male
                                                                                            </span>&nbsp;
                                                                                            <span className="bs-caret">
                                                                                                <span className="caret">
                                                                                                </span>
                                                                                            </span>
                                                                                        </button> */}

                                                            <select className="selectpicker form-control"
                                                                    tabIndex="-98">
                                                                <option value="Male">Male</option>
                                                                <option value="Female">Female</option>
                                                                <option value="Female">Other</option>
                                                            </select></div>
                                                        <span className="material-input"></span></div>

                                                    <div className="col col-lg-6 col-md-6 col-sm-12 col-12">
                                                        <button className="btn btn-primary btn-lg full-width">Save all
                                                            Changes
                                                        </button>
                                                    </div>

                                                </div>

                                                {/* ... end Personal Information Form  */}


                                                {/* ... end Top Header-Profile */}


                                                {/* .. end W-Playlist */}


                                                {/* W-Twitter */}


                                                {/* .. end W-Twitter */}


                                                {/* ... end Left Sidebar */}


                                                {/* Right Sidebar */}

                                                <div
                                                    className="col col-xl-3 order-xl-3 col-lg-6 order-lg-3 col-md-6 col-sm-6 col-12">

                                                </div>
                                            </div>
                                        </Form>
                                    )}
                                </Formik>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    );


    // ); return (
    //     <div onClick={(e) => {
    //         e.stopPropagation();
    //     }}>
    //         <Button variant="primary" onClick={handleShow}>
    //             Edit profile
    //         </Button>
    //
    //         <Modal show={show} onHide={handleClose} animation={false}>
    //             <Modal.Header closeButton>
    //                 <img src={userContext.currentUser.avaUrl}/>
    //                 <Modal.Title>Edit Profile</Modal.Title>
    //
    //             </Modal.Header>
    //             <Modal.Body>
    //
    //                 <div className="row">
    //                     <div className="col-lg-12">
    //
    //                         <Formik
    //                             initialValues={{
    //                                 username: userContext.currentUser.username,
    //                                 email: userContext.currentUser.email,
    //                                 about_me: userContext.currentUser.aboutMe
    //                             }}
    //                             validationSchema={CreateEditSchema}
    //                             onSubmit={async (values, actions) => {
    //                                 if (userContext.currentUser.username === values.username && userContext.currentUser.email === values.email && userContext.currentUser.aboutMe === values.about_me) {
    //                                     return handleClose();
    //                                 }
    //                                 const old_username = userContext.currentUser.username;
    //                                 console.log('Val: ', values);
    //                                 let res = await fetch(`/api/v1/users/${userContext.currentUser.id}`, {
    //                                     method: 'PUT',
    //                                     headers: {
    //                                         'Content-Type': 'application/json',
    //                                     },
    //                                     body: JSON.stringify({
    //                                         "username": values.username,
    //                                         "handle": `@${values.username}`,
    //                                         "email": values.email,
    //                                         "about_me": values.about_me
    //                                     })
    //                                 });
    //
    //
    //                                 if (res.ok && res.status === 200) {
    //                                     let txt = await res.json();
    //                                     let stored_user = {
    //                                         id: txt.id,
    //                                         username: txt.username,
    //                                         email: txt.email,
    //                                         aboutMe: txt.about_me,
    //                                         role: txt.role,
    //                                         avaUrl: txt.ava_url,
    //                                         createdAt: txt.createdAt,
    //                                         updatedAt: txt.updatedAt,
    //                                         signed: true,
    //                                     };
    //                                     let payload = {
    //                                         user: stored_user
    //                                     };
    //
    //                                     if (localStorage.getItem('currentUser')) {
    //                                         await localStorage.setItem('currentUser', JSON.stringify(payload.user));
    //                                     } else if (sessionStorage.getItem('currentUser')) {
    //                                         await sessionStorage.setItem('currentUser', JSON.stringify(payload.user));
    //                                     }
    //
    //
    //                                     if (old_username !== payload.user.username) {
    //                                         await fetch(`/api/v1/chatkit/update`, {
    //                                             method: 'PUT',
    //                                             headers: {
    //                                                 'Content-Type': 'application/json',
    //                                             },
    //                                             body: JSON.stringify({
    //                                                 "old_username": old_username,
    //                                                 "user_id": payload.user.id,
    //                                                 "username": payload.user.username,
    //                                             })
    //                                         });
    //                                     }
    //
    //
    //                                     userContext.handleSignIn(payload);
    //                                     console.log(props.history);
    //                                     props.history.push('/');
    //                                     props.history.push(`/${txt.username}`);
    //                                     actions.setSubmitting(false);
    //                                     handleClose();
    //
    //                                 }
    //                             }
    //                             }
    //                         >
    //                             {({touched, errors, isSubmitting, status}) => (
    //
    //
    //                                 <Form>
    //                                     {status && <Alert variant='danger'>
    //                                         {status.message}
    //                                     </Alert>}
    //                                     <div className="form-group">
    //
    //                                         <label htmlFor="comment">Username</label>
    //                                         <Field
    //                                             type="text"
    //                                             name="username"
    //                                             placeholder="Write your new username..."
    //                                             className={`form-control ${
    //                                                 touched.content && errors.content ? "is-invalid" : ""
    //                                             }`}
    //                                         />
    //                                         <ErrorMessage
    //                                             component="div"
    //                                             name="username"
    //                                             className="invalid-feedback"
    //                                         />
    //                                     </div>
    //
    //                                     <div className="form-group">
    //
    //                                         <label htmlFor="comment">Email</label>
    //                                         <Field
    //                                             type="email"
    //                                             name="email"
    //                                             placeholder="Write your new email..."
    //                                             className={`form-control ${
    //                                                 touched.content && errors.content ? "is-invalid" : ""
    //                                             }`}
    //                                         />
    //                                         <ErrorMessage
    //                                             component="div"
    //                                             name="email"
    //                                             className="invalid-feedback"
    //                                         />
    //                                     </div>
    //
    //                                     <div className="form-group">
    //
    //                                         <label htmlFor="about_me">About Me</label>
    //                                         <Field
    //                                             type="text"
    //                                             name="about_me"
    //                                             component="textarea"
    //                                             placeholder="Write your new bio..."
    //                                             className={`form-control ${
    //                                                 touched.content && errors.content ? "is-invalid" : ""
    //                                             }`}
    //                                         />
    //                                         <ErrorMessage
    //                                             component="div"
    //                                             name="about_me"
    //                                             className="invalid-feedback"
    //                                         />
    //                                     </div>
    //
    //                                     <Modal.Footer>
    //
    //                                         <Button onClick={handleClose} variant="secondary">Close</Button>
    //
    //                                         <button
    //                                             type="submit"
    //                                             className="btn btn-primary btn-block"
    //                                             disabled={isSubmitting}
    //                                         >
    //                                             {isSubmitting ? "Please wait..." : "Save Changes"}
    //                                         </button>
    //                                     </Modal.Footer>
    //
    //                                 </Form>
    //                             )}
    //                         </Formik>
    //                     </div>
    //                 </div>
    //             </Modal.Body>
    //
    //         </Modal>
    //     </div>
    // );
}