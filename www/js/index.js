var myapp = angular.module('myapp',['ui.router'])
myapp.config(['$stateProvider','$urlRouterProvider',function ($stateProvider,$urlRouterProvider) {
    $stateProvider.state('home',{
        url:'/home',
        views:{
            mainView:{
                templateUrl:'./views/home.main.tpl.html',
                controller:'home.main.ctrl'
            }
        }
    }).state('add',{
        url:'/add',
        views:{
            mainView:{
                templateUrl:'./views/add.main.tpl.html',
                controller:'add.main.ctrl'
            }
        }
    }).state('login',{
        url:'/login',
        views:{
            mainView:{
                templateUrl:'./views/login.main.tpl.html',
                controller:'login.main.ctrl'
            }
        }
    }).state('info',{
        url:'/info/:name',
        views:{
            mainView:{
                templateUrl:'./views/info.main.tpl.html',
                controller:'info.main.ctrl'
            }
        }
    }).state('delOne',{
        url:'/delOne/:name',
        views:{
            mainView:{
                controller:'delOne.main.ctrl'
            }
        }
    }).state('delAll',{
        url:'/delAll',
        views:{
            mainView:{
                controller:'delAll.main.ctrl'
            }
        }
    });
    $urlRouterProvider.otherwise('/home');
}]);

myapp.controller('delAll.main.ctrl',['$scope','$http','$state',function ($scope,$http,$state) {
    $http({
        url:'/api/stu/delAll',
        method:'get'
    }).then(function (res) {
        if(res.data.msg) {
            alert("删除全部成功！");
        }else {
            alert("删除全部失败！");
        }
        $state.go('home');
    },function (res) {

    })
}]);

myapp.controller('delOne.main.ctrl',['$scope','$http','$stateParams','$state',function ($scope,$http,$stateParams,$state) {
    var name = $stateParams.name;
    $http({
        url:'/api/stu/delOne?name='+name,
        method:'get'
    }).then(function (res) {
        if(res.data.msg) {
            alert("删除成功！");
            $state.go('home');
        }else {
            alert("删除失败！");
        }
    },function (res) {

    })
}]);

myapp.controller('info.main.ctrl',['$scope','$http','$stateParams',function ($scope,$http,$stateParams) {
    var name = $stateParams.name;
    $http({
        url:'/api/stu/info?name='+name,
        method:'get'
    }).then(function (res) {
       $scope.stu = res.data.obj;
    },function (res) {

    })
}]);

myapp.controller('login.main.ctrl',['$scope','$http','$state','$rootScope',function ($scope,$http,$state,$rootScope) {
    $scope.doLogin = function () {
        $http({
            url:'/api/stu/login',
            method:'post',
            data:$scope.stu
        }).then(function (res) {
            if(res.data.msg == 'OK') {
               alert("登录成功");
                $rootScope.user = $scope.stu.name+"登录成功了";
                $state.go('home');
            }else {
               alert("登录失败");
            }
        },function (res) {

        })
    }
}]);


myapp.controller('add.main.ctrl',['$scope','$http',function ($scope,$http) {
    $scope.doAddStu = function () {
        $http({
            url:'/api/stu/add',
            method:'post',
            data:$scope.stu
        }).then(function (res) {
            if(res.data.msg) {
                alert("添加成功")
            }else {
                alert("添加失败");
            }
        },function (res) {

        })
    }
}]);

myapp.controller('myctrl',['$scope','$rootScope',function ($scope,$rootScope) {
    $rootScope.user = "";
}]);

myapp.controller('home.main.ctrl',['$scope','$http',function ($scope,$http) {
    var count = 0; //记录总数
    var p_pernum = 2; //显示的记录个数
    var p_current = 0; //从哪个记录开始显示
    var p_total = 0; //总页数

    $scope.pages = []; //存放页码

    var myget = function (size,page,callback) {
        $http({
            url:'/api/stu/fy?tiao'+size+'&page='+page,
            method:'get'
        }).then(function (res) {
            $scope.students = res.data.obj; //2个学生
            count = res.data.count; //总记录的个数
            p_total = Math.ceil(count / p_pernum); //有多少页
            callback();
        },function () {
            
        })
    }

/*
    app.get('/api/stu/fy',function (req,res) {
        var tiao = req.query.tiao;
        var page = req.query.page;
        model.findFenYe(tiao,page,function (count,data) {
            res.status(200).json({success:true,msg:'',obj:data,count:count});
        });
    })
*/

    $scope.load_page = function () {

    }

    $scope.p_first = function () {

    }

    $scope.p_last = function () {

    }



    /*$http({
        url:'/api/stu/list',
        method:'get'
    }).then(function (res) {
        console.log("123");
        $scope.students = res.data.obj;
    }, function () {
        console.log("456");
    })*/
}]);