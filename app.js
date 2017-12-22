var express = require("express");
var path = require("path");
var body = require("body-parser");
var model = require("./model/mongodb");//引入数据库文件

var app = express();

app.use(body.json());
app.use(body.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,"www")));

/*model.GetAllstu({},function (list) {
    console.log("list: "+list);
})*/
/*
var newStu = {
    name:"shimh666",
    pass:111222,
    mytime:new Date()
}
model.AddStu(newStu,function (data) {
    if(data) {
        console.log("学生信息创建成功！")
    }else {
        console.log("学生信息创建失败！")
    }
});*/

/***
 * 分页
 */
app.get('/api/stu/fy',function (req,res) {
    var tiao = req.query.tiao;
    var page = req.query.page;
    model.findFenYe(tiao,page,function (count,data) {
        res.status(200).json({success:true,msg:'',obj:data,count:count});
    });
})

app.get('/api/stu/delAll',function (req,res) {
    model.DelAll(function (data) {
        res.status(200).json({success:true,msg:data})
    })
})

app.get('/api/stu/delOne',function (req,res) {
    var stu = {
        name:req.query.name
    }
    model.DelOne(stu,function (data) {
        res.status(200).json({success:true,msg:data})
    })
})

app.get('/api/stu/info',function (req,res) {
    var stu = {
        name:req.query.name
    }
    model.GetOne(stu,function (data) {
        res.status(200).json({success:true,obj:data})
    })
})

app.post('/api/stu/login',function (req,res) {
    var stu = {
        name:req.body.name,
        pass:req.body.pass
    }
    model.GetAllstu(stu,function (data) {
        if(data.length>0) {
            res.status(200).json({success:true,msg:'OK'})
        }else {
            res.status(200).json({success:true,msg:'none'})
        }
    });
})

app.post('/api/stu/add',function (req,res) {
    var newstu = {
        name:req.body.name,
        pass:req.body.pass,
        mytime:new Date()
    }
    model.AddStu(newstu,function (data) {
        res.status(200).json({success:true,msg:data})
    })
})


app.get('/api/stu/list',function (req,res) {
    console.log("22222222222222222222222");
    var cod = {};
    model.GetAllstu(cod,function (list) {
        console.log("list: "+list);
        res.status(200).json({success:true,obj:list})
    })
})



app.use(function (req,res) {
    res.static(200).sendFile(path.join(__dirname,"www","err","404.html"))
})

app.listen(3000,function (err) {
    if(err) {
        console.log("监听失败");
        throw err;
    }
    console.log("服务器已启动，端口为3000。。。")
})
