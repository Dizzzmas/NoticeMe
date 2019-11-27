const Posts = require('../models').posts;
const Comments = require('../models').comments;
const Users = require('../models').users;
const Likes = require('../models').likes;
let fs = require('fs');


module.exports = {
    async create(req, res) {
        try {
            let post = await Posts
                .create({
                    content: req.body.content,
                    imageUri: 'test',
                    userId: req.params.userId
                });
            return res.status(201).send(post);
        } catch (error) {
            console.error(error);
            return res.status(400).send({message: 'creating post failed', error: error});
        }
    },
    async getAll(req, res) {

        const pageSize = process.env.PAGE_SIZE || 4;
        const limit = pageSize;
        const offset = parseInt(req.query.page) * pageSize - pageSize;

        try {
            let posts = await Posts
                .findAndCountAll({
                    offset,
                    limit,
                    include: [{
                        model: Users,
                    },
                        {
                            model: Comments,
                            as: 'comments'
                        },
                        {
                            model: Likes,
                            as: 'likes',
                            required: false,
                        }],
                    order: [
                        ['createdAt', 'DESC'],
                    ],

                });
            return res.status(200).send(posts);
        } catch (error) {
            return res.status(400).send({message: 'GetAll post failed', error: error})
        }
    },
    async updateById(req, res) {
        try {
            let post = await Posts
                .findOne({
                    where: {
                        id: req.params.postId,
                        userId: req.params.userId
                    }
                });
            if (!post) {
                return res.status(404).send({
                    message: 'Post Not Found',
                });
            }

            let updated_post = await post
                .update({
                    content: req.body.content,
                    imageUri: req.file.url || post.imageUri
                });

            return res.status(200).send(updated_post);


        } catch (error) {
            return res.status(400).send({message: 'Updating post failed', error: error});
        }

    },
    async deleteById(req, res) {
        try {
            let post = await Posts
                .findOne({
                    where: {
                        id: req.params.postId,
                        userId: req.params.userId
                    }
                });
            if (!post) {
                return res.status(404).send({
                    message: 'Post Not Found',
                });
            }
            await post.destroy();
            return res.status(204).send({message: 'Deleted successfully'});
        } catch (error) {
            return res.status(400).send({message: 'Deleting post failed', error: error});
        }


    },
    async search(req, res) {
        try {
            let search_res = await Posts.sequelize.query(`SELECT * FROM ${Posts.tableName}  WHERE _search @@ plainto_tsquery('english', :query);`, {
                model: Posts,
                replacements: {query: req.query.search},
            });
            return res.status(200).send(search_res);
        } catch (error) {
            return res.status(400).send({message: 'Searching for posts failed', error: error});
        }
    }
    ,
    async getById(req, res) {
        try {
            let post = await Posts
                .findByPk(req.params.postId, {
                    include: [{model: Comments, as: 'comments'}, {
                        model: Likes,
                        as: 'likes',
                        required: false,
                    }],

                });
            if (!post) {
                return res.status(404).send({
                    message: 'Post Not Found',
                });
            }

            return res.status(200).send(post);
        } catch (error) {
            res.status(400).send({message: 'GetById post failed', error: error})
        }
    },

}
;