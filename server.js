let express = require('express');
let bodyParser = require('body-parser');
let morgan = require('morgan');
let pg = require('pg');

let app = express();

app.use(bodyParser.json());    // Middleware parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));             // Middleware logger

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "YOUR-DOMAIN.TLD"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.get('/api/customers', (req, res) => {
    const customers = [
        {id: 1, firstName: 'John', lastName: 'Doe'},
        {id: 2, firstName: 'Brad', lastName: 'Traversy'},
        {id: 3, firstName: 'Mary', lastName: 'Swanson'},
    ];

    res.json(customers);
});

app.get('/api/posts', (req, res) => {
    const posts = [
        {id: 1, body: 'Johe'},
        {id: 2, body: 'adasd'},
        {id: 3, body: 'aaas'},
    ];

    res.json(posts);
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './index.html'));
});

const port = 5000;

app.listen(port, () => `Server running on port ${port}`);