require("dotenv").config();
require("./db/connection.js");

let express = require('express');

const userNotFound = require("./middlewares/usersNotFound");
const bookPlacesNotFound = require('./middlewares/bookPlacesNotFound');
const commentsNotFound = require('./middlewares/commentsNotFound');
const featuresNotFound = require('./middlewares/featuresNotFound');
const favoritesNotFound = require('./middlewares/favoritesNotFound');
const msgOrEmailMissing = require('./middlewares/msgOrEmailMissing');
const errorHandler = require("./middlewares/errorHandler");

let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');
let bookPlacesRouter = require('./routes/bookPlaces');
let commentsRouter = require('./routes/comments');
let photosRouter = require('./routes/photos');
let featuresRouter = require('./routes/features');
let favoritesRouter = require('./routes/favorites');
let testRoutes = require('./routes/testRoutes');

let app = express();
const fileUpload = require("express-fileupload");
app.use(fileUpload());
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
app.use('/comments', commentsRouter);
app.use('/photos', photosRouter);
app.use('/features', featuresRouter);
app.use('/favorites', favoritesRouter);
app.use('/test', testRoutes);

app.use(userNotFound);
app.use(bookPlacesNotFound);
app.use(commentsNotFound);
app.use(featuresNotFound);
app.use(favoritesNotFound);
app.use(msgOrEmailMissing);

//Warning, this generic middlewares should be the last one
app.use(errorHandler);


module.exports = app;
