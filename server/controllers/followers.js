const Likes = require('../models').likes;
const Posts = require('../models').posts;
const Users = require('../models').users;
const Comments = require('../models').comments;
const Followers = require('../models').followers;
const PostImages = require('../models').post_images;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;


module.exports = {
    async followUser(req, res) {
        try {
            let userId = req.params.userId;
            let followId = req.params.followId;

            if (userId === followId) {
                return res.status(400).send({message: 'Cannot follow yourself'});
            }

            let link = await Followers.create({
                follower_id: userId,
                followed_id: followId
            });

            return res.status(201).send(link);
        } catch (error) {
            return res.status(500).send({message: 'Following User failed', error: error})
        }
    },

    async getFollowers(req, res) {
        try {
            let user = await Users
                .findByPk(req.params.userId, {
                    include: [{model: Users, as: 'followed_by', through: {attributes: []}}],
                    through: {attributes: []}
                });
            if (!user) {
                return res.status(404).send({
                    message: 'User Not Found',
                });
            }
            return res.status(200).send(user);

        } catch (error) {
            return res.status(400).send({message: 'GetById user failed', error: error})
        }
    },
    async getFollowed(req, res) {
        try {
            let user = await Users
                .findByPk(req.params.userId, {
                    include: [{model: Users, as: 'following', through: {attributes: []}}],
                    through: {attributes: []}
                });
            if (!user) {
                return res.status(404).send({
                    message: 'User Not Found',
                });
            }
            return res.status(200).send(user);

        } catch (error) {
            return res.status(400).send({message: 'GetById user failed', error: error})
        }
    },
    async unFollowUser(req, res) {
        try {
            let userId = req.params.userId;
            let followedId = req.params.followedId;
            if (userId === followedId) {
                return res.status(400).send({message: 'Cannot unfollow yourself'});
            }

            let link = await Followers.findOne({where: {follower_id: userId, followed_id: followedId}});
            if (!link) {
                return res.status(404).send({message: 'Link Not FOund'});
            }
            await link.destroy();
            return res.status(204).send();
        } catch (error) {
            return res.status(500).send({message: 'Failed to unfollow user', error: error});

        }
    },
    async isFollowing(req, res) {
        try {

            let userId = req.params.userId;
            let followedId = req.params.followedId;
            let link = await Followers.findOne({where: {follower_id: userId, followed_id: followedId}});
            if (!link) {
                return res.status(404).send({message: 'Link Not FOund'});
            }
            return res.status(200).send({message: 'This user is followed by userId'});
        } catch (error) {
            return res.status(500).send({message: 'Failed to isFollowing'});
        }
    },
    async getFollowedPosts(req, res) {
        const pageSize = process.env.PAGE_SIZE || 4;
        const limit = pageSize;
        const offset = parseInt(req.query.page) * pageSize - pageSize;
        const userId = req.params.userId;

        try {

            let followedIds = await Followers.findAll({
                attributes: ['followed_id'],
                where: {follower_id: userId}
            });

            followedIds = followedIds.map(result => result.followed_id);
            console.log(followedIds);


            let posts = await Posts
                .findAndCountAll({

                    offset,
                    limit,

                    where: {
                        user_id: {
                            [Op.or]: [
                                {[Op.in]: followedIds},
                                {[Op.in]: [userId]}
                            ]
                        }
                    },
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
                    attributes: [
                        'id', 'content', 'createdAt', 'updatedAt', 'user_id',
                        [Sequelize.literal('(SELECT COUNT(*) FROM likes WHERE likes.post_id = posts.id)'), 'likesCount'],
                    ],
                    order: [
                        ['createdAt', 'DESC'],
                        [Sequelize.literal("\"likesCount\""), 'DESC']
                    ],

                });
            return res.status(200).send(posts);
        } catch (error) {
            return res.status(400).send({message: 'GetAllFollowed posts failed', error: error})
        }
    }

};