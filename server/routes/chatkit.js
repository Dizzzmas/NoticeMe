let express = require('express');
const Users = require('../models').users;
let fetch = require('node-fetch');


module.exports = function (app, chatkit) {


    app.post('/api/v1/chatkit/authenticate', (req, res) => {
        const authData = chatkit.authenticate({
            userId: req.query.user_id,
        });
        res.status(authData.status).send(authData.body);
    });

    app.put('/api/v1/chatkit/update', async (req, res) => {

        try {
            await chatkit.updateUser({
                id: req.body.user_id.toString(),
                name: req.body.username,
            });

            let user_rooms = await chatkit.getUserRooms({
                userId: req.body.user_id.toString(),
                includePrivate: true,
            });

            user_rooms.map(async (room) => {
                console.log('MAH ROOMZ', room);
                if (room.private) {
                    console.log(room.custom_data);
                    if (room.custom_data.userIds) {
                        let userIds = room.custom_data.userIds;
                        for (let i = 0; i < userIds.length; i++) {
                            if (userIds[i] === req.body.old_username) {
                                userIds[i] = req.body.username;
                                let replace = req.body.old_username;
                                let re = new RegExp(replace, "g");
                                await chatkit.updateRoom({
                                    id: room.id,
                                    name: room.name.replace(re, req.body.username),
                                    isPrivate: true,
                                    customData: {isDirectMessage: true, userIds: userIds},
                                })
                            }
                        }
                    }
                    // let replace = req.body.old_username;
                    // let re = new RegExp(replace, "g");
                    // await chatkit.updateRoom({
                    //     id: room.id,
                    //     name: room.name.replace(re, req.body.username),
                    //     isPrivate: true,
                    //     customData: {bar: 'baz'},
                    // })
                }
            });
            res.sendStatus(200);


        } catch (error) {
            console.error(error);
            res.status(500).send({message: 'Failed updating user', error: error});
        }


    });

    app.post('/api/v1/chatkit/users', async (req, res) => {
        try {
            const {userId, userName} = req.body;
            let chatkit_new_user = await Users.findByPk(userId);

            await chatkit.createUser({
                id: chatkit_new_user.id.toString(),
                name: chatkit_new_user.username,
                avatarUrl: chatkit_new_user.ava_url,
            });
            res.sendStatus(201);


        } catch (err) {
            if (err.error === 'services/chatkit/user_already_exists') {
                console.log(`User already exists: ${req.body.userId}`);
                res.sendStatus(200);
            } else {
                res.status(err.status).json(err);
            }
        }
    });

};
