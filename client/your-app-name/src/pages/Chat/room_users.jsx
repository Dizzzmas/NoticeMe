import React, {useContext} from 'react';
import Proptypes from 'prop-types';
import {ChatContext} from "../../services/chat";

const RoomUsers = props => {
    let chatContext = useContext(ChatContext);
    let {roomUsers, currentUser} = props;
    if (chatContext.currentRoom.id === 'e9f574df-af11-443e-89b5-1b5dd76ffcc3') {
        console.log('rum: ', roomUsers);
        console.log(currentUser);

        let only_user = undefined;
        for (let i = 0; i < roomUsers.length; i++) {
            if (roomUsers[i].name === currentUser.name) {
                only_user = roomUsers[i];
                break;
            }
        }

        return (
            <div className="room-users">
                {only_user &&
                <li className="room-member" key={only_user.id}>
                    <div>
                        <span className={`presence ${only_user.presence.state}`}/>
                        <span>{only_user.name}</span>
                    </div>
                </li>
                }
            </div>
        )

    }
    const users = roomUsers.map(user => {
        return (
            <li className="room-member" key={user.id}>
                <div>
                    <span className={`presence ${user.presence.state}`}/>
                    <span>{user.name}</span>
                </div>
            </li>
        );
    });

    return (
        <div className="room-users">
            <ul>{users}</ul>
        </div>
    );
};

RoomUsers.propTypes = {
    roomUsers: Proptypes.array.isRequired,
    currentUser: Proptypes.object.isRequired,
};

export default RoomUsers;