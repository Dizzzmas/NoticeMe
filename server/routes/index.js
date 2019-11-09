let express = require('express');
let router = express.Router();
const ApiHelper = require('../helpers/api_helper');
const authHelpers = require('../auth/_helpers');


router.get('/', (req, res, next) => {
    res.render('index', {layout: 'layout', title: 'Home', currentUser: req.user});
});
router.get('/explore', authHelpers.loginRequired, async (req, res) => {
    const search_str = req.query.search;
    let search_res;
    if (search_str) {
        try {
            let search = await ApiHelper.makeApiCall(req.protocol, req.get('host'), `/tmp/posts/search?search=${search_str}`);
            search_res = search;
            res.render('explore', {
                layout: 'layout', title: 'Explore', search_str: search_str,
                search_res: search_res,
                currentUser: req.user,
            });

        } catch (error) {
            res.status(404).render('errors/404', {layout: 'layout', title: 'Error', error: error});
        }
    } else {
        res.render('explore', {layout: 'layout', title: 'Explore', currentUser: req.user});
    }
});


router.post('/update_post', authHelpers.loginRequired, (req, res) => {
    res.render('update_post', {
        layout: 'layout',
        title: 'Update Post',
        postId: req.body.postId,
        userId: req.body.userId,
        currentUser: req.user,
    })
});

router.post('/update_comment', authHelpers.loginRequired, (req, res) => {
    res.render('update_comment', {
        layout: 'layout',
        title: 'Update Comment',
        commentId: req.body.commentId,
        postId: req.body.postId,
        userId: req.body.userId,
        currentUser: req.user,
    });
});

router.get('/posts', authHelpers.loginRequired, async (req, res, next) => {
    res.render('posts', {
        layout: 'layout',
        title: 'Posts',
        currentUser: req.user,
    });
});

router.get('/posts/new', authHelpers.loginRequired, (req, res, next) => {
    res.render('new_post', {layout: 'layout', title: 'New Post', currentUser: req.user});
});
router.get('/posts/:post_id/new_comment', authHelpers.loginRequired, (req, res, next) => {
    res.render('new_comment', {
        layout: 'layout',
        title: 'New Comment',
        currentUser: req.user,
        postId: req.params.post_id
    });
});

router.get('/posts/:post_id', authHelpers.loginRequired, async (req, res, next) => {
    try {
        let post = await ApiHelper.makeApiCall(req.protocol, req.get('host'), `/tmp/posts/${req.params.post_id}`);
        res.render('post', {layout: 'layout', title: 'Post', post: post, currentUser: req.user,});
    } catch (error) {
        res.status(404).render('errors/404', {layout: 'layout', title: 'Error', error: error});
    }
});

router.get('/users', authHelpers.loginRequired, authHelpers.adminRequired, async (req, res) => {
        let page = parseInt(req.query.page);
        let nextPage = page + 1;
        let prevPage = page - 1;
        if (!page || page === 1) {
            page = 1;
            prevPage = page;
            nextPage = page + 1;
        }
        try {
            let users = await ApiHelper.makeApiCall(req.protocol, req.get('host'), `/tmp/users?page=${page}`);
            const pageCount = Math.ceil(users.count / process.env.PAGE_SIZE || 2);
            if (page >= pageCount) {
                page = pageCount;
                nextPage = page;
            }
            res.render('users', {
                layout: 'layout',
                title: 'Users',
                users: users,
                currentUser: req.user,
                pageCount: pageCount,
                nextPage: nextPage,
                prevPage: prevPage,
                page: page
            });
        } catch (error) {
            res.status(404).render('errors/404', {layout: 'layout', title: 'Error', error: error});
        }
    }
);

router.get('/users/:user_id', authHelpers.loginRequired, async (req, res, next) => {
    try {
        let user = await ApiHelper.makeApiCall(req.protocol, req.get('host'), `/tmp/users/${req.params.user_id}`);
        res.render('profile', {layout: 'layout', title: 'User', user: user, currentUser: req.user});
    } catch (error) {
        res.status(404).render('errors/404', {layout: 'layout', title: 'Error', error: error});
    }
});

router.get('/about', (req, res, next) => {
    res.render('about', {layout: 'layout', title: 'About', currentUser: req.user});
});

router.get('/register', (req, res, next) => {
    res.render('register', {layout: 'layout', title: 'Register', message: req.flash('signupMessage')});
});
router.get('/login', (req, res, next) => {
    res.render('login', {layout: 'layout', title: 'Login', message: req.flash('loginMessage')});
});


module.exports = router;
