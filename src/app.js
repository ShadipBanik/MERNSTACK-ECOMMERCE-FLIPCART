var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cors = require ('cors')
var bodyParser= require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var adminRouter = require('./routes/admin/users');
var categoryRouter = require('./routes/categories');
var productRouter = require('./routes/product');
var cartRouter = require('./routes/cart');
var app = express();
app.use( bodyParser.json() )
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/admin', adminRouter);
app.use('/api/category',categoryRouter);
app.use('/api/product',productRouter);
app.use('/api/cart',cartRouter)
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
const errHandler=(err, req, res, next)=> {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  if(res.headersSent){
    return next(err)
  }
  // render the error page
  res.status(err.status || 500).json({error:err});
  // res.render('error');
}

app.use(errHandler);
module.exports = app;
