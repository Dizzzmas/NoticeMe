import Chatkit from '@pusher/chatkit-client';
import axios from 'axios';
import queryString from "query-string";
import {format} from "date-fns";

function sendMessage(event) {
    event.preventDefault();
    const {newMessage, currentUser, currentRoom} = this.state;
    const parts = [];
    if (newMessage.trim() === '') return;

    parts.push({
        type: "text/plain",
        content: newMessage,
    });

    currentUser.sendMultipartMessage({
        roomId: `${currentRoom.id}`,
        parts
    });

    this.setState({
        newMessage: '',
    });
}

function handleInput(event) {
    const {value, name} = event.target;

    this.setState({
        [name]: value,
    });
}

function connectToRoom(id = '7cdeab9a-8f74-4de0-90ca-382a54f18ee7') {
    let {currentUser} = this.state;

    this.setState({
        messages: [],
    });

    return currentUser
        .subscribeToRoomMultipart({
            roomId: `${id}`,
            messageLimit: 30,
            hooks: {
                onMessage: message => {

                    const {currentRoom} = this.state;
                    const {firstConnect} = this.state;
                    // if (currentRoom === null) return;

                    if (firstConnect) {
                        this.setState({
                                messages: [...this.state.messages, message],
                            }
                        );
                        console.log('OnMessageCurrMsg: ', message);


                        return currentUser.setReadCursor({
                            roomId: id,
                            position: message.id,
                        });
                    }

                    if (currentRoom === null) return;

                    if (id === currentRoom.id) {


                        this.setState({
                            messages: [...this.state.messages, message],
                        }, () => {
                            if (format(new Date(`${message.updatedAt}`), 'HH:mm') === format(new Date(), 'HH:mm')) {

                                // this.showNotification(message)
                            }
                        });

                        console.log('OnMessageCurrRoom: ', currentRoom.name);
                        console.log('OnMessageCurrMsg: ', message);


                        return currentUser.setReadCursor({
                            roomId: currentRoom.id,
                            position: message.id,
                        });
                    }

                },
                onPresenceChanged: () => {
                    const {currentRoom} = this.state;
                    this.setState({
                        roomUsers: currentRoom.users.sort(a => {
                            if (a.presence.state === 'online') return -1;
                            return 1;
                        }),
                    });
                },
            },
        })
        .then(currentRoom => {
            const roomName =
                currentRoom.customData && currentRoom.customData.isDirectMessage
                    ? currentRoom.customData.userIds.filter(
                    id => id !== currentUser.name
                    )[0]
                    : currentRoom.name;

            this.setState({
                currentRoom: currentRoom,
                roomUsers: currentRoom.users,
                rooms: currentUser.rooms,
                roomName,
                firstConnect: false
            });
        })
        .catch(console.error);
}

function connectToChatkit(user) {
    // event.preventDefault();

    // const { userId } = this.state;

    const userId = user.id.toString();
    const userName = user.username;
    if (userId === null || userId.trim() === '') {
        alert('Invalid userId');
        return;
    }

    this.setState({
        isLoading: true,
    });

    axios
        .post('/api/v1/chatkit/users', {userId, userName})
        .then(() => {
            const tokenProvider = new Chatkit.TokenProvider({
                url: '/api/v1/chatkit/authenticate',
            });

            const chatManager = new Chatkit.ChatManager({
                instanceLocator: 'v1:us1:38689cbe-182b-47f8-8c59-c2e17238f44a',
                userId,
                tokenProvider,
            });

            return chatManager
                .connect({
                    onAddedToRoom: room => {
                        const {rooms} = this.state;
                        this.setState({
                            rooms: [...rooms, room],
                        });
                    },
                    onRoomUpdated: room => {
                        const {rooms} = this.state;
                        const index = rooms.findIndex(r => r.id === room.id);
                        rooms[index] = room;
                        console.log('OnRoomUpdated: ', room);
                        if (room === this.state.currentRoom) {
                            console.log('rrrom users: ', room.users);

                            this.setState({
                                roomUsers: room.users
                            });
                        }
                        this.setState({
                            rooms,

                        }, async () => {
                            try {
                                if (room.unreadCount > 0 && room !== this.state.currentRoom) {
                                    let messages = await this.state.currentUser.fetchMultipartMessages({
                                        roomId: room.id,
                                        direction: 'newer',
                                        limit: 100
                                    });


                                    console.log('Fetched msgs: ', messages);
                                    this.showNotification(messages[messages.length - 1]);
                                }
                            } catch (error) {
                                console.log('fetch messages error');
                            }
                        });
                    }
                })
                .then(currentUser => {
                    console.log(currentUser);
                    this.setState(
                        {
                            currentUser: currentUser,
                            showLogin: false,
                            isLoading: false,
                            rooms: currentUser.rooms,
                        },
                        () => {
                            let direct_user = queryString.parse(window.location.search).user;
                            if (direct_user && direct_user !== this.state.currentUser.name) {
                                sendDM.call(this, queryString.parse(window.location.search).user);
                                this.grantNotificationPermission();
                            } else {
                                connectToRoom.call(this);
                                this.grantNotificationPermission();

                            }
                        }
                    );
                });
        })
        .catch(console.error);
}

async function createPrivateRoom(username) {
    const {currentUser, rooms} = this.state;
    const roomName = `${currentUser.name}_${username}`;


    let r = await fetch(`/api/v1/users/getByUsername/${username}`);
    let loaded_user = await r.json();


    const isPrivateChatCreated = rooms.filter(room => {
        console.log('Custom: ', room.customData);
        if (room.customData && room.customData.isDirectMessage) {
            const arr = [currentUser.name, username];
            // let users_arr = [];
            // for(let  i = 0; i < room.users.length; i++){
            //     users_arr.push(room.users[i].name);
            // }
            const {userIds} = room.customData;
            console.log('USERiDS: ', userIds);

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
        addUserIds: [`${loaded_user.id}`],
        customData: {
            isDirectMessage: true,
            userIds: [currentUser.name, username],
        },
    });
}

async function sendDM(username) {

    try {
        let res = await fetch(`/api/v1/users/getByUsername/${username}`);
        let found_by_username = await res.json();
        username = found_by_username.username;
    } catch (error) {
        console.error(error);
    }


    createPrivateRoom.call(this, username).then(room => {
        connectToRoom.call(this, room.id)
    }).catch(error => {
        connectToRoom.call(this);
    });
}

function grantNotificationPermission() {
    if (!('Notification' in window)) {
        alert('This browser does not support system notifications');
        return;
    }

    if (Notification.permission === 'granted') {
        // new Notification('You are already subscribed to message notifications');
        return;
    }

    if (
        Notification.permission !== 'denied' ||
        Notification.permission === 'default'
    ) {
        Notification.requestPermission().then(result => {
            if (result === 'granted') {
                new Notification(
                    'Awesome! You will start receiving notifications shortly'
                );
            }
        });
    }
};

function showNotification(message) {
    console.log('Notify msg: ', message);
    const {currentUser} = this.state;
    if (message.senderId !== currentUser.id) {
        const title = message.sender.name;
        const body = message.parts[0].payload.content;


        console.log('typ: ', typeof (NotificationEvent));
        new Notification(title, {body}).onclick = function (event) {

            window.location.replace(`http://localhost:3000/chat?user=${title}`);
        };
    }
};

export {
    sendMessage,
    handleInput,
    connectToRoom,
    connectToChatkit,
    sendDM,
    grantNotificationPermission,
    showNotification
};