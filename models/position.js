var mongoose = require('../utils/database');
const Position = mongoose.model('position', { //新建一张position表，Position是对这个表的引用
    company: String,
    jobName: String,
    salary: String,
    address: String,
    filename: String
});

module.exports = {
    addPosition(company, jobName, salary, address, filename, callback) {
        var position = new Position({company, jobName, salary, address, filename}); //为position表添加一条数据,es6简便写法

        position.save().then( (res) => {
            callback(res);
        }).catch( () => {
            callback('error');
        });
    },
    getPositionList(params, callback ) {
        Position.find(params).then((res) => {
            callback(res);
        }).catch( () => {
            callback('error');
        })
    },
    getPositionByPage(page, size, callback) {
        page = parseInt(page, 10);
        size = parseInt(size, 10);
        Position.find({}).limit(size).skip((page -1)*size).then((result) => {
            callback(result);
        }).catch(() => {
            callback('error');
        })
    },
    removePosition(id, callback) {
        Position.findByIdAndRemove(id).then( (result) => {
            callback(result);
        }).catch( () => {
            callback('error');
        });
    },
    getPositionInfoById(id, callback) {
        Position.findById(id).then( (result) => {
            callback(result);
        }).catch( () => {
            callback('error');
        });
    },
    updatePositionById(data, callback) {
        const { company, jobName, salary, address } = data.body;
        const obj = {company, jobName, salary, address};
        if(data.file && data.file.filename){
            obj.filename = data.file.filename;
        }
        Position.findByIdAndUpdate(data.body.id, obj).then( (result) => {
            callback(result);
        }).catch( () => {
            callback('error');
        });
    }

}