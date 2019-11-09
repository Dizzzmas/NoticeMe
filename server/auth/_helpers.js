module.exports = {
    loginRequired(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        res.redirect('/login');
    },
    logout(req, res) {
        req.session.destroy(function (err) {
            res.redirect('/');
        });
    },
    adminRequired(req, res, next) {
        if (!req.user) return res.status(401).send('Unauthorized');

        if (!req.user.role) {
            return res.status(403).json({message: 'Access denied'});
        }
        return next();
    }

};