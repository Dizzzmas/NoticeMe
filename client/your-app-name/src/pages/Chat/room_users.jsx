import React from 'react';
import Proptypes from 'prop-types';

const RoomUsers = props => {
    const {roomUsers, sendDM, currentUser, currentRoom} = props;

    if (currentRoom.id === 'e9f574df-af11-443e-89b5-1b5dd76ffcc3') {

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
            <li className="room-member">
                <div>
                    <span className={`presence ${user.presence.state}`}/>
                    <span key={user.id}>{user.name}</span>
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
    sendDM: Proptypes.func.isRequired,
    currentUser: Proptypes.object.isRequired,
};

export default RoomUsers;