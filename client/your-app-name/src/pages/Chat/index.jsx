import React, {Component, useContext, useEffect, useState} from 'react';

import RoomList from './room_list';
import ChatSession from './chat_session';
import RoomUsers from './room_users';

import 'skeleton-css/css/normalize.css';
import 'skeleton-css/css/skeleton.css';
import '../../chat.css';
import queryString from 'query-string';
import axios from "axios";
import Chatkit from "@pusher/chatkit-client";
import {AuthContext} from "../../services/auth";
import {ChatContext} from "../../services/chat";

export default function Chat(props) {

    const userContext = useContext(AuthContext);
    const chatContext = useContext(ChatContext);
    let direct_user = queryString.parse(props.location.search).user;


    useEffect(() => {
        if (!chatContext.currentUser) {
            chatContext.connectToChatkit(userContext.currentUser.username);
            // connectToChatkit();
            console.log('wtf');
        }
    }, []);

    useEffect(() => {
        if (!chatContext.currentUser && !chatContext.currentRoom) {
        } else if (direct_user) {
            chatContext.createPrivateRoom(direct_user).then(room => {                // SUPER IMPORTANT
                chatContext.connectToRoom(room.id)

            }).catch(error => {
                console.log(error);
                chatContext.connectToRoom();
            });
        } else {
            console.log(chatContext.currentUser);
            chatContext.connectToRoom();

            console.log('INFINITY');
        }
    }, [chatContext.currentUser]);


    // let sendDM = (id) => {
    //     chatContext.createPrivateRoom(id).then(room => {                // SUPER IMPORTANT
    //         chatContext.connectToRoom(room.id);
    //     });
    // };


    return (

        <div className="App">
            {chatContext.currentUser &&
            <div>
                <aside className="sidebar left-sidebar">
                    {chatContext.currentUser &&
                    <div className="user-profile">
                        <span className="username">{chatContext.currentUser.name}</span>
                        <span className="user-id">{`@${chatContext.currentUser.id}`}</span>
                    </div>
                    }
                    {chatContext.currentRoom &&
                    <RoomList
                        rooms={chatContext.rooms}
                        currentRoom={chatContext.currentRoom}
                        connectToRoom={chatContext.connectToRoom}
                        currentUser={chatContext.currentUser}
                    />
                    }
                </aside>
                <section className="chat-screen">
                    <header className="chat-header">
                        {chatContext.currentRoom && <h3>{chatContext.roomName}</h3>}
                    </header>
                    <ul className="chat-messages">
                        <ChatSession messages={chatContext.messages}/>
                    </ul>
                    <footer className="chat-footer">
                        <form onSubmit={chatContext.sendMessage} className="message-form">
                            <input
                                type="text"
                                value={chatContext.newMessage}
                                name="newMessage"
                                className="message-input"
                                placeholder="Type your message and hit ENTER to send"
                                onChange={chatContext.handleInput}
                            />
                        </form>
                    </footer>
                </section>
                <aside className="sidebar right-sidebar">
                    {chatContext.currentRoom &&
                    <RoomUsers
                        currentUser={chatContext.currentUser}
                        roomUsers={chatContext.roomUsers}
                    />
                    }
                </aside>

            </div>}
        </div>

    );
}
