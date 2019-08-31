const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
const Data = require('./Data');

const API_PORT = 3000;
const app = express();
app.use(cors());
const router = express.Router();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(logger('dev'));

app.use("/api", router);

app.listen(API_PORT, ()=> console.log("LISTENING ON PORT ${API_PORT}"));



