let express = require('express');
let bodyParser = require('body-parser');
let morgan = require('morgan');
let pg = require('pg');
let winston = require('winston');
let app = express();
let cookieParser = require('cookie-parser');
const withAuth = require('./middleware');

app.use(cookieParser());

let logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(info => {
            return `${info.timestamp} ${info.level}: ${info.message}`;
        })
    ),
    transports: [new winston.transports.Console(),
        new winston.transports.File({filename: './logs/app.log'})]
});

app.use(bodyParser.json());    // Middleware parser
app.use(bodyParser.urlencoded({extended: true}));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
    res.header("Access-Control-Allow-Origin", "YOUR-DOMAIN.TLD"); // update to match the domain you will make the request from
    next();
});
app.use(morgan('dev'));             // Middleware logger




require('./routes')(app);
//require('./middleware')(app);
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './index.html'));
});


const port = 5000;

app.listen(port, () => `Server running on port ${port}`);