const Users = require('../models').users;
const Posts = require('../models').posts;
const Comments = require('../models').comments;
const jwt = require('jsonwebtoken');


module.exports = {
    async create(req, res) {
        try {
            let user = await Users
                .create({
                    username: req.body.username,
                    passwordHash: req.body.password,
                    email: req.body.email,
                    aboutMe: req.body.aboutMe,
                });
            return res.status(201).send(user);
        } catch (error) {
            res.status(400).send({message: 'creating user failed', error: error});
        }
    },
    async getAll(req, res, next) {
        const pageSize = process.env.PAGE_SIZE || 2;
        const offset = parseInt(req.query.page) * pageSize - pageSize;
        const limit = pageSize;
        try {
            let users = await Users.findAndCountAll({
                    offset,
                    limit,
                    include: [{
                        model: Posts,
                        as: 'posts',
                        include: [{
                            model: Comments,
                            as: 'comments'
                        }]
                    }],

                }
            );
            return res.status(200).send(users);

        } catch (error) {
            return res.status(400).send({message: 'GetAll users failed', error: error});
        }


    },
    async getById(req, res) {
        try {
            let user = await Users
                .findByPk(req.params.userId, {
                    include: [{
                        model: Posts,
                        as: 'posts',
                        include: [{
                            model: Comments,
                            as: 'comments'
                        }]
                    }]
                });
            if (!user) {
                return res.status(404).send({
                    message: 'User Not Found',
                });
            }
            return res.status(200).send(user);

        } catch (error) {
            return res.status(400).send({message: 'GetById user failed', error: error})
        }
    },
    async updateById(req, res) {
        try {
            let user = await Users
                .findByPk(req.params.userId, {
                    include: [{
                        model: Posts,
                        as: 'posts',
                        include: [{
                            model: Comments,
                            as: 'comments'
                        }]
                    }]
                });
            if (!user) {
                return res.status(404).send({
                    message: 'User Not Found'
                });
            }
            let updated_user = await user.update(req.body, {fields: Object.keys(req.body)});
            return res.status(200).send(updated_user);
        } catch (error) {
            return res.status(400).send({message: 'Updating user failed', error: error});
        }
    },
    async deleteById(req, res) {
        try {
            let user = await Users
                .findByPk(req.params.userId, {
                    include: [{
                        model: Posts,
                        as: 'posts',
                        include: [{
                            model: Comments,
                            as: 'comments'
                        }]
                    }]
                });
            if (!user) {
                return res.status(404).send({
                    message: 'User Not Found'
                });
            }
            await user.destroy();
            return res.status(204).send({message: 'Deleted successfully'});
        } catch (error) {
            return res.status(400).send({message: 'Deleting user failed', error: error});
        }
    },
    async setAdmin(req, res) {
        try {
            let user = await Users
                .findByPk(req.params.userId
                );
            if (!user) {
                return res.status(404).send({
                    message: 'User Not Found'
                });
            }
            let admin_user = await user.update({
                role: 1
            });
            return res.status(200).send(admin_user);
        } catch (error) {
            return res.status(400).send({message: 'SetAdmin user failed', error: error});
        }

    },
    async revokeAdmin(req, res) {
        try {
            let user = await Users
                .findByPk(req.params.userId
                );
            if (!user) {
                return res.status(404).send({
                    message: 'User Not Found'
                });
            }
            let normal_user = await user.update({
                role: 0
            });
            return res.status(200).send(normal_user);
        } catch (error) {
            return res.status(400).send({message: 'RevokeAdmin user failed', error: error});
        }

    },
    async jwt_authenticate(req, res) {
        try {
            const {email, password} = req.body;
            let user = await Users.findOne({where: {email: email}});
            if (!user) {
                return res.status(401).send({message: 'Wrong email or password'});
            }
            if (!user.check_password(password)) {
                return res.status(401).send.json({
                    error: 'Incorrect email or password'
                });
            }
            const payload = {
                user: user
            };
            const token = jwt.sign(payload, process.env.SECRET_KEY);
            res.setHeader('Cache-Control', 'private');
            res.cookie('jwt', token, {
                httpOnly: true, maxAge: 900000, sameSite: true,
                signed: true,
            });
            res.end('Authorization to api successful');
        } catch (error) {
            return res.status(500).send({message: 'Something went wrong', error: error})
        }
    }
};