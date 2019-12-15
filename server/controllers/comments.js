const Comments = require('../models').comments;
const Users = require('../models').users;
const Posts = require('../models').posts;
const CommentLikes = require('../models').comment_likes;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;


module.exports = {
    async create(req, res) {
        try {
            let comment = await Comments
                .create({
                    content: req.body.content,
                    commenterUsername: 'test',
                    user_id: req.params.userId,
                    post_id: req.params.postId,
                });

            let final_comment = await Comments.findByPk(comment.id, {
                include: [{
                    model: CommentLikes,
                    as: 'likes',
                    required: false,
                }, {
                    model: Users,
                }],
            });
            return res.status(201).send(final_comment);
        } catch (error) {
            return res.status(400).send({message: 'Creating comment failed', error: error});
        }
    },
    async updateById(req, res) {
        try {
            let comment = await Comments
                .findOne({
                    where: {
                        id: req.params.commentId,
                        post_id: req.params.postId,
                        user_id: req.params.userId,
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
            return res.status(400).send({message: 'Updating comment failed', error: error});
        }
    },
    async deleteById(req, res) {
        try {
            let comment = await Comments
                .findByPk(req.params.commentId);
            if (!comment) {
                return res.status(404).send({
                    message: 'Comment Not Found',
                });
            }
            await comment.destroy();
            return res.status(204).send({message: 'Deleted successfully'});
        } catch (error) {
            return res.status(400).send({message: 'Deleting comment failed', error: error});
        }
    },
    async getAll(req, res) {
        const pageSize = process.env.PAGE_SIZE || 4;

        const limit = pageSize;
        const offset = parseInt(req.query.page) * pageSize - pageSize;
        try {
            let comments = await Comments.findAndCountAll({
                offset,
                limit,
                include: [{
                    model: Users
                }, {
                    model: Posts
                }, {
                    model: CommentLikes,
                    as: 'likes',
                    required: false,
                }],
                attributes: [
                    'id', 'content', 'createdAt', 'updatedAt', 'user_id',
                    [Sequelize.literal('(SELECT COUNT(*) FROM comment_likes WHERE comment_likes.comment_id = comments.id)'), 'likesCount'],
                ],
                order: [
                    ['createdAt', 'DESC'],
                    [Sequelize.literal("\"likesCount\""), 'DESC']
                ],
                where: {post_id: req.params.postId}
            });
            return res.status(200).send(comments);
        } catch (error) {
            return res.status(400).send({message: 'GetAll comments failed', error: error})
        }
    },
    async getPostComments(req, res) {
        const commentPageSize = process.env.COMMENT_PAGE_SIZE || 2;
        const limit = commentPageSize;
        const offset = parseInt(req.query.page) * commentPageSize - commentPageSize;
        try {
            let comments = await Comments.findAndCountAll({
                offset,
                limit,
                where: {post_id: req.params.post_id},
                include: [{
                    model: CommentLikes,
                    as: 'likes',
                    required: false,
                }, {
                    model: Users,
                    required: false
                }],
                attributes: [
                    'id', 'content', 'createdAt', 'updatedAt', 'user_id', 'post_id',
                    [Sequelize.literal('(SELECT COUNT(*) FROM comment_likes WHERE comment_likes.comment_id = comments.id)'), 'likedCommentsCount'],
                ],
                order: [
                    ['createdAt', 'DESC'],
                    [Sequelize.literal("\"likedCommentsCount\""), 'DESC']],
            });
            return res.status(200).send(comments);

        } catch (error) {
            return res.status(400).send({message: 'GetPostComments failed', error: error});
        }
    }

};