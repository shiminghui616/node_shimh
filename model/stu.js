var mongoose = require("mongoose");

//创建数据库模型  学生表
var stuSchema = new mongoose.Schema({
    name:String,
    pass:Number,
    mytime:Date
})

var stu = mongoose.model('stu',stuSchema,'stu');

/***
 *
 * @param sindex 查找的位置
 * @param num 查找的个数
 * @param callback  回调函数
 */
exports.findFenYe = function (sindex,num,callback) {
    sindex = parseInt(sindex);
    num = parseInt(num);
    stu.find({}).skip(sindex).limit(num).exec(function (err,data) {
        stu.count({},function (err,sum) {
            callback(sum,data); //sum 总计个数  data 查找到的学生
        })
    })
}





/**
 * 删除全部学生
 */
exports.DelAll = function (callback) {
    stu.remove({},function (err) {
        if(err) {
            callback(false);
        }else {
            callback(true);
        }
    })
}

/**
 * 删除一个学生
 */
exports.DelOneStu = function (cod,callback) {
    stu.remove(cod,function (err) {
        if(err) {
            callback(false);
        }else {
            callback(true);
        }
    })
}

/***
 * 查找一个学生
 * @param cod
 * @param callback
 * @constructor
 */
exports.GetOneStu = function (cod,callback) {
    stu.findOne(cod,function (err,data) {
        if(err) {
            callback('GetOneStu请求失败');
        }else {
            callback(data);
        }
    })
}


/**
 *按条件查找学生
 *callback 回调函数
 *cod 查询条件
 */
exports.Getstu = function (cod,callback) {
    stu.find(cod,function (err,data) {
        console.log(data);//查询到的表中的数据
        callback(data);
    })
}


/*
* 添加一个学生
* newstu：添加
* callback：回调函数
* 返回：布尔类型 false 失败 true 成功
* */
exports.CreateStu = function (newstu,calllback) {
    stu.create(newstu,function (err) {
        if(err) {
            calllback(false);
        }else {
            calllback(true);
        }
    })
}