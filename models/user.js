var mongoose = require('../utils/database');
const User = mongoose.model('users', {
    userName: String,
    passWord: String
});

module.exports = {
    findUser: (params, callback) => {
        User.findOne(params).then( (res) => {
            callback(res);
        }).catch( () => {
            callback('error');
        });
    },
    register: (userName, passWord, callback) => {
        const userObj = new User({
            userName: userName,
            passWord: passWord
        });
        userObj.save().then( (res) => {
            callback(res);
        });
    }

}