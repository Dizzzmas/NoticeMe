const Users = require('../models').users;
const Posts = require('../models').posts;
const Comments = require('../models').comments;
const jwt = require('jsonwebtoken');
const md5 = require('md5');
const utf8 = require('utf8');
const bcrypt = require("bcrypt");
const Sequelize = require('sequelize');
const Op = Sequelize.Op;


module.exports = {
    async create(req, res) {
        console.log(req.body.email, req.body.password, req.body.username);
        try {


            let invalid_email_user = await Users.findOne({
                where: {
                    email: req.body.email
                }
            });
            if (invalid_email_user) {
                if (invalid_email_user.google_id && !invalid_email_user.password_hash) {
                    const salt = bcrypt.genSaltSync();
                    let updated_user = await invalid_email_user.update({
                        password_hash: bcrypt.hashSync(req.body.password, salt)
                    });
                    const payload = {
                        user: updated_user
                    };
                    const token = jwt.sign(payload, 'cc6cd6b1fe55fd924d4a8e1b6bac018c');

                    let final_user = Users.findByPk(updated_user.id, {
                        include: [
                            {model: Users, as: 'followed_by', through: {attributes: []}}, {
                                model: Users,
                                as: 'following',
                                through: {attributes: []}
                            }]
                    });

                    return res.status(201).send({final_user, token});
                }
                console.log('Repeated email');
                return res.status(400).send({message: 'Account with such email already exists'});
            }
            let invalid_nickname_user = await Users.findOne({
                where: {
                    username: req.body.username
                }
            });
            if (invalid_nickname_user) {
                console.log('Repeated username');
                return res.status(400).send({message: 'Account with such username already exists'});
            }
            let user = await Users
                .create({
                    username: req.body.username,
                    password_hash: req.body.password,
                    handle: '@' + req.body.username,
                    email: req.body.email,
                    about_me: req.body.aboutMe,
                    ava_url: `https://www.gravatar.com/avatar/${md5(utf8.encode(req.body.email.toLowerCase()))}?d=identicon`,
                });

            let final_user = await Users.findByPk(user.id, {
                include: [
                    {model: Users, as: 'followed_by', through: {attributes: []}}, {
                        model: Users,
                        as: 'following',
                        through: {attributes: []}
                    }]
            });

            const payload = {
                user: user
            };
            const token = jwt.sign(payload, 'cc6cd6b1fe55fd924d4a8e1b6bac018c');


            return res.status(201).send({final_user, token});
        } catch (error) {
            console.log('Sign up error');
            return res.status(400).send({message: 'creating user failed', error: error});
        }
    },
    async getAll(req, res, next) {
        const pageSize = process.env.PAGE_SIZE || 4;
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
                    }, {model: Users, as: 'followed_by', through: {attributes: []}}, {
                        model: Users,
                        as: 'following',
                        through: {attributes: []}
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
    async getByUsername(req, res) {
        try {
            let user = await Users
                .findOne({
                    where: {username: req.params.username}, include: [{
                        model: Posts,
                        as: 'posts',
                        include: [{
                            model: Comments,
                            as: 'comments'
                        }]
                    }, {model: Users, as: 'followed_by', through: {attributes: []}}, {
                        model: Users,
                        as: 'following',
                        through: {attributes: []}
                    }]
                });
            if (!user) {
                return res.status(404).send({
                    message: 'User Not Found',
                });
            }
            return res.status(200).send(user);

        } catch (error) {
            return res.status(400).send({message: 'GetByUsername user failed', error: error})
        }
    },
    async updateById(req, res) {
        try {
            let user = await Users
                .findByPk(req.params.userId);
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
    async search(req, res) {
        try {
            let search_res = await Users.sequelize.query(`SELECT * FROM ${Users.tableName}  WHERE _search @@ plainto_tsquery('english', :query);`, {
                model: Users,
                replacements: {query: req.query.search},
            });
            return res.status(200).send(search_res);
        } catch (error) {
            return res.status(400).send({message: 'Searching for posts failed', error: error});
        }
    },
    async jwt_authenticate(req, res) {
        try {
            console.log(req.body.email, req.body.password, req.body);
            const {email, password} = req.body;
            let user = await Users.findOne({
                    where: {email: email}, include: [
                        {model: Users, as: 'followed_by', through: {attributes: []}}, {
                            model: Users,
                            as: 'following',
                            through: {attributes: []}
                        }]
                }
            );
            if (!user) {
                return res.status(401).send({message: 'Wrong email or password'});
            }
            if (!user.check_password(password)) {
                return res.status(401).send({
                    error: 'Wrong email or password'
                });
            }
            const Sequelize = require('sequelize');
            const Op = Sequelize.Op;

            const payload = {
                user: user
            };
            const token = jwt.sign(payload, 'cc6cd6b1fe55fd924d4a8e1b6bac018c');

            res.send({user, token});
        } catch (error) {
            return res.status(500).send({message: 'Something went wrong', error: error})
        }
    },
    async jwt_logout(req, res) {
        try {

            if (res.clearCookie('jwt')) {
                res.send({message: 'Cookie successfully destroyed'})
            } else {
                res.send({message: 'No jwt cookies set, maybe user authorized with google'});
            }
        } catch {
            return res.status(400).send({message: 'Something went wrong, could not destroy cookie', error: error})
        }
    },
    async authGoogleUser(accessToken, refreshToken, profile, done) {
        try {
            let existing_user = await Users
                .findOne({
                    where: {
                        google_id: profile.id
                    }, include: [
                        {model: Users, as: 'followed_by', through: {attributes: []}}, {
                            model: Users,
                            as: 'following',
                            through: {attributes: []}
                        }]
                });
            if (!existing_user) {
                let new_user = await Users
                    .create({
                        username: profile.displayName,
                        handle: '@' + profile.displayName,
                        email: profile.emails[0].value,
                        google_id: profile.id,
                        google_token: accessToken,
                        ava_url: `https://www.gravatar.com/avatar/${md5(utf8.encode(profile.emails[0].value.toLowerCase()))}?d=identicon`,
                    });
                let final_user = await Users.findByPk(new_user.id, {
                    include: [
                        {model: Users, as: 'followed_by', through: {attributes: []}}, {
                            model: Users,
                            as: 'following',
                            through: {attributes: []}
                        }]
                });
                return done(null, final_user);
            } else {
                return done(null, existing_user);
            }

        } catch (error) {
            console.log('Could not add google user');
            return done(null, false);
        }
    },
    async getSuggested(req, res) {
        const pageSize = process.env.PAGE_SIZE || 4;
        const offset = parseInt(req.query.page) * pageSize - pageSize;
        const limit = pageSize;
        try {
            let suggested = await Users.findAndCountAll({
                where: {
                    id: {
                        [Op.not]: req.params.userId
                    }
                },
                attributes: [
                    'id', 'username', 'handle', 'email', 'about_me', 'role', 'ava_url',
                    [Sequelize.literal('(SELECT COUNT(*) FROM followers WHERE followers.followed_id = users.id)'), 'followersCount'],
                ],
                include: [
                    {model: Users, as: 'followed_by', through: {attributes: []}}, {
                        model: Users,
                        as: 'following',
                        through: {attributes: []}
                    }],
                order: [
                    [Sequelize.literal("\"followersCount\""), 'DESC']
                ],
            });
            return res.send(suggested);
        } catch (error) {
            return res.status(500).send();
        }

    }
};