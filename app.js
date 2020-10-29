var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const session = require ('express-session');//Requiero express-session
const methodOverride = require('method-override')
const localsUserCheck = require('./middlewares/localsUserCheck'); //requiero el modulo que asigna el valor de session a la variable locals

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
let moviesRouter = require('./routes/movies'); //enrutador de movies
let seriesRouter = require ('./routes/series'); //enrutador de series


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(session({secret:"moviesdb"})) //configuro el uso de session
app.use(methodOverride('_method'))
app.use(localsUserCheck); //asigno la variable session a la variable locals

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use ('/movies', moviesRouter); //Enrutador de movies
app.use ('/series', seriesRouter); //Enrutador de series


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
