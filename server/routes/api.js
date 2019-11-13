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
routerProtected.post('/users', UsersController.create);
routerProtected.get('/users', authHelpers.adminRequired, UsersController.getAll);
routerProtected.get('/users/:userId', UsersController.getById);
routerProtected.put('/users/:userId', UsersController.updateById);
routerProtected.delete('/users/:userId', UsersController.deleteById);
routerProtected.post('/users/:userId/giveadmin', UsersController.setAdmin);
routerProtected.post('/users/:userId/revokeadmin', UsersController.revokeAdmin);
//
// Posts api
routerProtected.post('/users/:userId/posts', parser.single('image'), PostsController.create);
routerProtected.delete('/users/:userId/posts/:postId', PostsController.deleteById);
routerProtected.get('/posts', PostsController.getAll);
routerProtected.get('/posts/search', PostsController.search);
routerProtected.get('/posts/:postId', PostsController.getById);
routerProtected.put('/users/:userId/posts/:postId', parser.single('image'), PostsController.updateById);
routerProtected.post('/users-log-out', UsersController.jwt_logout);
router.post('/users-sign-in', UsersController.jwt_authenticate);
//Comments api
routerProtected.post('/users/:userId/posts/:postId/comments', CommentsController.create);
routerProtected.put('/users/:userId/posts/:postId/comments/:commentId', CommentsController.updateById);
routerProtected.delete('/users/:userId/posts/:postId/comments/:commentId', CommentsController.deleteById);

routerProtected.get('/me', async(req, res) => {
    return res.status(200).send(req.user);
});

router.get('/developer/v1', async(req, res) => {
   return res.render('api_info', {layout: 'layout'})
});




module.exports = {
    unprotected: router,
    protected: routerProtected
};
