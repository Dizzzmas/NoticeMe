const UsersController = require('../controllers/users');
const PostsController = require('../controllers/posts');

module.exports = (app) => {
    app.get('/api', (req, res) => res.status(200).send({
        message: 'Welcome to the API',
    }));
    // Users api
    app.post('/api/users', UsersController.create);
    app.get('/api/users', UsersController.list);
    app.get('/api/users/:user_id', UsersController.retrieve);
    app.put('/api/users/:user_id', UsersController.update);
    app.delete('/api/users/:user_id', UsersController.destroy);

    // Posts api
    app.post('/api/users/:user_id/posts', PostsController.create);
    app.put('/api/users/:user_id/posts/:id', PostsController.update);
    app.delete('/api/users/:user_id/posts/:id', PostsController.destroy);
    app.get('/api/posts', PostsController.list); //TODO: remove this, temporary solution


    app.all('/api/users/:user_id/posts', (req, res) =>
        res.status(405).send({
            message: 'Method Not Allowed',
        }));
};
