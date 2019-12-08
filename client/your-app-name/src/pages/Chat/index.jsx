import React, {Component, useContext, useEffect, useState} from 'react';

import RoomList from './room_list';
import ChatSession from './chat_session';
import RoomUsers from './room_users';

import 'skeleton-css/css/normalize.css';
import 'skeleton-css/css/skeleton.css';
import '../../chat.css';
import axios from "axios";
import Chatkit from "@pusher/chatkit-client";
import {AuthContext} from "../../services/auth";
import {ChatContext} from "../../services/chat";

export default function Chat(props) {

    const userContext = useContext(AuthContext);
    const chatContext = userContext(ChatContext);
    const [userId, setUserId] = useState('');
    const [currentUser, setCurrentUser] = useState(null);
    const [currentRoom, setCurrentRoom] = useState(null);
    const [rooms, setRooms] = useState([]);
    const [roomUsers, setRoomUsers] = useState([]);
    const [roomName, setRoomName] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');


    useEffect(() => {
        connectToChatkit(userContext.currentUser.username);
        console.log('wtf');
    }, []);

    useEffect(() => {
        if (!currentUser && !currentRoom) {
        } else {
            connectToRoom();
            console.log('INFINITY');
        }
    }, [currentUser]);


    let handleInput = (e) => {
        const {value, name} = e.target;
        console.log('NAMAE: ', name);
        if (name === 'newMessage') {
            setNewMessage(value)
        }

    };

    let sendMessage = (e) => {
        e.preventDefault();

        if (newMessage.trim() === '') return;

        currentUser.sendMessage({
            text: newMessage,
            roomId: `${currentRoom.id}`,
        });

        setNewMessage('');

    };


    let connectToRoom = (id = '68864027-8212-4e8f-a868-4a56f4c3c9f0') => {

        setMessages([]);


        return currentUser
            .subscribeToRoom({
                roomId: `${id}`,
                messageLimit: 100,
                hooks: {
                    onMessage: message => {
                        setMessages(messages => ([...messages, message]));
                    },
                    onPresenceChanged: () => {
                        if (currentRoom) {
                            setRoomUsers(currentRoom.users.sort(a => {
                                if (a.presence.state === 'online') return -1;
                                return 1;
                            }));
                        }

                    },
                },
            })
            .then(currentRoom => {
                const roomName =
                    currentRoom.customData && currentRoom.customData.isDirectMessage
                        ? currentRoom.customData.userIds.filter(
                        id => id !== currentUser.id
                        )[0]
                        : currentRoom.name;
                setCurrentRoom(currentRoom);
                setRoomUsers(currentRoom.users);
                setRooms(currentUser.rooms);
                setRoomName(roomName);

            })
            .catch(console.error);
    };


    let connectToChatkit = (userId) => {


        if (userId === null || userId.trim() === '') {
            alert('Invalid userId');
            return;
        }

        axios
            .post('/chatkit/users', {userId})
            .then(() => {
                const tokenProvider = new Chatkit.TokenProvider({
                    url: '/chatkit/authenticate',
                });

                const chatManager = new Chatkit.ChatManager({
                    instanceLocator: 'v1:us1:38689cbe-182b-47f8-8c59-c2e17238f44a',
                    userId,
                    tokenProvider,
                });

                return chatManager
                    .connect({
                        onAddedToRoom: room => {
                            setRooms(rooms => ([...rooms, room]));
                        },
                    })
                    .then(async currentUser => {


                        setCurrentUser(currentUser);
                        setRooms(currentUser.rooms);


                    });
            })
            .catch(console.error);
    };

    let createPrivateRoom = (id) => {

        const roomName = `${currentUser.id}_${id}`;

        const isPrivateChatCreated = rooms.filter(room => {
            if (room.customData && room.customData.isDirectMessage) {
                const arr = [currentUser.id, id];
                const {userIds} = room.customData;

                if (arr.sort().join('') === userIds.sort().join('')) {
                    return {
                        room,
                    };
                }
            }

            return false;
        });

        if (isPrivateChatCreated.length > 0) {
            return Promise.resolve(isPrivateChatCreated[0]);
        }

        return currentUser.createRoom({
            name: `${roomName}`,
            private: true,
            addUserIds: [`${id}`],
            customData: {
                isDirectMessage: true,
                userIds: [currentUser.id, id],
            },
        });
    };

    let sendDM = (id) => {
        createPrivateRoom(id).then(room => {
            connectToRoom(room.id);
        });
    };


    return (

        <div className="App">
            {currentUser &&
            <div>
                <aside className="sidebar left-sidebar">
                    {currentUser &&
                    <div className="user-profile">
                        <span className="username">{currentUser.name}</span>
                        <span className="user-id">{`@${currentUser.id}`}</span>
                    </div>
                    }
                    {currentRoom &&
                    <RoomList
                        rooms={rooms}
                        currentRoom={currentRoom}
                        connectToRoom={connectToRoom}
                        currentUser={currentUser}
                    />
                    }
                </aside>
                <section className="chat-screen">
                    <header className="chat-header">
                        {currentRoom && <h3>{roomName}</h3>}
                    </header>
                    <ul className="chat-messages">
                        <ChatSession messages={messages}/>
                    </ul>
                    <footer className="chat-footer">
                        <form onSubmit={sendMessage} className="message-form">
                            <input
                                type="text"
                                value={newMessage}
                                name="newMessage"
                                className="message-input"
                                placeholder="Type your message and hit ENTER to send"
                                onChange={handleInput}
                            />
                        </form>
                    </footer>
                </section>
                <aside className="sidebar right-sidebar">
                    {currentRoom &&
                    <RoomUsers
                        currentUser={currentUser}
                        sendDM={sendDM}
                        roomUsers={roomUsers}
                    />
                    }
                </aside>

            </div>}
            {/*{checkLogin ? (*/}
            {/*    <Dialog*/}
            {/*        userId={userId}*/}
            {/*        handleInput={handleInput}*/}
            {/*        connectToChatkit={connectToChatkit}*/}
            {/*    />*/}
            {/*) : null}*/}
        </div>

    );
}
