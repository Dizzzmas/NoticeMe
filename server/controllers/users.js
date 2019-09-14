const User = require('../models').Users;

module.exports = {
    create(req, res) {
        return User
            .create({
                username: req.body.username,
            })
            .then(user => res.status(201).send(user))
            .catch(error => res.status(201).send(error));
    },
};