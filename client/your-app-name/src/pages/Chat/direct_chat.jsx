import React, {useContext} from "react";
import {AuthContext} from "../../services/auth";
import {ChatContext} from "../../services/chat";
import RoomList from "./room_list";
import ChatSession from "./chat_session";
import RoomUsers from "./room_users";


export default function DirectChat(props) {

    const userContext = useContext(AuthContext);
    const chatContext = useContext(ChatContext);



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
                    {/*{chatContext.currentRoom &&*/}
                    {/*<RoomList*/}
                    {/*    rooms={chatContext.rooms}*/}
                    {/*    currentRoom={chatContext.currentRoom}*/}
                    {/*    connectToRoom={chatContext.connectToRoom}*/}
                    {/*    currentUser={chatContext.currentUser}*/}
                    {/*/>*/}
                    {/*}*/}
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
                        //sendDM={}
                        roomUsers={chatContext.roomUsers}
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