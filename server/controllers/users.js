const User = require('../models').Users;
const Posts = require('../models').Posts;
const jwt = require('jsonwebtoken');


module.exports = {
    create(req, res) {
        return User
            .create({
                username: req.body.username,
                password_hash: req.body.password,
                email: req.body.email,
            })
            .then(user => res.status(201).send(user))
            .catch(error => res.status(400).send(error));
    },
    list(req, res) {
        return User
            .findAll({
                include: [{
                    model: Posts,
                    as: 'posts'
                }],
            })
            .then(users => res.status(200).send(users))
            .catch(error => res.status(400).send(error));
    },
    retrieve(req, res) {
        return User
            .findByPk(req.params.user_id, {
                include: [{
                    model: Posts,
                    as: 'posts',
                }],
            })
            .then(user => {
                if (!user) {
                    return res.status(404).send({
                        message: 'User Not Found',
                    });
                }
                return res.status(200).send(user);
            })
            .catch(error => res.status(400).send(error));
    },
    update(req, res) {
        return User
            .findByPk(req.params.user_id, {
                include: [{
                    model: Posts,
                    as: 'posts',
                }],
            })
            .then(user => {
                if (!user) {
                    return res.status(404).send({
                        message: 'User Not Found',
                    });
                }
                return user
                    .update(req.body, {fields: Object.keys(req.body)})
                    .then(() => res.status(200).send(user))             // Send back updated user
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },
    destroy(req, res) {
        return User
            .findByPk(req.params.user_id)
            .then(user => {
                if (!user) {
                    res.status(404).send({
                        message: 'User Not Found',
                    });
                }
                return user
                    .destroy()
                    .then(() => res.status(204).send())
                    .catch(error => res.status(400).send(error));
            })
            .catch(error => res.status(400).send(error));
    },
    authenticate(req, res) {
        const {email, password} = req.body;
        return User
            .findOne({
                where: {
                    email: email,
                },
            })
            .then(function (user) {
                if (!user) {
                    // Query user from database
                    res.status(401).send.json({
                        error: 'Incorrect email or password'
                    });
                }
                // Check if password is correct
                if (!user.check_password(password)) {
                    res.status(401).send.json({
                        error: 'Incorrect email or password'
                    });
                } else {
                    console.log(user.role);
                    // Issue token to the user
                    const payload = {
                        email: email,
                        role: user.role
                    };
                    const token = jwt.sign(payload, process.env.SECRET, {
                        expiresIn: '1h'
                    });

                    res.cookie('token', token, {httpOnly: true}).sendStatus(200);
                    console.log('cookie created successfully');
                }
            })
            .catch(error => res.send(error));
    }

}
;