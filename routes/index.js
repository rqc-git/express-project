var express = require('express');
var router = express.Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: '<h1>首页</h1>' });//会渲染views目录下的index文件.只有渲染views目录下的文件才能用render方法
// });                                             //render函数是模板引擎的底层实现方法

// router.get('/list', function(req, res, next){
//   // res.send('列表');
//   res.render('index', {title:"哈哈哈"});
// }
// );

module.exports = router;
