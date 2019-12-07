let express = require('express');


module.exports = function (app, chatkit) {


    app.post('/chatkit/authenticate', (req, res) => {
        const authData = chatkit.authenticate({
            userId: req.query.user_id,
        });
        res.status(authData.status).send(authData.body);
    });

    app.post('/chatkit/users', (req, res) => {
        const {userId} = req.body;

        chatkit
            .createUser({
                id: userId,
                name: userId,
            })
            .then(() => {
                res.sendStatus(201);
            })
            .catch(err => {
                if (err.error === 'services/chatkit/user_already_exists') {
                    console.log(`User already exists: ${userId}`);
                    res.sendStatus(200);
                } else {
                    res.status(err.status).json(err);
                }
            });
    });

};
