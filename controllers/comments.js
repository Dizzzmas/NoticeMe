const Comments = require('../models').comments;


module.exports = {
    async create(req, res) {
        try {
            let comment = await Comments
                .create({
                    content: req.body.content,
                    commenterUsername: req.user.username,
                    userId: req.params.userId,
                    postId: req.params.postId,
                });
            return res.status(201).send(comment);
        } catch (error) {
            return res.status(400).send({message:'Creating comment failed', error: error});
        }
    },
    async updateById(req, res) {
        try {
            let comment = await Comments
                .findOne({
                    where: {
                        id: req.params.commentId,
                        postId: req.params.postId,
                        userId: req.params.userId,
                    }
                });
            if (!comment) {
                return res.status(404).send({
                    message: 'Comment Not Found',
                });
            }
            let updated_comment = await comment
                .update(req.body, {fields: Object.keys(req.body)});
            return res.status(200).send(updated_comment);
        } catch (error) {
            return res.status(400).send({message:'Updating comment failed', error: error});
        }
    }
    ,
    async deleteById(req, res) {
        try {
            let comment = await Comments
                .findOne({
                    where: {
                        id: req.params.commentId,
                        postId: req.params.postId,
                        userId: req.params.userId
                    }
                });
            if (!comment) {
                return res.status(404).send({
                    message: 'Comment Not Found',
                });
            }
            await comment.destroy();
            return res.status(204).send({message: 'Deleted successfully'});
        } catch (error) {
            return res.status(400).send({message:'Deleting comment failed', error: error});
        }
    }

};