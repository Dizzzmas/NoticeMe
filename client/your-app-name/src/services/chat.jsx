import React, {useEffect, useReducer} from "react";
import axios from "axios";
import Chatkit from "@pusher/chatkit-client";

const initialState = {
        userId: '',
        currentUser: null,
        currentRoom: null,
        rooms: [],
        roomUsers: [],
        roomName: null,
        messages: [],
        newMessage: '',
    }
;


const ChatContext = React.createContext();


const reducer = (state, action) => {
    console.log("AAAAAa", action.payload);
    switch (action.type) {
        case 'setUserId':
            return {
                ...state,
                userId: action.payload,
            };
        case 'setCurrentUser':
            return {
                ...state,
                currentUser: action.payload,
            };
        case 'setCurrentRoom':
            return {
                ...state,
                currentRoom: action.payload,
            };
        case 'setRooms':
            return {
                ...state,
                rooms: action.payload,
            };
        case 'addToRoom':
            return {

                ...state,
                rooms: [...state.rooms, action.payload]
            };
        case 'addToMessages':
            return {

                ...state,
                messages: [...state.messages, action.payload]
            };

        case 'setRoomUsers':
            return {
                ...state,
                roomUsers: action.payload,
            };
        case 'setRoomName':
            return {
                ...state,
                roomName: action.payload,
            };
        case 'setMessages':
            return {
                ...state,
                messages: action.payload,
            };
        case 'setNewMessage':
            return {
                ...state,
                newMessage: action.payload,
            };
        default:
            return state;
    }
};

const ChatContextProvider = props => {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {

    }, []);

    return (
        <ChatContext.Provider
            value={{
                ...state,
                connectToChatkit: (userId) => {

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
                                        dispatch({type: 'addToRoom', payload: room});
                                        // setRooms(rooms => ([...rooms, room]));
                                    },
                                })
                                .then(async currentUser => {

                                    dispatch({
                                        type: 'DisPatchConnectToChatkitUserAndRooms',
                                        payload: {currentUser: currentUser, rooms: currentUser.rooms}
                                    });
                                    dispatch({type: 'setCurrentUser', payload: currentUser});
                                    dispatch({type: 'setRooms', payload: currentUser.rooms});
                                    // setCurrentUser(currentUser);
                                    // setRooms(currentUser.rooms);


                                });
                        })
                        .catch(console.error);


                },
                createPrivateRoom: (id) => {


                    const roomName = `${state.currentUser.id}_${id}`;

                    const isPrivateChatCreated = state.rooms.filter(room => {
                        if (room.customData && room.customData.isDirectMessage) {
                            const arr = [state.currentUser.id, id];
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

                    return state.currentUser.createRoom({
                        name: `${roomName}`,
                        private: true,
                        addUserIds: [`${id}`],
                        customData: {
                            isDirectMessage: true,
                            userIds: [state.currentUser.id, id],
                        },
                    });

                },
                connectToRoom: (id = '68864027-8212-4e8f-a868-4a56f4c3c9f0') => {


                    dispatch({type: 'setMessages', payload: []});


                    return state.currentUser
                        .subscribeToRoom({
                            roomId: `${id}`,
                            messageLimit: 100,
                            hooks: {
                                onMessage: message => {
                                    // setMessages(messages => ([...messages, message]));
                                    dispatch({type: 'addToMessages', payload: message});
                                },
                                onPresenceChanged: () => {
                                    if (state.currentRoom) {
                                        dispatch({
                                            type: 'setRoomUsers',
                                            payload: state.currentRoom.users.sort(a => {
                                                if (a.presence.state === 'online') return -1;
                                                return 1;
                                            })
                                        });
                                        // setRoomUsers(currentRoom.users.sort(a => {
                                        //     if (a.presence.state === 'online') return -1;
                                        //     return 1;
                                        // }));
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
                            dispatch({
                                type: 'ConnectToRoomLast',
                                payload: {
                                    currentRoom: currentRoom,
                                    roomUsers: currentRoom.users,
                                    rooms: state.currentUser.rooms,
                                    roomName: roomName
                                }
                            });
                            dispatch({type: 'setCurrentRoom', payload: currentRoom});
                            dispatch({type: 'setRoomUsers', payload: currentRoom.users});
                            dispatch({type: 'setRooms', payload: state.currentUser.rooms});
                            dispatch({type: 'setRoomName', payload: roomName});
                            // setCurrentRoom(currentRoom);
                            // setRoomUsers(currentRoom.users);
                            // setRooms(currentUser.rooms);
                            // setRoomName(roomName);

                        })
                        .catch(console.error);
                },
                handleInput: (e) => {
                    const {value, name} = e.target;
                    console.log('NAMAE: ', name);
                    if (name === 'newMessage') {
                        dispatch({type: 'setNewMessage', payload: value});
                        // setNewMessage(value)
                    }

                },
                sendMessage: (e) => {


                    e.preventDefault();

                    if (state.newMessage.trim() === '') return;

                    state.currentUser.sendMessage({
                        text: state.newMessage,
                        roomId: `${state.currentRoom.id}`,
                    });

                    dispatch({type: 'setNewMessage', payload: ''});
                    // setNewMessage('');


                },
                // sendDM: (id) => {
                //     createPrivateRoom(id).then(room => {
                //         connectToRoom(room.id);
                //     });
                // }


            }
            }
        >
            {props.children}
        </ChatContext.Provider>
    )
};


export {
    ChatContextProvider,
    ChatContext
}