import React, {useContext, useState} from "react";
import PostFeed from "./post_feed";
import {AuthContext} from "../../services/auth";


export default function Posts(props) {
    let userContext = useContext(AuthContext);


    return (


        <React.Fragment>


            {/*Fixed Sidebar Left */}

            <div className="fixed-sidebar open">
                <div className="fixed-sidebar-left sidebar--small" id="sidebar-left" style={{
                    "WebkitTransform": "translateX(0%)",
                    "transform": "translateX(0%)"
                }}>

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

            {/*... end Fixed Sidebar Left */}


            {/* Fixed Sidebar Left */}

            <div className="fixed-sidebar fixed-sidebar-responsive">

                <div className="fixed-sidebar-left sidebar--small" id="sidebar-left-responsive">
                    <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                       className="logo js-sidebar-open">
                        <img src="assets/img/./logo.png"/>
                    </a>

                </div>

                <div className="fixed-sidebar-left sidebar--large" id="sidebar-left-1-responsive">
                    <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#" className="logo">
                        <div className="img-wrap">
                            <img src="assets/img/./logo.png"/>
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

                        <div className="ps__scrollbar-x-rail" style={{"left": "0px", "bottom": "0px"}}>
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

                            <ul className="notification-list chat-message">
                                <li className="message-unread">
                                    <div className="author-thumb">
                                        <img src="assets/img/./avatar59-sm.jpg" alt="author"/>
                                    </div>
                                    <div className="notification-event">
                                        <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                                           className="h6 notification-friend">Diana Jameson</a>
                                        <span className="chat-message-item">Hi James! It’s Diana, I just wanted to let you know that we have to reschedule...</span>
                                        <span className="notification-date"><time className="entry-date updated"
                                                                                  dateTime="2004-07-24T18:18">4 hours ago</time></span>
                                    </div>
                                    <span className="notification-icon">
										<svg className="olymp-chat---messages-icon"><use
                                            xlinkHref="http://www.w3.org/1999/xlink"
                                            xlinkHref="assets/img/./icons.svg#olymp-chat---messages-icon"></use></svg>
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
                                        <img src="assets/img/./avatar60-sm.jpg" alt="author"/>
                                    </div>
                                    <div className="notification-event">
                                        <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                                           className="h6 notification-friend">Jake Parker</a>
                                        <span className="chat-message-item">Great, I’ll see you tomorrow!.</span>
                                        <span className="notification-date"><time className="entry-date updated"
                                                                                  dateTime="2004-07-24T18:18">4 hours ago</time></span>
                                    </div>
                                    <span className="notification-icon">
										<svg className="olymp-chat---messages-icon"><use
                                            xlinkHref="http://www.w3.org/1999/xlink"
                                            xlinkHref="assets/img/./icons.svg#olymp-chat---messages-icon"></use></svg>
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
                                        <img src="assets/img/./avatar61-sm.jpg" alt="author"/>
                                    </div>
                                    <div className="notification-event">
                                        <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                                           className="h6 notification-friend">Elaine Dreyfuss</a>
                                        <span className="chat-message-item">We’ll have to check that at the office and see if the client is on board with...</span>
                                        <span className="notification-date"><time className="entry-date updated"
                                                                                  dateTime="2004-07-24T18:18">Yesterday at 9:56pm</time></span>
                                    </div>
                                    <span className="notification-icon">
											<svg className="olymp-chat---messages-icon"><use
                                                xlinkHref="http://www.w3.org/1999/xlink"
                                                xlinkHref="assets/img/./icons.svg#olymp-chat---messages-icon"></use></svg>
										</span>
                                    <div className="more">
                                        <svg className="olymp-three-dots-icon">
                                            <use xlinkHref="http://www.w3.org/1999/xlink"
                                                 xlinkHref="assets/img/./icons.svg#olymp-three-dots-icon"></use>
                                        </svg>
                                    </div>
                                </li>

                                <li className="chat-group">
                                    <div className="author-thumb">
                                        <img src="assets/img/./avatar11-sm.jpg" alt="author"/>
                                        <img src="assets/img/./avatar12-sm.jpg" alt="author"/>
                                        <img src="assets/img/./avatar13-sm.jpg" alt="author"/>
                                        <img src="assets/img/./avatar10-sm.jpg" alt="author"/>
                                    </div>
                                    <div className="notification-event">
                                        <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                                           className="h6 notification-friend">You, Faye, Ed &amp; Jet +3</a>
                                        <span className="last-message-author">Ed:</span>
                                        <span className="chat-message-item">Yeah! Seems fine by me!</span>
                                        <span className="notification-date"><time className="entry-date updated"
                                                                                  dateTime="2004-07-24T18:18">March 16th at 10:23am</time></span>
                                    </div>
                                    <span className="notification-icon">
											<svg className="olymp-chat---messages-icon"><use
                                                xlinkHref="http://www.w3.org/1999/xlink"
                                                xlinkHref="assets/img/./icons.svg#olymp-chat---messages-icon"></use></svg>
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


            {/* ... end Top Header-Profile */}
            <div className="container">
                <div className="row">

                    {/* Main Content */}

                    <div className="col col-xl-6 order-xl-2 col-lg-12 order-lg-1 col-md-12 col-sm-12 col-12">

                        <div className="ui-block">

                            {/* News Feed Form  */}

                            <div className="news-feed-form">
                                {/* Nav tabs */}
                                <ul className="nav nav-tabs" role="tablist">
                                    <li className="nav-item">
                                        <a className="nav-link active inline-items" data-toggle="tab" href="#home-1"
                                           role="tab" aria-expanded="true">

                                            <svg className="olymp-status-icon">
                                                <use xlinkHref="http://www.w3.org/1999/xlink"
                                                     xlinkHref="assets/img/./icons.svg#olymp-status-icon"></use>
                                            </svg>

                                            <span>Status</span>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link inline-items" data-toggle="tab" href="#profile-1"
                                           role="tab"
                                           aria-expanded="false">

                                            <svg className="olymp-multimedia-icon">
                                                <use xlinkHref="http://www.w3.org/1999/xlink"
                                                     xlinkHref="assets/img/./icons.svg#olymp-multimedia-icon"></use>
                                            </svg>

                                            <span>Multimedia</span>
                                        </a>
                                    </li>

                                    <li className="nav-item">
                                        <a className="nav-link inline-items" data-toggle="tab" href="#blog" role="tab"
                                           aria-expanded="false">
                                            <svg className="olymp-blog-icon">
                                                <use xlinkHref="http://www.w3.org/1999/xlink"
                                                     xlinkHref="assets/img/./icons.svg#olymp-blog-icon"></use>
                                            </svg>

                                            <span>Blog Post</span>
                                        </a>
                                    </li>
                                </ul>

                                {/* Tab panes */}
                                <div className="tab-content">
                                    <div className="tab-pane active" id="home-1" role="tabpanel" aria-expanded="true">
                                        <form>
                                            <div className="author-thumb">
                                                <img src="assets/img/./author-page.jpg" alt="author"/>
                                            </div>
                                            <div className="form-group with-icon label-floating is-empty">
                                                <label className="control-label">Share what you are thinking
                                                    here...</label>
                                                <textarea className="form-control" placeholder=""></textarea>
                                                <span className="material-input"></span></div>
                                            <div className="add-options-message">
                                                <a href="#" className="options-message" data-toggle="tooltip"
                                                   data-placement="top" data-original-title="ADD PHOTOS">
                                                    <svg className="olymp-camera-icon" data-toggle="modal"
                                                         data-target="#update-header-photo">
                                                        <use xlinkHref="http://www.w3.org/1999/xlink"
                                                             xlinkHref="assets/img/./icons.svg#olymp-camera-icon"></use>
                                                    </svg>
                                                </a>


                                                <button className="btn btn-primary btn-md-2"
                                                        style={{"backgroundColor": "#3d5fbf", "border": "0px"}}>Post
                                                    Status
                                                </button>

                                            </div>

                                        </form>
                                    </div>

                                    <div className="tab-pane" id="profile-1" role="tabpanel" aria-expanded="true">
                                        <form>
                                            <div className="author-thumb">
                                                <img src="img/author-page.jpg" alt="author"/>
                                            </div>
                                            <div className="form-group with-icon label-floating is-empty">
                                                <label className="control-label">Share what you are thinking
                                                    here...</label>
                                                <textarea className="form-control" placeholder=""></textarea>
                                                <span className="material-input"></span></div>
                                            <div className="add-options-message">
                                                <a href="#" className="options-message" data-toggle="tooltip"
                                                   data-placement="top" data-original-title="ADD PHOTOS">
                                                    <svg className="olymp-camera-icon" data-toggle="modal"
                                                         data-target="#update-header-photo">
                                                        <use xlinkHref="http://www.w3.org/1999/xlink"
                                                             xlinkHref="assets/img/./icons.svg#olymp-camera-icon"></use>
                                                    </svg>
                                                </a>


                                                <button className="btn btn-primary btn-md-2">Post Status</button>

                                            </div>

                                        </form>
                                    </div>

                                    <div className="tab-pane" id="blog" role="tabpanel" aria-expanded="true">
                                        <form>
                                            <div className="author-thumb">
                                                <img src="img/author-page.jpg" alt="author"/>
                                            </div>
                                            <div className="form-group with-icon label-floating is-empty">
                                                <label className="control-label">Share what you are thinking
                                                    here...</label>
                                                <textarea className="form-control" placeholder=""></textarea>
                                                <span className="material-input"></span></div>
                                            <div className="add-options-message">
                                                <a href="#" className="options-message" data-toggle="tooltip"
                                                   data-placement="top" data-original-title="ADD PHOTOS">
                                                    <svg className="olymp-camera-icon" data-toggle="modal"
                                                         data-target="#update-header-photo">
                                                        <use xlinkHref="http://www.w3.org/1999/xlink"
                                                             xlinkHref="assets/img/./icons.svg#olymp-camera-icon"></use>
                                                    </svg>
                                                </a>


                                                <button className="btn btn-primary btn-md-2">Post Status</button>

                                            </div>

                                        </form>
                                    </div>
                                </div>
                            </div>

                            {/* ... end News Feed Form  */}            </div>

                        <div className="ui-block" style={{"position": "relative", "left": "0px", "marginTop": "30px"}}>

                            <div id="newsfeed-items-grid" style={{"position": "relative", "marginTop": "30px"}}>
                                {/* Post */}

                                <article className="hentry post video">

                                    <div className="post__author author vcard inline-items">
                                        <img src="assets/img/./author-page.jpg" alt="author"/>

                                        <div className="author-date">
                                            <a className="h6 post__author-name fn"
                                               href="https://html.crumina.net/html-olympus/02-ProfilePage.html"
                                            >{userContext.currentUser.username} {userContext.currentUser.verified}</a> shared
                                            a
                                            <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                                               style={{"color": "#6993af"}}>link</a>
                                            <div className="post__date">
                                                <time className="published" dateTime="2017-03-24T18:18">
                                                    7 hours ago
                                                </time>
                                            </div>
                                        </div>

                                        <div className="more">
                                            <svg className="olymp-three-dots-icon">
                                                <use xlinkHref="http://www.w3.org/1999/xlink"
                                                     xlinkHref="assets/img/./icons.svg#olymp-three-dots-icon"></use>
                                            </svg>
                                            <ul className="more-dropdown">
                                                <li>
                                                    <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#">Edit
                                                        Post</a>
                                                </li>
                                                <li>
                                                    <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#">Delete
                                                        Post</a>
                                                </li>
                                                <li>
                                                    <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#">Turn
                                                        Off Notifications</a>
                                                </li>
                                                <li>
                                                    <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#">Select
                                                        as Featured</a>
                                                </li>
                                            </ul>
                                        </div>

                                    </div>

                                    <p>If someone missed it, check out the new song by System of a Revenge! I thinks
                                        they
                                        are going back to their roots...</p>

                                    <div className="post-video">
                                        <div className="video-thumb">
                                            <img src="assets/img/./video5.jpg" alt="photo"/>
                                            <a href="https://youtube.com/watch?v=excVFQ2TWig" className="play-video">
                                                <svg className="olymp-play-icon">
                                                    <use xlinkHref="http://www.w3.org/1999/xlink"
                                                         xlinkHref="assets/img/./icons.svg#olymp-play-icon"></use>
                                                </svg>
                                            </a>
                                        </div>

                                        <div className="video-content">
                                            <a style={{
                                                "h4_title": {"color": "#ff6a00"},
                                                "h4_title_hover": {"color": "#ff6a00"}
                                            }} href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                                               className="h4 title">

                                                System of a Revenge - Nothing Else Matters (LIVE)</a>
                                            <p>Lorem ipsum dolor sit amet, consectetur ipisicing elit, sed do eiusmod
                                                tempo
                                                incididunt ut labore..</p>
                                            <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                                               className="link-site">YOUTUBE.COM</a>
                                        </div>
                                    </div>

                                    <div className="post-additional-info inline-items">

                                        <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                                           className="post-add-icon inline-items">
                                            <svg className="olymp-heart-icon">
                                                <use xlinkHref="http://www.w3.org/1999/xlink"
                                                     xlinkHref="assets/img/./icons.svg#olymp-heart-icon"></use>
                                            </svg>
                                            <span>15</span>
                                        </a>
                                        {/*
                                                                    <ul class="friends-harmonic">
                                                                        <li>
                                                                            <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#">
                                                                                <img src="assets/img/./friend-harmonic9.jpg" alt="friend">
                                                                            </a>
                                                                        </li>
                                                                        <li>
                                                                            <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#">
                                                                                <img src="assets/img/./friend-harmonic10.jpg" alt="friend">
                                                                            </a>
                                                                        </li>
                                                                        <li>
                                                                            <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#">
                                                                                <img src="assets/img/./friend-harmonic7.jpg" alt="friend">
                                                                            </a>
                                                                        </li>
                                                                        <li>
                                                                            <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#">
                                                                                <img src="assets/img/./friend-harmonic8.jpg" alt="friend">
                                                                            </a>
                                                                        </li>
                                                                        <li>
                                                                            <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#">
                                                                                <img src="assets/img/./friend-harmonic11.jpg" alt="friend">
                                                                            </a>
                                                                        </li>
                                                                    </ul>
                                                         */}
                                        {/* 								<div class="names-people-likes">
                                                                        <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#">Jenny</a>, <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#">Robert</a> and
                                                                        <br>13 more liked this
                                                                    </div>
                                                         */}


                                    </div>

                                    {/* 							<div class="control-block-button post-control-button">

                                                                <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#" class="btn btn-control">
                                                                    <svg class="olymp-like-post-icon">
                                                                        <use xlinkHref="http://www.w3.org/1999/xlink" xlinkHref="assets/img/./icons.svg#olymp-like-post-icon"></use>
                                                                    </svg>
                                                                </a>

                                                                <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#" class="btn btn-control">
                                                                    <svg class="olymp-comments-post-icon">
                                                                        <use xlinkHref="http://www.w3.org/1999/xlink" xlinkHref="assets/img/./icons.svg#olymp-comments-post-icon"></use>
                                                                    </svg>
                                                                </a>

                                                                <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#" class="btn btn-control">
                                                                    <svg class="olymp-share-icon">
                                                                        <use xlinkHref="http://www.w3.org/1999/xlink" xlinkHref="assets/img/./icons.svg#olymp-share-icon"></use>
                                                                    </svg>
                                                                </a>

                                                            </div>
                                                     */}
                                </article>

                                {/* .. end Post */}                </div>
                            <div className="ui-block"
                                 style={{"position": "relative", "left": "0px", "marginTop": "30px"}}>
                                {/* Post */}

                                <article className="hentry post">

                                    <div className="post__author author vcard inline-items">
                                        <img src="assets/img/./author-page.jpg" alt="author"/>

                                        <div className="author-date">
                                            <a className="h6 post__author-name fn"
                                               href="https://html.crumina.net/html-olympus/02-ProfilePage.html">{userContext.currentUser.username} {userContext.currentUser.verified}</a>
                                            <div className="post__date">
                                                <time className="published" dateTime="2017-03-24T18:18">
                                                    2 hours ago
                                                </time>
                                            </div>
                                        </div>

                                        <div className="more">
                                            <svg className="olymp-three-dots-icon">
                                                <use xlinkHref="http://www.w3.org/1999/xlink"
                                                     xlinkHref="assets/img/./icons.svg#olymp-three-dots-icon"></use>
                                            </svg>
                                            <ul className="more-dropdown">
                                                <li>
                                                    <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#">Edit
                                                        Post</a>
                                                </li>
                                                <li>
                                                    <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#">Delete
                                                        Post</a>
                                                </li>

                                            </ul>
                                        </div>

                                    </div>

                                    <p>Hey guys I just wanted to let y'all know i eat poop unironically stay tuned folks
                                        wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww
                                    </p>

                                    <div className="post-additional-info inline-items">

                                        <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                                           className="post-add-icon inline-items">
                                            <svg className="olymp-heart-icon">
                                                <use xlinkHref="http://www.w3.org/1999/xlink"
                                                     xlinkHref="assets/img/./icons.svg#olymp-heart-icon"></use>
                                            </svg>
                                            <span>36</span>
                                        </a>
                                        {/*
                                                                <ul class="friends-harmonic">
                                                                    <li>
                                                                        <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#">
                                                                            <img src="assets/img/./friend-harmonic7.jpg" alt="friend">
                                                                        </a>
                                                                    </li>
                                                                    <li>
                                                                        <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#">
                                                                            <img src="assets/img/./friend-harmonic8.jpg" alt="friend">
                                                                        </a>
                                                                    </li>
                                                                    <li>
                                                                        <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#">
                                                                            <img src="assets/img/./friend-harmonic9.jpg" alt="friend">
                                                                        </a>
                                                                    </li>
                                                                    <li>
                                                                        <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#">
                                                                            <img src="assets/img/./friend-harmonic10.jpg" alt="friend">
                                                                        </a>
                                                                    </li>
                                                                    <li>
                                                                        <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#">
                                                                            <img src="assets/img/./friend-harmonic11.jpg" alt="friend">
                                                                        </a>
                                                                    </li>
                                                                </ul> */}


                                    </div>

                                    {/* 						<div class="control-block-button post-control-button">

                                                            <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#" class="btn btn-control">
                                                                <svg class="olymp-like-post-icon">
                                                                    <use xlinkHref="http://www.w3.org/1999/xlink" xlinkHref="assets/img/./icons.svg#olymp-like-post-icon"></use>
                                                                </svg>
                                                            </a>

                                                            <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#" class="btn btn-control">
                                                                <svg class="olymp-comments-post-icon">
                                                                    <use xlinkHref="http://www.w3.org/1999/xlink" xlinkHref="assets/img/./icons.svg#olymp-comments-post-icon"></use>
                                                                </svg>
                                                            </a>

                                                            <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#" class="btn btn-control">
                                                                <svg class="olymp-share-icon">
                                                                    <use xlinkHref="http://www.w3.org/1999/xlink" xlinkHref="assets/img/./icons.svg#olymp-share-icon"></use>
                                                                </svg>
                                                            </a>

                                                        </div> */}

                                </article>

                                {/* .. end Post */}
                                {/* Comments */}

                                <ul className="comments-list">
                                    <li className="comment-item">
                                        <div className="post__author author vcard inline-items">
                                            <img src="assets/img/./avatar10-sm.jpg" alt="author"/>

                                            <div className="author-date">
                                                <a className="h6 post__author-name fn"
                                                   href="https://html.crumina.net/html-olympus/02-ProfilePage.html#">{userContext.currentUser.username} {userContext.currentUser.verified}</a>
                                                <div className="post__date">
                                                    <time className="published" dateTime="2017-03-24T18:18">
                                                        5 mins ago
                                                    </time>
                                                </div>
                                            </div>

                                            <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                                               className="more">
                                                <svg className="olymp-three-dots-icon">
                                                    <use xlinkHref="http://www.w3.org/1999/xlink"
                                                         xlinkHref="assets/img/./icons.svg#olymp-three-dots-icon"></use>
                                                </svg>
                                            </a>

                                        </div>

                                        <p>Hey guys I just wanted to let y'all know i eat poop unironically stay tuned
                                            folks</p>

                                        <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                                           className="post-add-icon inline-items">
                                            <svg className="olymp-heart-icon">
                                                <use xlinkHref="http://www.w3.org/1999/xlink"
                                                     xlinkHref="assets/img/./icons.svg#olymp-heart-icon"></use>
                                            </svg>
                                            <span>8</span>
                                        </a>
                                        <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                                           className="reply">Reply</a>
                                    </li>
                                    <li className="comment-item has-children">
                                        <div className="post__author author vcard inline-items">
                                            <img src="assets/img/./avatar5-sm.jpg" alt="author"/>

                                            <div className="author-date">
                                                <a className="h6 post__author-name fn"
                                                   href="https://html.crumina.net/html-olympus/02-ProfilePage.html#">{userContext.currentUser.username} {userContext.currentUser.verified}</a>
                                                <div className="post__date">
                                                    <time className="published" dateTime="2017-03-24T18:18">
                                                        1 hour ago
                                                    </time>
                                                </div>
                                            </div>

                                            <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                                               className="more">
                                                <svg className="olymp-three-dots-icon">
                                                    <use xlinkHref="http://www.w3.org/1999/xlink"
                                                         xlinkHref="assets/img/./icons.svg#olymp-three-dots-icon"></use>
                                                </svg>
                                            </a>

                                        </div>

                                        <p>Hey guys I just wanted to let y'all know i eat poop unironically stay tuned
                                            folks
                                        </p>

                                        <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                                           className="post-add-icon inline-items">
                                            <svg className="olymp-heart-icon">
                                                <use xlinkHref="http://www.w3.org/1999/xlink"
                                                     xlinkHref="assets/img/./icons.svg#olymp-heart-icon"></use>
                                            </svg>
                                            <span>5</span>
                                        </a>
                                        <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                                           className="reply">Reply</a>

                                        <ul className="children">
                                            <li className="comment-item">
                                                <div className="post__author author vcard inline-items">
                                                    <img src="assets/img/./avatar8-sm.jpg" alt="author"/>

                                                    <div className="author-date">
                                                        <a className="h6 post__author-name fn"
                                                           href="https://html.crumina.net/html-olympus/02-ProfilePage.html#">{userContext.currentUser.username} {userContext.currentUser.verified}</a>
                                                        <div className="post__date">
                                                            <time className="published" dateTime="2017-03-24T18:18">
                                                                39 mins ago
                                                            </time>
                                                        </div>
                                                    </div>

                                                    <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                                                       className="more">
                                                        <svg className="olymp-three-dots-icon">
                                                            <use xlinkHref="http://www.w3.org/1999/xlink"
                                                                 xlinkHref="assets/img/./icons.svg#olymp-three-dots-icon"></use>
                                                        </svg>
                                                    </a>

                                                </div>

                                                <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
                                                    dolore eu fugiat nulla pariatur.</p>

                                                <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                                                   className="post-add-icon inline-items">
                                                    <svg className="olymp-heart-icon">
                                                        <use xlinkHref="http://www.w3.org/1999/xlink"
                                                             xlinkHref="assets/img/./icons.svg#olymp-heart-icon"></use>
                                                    </svg>
                                                    <span>2</span>
                                                </a>
                                                <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                                                   className="reply">Reply</a>
                                            </li>
                                            <li className="comment-item">
                                                <div className="post__author author vcard inline-items">
                                                    <img src="assets/img/./avatar2-sm.jpg" alt="author"/>

                                                    <div className="author-date">
                                                        <a className="h6 post__author-name fn"
                                                           href="https://html.crumina.net/html-olympus/02-ProfilePage.html#">{userContext.currentUser.username} {userContext.currentUser.verified}</a>
                                                        <div className="post__date">
                                                            <time className="published" dateTime="2017-03-24T18:18">
                                                                24 mins ago
                                                            </time>
                                                        </div>
                                                    </div>

                                                    <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                                                       className="more">
                                                        <svg className="olymp-three-dots-icon">
                                                            <use xlinkHref="http://www.w3.org/1999/xlink"
                                                                 xlinkHref="assets/img/./icons.svg#olymp-three-dots-icon"></use>
                                                        </svg>
                                                    </a>

                                                </div>

                                                <p>Excepteur sint occaecat cupidatat non proident.</p>

                                                <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                                                   className="post-add-icon inline-items">
                                                    <svg className="olymp-heart-icon">
                                                        <use xlinkHref="http://www.w3.org/1999/xlink"
                                                             xlinkHref="assets/img/./icons.svg#olymp-heart-icon"></use>
                                                    </svg>
                                                    <span>0</span>
                                                </a>
                                                <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                                                   className="reply">Reply</a>

                                            </li>
                                        </ul>

                                    </li>

                                    <li className="comment-item">
                                        <div className="post__author author vcard inline-items">
                                            <img src="assets/img/./avatar4-sm.jpg" alt="author"/>

                                            <div className="author-date">
                                                <a className="h6 post__author-name fn"
                                                   href="https://html.crumina.net/html-olympus/02-ProfilePage.html#">{userContext.currentUser.username} {userContext.currentUser.verified}</a>
                                                <div className="post__date">
                                                    <time className="published" dateTime="2017-03-24T18:18">
                                                        1 hour ago
                                                    </time>
                                                </div>
                                            </div>

                                            <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                                               className="more">
                                                <svg className="olymp-three-dots-icon">
                                                    <use xlinkHref="http://www.w3.org/1999/xlink"
                                                         xlinkHref="assets/img/./icons.svg#olymp-three-dots-icon"></use>
                                                </svg>
                                            </a>

                                        </div>

                                        <p>Dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                                            proident,
                                            sunt in culpa qui officia deserunt mollit.</p>

                                        <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                                           className="post-add-icon inline-items">
                                            <svg className="olymp-heart-icon">
                                                <use xlinkHref="http://www.w3.org/1999/xlink"
                                                     xlinkHref="assets/img/./icons.svg#olymp-heart-icon"></use>
                                            </svg>
                                            <span>7</span>
                                        </a>
                                        <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                                           className="reply">Reply</a>

                                    </li>
                                </ul>

                                {/* ... end Comments */}
                                <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                                   className="more-comments">View more comments <span>+</span></a>

                                {/* Comment Form  */}

                                <form className="comment-form inline-items">

                                    <div className="post__author author vcard inline-items">
                                        <img src="assets/img/./author-page.jpg" alt="author"/>

                                        <div className="form-group with-icon-right is-empty">
                                            <textarea className="form-control" placeholder=""></textarea>
                                            <div className="add-options-message">
                                                <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                                                   className="options-message" data-toggle="modal"
                                                   data-target="#update-header-photo">
                                                    <svg className="olymp-camera-icon">
                                                        <use xlinkHref="http://www.w3.org/1999/xlink"
                                                             xlinkHref="assets/img/./icons.svg#olymp-camera-icon"></use>
                                                    </svg>
                                                </a>
                                            </div>
                                            <span className="material-input"></span></div>
                                    </div>

                                    <button className="btn btn-md-2 btn-primary"
                                            style={{"backgroundColor": "#3d5fbf", "borderColor": "#3d5fbf"}}>Post
                                        Comment
                                    </button>


                                </form>

                                {/* ... end Comment Form  */}                </div>


                            {/* Post */}


                            {/* .. end Post */}


                        </div>

                        <a id="load-more-button" href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                           className="btn btn-control btn-more hidden-xs-up" data-load-link="items-to-load.html"
                           data-container="newsfeed-items-grid">
                            <svg className="olymp-three-dots-icon">
                                <use xlinkHref="http://www.w3.org/1999/xlink"
                                     xlinkHref="assets/img/./icons.svg#olymp-three-dots-icon"></use>
                            </svg>
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
                                        <span className="title" style={{"color": "#ff8400"}}>About Me:</span>
                                        <span className="text">{userContext.currentUser.about_me}</span>
                                    </li>
                                    <li>
                                        <span className="title" style={{"color": "#ff8400"}}>Favourite TV Shows:</span>
                                        <span className="text">Breaking Good, RedDevil, People of Interest, The Running Dead, Found,  American Guy.</span>
                                    </li>
                                    <li>
                                    <span className="title"
                                          style={{"color": "#ff8400"}}>Favourite Music Bands / Artists:</span>
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
                                             xmlns="http://www.w3.org/2000/svg" viewBox="0 0 264 512" data-fa-i2svg="">
                                            <path fill="currentColor"
                                                  d="M76.7 512V283H0v-91h76.7v-71.7C76.7 42.4 124.3 0 193.8 0c33.3 0 61.9 2.5 70.2 3.6V85h-48.2c-37.8 0-45.1 18-45.1 44.3V192H256l-11.7 91h-73.6v229"></path>
                                        </svg>
                                        {/* <i class="fab fa-facebook-f" aria-hidden="true"></i> */}
                                        Facebook
                                    </a>
                                    <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                                       className="social-item bg-twitter">
                                        <svg className="svg-inline--fa fa-twitter fa-w-16" aria-hidden="true"
                                             data-prefix="fab" data-icon="twitter" role="img"
                                             xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="">
                                            <path fill="currentColor"
                                                  d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"></path>
                                        </svg>
                                        {/* <i class="fab fa-twitter" aria-hidden="true"></i> */}
                                        Twitter
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
                                        <img src="assets/img/./twitter-avatar1.png" alt="avatar"/>
                                        <div className="author">
                                            <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                                               className="author-name">{userContext.currentUser.username} {userContext.currentUser.verified}</a>
                                            <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                                               className="group">{userContext.currentUser.handle}</a>
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
                                        <img src="assets/img/./twitter-avatar1.png" alt="avatar"/>
                                        <div className="author">
                                            <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                                               className="author-name">{userContext.currentUser.username} {userContext.currentUser.verified}</a>
                                            <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                                               className="group">{userContext.currentUser.handle}</a>
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
                                        <img src="assets/img/./twitter-avatar1.png" alt="avatar"/>
                                        <div className="author">
                                            <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                                               className="author-name">{userContext.currentUser.username} {userContext.currentUser.verified}</a>
                                            <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                                               className="group">{userContext.currentUser.handle}</a>
                                        </div>
                                    </div>
                                    <p>The Sunday is the annual agency camping trip and I still haven’t got a tent
                                        <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
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
                                        <img src="assets/img/./playlist6.jpg" alt="thumb-composition"/>
                                        <div className="overlay"></div>
                                        <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                                           className="play-icon">
                                            <svg className="olymp-music-play-icon-big">
                                                <use xlinkHref="http://www.w3.org/1999/xlink"
                                                     xlinkHref="assets/img/./icons-music.svg#olymp-music-play-icon-big"></use>
                                            </svg>
                                        </a>
                                    </div>

                                    <div className="composition">
                                        <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                                           className="composition-name">The Past Starts Slow...</a>
                                        <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                                           className="composition-author">System of a Revenge</a>
                                    </div>

                                    <div className="composition-time">
                                        <time className="published" dateTime="2017-03-24T18:18">3:22</time>
                                        <div className="more">
                                            <svg className="olymp-three-dots-icon">
                                                <use xlinkHref="http://www.w3.org/1999/xlink"
                                                     xlinkHref="assets/img/./icons.svg#olymp-three-dots-icon"></use>
                                            </svg>
                                            <ul className="more-dropdown">
                                                <li>
                                                    <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#">Add
                                                        Song to Player</a>
                                                </li>
                                                <li>
                                                    <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#">Add
                                                        Playlist to Player</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>

                                </li>

                                <li className="js-open-popup" data-popup-target=".playlist-popup">
                                    <div className="playlist-thumb">
                                        <img src="assets/img/./playlist7.jpg" alt="thumb-composition"/>
                                        <div className="overlay"></div>
                                        <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                                           className="play-icon">
                                            <svg className="olymp-music-play-icon-big">
                                                <use xlinkHref="http://www.w3.org/1999/xlink"
                                                     xlinkHref="assets/img/./icons-music.svg#olymp-music-play-icon-big"></use>
                                            </svg>
                                        </a>
                                    </div>

                                    <div className="composition">
                                        <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                                           className="composition-name">The Pretender</a>
                                        <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                                           className="composition-author">Kung Fighters</a>
                                    </div>

                                    <div className="composition-time">
                                        <time className="published" dateTime="2017-03-24T18:18">5:48</time>
                                        <div className="more">
                                            <svg className="olymp-three-dots-icon">
                                                <use xlinkHref="http://www.w3.org/1999/xlink"
                                                     xlinkHref="assets/img/./icons.svg#olymp-three-dots-icon"></use>
                                            </svg>
                                            <ul className="more-dropdown">
                                                <li>
                                                    <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#">Add
                                                        Song to Player</a>
                                                </li>
                                                <li>
                                                    <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#">Add
                                                        Playlist to Player</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>

                                </li>
                                <li className="js-open-popup" data-popup-target=".playlist-popup">
                                    <div className="playlist-thumb">
                                        <img src="assets/img/./playlist8.jpg" alt="thumb-composition"/>
                                        <div className="overlay"></div>
                                        <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                                           className="play-icon">
                                            <svg className="olymp-music-play-icon-big">
                                                <use xlinkHref="http://www.w3.org/1999/xlink"
                                                     xlinkHref="assets/img/./icons-music.svg#olymp-music-play-icon-big"></use>
                                            </svg>
                                        </a>
                                    </div>

                                    <div className="composition">
                                        <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                                           className="composition-name">Blood Brothers</a>
                                        <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                                           className="composition-author">Iron Maid</a>
                                    </div>

                                    <div className="composition-time">
                                        <time className="published" dateTime="2017-03-24T18:18">3:06</time>
                                        <div className="more">
                                            <svg className="olymp-three-dots-icon">
                                                <use xlinkHref="http://www.w3.org/1999/xlink"
                                                     xlinkHref="assets/img/./icons.svg#olymp-three-dots-icon"></use>
                                            </svg>
                                            <ul className="more-dropdown">
                                                <li>
                                                    <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#">Add
                                                        Song to Player</a>
                                                </li>
                                                <li>
                                                    <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#">Add
                                                        Playlist to Player</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>

                                </li>
                                <li className="js-open-popup" data-popup-target=".playlist-popup">
                                    <div className="playlist-thumb">
                                        <img src="assets/img/./playlist9.jpg" alt="thumb-composition"/>
                                        <div className="overlay"></div>
                                        <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                                           className="play-icon">
                                            <svg className="olymp-music-play-icon-big">
                                                <use xlinkHref="http://www.w3.org/1999/xlink"
                                                     xlinkHref="assets/img/./icons-music.svg#olymp-music-play-icon-big"></use>
                                            </svg>
                                        </a>
                                    </div>

                                    <div className="composition">
                                        <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                                           className="composition-name">Seven Nation Army</a>
                                        <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                                           className="composition-author">The Black Stripes</a>
                                    </div>

                                    <div className="composition-time">
                                        <time className="published" dateTime="2017-03-24T18:18">6:17</time>
                                        <div className="more">
                                            <svg className="olymp-three-dots-icon">
                                                <use xlinkHref="http://www.w3.org/1999/xlink"
                                                     xlinkHref="assets/img/./icons.svg#olymp-three-dots-icon"></use>
                                            </svg>
                                            <ul className="more-dropdown">
                                                <li>
                                                    <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#">Add
                                                        Song to Player</a>
                                                </li>
                                                <li>
                                                    <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#">Add
                                                        Playlist to Player</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>

                                </li>
                                <li className="js-open-popup" data-popup-target=".playlist-popup">
                                    <div className="playlist-thumb">
                                        <img src="assets/img/./playlist10.jpg" alt="thumb-composition"/>
                                        <div className="overlay"></div>
                                        <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                                           className="play-icon">
                                            <svg className="olymp-music-play-icon-big">
                                                <use xlinkHref="http://www.w3.org/1999/xlink"
                                                     xlinkHref="assets/img/./icons-music.svg#olymp-music-play-icon-big"></use>
                                            </svg>
                                        </a>
                                    </div>

                                    <div className="composition">
                                        <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                                           className="composition-name">Killer Queen</a>
                                        <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                                           className="composition-author">Archiduke</a>
                                    </div>

                                    <div className="composition-time">
                                        <time className="published" dateTime="2017-03-24T18:18">5:40</time>
                                        <div className="more">
                                            <svg className="olymp-three-dots-icon">
                                                <use xlinkHref="http://www.w3.org/1999/xlink"
                                                     xlinkHref="assets/img/./icons.svg#olymp-three-dots-icon"></use>
                                            </svg>
                                            <ul className="more-dropdown">
                                                <li>
                                                    <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#">Add
                                                        Song to Player</a>
                                                </li>
                                                <li>
                                                    <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#">Add
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
                            <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                               className="close icon-close" data-dismiss="modal" aria-label="Close">
                                <svg className="olymp-close-icon">
                                    <use xlinkHref="http://www.w3.org/1999/xlink"
                                         xlinkHref="assets/img/./icons.svg#olymp-close-icon"></use>
                                </svg>
                            </a>

                            <div className="modal-header" style={{"backgroundColor": "#3d5fbf"}}>
                                <h6 className="title">Update Header Photo</h6>
                            </div>

                            <div className="modal-body">
                                <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                                   className="upload-photo-item">
                                    <svg className="olymp-computer-icon">
                                        <use xlinkHref="http://www.w3.org/1999/xlink"
                                             xlinkHref="assets/img/./icons.svg#olymp-computer-icon"></use>
                                    </svg>

                                    <h6>Upload Photo</h6>
                                    <span>Browse your computer.</span>
                                </a>

                                <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                                   className="upload-photo-item" data-toggle="modal"
                                   data-target="#choose-from-my-photo">

                                    <svg className="olymp-photos-icon">
                                        <use xlinkHref="http://www.w3.org/1999/xlink"
                                             xlinkHref="assets/img/./icons.svg#olymp-photos-icon"></use>
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
                            <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                               className="close icon-close" data-dismiss="modal" aria-label="Close">
                                <svg className="olymp-close-icon">
                                    <use xlinkHref="http://www.w3.org/1999/xlink"
                                         xlinkHref="assets/img/./icons.svg#olymp-close-icon"></use>
                                </svg>
                            </a>
                            <div className="modal-header">
                                <h6 className="title">Choose from My Photos</h6>

                                {/* Nav tabs */}
                                <ul className="nav nav-tabs" role="tablist">
                                    <li className="nav-item">
                                        <a className="nav-link active" data-toggle="tab"
                                           href="https://html.crumina.net/html-olympus/02-ProfilePage.html#home"
                                           role="tab"
                                           aria-expanded="true">
                                            <svg className="olymp-photos-icon">
                                                <use xlinkHref="http://www.w3.org/1999/xlink"
                                                     xlinkHref="assets/img/./icons.svg#olymp-photos-icon"></use>
                                            </svg>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" data-toggle="tab"
                                           href="https://html.crumina.net/html-olympus/02-ProfilePage.html#profile"
                                           role="tab" aria-expanded="false">
                                            <svg className="olymp-albums-icon">
                                                <use xlinkHref="http://www.w3.org/1999/xlink"
                                                     xlinkHref="assets/img/./icons.svg#olymp-albums-icon"></use>
                                            </svg>
                                        </a>
                                    </li>
                                </ul>
                            </div>

                            <div className="modal-body">
                                {/* Tab panes */}
                                <div className="tab-content">
                                    <div className="tab-pane active" id="home" role="tabpanel" aria-expanded="true">

                                        <div className="choose-photo-item" data-mh="choose-item"
                                             style={{"height": "175.984px"}}>
                                            <div className="radio">
                                                <label className="custom-radio">
                                                    <img src="assets/img/./choose-photo1.jpg" alt="photo"/>
                                                    <input type="radio" name="optionsRadios"/><span
                                                    className="circle"/><span className="check"></span>
                                                </label>
                                            </div>
                                        </div>
                                        <div className="choose-photo-item" data-mh="choose-item"
                                             style={{"height": "175.984px"}}>
                                            <div className="radio">
                                                <label className="custom-radio">
                                                    <img src="assets/img/./choose-photo2.jpg" alt="photo"/>
                                                    <input type="radio" name="optionsRadios"/><span
                                                    className="circle"></span><span className="check"></span>
                                                </label>
                                            </div>
                                        </div>
                                        <div className="choose-photo-item" data-mh="choose-item"
                                             style={{"height": "175.984px"}}>
                                            <div className="radio">
                                                <label className="custom-radio">
                                                    <img src="assets/img/./choose-photo3.jpg" alt="photo"/>
                                                    <input type="radio" name="optionsRadios"/><span
                                                    className="circle"></span><span className="check"></span>
                                                </label>
                                            </div>
                                        </div>

                                        <div className="choose-photo-item" data-mh="choose-item"
                                             style={{"height": "175.984px"}}>
                                            <div className="radio">
                                                <label className="custom-radio">
                                                    <img src="assets/img/./choose-photo4.jpg" alt="photo"/>
                                                    <input type="radio" name="optionsRadios"/><span
                                                    className="circle"></span><span className="check"></span>
                                                </label>
                                            </div>
                                        </div>
                                        <div className="choose-photo-item" data-mh="choose-item"
                                             style={{"height": "175.984px"}}>
                                            <div className="radio">
                                                <label className="custom-radio">
                                                    <img src="assets/img/./choose-photo5.jpg" alt="photo"/>
                                                    <input type="radio" name="optionsRadios"/><span
                                                    className="circle"></span><span className="check"></span>
                                                </label>
                                            </div>
                                        </div>
                                        <div className="choose-photo-item" data-mh="choose-item"
                                             style={{"height": "175.984px"}}>
                                            <div className="radio">
                                                <label className="custom-radio">
                                                    <img src="assets/img/./choose-photo6.jpg" alt="photo"/>
                                                    <input type="radio" name="optionsRadios"/><span
                                                    className="circle"></span><span className="check"></span>
                                                </label>
                                            </div>
                                        </div>

                                        <div className="choose-photo-item" data-mh="choose-item"
                                             style={{"height": "175.984px"}}>
                                            <div className="radio">
                                                <label className="custom-radio">
                                                    <img src="assets/img/./choose-photo7.jpg" alt="photo"/>
                                                    <input type="radio" name="optionsRadios"/><span
                                                    className="circle"></span><span className="check"></span>
                                                </label>
                                            </div>
                                        </div>
                                        <div className="choose-photo-item" data-mh="choose-item"
                                             style={{"height": "175.984px"}}>
                                            <div className="radio">
                                                <label className="custom-radio">
                                                    <img src="assets/img/./choose-photo8.jpg" alt="photo"/>
                                                    <input type="radio" name="optionsRadios"/><span
                                                    className="circle"></span><span className="check"></span>
                                                </label>
                                            </div>
                                        </div>
                                        <div className="choose-photo-item" data-mh="choose-item"
                                             style={{"height": "175.984px"}}>
                                            <div className="radio">
                                                <label className="custom-radio">
                                                    <img src="assets/img/./choose-photo9.jpg" alt="photo"/>
                                                    <input type="radio" name="optionsRadios"/><span
                                                    className="circle"></span><span className="check"></span>
                                                </label>
                                            </div>
                                        </div>


                                        <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                                           className="btn btn-secondary btn-lg btn--half-width">Cancel</a>
                                        <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                                           className="btn btn-primary btn-lg btn--half-width">Confirm Photo</a>

                                    </div>
                                    <div className="tab-pane" id="profile" role="tabpanel" aria-expanded="false">

                                        <div className="choose-photo-item" data-mh="choose-item"
                                             style={{"height": "175.984px"}}>
                                            <figure>
                                                <img src="assets/img/./choose-photo10.jpg" alt="photo"/>
                                                <figcaption>
                                                    <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#">South
                                                        America Vacations</a>
                                                    <span>Last Added: 2 hours ago</span>
                                                </figcaption>
                                            </figure>
                                        </div>
                                        <div className="choose-photo-item" data-mh="choose-item"
                                             style={{"height": "175.984px"}}>
                                            <figure>
                                                <img src="assets/img/./choose-photo11.jpg" alt="photo"/>
                                                <figcaption>
                                                    <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#">Photoshoot
                                                        Summer 2016</a>
                                                    <span>Last Added: 5 weeks ago</span>
                                                </figcaption>
                                            </figure>
                                        </div>
                                        <div className="choose-photo-item" data-mh="choose-item"
                                             style={{"height": "272px"}}>
                                            <figure>
                                                <img src="assets/img/./choose-photo12.jpg" alt="photo"/>
                                                <figcaption>
                                                    <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#">Amazing
                                                        Street Food</a>
                                                    <span>Last Added: 6 mins ago</span>
                                                </figcaption>
                                            </figure>
                                        </div>

                                        <div className="choose-photo-item" data-mh="choose-item"
                                             style={{"height": "272px"}}>
                                            <figure>
                                                <img src="assets/img/./choose-photo13.jpg" alt="photo"/>
                                                <figcaption>
                                                    <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#">Graffity &amp; Street
                                                        Art</a>
                                                    <span>Last Added: 16 hours ago</span>
                                                </figcaption>
                                            </figure>
                                        </div>
                                        <div className="choose-photo-item" data-mh="choose-item"
                                             style={{"height": "272px"}}>
                                            <figure>
                                                <img src="assets/img/./choose-photo14.jpg" alt="photo"/>
                                                <figcaption>
                                                    <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#">Amazing
                                                        Landscapes</a>
                                                    <span>Last Added: 13 mins ago</span>
                                                </figcaption>
                                            </figure>
                                        </div>
                                        <div className="choose-photo-item" data-mh="choose-item"
                                             style={{"height": "272px"}}>
                                            <figure>
                                                <img src="assets/img/./choose-photo15.jpg" alt="photo"/>
                                                <figcaption>
                                                    <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#">The
                                                        Majestic Canyon</a>
                                                    <span>Last Added: 57 mins ago</span>
                                                </figcaption>
                                            </figure>
                                        </div>


                                        <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                                           className="btn btn-secondary btn-lg btn--half-width">Cancel</a>
                                        <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                                           className="btn btn-primary btn-lg disabled btn--half-width">Confirm Photo</a>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                {/* ... end Window-popup Choose from my Photo */}

                {/* Playlist Popup */}

                <div className="window-popup playlist-popup" tabIndex="-1" role="dialog"
                     aria-labelledby="playlist-popup"
                     aria-hidden="true">

                    <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html"
                       className="icon-close js-close-popup">
                        <svg className="olymp-close-icon">
                            <use xlinkHref="http://www.w3.org/1999/xlink"
                                 xlinkHref="assets/img/./icons.svg#olymp-close-icon"></use>
                        </svg>
                    </a>

                    <div className="mCustomScrollbar ps ps--theme_default"
                         data-ps-id="d5efeaef-140f-f06d-c4cb-c461425f8c7c">
                        <table className="playlist-popup-table">

                            <thead>

                            <tr>

                                <th className="play">
                                    PLAY
                                </th>

                                <th className="cover">
                                    COVER
                                </th>

                                <th className="song-artist">
                                    SONG AND ARTIST
                                </th>

                                <th className="album">
                                    ALBUM
                                </th>

                                <th className="released">
                                    RELEASED
                                </th>

                                <th className="duration">
                                    DURATION
                                </th>

                                <th className="spotify">
                                    GET IT ON SPOTIFY
                                </th>

                                <th className="remove">
                                    REMOVE
                                </th>
                            </tr>

                            </thead>

                            <tbody>
                            <tr>
                                <td className="play">
                                    <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                                       className="play-icon">
                                        <svg className="olymp-music-play-icon-big">
                                            <use xlinkHref="http://www.w3.org/1999/xlink"
                                                 xlinkHref="assets/img/./icons-music.svg#olymp-music-play-icon-big"></use>
                                        </svg>
                                    </a>
                                </td>
                                <td className="cover">
                                    <div className="playlist-thumb">
                                        <img src="assets/img/./playlist19.jpg" alt="thumb-composition"/>
                                    </div>
                                </td>
                                <td className="song-artist">
                                    <div className="composition">
                                        <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                                           className="composition-name">We Can Be Heroes</a>
                                        <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                                           className="composition-author">Jason Bowie</a>
                                    </div>
                                </td>
                                <td className="album">
                                    <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                                       className="album-composition">Ziggy Firedust</a>
                                </td>
                                <td className="released">
                                    <div className="release-year">2014</div>
                                </td>
                                <td className="duration">
                                    <div className="composition-time">
                                        <time className="published" dateTime="2017-03-24T18:18">6:17</time>
                                    </div>
                                </td>
                                <td className="spotify">
                                    <svg className="svg-inline--fa fa-spotify fa-w-16 composition-icon"
                                         aria-hidden="true"
                                         data-prefix="fab" data-icon="spotify" role="img"
                                         xmlns="http://www.w3.org/2000/svg"
                                         viewBox="0 0 496 512" data-fa-i2svg="">
                                        <path fill="currentColor"
                                              d="M248 8C111.1 8 0 119.1 0 256s111.1 248 248 248 248-111.1 248-248S384.9 8 248 8zm100.7 364.9c-4.2 0-6.8-1.3-10.7-3.6-62.4-37.6-135-39.2-206.7-24.5-3.9 1-9 2.6-11.9 2.6-9.7 0-15.8-7.7-15.8-15.8 0-10.3 6.1-15.2 13.6-16.8 81.9-18.1 165.6-16.5 237 26.2 6.1 3.9 9.7 7.4 9.7 16.5s-7.1 15.4-15.2 15.4zm26.9-65.6c-5.2 0-8.7-2.3-12.3-4.2-62.5-37-155.7-51.9-238.6-29.4-4.8 1.3-7.4 2.6-11.9 2.6-10.7 0-19.4-8.7-19.4-19.4s5.2-17.8 15.5-20.7c27.8-7.8 56.2-13.6 97.8-13.6 64.9 0 127.6 16.1 177 45.5 8.1 4.8 11.3 11 11.3 19.7-.1 10.8-8.5 19.5-19.4 19.5zm31-76.2c-5.2 0-8.4-1.3-12.9-3.9-71.2-42.5-198.5-52.7-280.9-29.7-3.6 1-8.1 2.6-12.9 2.6-13.2 0-23.3-10.3-23.3-23.6 0-13.6 8.4-21.3 17.4-23.9 35.2-10.3 74.6-15.2 117.5-15.2 73 0 149.5 15.2 205.4 47.8 7.8 4.5 12.9 10.7 12.9 22.6 0 13.6-11 23.3-23.2 23.3z"></path>
                                    </svg>
                                    {/* <i class="fab fa-spotify composition-icon" aria-hidden="true"></i> */}
                                </td>
                                <td className="remove">
                                    <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                                       className="remove-icon">
                                        <svg className="olymp-close-icon">
                                            <use xlinkHref="http://www.w3.org/1999/xlink"
                                                 xlinkHref="assets/img/./icons.svg#olymp-close-icon"></use>
                                        </svg>
                                    </a>
                                </td>
                            </tr>

                            <tr>
                                <td className="play">
                                    <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                                       className="play-icon">
                                        <svg className="olymp-music-play-icon-big">
                                            <use xlinkHref="http://www.w3.org/1999/xlink"
                                                 xlinkHref="assets/img/./icons-music.svg#olymp-music-play-icon-big"></use>
                                        </svg>
                                    </a>
                                </td>
                                <td className="cover">
                                    <div className="playlist-thumb">
                                        <img src="assets/img/./playlist6.jpg" alt="thumb-composition"/>
                                    </div>
                                </td>
                                <td className="song-artist">
                                    <div className="composition">
                                        <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                                           className="composition-name">The Past Starts Slow and Ends</a>
                                        <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                                           className="composition-author">System of a Revenge</a>
                                    </div>
                                </td>
                                <td className="album">
                                    <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                                       className="album-composition">Wonderize</a>
                                </td>
                                <td className="released">
                                    <div className="release-year">2014</div>
                                </td>
                                <td className="duration">
                                    <div className="composition-time">
                                        <time className="published" dateTime="2017-03-24T18:18">6:17</time>
                                    </div>
                                </td>
                                <td className="spotify">
                                    <svg className="svg-inline--fa fa-spotify fa-w-16 composition-icon"
                                         aria-hidden="true"
                                         data-prefix="fab" data-icon="spotify" role="img"
                                         xmlns="http://www.w3.org/2000/svg"
                                         viewBox="0 0 496 512" data-fa-i2svg="">
                                        <path fill="currentColor"
                                              d="M248 8C111.1 8 0 119.1 0 256s111.1 248 248 248 248-111.1 248-248S384.9 8 248 8zm100.7 364.9c-4.2 0-6.8-1.3-10.7-3.6-62.4-37.6-135-39.2-206.7-24.5-3.9 1-9 2.6-11.9 2.6-9.7 0-15.8-7.7-15.8-15.8 0-10.3 6.1-15.2 13.6-16.8 81.9-18.1 165.6-16.5 237 26.2 6.1 3.9 9.7 7.4 9.7 16.5s-7.1 15.4-15.2 15.4zm26.9-65.6c-5.2 0-8.7-2.3-12.3-4.2-62.5-37-155.7-51.9-238.6-29.4-4.8 1.3-7.4 2.6-11.9 2.6-10.7 0-19.4-8.7-19.4-19.4s5.2-17.8 15.5-20.7c27.8-7.8 56.2-13.6 97.8-13.6 64.9 0 127.6 16.1 177 45.5 8.1 4.8 11.3 11 11.3 19.7-.1 10.8-8.5 19.5-19.4 19.5zm31-76.2c-5.2 0-8.4-1.3-12.9-3.9-71.2-42.5-198.5-52.7-280.9-29.7-3.6 1-8.1 2.6-12.9 2.6-13.2 0-23.3-10.3-23.3-23.6 0-13.6 8.4-21.3 17.4-23.9 35.2-10.3 74.6-15.2 117.5-15.2 73 0 149.5 15.2 205.4 47.8 7.8 4.5 12.9 10.7 12.9 22.6 0 13.6-11 23.3-23.2 23.3z"></path>
                                    </svg>
                                    {/* <i class="fab fa-spotify composition-icon" aria-hidden="true"></i> */}
                                </td>
                                <td className="remove">
                                    <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                                       className="remove-icon">
                                        <svg className="olymp-close-icon">
                                            <use xlinkHref="http://www.w3.org/1999/xlink"
                                                 xlinkHref="assets/img/./icons.svg#olymp-close-icon"></use>
                                        </svg>
                                    </a>
                                </td>
                            </tr>

                            <tr>
                                <td className="play">
                                    <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                                       className="play-icon">
                                        <svg className="olymp-music-play-icon-big">
                                            <use xlinkHref="http://www.w3.org/1999/xlink"
                                                 xlinkHref="assets/img/./icons-music.svg#olymp-music-play-icon-big"></use>
                                        </svg>
                                    </a>
                                </td>
                                <td className="cover">
                                    <div className="playlist-thumb">
                                        <img src="assets/img/./playlist7.jpg" alt="thumb-composition"/>
                                    </div>
                                </td>
                                <td className="song-artist">
                                    <div className="composition">
                                        <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                                           className="composition-name">The Pretender</a>
                                        <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                                           className="composition-author">Kung Fighters</a>
                                    </div>
                                </td>
                                <td className="album">
                                    <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                                       className="album-composition">Warping Lights</a>
                                </td>
                                <td className="released">
                                    <div className="release-year">2014</div>
                                </td>
                                <td className="duration">
                                    <div className="composition-time">
                                        <time className="published" dateTime="2017-03-24T18:18">6:17</time>
                                    </div>
                                </td>
                                <td className="spotify">
                                    <svg className="svg-inline--fa fa-spotify fa-w-16 composition-icon"
                                         aria-hidden="true"
                                         data-prefix="fab" data-icon="spotify" role="img"
                                         xmlns="http://www.w3.org/2000/svg"
                                         viewBox="0 0 496 512" data-fa-i2svg="">
                                        <path fill="currentColor"
                                              d="M248 8C111.1 8 0 119.1 0 256s111.1 248 248 248 248-111.1 248-248S384.9 8 248 8zm100.7 364.9c-4.2 0-6.8-1.3-10.7-3.6-62.4-37.6-135-39.2-206.7-24.5-3.9 1-9 2.6-11.9 2.6-9.7 0-15.8-7.7-15.8-15.8 0-10.3 6.1-15.2 13.6-16.8 81.9-18.1 165.6-16.5 237 26.2 6.1 3.9 9.7 7.4 9.7 16.5s-7.1 15.4-15.2 15.4zm26.9-65.6c-5.2 0-8.7-2.3-12.3-4.2-62.5-37-155.7-51.9-238.6-29.4-4.8 1.3-7.4 2.6-11.9 2.6-10.7 0-19.4-8.7-19.4-19.4s5.2-17.8 15.5-20.7c27.8-7.8 56.2-13.6 97.8-13.6 64.9 0 127.6 16.1 177 45.5 8.1 4.8 11.3 11 11.3 19.7-.1 10.8-8.5 19.5-19.4 19.5zm31-76.2c-5.2 0-8.4-1.3-12.9-3.9-71.2-42.5-198.5-52.7-280.9-29.7-3.6 1-8.1 2.6-12.9 2.6-13.2 0-23.3-10.3-23.3-23.6 0-13.6 8.4-21.3 17.4-23.9 35.2-10.3 74.6-15.2 117.5-15.2 73 0 149.5 15.2 205.4 47.8 7.8 4.5 12.9 10.7 12.9 22.6 0 13.6-11 23.3-23.2 23.3z"></path>
                                    </svg>
                                    {/* <i class="fab fa-spotify composition-icon" aria-hidden="true"></i> */}
                                </td>
                                <td className="remove">
                                    <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                                       className="remove-icon">
                                        <svg className="olymp-close-icon">
                                            <use xlinkHref="http://www.w3.org/1999/xlink"
                                                 xlinkHref="assets/img/./icons.svg#olymp-close-icon"></use>
                                        </svg>
                                    </a>
                                </td>
                            </tr>

                            <tr>
                                <td className="play">
                                    <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                                       className="play-icon">
                                        <svg className="olymp-music-play-icon-big">
                                            <use xlinkHref="http://www.w3.org/1999/xlink"
                                                 xlinkHref="assets/img/./icons-music.svg#olymp-music-play-icon-big"></use>
                                        </svg>
                                    </a>
                                </td>
                                <td className="cover">
                                    <div className="playlist-thumb">
                                        <img src="assets/img/./playlist8.jpg" alt="thumb-composition"/>
                                    </div>
                                </td>
                                <td className="song-artist">
                                    <div className="composition">
                                        <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                                           className="composition-name">Seven Nation Army</a>
                                        <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                                           className="composition-author">The Black Stripes</a>
                                    </div>
                                </td>
                                <td className="album">
                                    <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                                       className="album-composition ">Icky Strung (LIVE at Cube Garden)</a>
                                </td>
                                <td className="released">
                                    <div className="release-year">2014</div>
                                </td>
                                <td className="duration">
                                    <div className="composition-time">
                                        <time className="published" dateTime="2017-03-24T18:18">6:17</time>
                                    </div>
                                </td>
                                <td className="spotify">
                                    <svg className="svg-inline--fa fa-spotify fa-w-16 composition-icon"
                                         aria-hidden="true"
                                         data-prefix="fab" data-icon="spotify" role="img"
                                         xmlns="http://www.w3.org/2000/svg"
                                         viewBox="0 0 496 512" data-fa-i2svg="">
                                        <path fill="currentColor"
                                              d="M248 8C111.1 8 0 119.1 0 256s111.1 248 248 248 248-111.1 248-248S384.9 8 248 8zm100.7 364.9c-4.2 0-6.8-1.3-10.7-3.6-62.4-37.6-135-39.2-206.7-24.5-3.9 1-9 2.6-11.9 2.6-9.7 0-15.8-7.7-15.8-15.8 0-10.3 6.1-15.2 13.6-16.8 81.9-18.1 165.6-16.5 237 26.2 6.1 3.9 9.7 7.4 9.7 16.5s-7.1 15.4-15.2 15.4zm26.9-65.6c-5.2 0-8.7-2.3-12.3-4.2-62.5-37-155.7-51.9-238.6-29.4-4.8 1.3-7.4 2.6-11.9 2.6-10.7 0-19.4-8.7-19.4-19.4s5.2-17.8 15.5-20.7c27.8-7.8 56.2-13.6 97.8-13.6 64.9 0 127.6 16.1 177 45.5 8.1 4.8 11.3 11 11.3 19.7-.1 10.8-8.5 19.5-19.4 19.5zm31-76.2c-5.2 0-8.4-1.3-12.9-3.9-71.2-42.5-198.5-52.7-280.9-29.7-3.6 1-8.1 2.6-12.9 2.6-13.2 0-23.3-10.3-23.3-23.6 0-13.6 8.4-21.3 17.4-23.9 35.2-10.3 74.6-15.2 117.5-15.2 73 0 149.5 15.2 205.4 47.8 7.8 4.5 12.9 10.7 12.9 22.6 0 13.6-11 23.3-23.2 23.3z"></path>
                                    </svg>
                                    {/* <i class="fab fa-spotify composition-icon" aria-hidden="true"></i> */}
                                </td>
                                <td className="remove">
                                    <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                                       className="remove-icon">
                                        <svg className="olymp-close-icon">
                                            <use xlinkHref="http://www.w3.org/1999/xlink"
                                                 xlinkHref="assets/img/./icons.svg#olymp-close-icon"></use>
                                        </svg>
                                    </a>
                                </td>
                            </tr>

                            <tr>
                                <td className="play">
                                    <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                                       className="play-icon">
                                        <svg className="olymp-music-play-icon-big">
                                            <use xlinkHref="http://www.w3.org/1999/xlink"
                                                 xlinkHref="assets/img/./icons-music.svg#olymp-music-play-icon-big"></use>
                                        </svg>
                                    </a>
                                </td>
                                <td className="cover">
                                    <div className="playlist-thumb">
                                        <img src="assets/img/./playlist9.jpg" alt="thumb-composition"/>
                                    </div>
                                </td>
                                <td className="song-artist">
                                    <div className="composition">
                                        <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                                           className="composition-name">Leap of Faith</a>
                                        <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                                           className="composition-author">Eden Artifact</a>
                                    </div>
                                </td>
                                <td className="album">
                                    <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                                       className="album-composition">The Assassins’s Soundtrack</a>
                                </td>
                                <td className="released">
                                    <div className="release-year">2014</div>
                                </td>
                                <td className="duration">
                                    <div className="composition-time">
                                        <time className="published" dateTime="2017-03-24T18:18">6:17</time>
                                    </div>
                                </td>
                                <td className="spotify">
                                    <svg className="svg-inline--fa fa-spotify fa-w-16 composition-icon"
                                         aria-hidden="true"
                                         data-prefix="fab" data-icon="spotify" role="img"
                                         xmlns="http://www.w3.org/2000/svg"
                                         viewBox="0 0 496 512" data-fa-i2svg="">
                                        <path fill="currentColor"
                                              d="M248 8C111.1 8 0 119.1 0 256s111.1 248 248 248 248-111.1 248-248S384.9 8 248 8zm100.7 364.9c-4.2 0-6.8-1.3-10.7-3.6-62.4-37.6-135-39.2-206.7-24.5-3.9 1-9 2.6-11.9 2.6-9.7 0-15.8-7.7-15.8-15.8 0-10.3 6.1-15.2 13.6-16.8 81.9-18.1 165.6-16.5 237 26.2 6.1 3.9 9.7 7.4 9.7 16.5s-7.1 15.4-15.2 15.4zm26.9-65.6c-5.2 0-8.7-2.3-12.3-4.2-62.5-37-155.7-51.9-238.6-29.4-4.8 1.3-7.4 2.6-11.9 2.6-10.7 0-19.4-8.7-19.4-19.4s5.2-17.8 15.5-20.7c27.8-7.8 56.2-13.6 97.8-13.6 64.9 0 127.6 16.1 177 45.5 8.1 4.8 11.3 11 11.3 19.7-.1 10.8-8.5 19.5-19.4 19.5zm31-76.2c-5.2 0-8.4-1.3-12.9-3.9-71.2-42.5-198.5-52.7-280.9-29.7-3.6 1-8.1 2.6-12.9 2.6-13.2 0-23.3-10.3-23.3-23.6 0-13.6 8.4-21.3 17.4-23.9 35.2-10.3 74.6-15.2 117.5-15.2 73 0 149.5 15.2 205.4 47.8 7.8 4.5 12.9 10.7 12.9 22.6 0 13.6-11 23.3-23.2 23.3z"></path>
                                    </svg>
                                    {/* <i class="fab fa-spotify composition-icon" aria-hidden="true"></i> */}
                                </td>
                                <td className="remove">
                                    <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                                       className="remove-icon">
                                        <svg className="olymp-close-icon">
                                            <use xlinkHref="http://www.w3.org/1999/xlink"
                                                 xlinkHref="assets/img/./icons.svg#olymp-close-icon"></use>
                                        </svg>
                                    </a>
                                </td>
                            </tr>

                            <tr>
                                <td className="play">
                                    <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                                       className="play-icon">
                                        <svg className="olymp-music-play-icon-big">
                                            <use xlinkHref="http://www.w3.org/1999/xlink"
                                                 xlinkHref="assets/img/./icons-music.svg#olymp-music-play-icon-big"></use>
                                        </svg>
                                    </a>
                                </td>
                                <td className="cover">
                                    <div className="playlist-thumb">
                                        <img src="assets/img/./playlist10.jpg" alt="thumb-composition"/>
                                    </div>
                                </td>
                                <td className="song-artist">
                                    <div className="composition">
                                        <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                                           className="composition-name">Killer Queen</a>
                                        <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                                           className="composition-author">Archiduke</a>
                                    </div>
                                </td>
                                <td className="album">
                                    <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                                       className="album-composition ">News of the Universe</a>
                                </td>
                                <td className="released">
                                    <div className="release-year">2014</div>
                                </td>
                                <td className="duration">
                                    <div className="composition-time">
                                        <time className="published" dateTime="2017-03-24T18:18">6:17</time>
                                    </div>
                                </td>
                                <td className="spotify">
                                    <svg className="svg-inline--fa fa-spotify fa-w-16 composition-icon"
                                         aria-hidden="true"
                                         data-prefix="fab" data-icon="spotify" role="img"
                                         xmlns="http://www.w3.org/2000/svg"
                                         viewBox="0 0 496 512" data-fa-i2svg="">
                                        <path fill="currentColor"
                                              d="M248 8C111.1 8 0 119.1 0 256s111.1 248 248 248 248-111.1 248-248S384.9 8 248 8zm100.7 364.9c-4.2 0-6.8-1.3-10.7-3.6-62.4-37.6-135-39.2-206.7-24.5-3.9 1-9 2.6-11.9 2.6-9.7 0-15.8-7.7-15.8-15.8 0-10.3 6.1-15.2 13.6-16.8 81.9-18.1 165.6-16.5 237 26.2 6.1 3.9 9.7 7.4 9.7 16.5s-7.1 15.4-15.2 15.4zm26.9-65.6c-5.2 0-8.7-2.3-12.3-4.2-62.5-37-155.7-51.9-238.6-29.4-4.8 1.3-7.4 2.6-11.9 2.6-10.7 0-19.4-8.7-19.4-19.4s5.2-17.8 15.5-20.7c27.8-7.8 56.2-13.6 97.8-13.6 64.9 0 127.6 16.1 177 45.5 8.1 4.8 11.3 11 11.3 19.7-.1 10.8-8.5 19.5-19.4 19.5zm31-76.2c-5.2 0-8.4-1.3-12.9-3.9-71.2-42.5-198.5-52.7-280.9-29.7-3.6 1-8.1 2.6-12.9 2.6-13.2 0-23.3-10.3-23.3-23.6 0-13.6 8.4-21.3 17.4-23.9 35.2-10.3 74.6-15.2 117.5-15.2 73 0 149.5 15.2 205.4 47.8 7.8 4.5 12.9 10.7 12.9 22.6 0 13.6-11 23.3-23.2 23.3z"></path>
                                    </svg>
                                    {/* <i class="fab fa-spotify composition-icon" aria-hidden="true"></i> */}
                                </td>
                                <td className="remove">
                                    <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#"
                                       className="remove-icon">
                                        <svg className="olymp-close-icon">
                                            <use xlinkHref="http://www.w3.org/1999/xlink"
                                                 xlinkHref="assets/img/./icons.svg#olymp-close-icon"></use>
                                        </svg>
                                    </a>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        <div className="ps__scrollbar-x-rail" style={{"left": "0px", "bottom": "0px"}}>
                            <div className="ps__scrollbar-x" tabIndex="0" style={{"left": "0px", "width": "0px"}}></div>
                        </div>
                        <div className="ps__scrollbar-y-rail" style={{"top": "0px", "right": "0px"}}>
                            <div className="ps__scrollbar-y" tabIndex="0" style={{"top": "0px", "height": "0px"}}></div>
                        </div>
                    </div>

                    <span className="mejs-offscreen">Audio Player</span>
                    <div id="mep_0" className="mejs-container svg mejs-audio" tabIndex="0" role="application"
                         aria-label="Audio Player" style={{"width": "440px", "height": "70px"}}>
                        <div className="mejs-inner">
                            <div className="mejs-mediaelement">
                                <audio id="mediaplayer" data-showplaylist="true" src="mp3/Twice.mp3">
                                </audio>
                            </div>
                            <div className="mejs-layers">
                                <div className="mejs-poster mejs-layer"
                                     style={{"display": "none", "width": "400px", "height": "30px"}}></div>
                            </div>
                            <div className="mejs-controls">
                                <div
                                    className="mejs-button mejs-playlist-plugin-button mejs-prevtrack-button mejs-prevtrack">
                                    <button type="button" aria-controls="mep_0" title="Previous Track"></button>
                                </div>
                                <div className="mejs-button mejs-playpause-button mejs-play">
                                    <button type="button" aria-controls="mep_0" title="Play" aria-label="Play"></button>
                                </div>
                                <div
                                    className="mejs-button mejs-playlist-plugin-button mejs-nexttrack-button mejs-nexttrack">
                                    <button type="button" aria-controls="mep_0" title="Next Track"></button>
                                </div>
                                <div className="mejs-button mejs-loop-button mejs-loop-off">
                                    <button type="button" aria-controls="mep_0" title="Repeat On/Off"></button>
                                </div>
                                <div
                                    className="mejs-button mejs-playlist-plugin-button mejs-shuffle-button mejs-shuffle-off">
                                    <button type="button" aria-controls="mep_0" title="Shuffle On/Off"></button>
                                </div>
                                <div className="mejs-time mejs-currenttime-container" role="timer" aria-live="off"><span
                                    className="mejs-currenttime">00:00</span></div>
                                <div className="mejs-time-rail" style={{"width": "1364.94px"}}><span
                                    className="mejs-time-total mejs-time-slider" style={{"width": "1354.94px"}}
                                    aria-label="Time Slider" aria-valuemin="0" aria-valuemax="NaN" aria-valuenow="0"
                                    aria-valuetext="00:00" role="slider" tabIndex="0"><span
                                    className="mejs-time-buffering"
                                    style={{"display": "none"}}></span><span
                                    className="mejs-time-loaded" style={{"width": "29.7786px"}}></span><span
                                    className="mejs-time-current" style={{"width": "0px"}}></span><span
                                    className="mejs-time-handle" style={{"left": "-5px"}}></span><span
                                    className="mejs-time-float"><span
                                    className="mejs-time-float-current">00:00</span><span
                                    className="mejs-time-float-corner"></span></span></span></div>
                                <div className="mejs-time mejs-duration-container"><span
                                    className="mejs-duration">03:06</span></div>
                                <div className="mejs-button mejs-volume-button mejs-mute">
                                    <button type="button" aria-controls="mep_0" title="Mute" aria-label="Mute"></button>
                                </div>
                                <a href="javascript:void(0);" className="mejs-horizontal-volume-slider mejs-mute"
                                   aria-label="Volume Slider" aria-valuemin="0" aria-valuemax="100" aria-valuenow="80"
                                   aria-valuetext="80%" role="slider" tabIndex="0"><span className="mejs-offscreen">Use Up/Down Arrow keys to increase or decrease volume.</span>
                                    <div className="mejs-horizontal-volume-total"></div>
                                    <div className="mejs-horizontal-volume-current" style={{"width": "40px"}}></div>
                                    <div className="mejs-horizontal-volume-handle" style={{"left": "27px"}}></div>
                                </a></div>
                            <div className="mejs-clear"></div>
                        </div>
                    </div>

                </div>

                {/* ... end Playlist Popup */}


                <a className="back-to-top">
                    <img src="assets/img/./back-to-top.svg" alt="arrow" className="back-icon"/>
                </a>


                {/* Window-popup-CHAT for responsive min-width: 768px */}

                <div className="ui-block popup-chat popup-chat-responsive" tabIndex="-1" role="dialog"
                     aria-labelledby="popup-chat-responsive" aria-hidden="true">

                    <div className="modal-content">
                        <div className="modal-header">
                            <span className="icon-status online"></span>
                            <h6 className="title">Chat</h6>
                            <div className="more">
                                <svg className="olymp-three-dots-icon">
                                    <use xlinkHref="http://www.w3.org/1999/xlink"
                                         xlinkHref="assets/img/./icons.svg#olymp-three-dots-icon"></use>
                                </svg>
                                <svg className="olymp-little-delete js-chat-open">
                                    <use xlinkHref="http://www.w3.org/1999/xlink"
                                         xlinkHref="assets/img/./icons.svg#olymp-little-delete"></use>
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
                                                <use xlinkHref="http://www.w3.org/1999/xlink"
                                                     xlinkHref="assets/img/./icons.svg#olymp-computer-icon"></use>
                                            </svg>
                                        </a>
                                        <div className="options-message smile-block">

                                            <svg className="olymp-happy-sticker-icon">
                                                <use xlinkHref="http://www.w3.org/1999/xlink"
                                                     xlinkHref="assets/img/./icons.svg#olymp-happy-sticker-icon"></use>
                                            </svg>

                                            <ul className="more-dropdown more-with-triangle triangle-bottom-right">
                                                <li>
                                                    <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#">
                                                        <img src="assets/img/./icon-chat1.png" alt="icon"/>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#">
                                                        <img src="assets/img/./icon-chat2.png" alt="icon"/>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#">
                                                        <img src="assets/img/./icon-chat3.png" alt="icon"/>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#">
                                                        <img src="assets/img/./icon-chat4.png" alt="icon"/>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#">
                                                        <img src="assets/img/./icon-chat5.png" alt="icon"/>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#">
                                                        <img src="assets/img/./icon-chat6.png" alt="icon"/>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#">
                                                        <img src="assets/img/./icon-chat7.png" alt="icon"/>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#">
                                                        <img src="assets/img/./icon-chat8.png" alt="icon"/>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="https://html.crumina.net/html-olympus/02-ProfilePage.html#">
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

                {/* ... end Window-popup-CHAT for responsive min-width: 768px */}


                {/* JS Scripts */}
                <script src="./Profile Page_files/Profile Page_files/jquery-3.4.1.js"></script>
                <script src="./Profile Page_files/jquery.appear.js"></script>
                <script src="./Profile Page_files/jquery.mousewheel.js"></script>
                <script src="./Profile Page_files/perfect-scrollbar.js"></script>
                <script src="./Profile Page_files/jquery.matchHeight.js"></script>
                <script src="./Profile Page_files/svgxuse.js"></script>
                <script src="./Profile Page_files/imagesloaded.pkgd.js"></script>
                <script src="./Profile Page_files/Headroom.js"></script>
                <script src="./Profile Page_files/velocity.js"></script>
                <script src="./Profile Page_files/Profile Page_files/ScrollMagic.js"></script>
                <script src="./Profile Page_files/jquery.waypoints.js"></script>
                <script src="./Profile Page_files/jquery.countTo.js"></script>
                <script src="./Profile Page_files/popper.min.js"></script>
                <script src="./Profile Page_files/material.min.js"></script>
                <script src="./Profile Page_files/bootstrap-select.js"></script>
                <script src="./Profile Page_files/smooth-scroll.js"></script>
                <script src="./Profile Page_files/selectize.js"></script>
                <script src="./Profile Page_files/swiper.jquery.js"></script>
                <script src="./Profile Page_files/moment.js"></script>
                <script src="./Profile Page_files/daterangepicker.js"></script>
                <script src="./Profile Page_files/fullcalendar.js"></script>
                <script src="./Profile Page_files/isotope.pkgd.js"></script>
                <script src="./Profile Page_files/ajax-pagination.js"></script>
                <script src="./Profile Page_files/Chart.js"></script>
                <script src="./Profile Page_files/chartjs-plugin-deferred.js"></script>
                <script src="./Profile Page_files/circle-progress.js"></script>
                <script src="./Profile Page_files/loader.js"></script>
                <script src="./Profile Page_files/run-chart.js"></script>
                <script src="./Profile Page_files/jquery.magnific-popup.js"></script>
                <script src="./Profile Page_files/jquery.gifplayer.js"></script>
                <script src="./Profile Page_files/mediaelement-and-player.js"></script>
                <script src="./Profile Page_files/mediaelement-playlist-plugin.min.js"></script>
                <script src="./Profile Page_files/sticky-sidebar.js"></script>
                <script src="./Profile Page_files/ion.rangeSlider.js"></script>

                <script src="./Profile Page_files/main.js"></script>
                <script src="./Profile Page_files/libs-init.js"></script>
                <script src="./Profile Page_files/bootstrap.bundle.js"></script>


                <div className="tooltip fade bs-tooltip-right show" role="tooltip" id="tooltip404315"
                     style={{
                         "position": "absolute",
                         "transform": "translate3d(45px, 105px, 0px)",
                         "top": "0px",
                         "left": "0px",
                         "willChange": "transform"
                     }}
                     x-placement="right">
                    <script src="assets/js/jquery.min.js"></script>
                    <script src="assets/bootstrap/js/bootstrap.min.js"></script>
                    <script src="assets/js/script.min.js"></script>


                </div>
            </div>
            {/*<script src="assets/js/jquery.min.js"></script>*/}
            {/*<script src="assets/bootstrap/js/bootstrap.min.js"></script>*/}
            {/*<script src="https://cdnjs.cloudflare.com/ajax/libs/aos/2.1.1/aos.js"></script>*/}
            {/*<script src="assets/js/script.min.js"></script>*/}

        </React.Fragment>


    )
}
