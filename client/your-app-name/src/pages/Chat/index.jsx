import React, {Component, useContext, useEffect, useState} from 'react';

import RoomList from './room_list';
import ChatSession from './chat_session';
import RoomUsers from './room_users';


import {
    handleInput,
    connectToChatkit,
    connectToRoom,
    sendMessage,
    sendDM,
} from './methods';

import 'skeleton-css/css/normalize.css';
import 'skeleton-css/css/skeleton.css';
import '../../chat.css';
import queryString from 'query-string';
import axios from "axios";
import Chatkit from "@pusher/chatkit-client";
import {AuthContext} from "../../services/auth";
import {ChatContext} from "../../services/chat";
import Dialog from "./dialog";


class Chat extends Component {
    static contextType = AuthContext;

    constructor(props) {
        super(props);
        this.state = {
            userId: '',
            showLogin: true,
            isLoaded: false,
            currentUser: null,
            currentRoom: null,
            rooms: [],
            roomUsers: [],
            roomName: null,
            messages: [],
            newMessage: '',
        };


        this.handleInput = handleInput.bind(this);
        this.connectToChatkit = connectToChatkit.bind(this);
        this.connectToRoom = connectToRoom.bind(this);
        this.sendMessage = sendMessage.bind(this);
        this.sendDM = sendDM.bind(this);
    }

    // componentDidUpdate(prevProps, prevState, snapshot) {
    //     if(prevState.currentRoom !== this.state.currentRoom){
    //         console.log('pizdec');
    //         this.setState({
    //             isLoaded: true
    //         })
    //     }
    // }
    //

    componentDidMount() {

        if (!this.state.currentUser) {
            this.connectToChatkit(this.context.currentUser.username);
            // chatContext.grantNotificationPermission();
            // connectToChatkit();
            console.log('wtf');
        } else if (!this.state.isLoaded) {

            console.log('State not loaded');
        }
    }

    render() {
        const {

            userId,
            showLogin,
            isLoaded,
            rooms,
            currentRoom,
            currentUser,
            messages,
            newMessage,
            roomUsers,
            roomName,
        } = this.state;


        return (
            <div className="App">
                <aside className="sidebar left-sidebar">
                    {currentUser ? (
                        <div className="user-profile">
                            <span className="username">{currentUser.name}</span>
                            <span className="user-id">{`@${currentUser.id}`}</span>
                        </div>
                    ) : null}
                    {currentRoom ? (
                        <RoomList
                            rooms={rooms}
                            currentRoom={currentRoom}
                            connectToRoom={this.connectToRoom}
                            currentUser={currentUser}
                        />
                    ) : null}
                </aside>
                <section className="chat-screen">
                    <header className="chat-header">
                        {currentRoom ? <h3>{roomName}</h3> : null}
                    </header>

                    <ul className="chat-messages">
                        <ChatSession messages={messages}/>
                    </ul>

                    <footer className="chat-footer">
                        <form onSubmit={this.sendMessage} className="message-form">
                            <input
                                type="text"
                                value={newMessage}
                                name="newMessage"
                                className="message-input"
                                placeholder="Type your message and hit ENTER to send"
                                onChange={this.handleInput}
                            />
                        </form>
                    </footer>
                </section>
                <aside className="sidebar right-sidebar">
                    {currentRoom ? (
                        <RoomUsers
                            currentUser={currentUser}
                            sendDM={this.sendDM}
                            roomUsers={roomUsers}
                            currentRoom={currentRoom}
                        />
                    ) : null}
                </aside>
                {/*{showLogin ? (*/}
                {/*  <Dialog*/}
                {/*    userId={userId}*/}
                {/*    handleInput={this.handleInput}*/}
                {/*    connectToChatkit={this.connectToChatkit}*/}
                {/*  />*/}
                {/*) : null}*/}
            </div>
        );
    }
}

export default Chat;