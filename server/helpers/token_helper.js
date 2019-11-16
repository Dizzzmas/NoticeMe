let jwt = require('jsonwebtoken');


module.exports = {

    createToken(payload){
        return jwt.sign({
            id: payload.id
        }, process.env.SECRET_KEY, {
            expiresIn: 60 * 120
        });
    },
    sendToken: function(req, res){
        res.setHeader('x-auth-token', req.token);
        return res.status(200).send(JSON.stringify(req.user));
    }
};