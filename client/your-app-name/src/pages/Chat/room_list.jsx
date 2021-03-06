import React from 'react';
import Proptypes from 'prop-types';

const RoomList = props => {
    const {rooms, currentRoom, connectToRoom, currentUser} = props;
    const roomList = rooms.map(room => {
        const roomIcon = !room.isPrivate ? '🌐' : '🔒';
        const isRoomActive = room.id === currentRoom.id ? 'active' : '';

        return (
            <li
                className={isRoomActive}
                key={room.id}
                onClick={() => {
                    if (room !== currentRoom) {
                        connectToRoom(room.id);
                        setTimeout(() => {
                                connectToRoom(room.id);
                            }, 600
                        )
                    }

                }}
            >
                <span className="room-icon">{roomIcon}</span>
                {room.customData && room.customData.isDirectMessage ? (
                    <span className="room-name">
            {room.customData.userIds.filter(id => id !== currentUser.name)[0]}

          </span>
                ) : (

                    <span className="room-name">{room.name}</span>


                )}
                {room.unreadCount > 0 && room !== currentRoom ? (
                    <span className="room-unread">{room.unreadCount}</span>
                ) : null}
            </li>
        );
    });
    return (
        <div className="rooms">
            <ul className="chat-rooms">{roomList}</ul>
        </div>
    );
};

RoomList.propTypes = {
    rooms: Proptypes.array.isRequired,
    currentRoom: Proptypes.object.isRequired,
    connectToRoom: Proptypes.func.isRequired,
    currentUser: Proptypes.object.isRequired,
};

export default RoomList;