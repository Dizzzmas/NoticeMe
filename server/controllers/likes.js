const Likes = require('../models').likes;
const Posts = require('../models').posts;
const Users = require('../models').users;


module.exports = {
    async create(req, res) {
        try {
            let existing_like = await Likes
                .findOne({where: {userId: req.params.userId, postId: req.params.postId}});
            if(existing_like){
                return res.status(500).send({
                    message: 'This post was already liked'
                });
            }
            let like = await Likes.create({
                like: true,
                userId: req.params.userId,
                postId: req.params.postId
            });
            return res.status(201).send(like);
        } catch (error) {
            return res.status(500).send({message: 'Liking post failed', error: error});
        }
    },
    async deleteById(req, res) {
        try {
            let like = await Likes
                .findOne({where: {userId: req.params.userId, postId: req.params.postId}});
            if(!like){
                return res.status(404).send({
                    message: 'Like not found'
                });
            }
            await like.destroy();
            return res.status(204).send({message: 'Unliked successfully'});
        }
        catch(error){
            return res.status(500).send({message: 'Unliking post failed', error: error});
        }
    }
};
