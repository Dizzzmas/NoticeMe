let express = require('express');
let router = express.Router();
const User = require('../models/users');
const authHelpers = require('../auth/_helpers');
const jwt = require('jsonwebtoken');

module.exports = function (app, passport) {

    app.post('/auth/register', passport.authenticate('local-signup', {
            successRedirect: '/login',
            failureRedirect: '/register',
            failureFlash: true,
        }
    ));
    app.get('/auth/logout', authHelpers.loginRequired, authHelpers.logout);
    app.post('/auth/login', passport.authenticate('local-signin', {
            //successRedirect: '/auth/profile',
            failureRedirect: '/login',
            failureFlash: true,
        }
    ), (req, res) => {
        const payload = {
            user: req.user
        };
        const token = jwt.sign(payload, process.env.SECRET_KEY);
        res.setHeader('Cache-Control', 'private');
        res.cookie('jwt', token, {
            httpOnly: true, maxAge: 900000,
            sameSite: true,
            signed: true,
        });
        return res.status(200).redirect(`/users/${req.user.id}`);
    });

    app.post('/auth/google', passport.authenticate('google-signin', {session: false}), function (req, res, next) {
        if (!req.user) {
            return res.send(401, 'User Not Authenticated');
        }
        const token = jwt.sign({
                id: req.user.id
            }, process.env.SECRET_KEY,
            {
                expiresIn: 60 * 120
            });
        res.setHeader('x-auth-token', token);
        return res.status(200).send(JSON.stringify(req.user));
    });
    app.get('/auth/profile', authHelpers.loginRequired, (req, res) => {
        res.render('profile', {layout: 'layout', title: 'Profile', user: req.user, currentUser: req.user})
    });


};
