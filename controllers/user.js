const userModel = require('../models/user');
const crypto = require('crypto');//nodejs核心加密模块

module.exports = {
    register: (req, res) => {
        console.log(req.body);
        const { userName, passWord } = req.body;
        const hash = crypto.createHash('sha256');//使用sha256算法加密
        hash.update(passWord);//将要加密的数据加到hash中
        //判断用户是否存在
        userModel.findUser({userName:userName}, (result) => {
            console.log(result);
            if (!result && result !== 'error') {
                //给users表中添加数据, hash.digest('hex')执行加密，返回加密后的字符串
                userModel.register(userName, hash.digest('hex'), (result) => {
                    res.json({
                        code: result ? '0000' : 'e00e',
                        data: {
                            message: result ? '注册成功' : '注册失败'
                        }
                    });
                });
            } else {
                res.json({
                    code: 'e00e',
                    data: {
                        message: '用户已存在'
                    }
                });
            }
        });
    },
    login: (req, res) => {
        console.log(req.body);
        const { userName, passWord } = req.body;
        const hash = crypto.createHash('sha256');//使用sha256算法加密
        hash.update(passWord);//将要加密的数据加到hash中
        //判断用户是否存在,密码必须传加密后的字符串，才能和数据库中的进行比较
        userModel.findUser({
            userName: userName, 
            passWord: hash.digest('hex')
        }, (result) => {
            console.log(result);
            if (result && result !== 'error') {
                req.session.userName = userName;//服务器端设置session，存储用户信息
                res.json({
                    code: '0000',
                    data: {
                        message: '登录成功'
                    }
                });
            } else {
                res.json({
                    code: 'e00e',
                    data: {
                        message: '用户不存在，或密码不正确'
                    }
                });
            }
        });
    },
    isLogin: (req, res) => {
        if(req.session.userName){
            res.json({
                code: '0000',
                data: {
                    isLogin: true
                }
            })
        }else{
            res.json({
                code: '0000',
                data: {
                    isLogin: false
                }
            })
        }
    },
    logout: (req, res) => {
        req.session = null;``
        res.json({
            code: '0000',
            data: {
                logout: true
            }
        });
    }
}