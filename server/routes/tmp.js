let express = require('express');
let router = express.Router();
const authHelpers = require('../auth/_helpers');
let parser = require('../data/config');
const Comments = require('../models').comments;
const Posts = require('../models').posts;
const Users = require('../models').users;
let UsersController = require('../controllers/users');
let PostsController = require('../controllers/posts');
let CommentsController = require('../controllers/comments');


//Users
//giveAdmin
router.post('/users/:userId/giveadmin', authHelpers.loginRequired, authHelpers.adminRequired, async (req, res) => {
    try {
        let user = await Users
            .findByPk(req.params.userId
            );
        if (!user) {
            return res.status(404).send({
                message: 'User Not Found'
            });
        }
        await user.update({
            role: 1
        });
        return res.status(200).redirect(`/users/${req.params.userId}`);
    } catch (error) {
        return res.status(400).send(error);
    }
});
//revokeAdmin
router.post('/users/:userId/revokeadmin', authHelpers.loginRequired, authHelpers.adminRequired, async (req, res) => {
    try {
        let user = await Users
            .findByPk(req.params.userId
            );
        if (!user) {
            return res.status(404).send({
                message: 'User Not Found'
            });
        }
        await user.update({
            role: 0
        });
        return res.status(200).redirect(`/users/${req.params.userId}`);
    } catch (error) {
        return res.status(400).send(error);
    }
});

router.get('/users', UsersController.getAll);
router.get('/users/:userId', UsersController.getById);
// Comments
// Create comment
router.post('/users/:userId/posts/:postId/comments/new', authHelpers.loginRequired, async (req, res) => {
    try {
        let comment = await Comments
            .create({
                content: req.body.content,
                commenterUsername: req.user.username,
                userId: req.params.userId,
                postId: req.params.postId,
            });
        return res.status(201).redirect(`/posts/${req.params.postId}`);
    } catch (error) {
        return res.status(400).send(error);
    }
});
// Delete comment
router.post('/users/:userId/posts/:postId/comments/:commentId', authHelpers.loginRequired, async (req, res) => {
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
        return res.status(204).redirect(`/posts/${req.params.postId}`);
    } catch (error) {
        return res.status(400).send(error);
    }
});
// Update comment
router.post('/users/:userId/posts/:postId/comments/:commentId/update', authHelpers.loginRequired, async (req, res) => {
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
        return res.status(200).redirect(`/posts/${updated_comment.postId}`);
    } catch (error) {
        return res.status(400).send(error);
    }
});

// Posts
// Create post
router.post('/users/:userId/posts/new', authHelpers.loginRequired, parser.single('image'), async (req, res) => {
    try {
        let post = await Posts
            .create({
                content: req.body.content,
                imageUri: req.file.url,
                userId: req.params.userId
            });
        return res.status(201).redirect(`/posts/${post.id}`);
    } catch (error) {
        console.error(error);
        return res.status(400).send(error);
    }
});
//Delete post
router.post('/users/:userId/posts/:postId', authHelpers.loginRequired, async (req, res) => {
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
        return res.status(204).redirect('/posts');
    } catch (error) {
        return res.status(400).send(error);
    }
});
// Update Post
router.post('/users/:userId/posts/:postId/update', parser.single('image'), authHelpers.loginRequired, async (req, res) => {
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

        return res.status(200).redirect(`/posts/${updated_post.id}`);


    } catch (error) {
        return res.status(400).redirect('/posts');
    }
});

router.get('/posts', PostsController.getAll);
router.get('/posts/search', PostsController.search);
router.get('/posts/:postId', PostsController.getById);

module.exports = router;
