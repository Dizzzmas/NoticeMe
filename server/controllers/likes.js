const Likes = require('../models').likes;
const Posts = require('../models').posts;
const Users = require('../models').users;


module.exports = {
    async create(req, res) {
        try {
            let like = await Likes.create({
                like: true,
                userId: req.params.userId,
                postId: req.params.postId
            });
            return res.status(201).send(like);
        } catch (error) {
            return res.status(400).send({message: 'Liking post failed', error: error});
        }
    }
};
