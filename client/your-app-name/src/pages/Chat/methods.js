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
        content: newMessage
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

function connectToRoom(id = 'e9f574df-af11-443e-89b5-1b5dd76ffcc3') {
    let {currentUser} = this.state;

    this.setState({
        messages: [],
    });

    return currentUser
        .subscribeToRoomMultipart({
            roomId: `${id}`,
            messageLimit: 10,
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
                    id => id !== currentUser.id
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

function connectToChatkit(userId) {
    // event.preventDefault();

    // const { userId } = this.state;

    if (userId === null || userId.trim() === '') {
        alert('Invalid userId');
        return;
    }

    this.setState({
        isLoading: true,
    });

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
                        this.setState({
                            rooms,
                        }, async () => {
                            try {
                                if (room.id !== this.state.currentRoom.id) {
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
                    this.setState(
                        {
                            currentUser: currentUser,
                            showLogin: false,
                            isLoading: false,
                            rooms: currentUser.rooms,
                        },
                        () => {
                            if (queryString.parse(window.location.search).user) {
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

function createPrivateRoom(id) {
    const {currentUser, rooms} = this.state;
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
}

function sendDM(id) {
    createPrivateRoom.call(this, id).then(room => {
        connectToRoom.call(this, room.id);
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
    if (message.senderId !== currentUser.name) {
        const title = message.senderId;
        const body = message.parts[0].payload.content;

        new Notification(title, {body});
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