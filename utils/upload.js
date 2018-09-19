const multer  = require('multer');//Multer 是一个 node.js 中间件，用于处理 multipart/form-data 类型的表单数据，它主要用于上传文件。
                                 // Multer 不会处理任何非 multipart/form-data 类型的表单数据。

var storage = multer.diskStorage({ //multer对象的配置项，配置文件存放路径，文件名字
    destination: function (req, file, cb) {
      cb(null, './public/uploads'); //设置文件存放目录。将文件存放到静态文件目录public下，前端页面才能访问到文件。
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' +file.originalname)
    }
  })
  
  const upload = multer({ storage: storage });
  
  module.exports = upload;