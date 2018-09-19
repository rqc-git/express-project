var express = require('express');
var router = express.Router();
const userController = require('../controllers/user');
const positionController = require('../controllers/position');
const upload = require('../utils/upload');


/* 接口 */
router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/isLogin', userController.isLogin);
router.get('/logout', userController.logout);

router.post('/addPosition', upload.single('logo'), positionController.addPosition);
router.get('/removePositionList', positionController.removePositionList);
router.get('/currentPositionInfo', positionController.getPositionInfoById);
router.post('/updatePosition', upload.single('logo'), positionController.updatePosition);
router.get('/getPositionList', positionController.getPositionList);


module.exports = router;