let express = require('express');
let router = express.Router();
let routerProtected = express.Router();
let UsersController = require('../controllers/users');
let PostsController = require('../controllers/posts');
let CommentsController = require('../controllers/comments');
let LikesController = require('../controllers/likes');
let CommentLikesController = require('../controllers/comment_likes');
let FollowersController = require('../controllers/followers');
let parser = require('../data/config');
const authHelpers = require('../auth/_helpers');


/* GET users listing. */
router.get('/users/search', UsersController.search);
router.get('/posts/:postId', PostsController.getById);
// Users api
router.post('/users', UsersController.create);
routerProtected.get('/users', authHelpers.adminRequired, UsersController.getAll);
routerProtected.get('/users/:userId', UsersController.getById);
routerProtected.get('/users/getByUsername/:username', UsersController.getByUsername);
router.put('/users/:userId', UsersController.updateById);
routerProtected.delete('/users/:userId', UsersController.deleteById);
routerProtected.post('/users/:userId/giveadmin', UsersController.setAdmin);
routerProtected.post('/users/:userId/revokeadmin', UsersController.revokeAdmin);

// Posts api
router.post('/users/:userId/posts/new', PostsController.create);
router.get('/users/:userId/posts/userPosts', PostsController.userPosts);
router.delete('/posts/:postId', PostsController.deleteById);
router.get('/posts', PostsController.getAll);
routerProtected.get('/posts/search', PostsController.search);
routerProtected.put('/users/:userId/posts/:postId', parser.single('image'), PostsController.updateById);
routerProtected.post('/users-log-out', UsersController.jwt_logout);
router.post('/users-sign-in', UsersController.jwt_authenticate);

//Comments api
router.post('/users/:userId/posts/:postId/comments', CommentsController.create);
routerProtected.put('/users/:userId/posts/:postId/comments/:commentId', CommentsController.updateById);
router.delete('/comments/:commentId', CommentsController.deleteById);
router.get('/posts/GetAllComments/:postId', CommentsController.getAll);

//Likes api
router.post('/users/:userId/posts/:postId/like', LikesController.create);
router.delete('/users/:userId/posts/:postId/unlike', LikesController.deleteById);

// Comment Likes api
router.post('/users/:userId/comments/:commentId/like', CommentLikesController.create);
router.delete('/users/:userId/comments/:commentId/unlike', CommentLikesController.deleteById);

// Followers Api
router.post('/users/:userId/follow/:followId', FollowersController.followUser);
router.get('/users/:userId/followers', FollowersController.getFollowers);
router.get('/users/:userId/followed', FollowersController.getFollowed);
router.delete('/users/:userId/unfollow/:followedId', FollowersController.unFollowUser);
router.get('/users/:userId/isfollowing/:followedId', FollowersController.isFollowing);
router.get('/users/:userId/followedPosts', FollowersController.getFollowedPosts);


routerProtected.get('/me', async (req, res) => {
    return res.status(200).send(req.user);
});

router.get('/developer/v1', async (req, res) => {
    return res.render('api_info', {layout: 'layout'})
});


module.exports = {
    unprotected: router,
    protected: routerProtected
};
