const positionModel = require('../models/position');

module.exports = {
    addPosition(req, res) {
        const { company, jobName, salary, address } = req.body;
        const filename = req.file ? req.file.filename : '';
        positionModel.addPosition(company, jobName, salary, address, filename, (result) => {
            console.log(result);
           if(result && result !== 'error'){
            res.json({
                code: '0000',
                data: {
                    message: '添加成功'
                }
            });
           }else{
               res.json({                
                   code: 'e00e',
                   data: {
                       message: '添加失败'
                   }
               });
           }
        });
    },
    getPositionList(req, res) {
        const { page, size } = req.query;
        var totalPage = 0;
        positionModel.getPositionList({}, (result) => {
            if(result && result !== "error"){
                totalPage = Math.ceil(result.length / size);
                positionModel.getPositionByPage(page, size, (result) => {
                    if(result && result !== 'error'){
                        res.json({
                            code: '0000',
                            data: {
                                list: result,
                                totalPage: totalPage
                            }
                        });
                    }else{
                        res.json({
                            code: 'e00e',
                            data: {
                                message:'查询数据失败'
                            }
                        });
                    }
                });
            }
        });
    },
    removePositionList(req, res) {
        positionModel.removePosition(req.query.id, (result) => {
            if(result && result !== "error"){
                res.json({
                    code: '0000',
                    data: {
                        message: '删除成功'
                    }
                });
            }else{
                res.json({
                    code: 'e00e',
                    data: {
                        message: '删除失败'
                    }
                });
            }
        });
    },
    getPositionInfoById(req, res) {
        positionModel.getPositionInfoById(req.query.id, (result) => {
            if(result && result !== "error") {
                res.json({
                    code: '0000',
                    data: {
                        message: '查询成功',
                        data: result
                    }
                });
            } else {
                res.json({
                    code: 'e00e',
                    data: {
                        message: '查询失败'
                    }
                });
            }
        });
    },
    updatePosition(req, res) {
        positionModel.updatePositionById(req, (result) => {
            if(result && result !== "error") {
                res.json({
                    code: '0000',
                    data: {
                        message: '修改成功',
                        data: result
                    }
                });
            } else {
                res.json({
                    code: 'e00e',
                    data: {
                        message: '修改失败'
                    }
                });
            }
        });
    }
}