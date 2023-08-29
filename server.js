const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

const app = express();
const member = require('./src/routes/member');

dotenv.config();
app.set('views', './src/views');
app.set('view engine', 'ejs');
app.use(cors());

app.use(express.static(`${__dirname}/src/public`));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', member);

module.exports = app;
