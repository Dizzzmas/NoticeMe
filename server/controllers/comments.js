const Comments = require('../models').comments;
const Users = require('../models').users;
const Posts = require('../models').posts;


module.exports = {
    async create(req, res) {
        try {
            let comment = await Comments
                .create({
                    content: req.body.content,
                    commenterUsername: 'test',
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
    },
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
    },
    async getAll(req, res){
        const pageSize = process.env.PAGE_SIZE || 4;
        const limit = pageSize;
        const offset = parseInt(req.query.page) * pageSize - pageSize;
        try{
            let comments = await Comments.findAndCountAll({
                offset,
                limit,
                include: [{
                    model: Users
                },{
                    model: Posts
                }],
                order: [
                        ['createdAt', 'DESC'],
                    ],
                where:{postId: req.params.postId}
            });
            return res.status(200).send(comments);
        }
        catch (error) {
            return res.status(400).send({message: 'GetAll comments failed', error: error})
        }
    }

};