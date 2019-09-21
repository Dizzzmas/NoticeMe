const jwt = require('jsonwebtoken');


const withAuth = function (req, res, next) {
    const token =
        req.cookies.token;

    if (!token) {
        res.status(401).send({
            message: 'Unauthorized: no token provided',
        });
    } else {
        jwt.verify(token.toString(), process.env.SECRET, (err, decoded) => {
            if (err) {
                res.status(401).send({
                    message: 'Unauthorized: invalid token'
                });
            } else {
                req.email = decoded.email;
                req.role = decoded.role;
                console.log(req.url);
                next();
            }
        });
    }
};


module.exports = withAuth;
