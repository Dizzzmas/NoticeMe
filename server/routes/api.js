let express = require('express');
let router = express.Router();
let routerProtected = express.Router();
let UsersController = require('../controllers/users');
let PostsController = require('../controllers/posts');
let CommentsController = require('../controllers/comments');
let parser = require('../data/config');
const authHelpers = require('../auth/_helpers');

/* GET users listing. */


// Users api
router.post('/users', UsersController.create);
router.get('/users', authHelpers.adminRequired, UsersController.getAll);
router.get('/users/:userId', UsersController.getById);
router.put('/users/:userId', UsersController.updateById);
router.delete('/users/:userId', UsersController.deleteById);
router.post('/users/:userId/giveadmin', UsersController.setAdmin);
router.post('/users/:userId/revokeadmin', UsersController.revokeAdmin);
//
// Posts api
router.post('/users/:userId/posts', parser.single('image'), PostsController.create);
router.delete('/users/:userId/posts/:postId', PostsController.deleteById);
router.get('/posts', PostsController.getAll);
router.get('/posts/search', PostsController.search);
router.get('/posts/:postId', PostsController.getById);
router.put('/users/:userId/posts/:postId', parser.single('image'), PostsController.updateById);
//Comments api
router.post('/users/:userId/posts/:postId/comments', CommentsController.create);
router.put('/users/:userId/posts/:postId/comments/:commentId', CommentsController.updateById);
router.delete('/users/:userId/posts/:postId/comments/:commentId', CommentsController.deleteById);

router.get('/me', async(req, res) => {
    return res.status(200).send(req.user);
});

router.get('/developer/v1', async(req, res) => {
   return res.render('api_info', {layout: 'layout'})
});

router.post('/users-sign-in', UsersController.jwt_authenticate);


module.exports = router;
