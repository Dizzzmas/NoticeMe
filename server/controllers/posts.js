const Posts = require('../models').posts;
const Comments = require('../models').comments;
const Users = require('../models').users;
const Likes = require('../models').likes;
const PostImages = require('../models').post_images;
let fs = require('fs');
const Sequelize = require('sequelize');
const cloudinary = require('cloudinary');
const CommentLikes = require('../models').comment_likes;


cloudinary.config({
    cloud_name: 'dv0smnf2u',
    api_key: '262969138672994',
    api_secret: 'U-EdTEBagFF-1UqYO2RrmJeykFQ'
});


module.exports = {
    async create(req, res) {
        try {


            let post = await Posts
                .create({
                    content: req.body.content,
                    user_id: req.params.userId
                });

            let images = Object.values(req.files);
            if (images) {
                let upload_promises = images.map(image => cloudinary.v2.uploader.upload(image.path,
                    // {
                    //   transformation: [{ width: 500, height: 500, crop: "limit" }]                 // Uncomment to crop images on upload
                    // },
                ));
                console.log('Promises: ', upload_promises);
                let upload_results = await Promise.all(upload_promises);
                console.log('Upload_result', upload_results);
                let insert_images_promises = upload_results.map(image => PostImages.create({
                    image_url: image.secure_url,
                    public_id: image.public_id,
                    post_id: post.id
                }));
                await Promise.all(insert_images_promises);
            }

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
                        }, {model: PostImages, as: 'images'}],
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
                        user_id: req.params.userId
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
                });

            return res.status(200).send(updated_post);


        } catch (error) {
            return res.status(400).send({message: 'Updating post failed', error: error});
        }

    },
    async deleteById(req, res) {
        try {
            let post = await Posts
                .findByPk(req.params.postId, {
                    include: [{model: PostImages, as: 'images'}]
                });
            if (!post) {
                return res.status(404).send({
                    message: 'Post Not Found',
                });
            }
            if (post.images) {
                let images = Object.values(post.images);
                console.log('images: ', images);
                let destroy_images_promises = images.map(image => {
                    console.log(image);
                    cloudinary.v2.uploader.destroy(image.public_id);
                });
                await Promise.all(destroy_images_promises);
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
    },
    async getById(req, res) {
        try {
            let post = await Posts
                .findByPk(req.params.postId, {
                    include: [{model: Comments, as: 'comments'}, {
                        model: Likes,
                        as: 'likes',
                        required: false,
                    }, {model: Users}, {model: PostImages, as: 'images'}],
                    attributes: [
                        'id', 'content', 'createdAt', 'updatedAt', 'user_id',
                        [Sequelize.literal('(SELECT COUNT(*) FROM likes WHERE likes.post_id = posts.id)'), 'likesCount'],
                    ]
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
    async userPosts(req, res) {
        const pageSize = process.env.PAGE_SIZE || 2;
        const commentPageSize = process.env.COMMENT_PAGE_SIZE || 2;
        const limit = pageSize;
        const offset = parseInt(req.query.page) * pageSize - pageSize;

        try {

            // let comments_count = await Posts.Coun

            let posts = await Posts
                .findAndCountAll({
                    offset,
                    limit,
                    where: {
                        user_id: req.params.userId
                    },
                    include: [{
                        model: Users,
                    },
                        {
                            limit: commentPageSize,
                            subQuery: false,
                            model: Comments,
                            as: 'comments',
                            attributes: [
                                'id', 'content', 'createdAt', 'updatedAt', 'user_id', 'post_id',
                                [Sequelize.literal('(SELECT COUNT(*) FROM comment_likes WHERE comment_likes.comment_id = comments.id)'), 'likedCommentsCount'],
                            ],
                            order: [
                                ['createdAt', 'DESC'],
                                [Sequelize.literal("\"likedCommentsCount\""), 'DESC']],
                            include: [{

                                model: CommentLikes,
                                as: 'likes',

                            }, {

                                model: Users,


                            }],


                        },
                        {
                            model: Likes,
                            as: 'likes',
                        }, {model: PostImages, as: 'images'}],
                    attributes: [
                        // [[Sequelize.fn("COUNT", Sequelize.col("comments.id")), "sensorCount"]],
                        'id', 'content', 'createdAt', 'updatedAt', 'user_id',
                        [Sequelize.literal('(SELECT COUNT(*) FROM likes WHERE likes.post_id = posts.id)'), 'likesCount'],
                        [Sequelize.literal('(SELECT COUNT(*) FROM comments WHERE comments.post_id = posts.id)'), 'commentsCount']
                    ],
                    order: [
                        ['createdAt', 'DESC'],
                        [Sequelize.literal("\"likesCount\""), 'DESC'],
                    ],

                });
            return res.status(200).send(posts);
        } catch (error) {
            return res.status(400).send({message: 'GetuserPosts failed', error: error});
        }
    }

}
;