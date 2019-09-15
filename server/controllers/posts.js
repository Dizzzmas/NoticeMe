const Post = require('../models').Posts;
const User = require('../models').Users;

module.exports = {
    create(req, res) {
        return Post
            .create({
                body: req.body.body,
                user_id: req.params.user_id,
            })
            .then(post => res.status(201).send(post))
            .catch(error => res.status(400).send(error));
    },
    update(req, res) {
        return Post
            .findOne({
                where: {
                    id: req.params.id,
                    user_id: req.params.user_id,
                },
            })
            .then(post => {
                if (!post) {
                    return res.status(404).send({
                        message: 'Post Not Found',
                    });
                }
                return post
                    .update(req.body, {fields: Object.keys(req.body)})
                    .then(updated_post => res.status(200).send(updated_post))
                    .catch(error => res.status(400).send(error));
            })
            .catch(error => res.status(400).send(error));
    },

    destroy(req, res) {
        return Post
            .findOne({
                where: {
                    id: req.params.id,
                    user_id: req.params.user_id,
                }
            })
            .then(post => {
                if (!post) {
                    res.status(404).send({
                        message: 'Post Not Found'
                    });
                }
                return post
                    .destroy()
                    .then(() => res.status(204).send())
                    .catch(error => res.status(400).send());
            })
            .catch(error => res.status(400).send());
    },
    //TODO: implement normal pagination, this is a temporary solution
    list(req, res) {
        return Post
            .findAll({

                order: [
                    ['createdAt', 'DESC'],
                ],
                limit: 10,
            })
            .then(posts => res.status(200).send(posts))
            .catch(error => res.status(400).send(error));
    }
};