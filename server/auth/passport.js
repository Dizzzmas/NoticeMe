module.exports = function (passport, user) {
    let User = user;
    let LocalStrategy = require('passport-local').Strategy;
    let BasicStrategy = require('passport-http').BasicStrategy;
    let JwtCookieComboStrategy = require('passport-jwt-cookiecombo');

    passport.use('jwt-signin', new JwtCookieComboStrategy({
        secretOrPublicKey: process.env.SECRET_KEY
    }, (payload, done) => {
        return done(null, payload.user, {});
    }));

    passport.use('basic-signin', new BasicStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
        async (req, email, password, done) => {
            try {
                let user = await User.findOne({
                    where: {
                        email: email
                    }
                });
                if (!user) {
                    return done(null, false);
                }
                if (!user.check_password(password)) {
                    return done(null, false);
                }
                return done(null, user);
            } catch (error) {
                console.log("Error:", err);

                return done(null, false);
            }
        }));

    passport.use('local-signup', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },

        async (req, email, password, done) => {
            try {
                let valid_email_user = await User.findOne({
                    where: {
                        email: email
                    }
                });
                if (valid_email_user) {
                    return done(null, false, req.flash('signupMessage', 'Account with such email already exists'));
                } else if (password !== req.body.confirm_password) {
                    return done(null, false, req.flash('signupMessage', 'Passwords must match'));
                } else {
                    let valid_nickname_user = await User.findOne({
                        where: {
                            username: req.body.username
                        }
                    });
                    if (valid_nickname_user) {
                        return done(null, false, req.flash('signupMessage', 'This username is already taken'));
                    }
                    let new_user = await User.create({
                        email: email,
                        passwordHash: password,
                        username: req.body.username
                    });
                    if (!new_user) {
                        return done(null, false);
                    }
                    if (new_user) {
                        return done(null, new_user);
                    }
                }
            } catch (error) {
                return done(null, false);
            }


        }
    ));

    passport.use('local-signin', new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
        async (req, email, password, done) => {
            try {
                let user = await User.findOne({
                    where: {
                        email: email
                    }
                });
                if (!user) {
                    return done(null, false, req.flash('loginMessage', 'No user found'));
                }
                if (!user.check_password(password)) {
                    return done(null, false, req.flash('loginMessage', 'Wrong password'));
                }
                return done(null, user);
            } catch (error) {
                console.log("Error:", err);

                return done(null, false, req.flash('loginMessage', 'Something went wrong with your Signin'
                ));
            }
        }
    ));

    passport.serializeUser(function (user, done) {

        done(null, user.id);

    });

    passport.deserializeUser(function (id, done) {

        User.findByPk(id).then(function (user) {

            if (user) {

                done(null, user.get());

            } else {

                done(user.errors, null);

            }

        });

    });


};