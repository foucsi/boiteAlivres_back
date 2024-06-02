require("dotenv").config();
require("./models/connection.js");

let express = require('express');

const userNotFound = require("./middlewares/usersNotFound");
const errorHandler = require("./middlewares/errorHandler");
const bookPlacesNotFound = require('./middlewares/bookPlacesNotFound');

let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');
let bookPlacesRouter = require('./routes/bookPlaces');

let app = express();
const cors = require("cors");
app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/bookPlaces', bookPlacesRouter);

app.use(userNotFound);
app.use(errorHandler);
app.use(bookPlacesNotFound);

module.exports = app;
