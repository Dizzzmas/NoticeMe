import Chatkit from '@pusher/chatkit-client';
import axios from 'axios';
import queryString from "query-string";

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
    const {currentUser} = this.state;

    this.setState({
        messages: [],
    });

    return currentUser
        .subscribeToRoomMultipart({
            roomId: `${id}`,
            messageLimit: 10,
            hooks: {
                onMessage: message => {
                    this.setState({
                        messages: [...this.state.messages, message],
                    });
                    if (this.state.isLoaded) {
                        const {currentRoom} = this.state;

                        if (currentRoom === null) return;
                        this.setState({
                            isLoaded: false
                        });
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
                isLoaded: true,
                currentRoom: currentRoom,
                roomUsers: currentRoom.users,
                rooms: currentUser.rooms,
                roomName,
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
        .post('http://localhost:3001/chatkit/users', {userId})
        .then(() => {
            const tokenProvider = new Chatkit.TokenProvider({
                url: 'http://localhost:3001/chatkit/authenticate',
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
                        console.log('CURSE', this.state);
                        const {rooms} = this.state;
                        const index = rooms.findIndex(r => r.id === room.id);
                        rooms[index] = room;
                        this.setState({
                            rooms,
                        });
                    }
                })
                .then(currentUser => {
                    this.setState(
                        {
                            currentUser,
                            showLogin: false,
                            isLoading: false,
                            rooms: currentUser.rooms,
                        },
                        () => {
                            if (queryString.parse(window.location.search).user) {
                                sendDM.call(this, queryString.parse(window.location.search).user);
                            } else {
                                connectToRoom.call(this)
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

export {sendMessage, handleInput, connectToRoom, connectToChatkit, sendDM};