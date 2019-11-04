let createError = require('http-errors');
let express = require('express');
let path = require('path');
let logger = require('morgan');
let hbs = require('express-handlebars');
let flash = require('connect-flash');
let indexRouter = require('./routes/index');
let apiRouter = require('./routes/api');
let tmpRouter = require('./routes/tmp');
let developerRouter = require('./routes/developer');
let cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
let User = require('./models').users;
let basicAuth = require('express-basic-auth');


let app = express();
app.use(cookieParser(process.env.SECRET_KEY));

// view engine setup
app.use('views', express.static(path.join(__dirname, 'views')));
app.set('view engine', 'hbs');

app.engine('hbs', hbs({
    extname: 'hbs',
    defaultView: '',
    layoutsDir: __dirname + '/views',
    partialsDir: __dirname + '/views/partials',
    helpers: require('./helpers/handlebars'),
}));


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));


app.use(session({secret: 'keyboard cat', resave: true, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(express.static('public'));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));


let authRoute = require('./routes/auth')(app, passport);
require('./auth/passport')(passport, User);
app.use('/', indexRouter);
app.use('/api/v1', apiRouter.unprotected);
app.use('/api/v1', passport.authenticate('jwt-signin', {
    session: false,
    failureFlash: true,

}), (req, res, next) => {
    return next();
}, apiRouter.protected);


app.use('/developer/v1', developerRouter);
app.use('/tmp', tmpRouter);


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
    res.header("Access-Control-Allow-Origin", "YOUR-DOMAIN.TLD"); // update to match the domain you will make the request from
    next();
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error', {layout: 'layout'});
});

app.listen(process.env.PORT, () => `Server running on port ${process.env.PORT}`);

module.exports = passport;
