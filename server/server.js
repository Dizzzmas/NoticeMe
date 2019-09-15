let express = require('express');
let bodyParser = require('body-parser');
let morgan = require('morgan');
let pg = require('pg');
// const Sequelize = require('sequelize');
let app = express();


// const sequelize = new Sequelize('NoticeMe', 'postgres', 'postgres', {
//   host: 'localhost',
//   dialect:'postgres'
// });

app.use(bodyParser.json());    // Middleware parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));             // Middleware logger

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "YOUR-DOMAIN.TLD"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

require('./routes')(app);
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './index.html'));
});



const port = 5000;

app.listen(port, () => `Server running on port ${port}`);