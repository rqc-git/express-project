var createError = require('http-errors');
var express = require('express');
var path = require('path');  //node核心模块，获取绝对路径和相对路径
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cookieSession = require('cookie-session')

var apiRouter = require('./routes/api');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views')); //配置视图文件路径是_dirname连接‘views’拼成的路径，即app.js所在路径拼上views
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cookieSession({ //配置服务器端session
  name: 'session',
  secret: 'asdfrqc%@#98sdfaa',//加盐加密
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))
app.use(express.static(path.join(__dirname, 'public')));//定义静态目录。当页面在路由中找不到时，会到静态目录中找

app.use('/api', apiRouter);

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
