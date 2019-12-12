const CommentLikes = require('../models').comment_likes;


module.exports = {
    async create(req, res) {
        try {
            let existing_like = await CommentLikes
                .findOne({where: {user_id: req.params.userId, comment_id: req.params.commentId}});
            if (existing_like) {
                return res.status(500).send({
                    message: 'This post was already liked'
                });
            }
            let like = await CommentLikes.create({
                like: true,
                user_id: req.params.userId,
                comment_id: req.params.commentId
            });
            return res.status(201).send(like);
        } catch (error) {
            return res.status(500).send({message: 'Liking post failed', error: error});
        }
    },
    async deleteById(req, res) {
        try {
            let like = await LikeComments
                .findOne({where: {user_id: req.params.userId, post_id: req.params.commentId}});
            if (!like) {
                return res.status(404).send({
                    message: 'Like not found'
                });
            }
            await like.destroy();
            return res.status(204).send({message: 'Unliked successfully'});
        } catch (error) {
            return res.status(500).send({message: 'Unliking post failed', error: error});
        }
    }
};