const Likes = require('../models').likes;
const Posts = require('../models').posts;
const Users = require('../models').users;
const Followers = require('../models').followers;


module.exports = {
    async followUser(req, res) {
        try {
            let userId = req.params.userId;
            let followId = req.params.followId;

            let link = await Followers.create({
                followerId: userId,
                followedId: followId
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
    async unFollowUser(req, res){
        try{
            let userId = req.params.userId;
            let followedId = req.params.followedId;
            let link = await Followers.findOne({where: {followerId: userId, followedId: followedId}});
            if(!link){
                return res.status(404).send({message: 'Link Not FOund'});
            }
            await link.destroy();
            return res.status(204).send();
        }
        catch (error) {
            return res.status(500).send({message: 'Failed to unfollow user', error: error});

        }
    }

};