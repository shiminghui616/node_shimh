var mongoose = require("mongoose");
var stu = require("./stu");

mongoose.connect('mongodb://127.0.0.1:27017/mydb',function (err) {
    if(err) {
        console.log("数据库连接失败！");
        throw err;
    }
    console.log("数据库连接成功！");
})

exports.GetAllstu = stu.Getstu;
exports.AddStu = stu.CreateStu;
exports.GetOne = stu.GetOneStu;
exports.DelOne = stu.DelOneStu;
exports.DelAll = stu.DelAll;
exports.findFenYe = stu.findFenYe;

