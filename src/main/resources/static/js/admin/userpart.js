/*异步表格获取数据的方法*/
function getData(url,data){
    var loading = layer.load();
    var view = "";
    $.ajax({
        type: "POST",
        url: url,
        data:data,
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        dataType: "json",
        success: function(backData) {
            var list = backData.list;
            $("#total").html(backData.total);
            if(list.length ==0){
                $("#list").html('');
                $("#nullTip").show();
                $("#nullTip").html('暂无数据');
            }else {
                $("#nullTip").hide();
                for (var i = 0; i< list.length; i++){
                    view += '<tr>';
                    view += '<td>';
                    view += '<a class="layui-btn-sm edit'+i+'" onmouseenter="show(\'编辑\', \'.edit'+i+'\')" onmouseleave="hide()"' +
                        'onclick="getbox(\''+list[i].openid+'\',\''+list[i].realName+'\',\''+list[i].accountName+'\',\''+list[i].role+'\',\''+list[i].roleId+'\',\''+list[i].department+'\',\''+list[i].departmentId+'\',\''+list[i].phone+'\',\''+list[i].email+'\',\''+list[i].id+'\',\''+list[i].statue+'\',\''+2+'\')"><i class="layui-icon-set-fill layui-icon"></i></a>';
                    view += '</td>';
                    view += '<td>'+(list[i].accountName==undefined? "" :list[i].accountName)+'</td>';
                    view += '<td>'+(list[i].realName==undefined? "" :list[i].realName)+'</td>';
                    view += '<td>'+(list[i].openid==undefined? "" :list[i].openid)+'</td>';
                    view += '<td>'+(list[i].role==undefined ? "" :list[i].role)+'</td>';
                    view += '<td>'+(list[i].department==undefined ? "" :list[i].department)+'</td>';
                    view += '<td>';
                    if(list[i].statue == 1){
                        view += '正常';
                    }else if(list[i].statue == 2 ){
                        view += '停用';
                    }
                    view += '</td>';
                    view += '<td>'+(list[i].phone==undefined ? "" :list[i].phone)+'</td>';
                    /*view += '<td>'+(list[i].email==undefined ? "" :list[i].email)+'</td>';*/
                    view += '<td></td>';
                    view += '<td></td>';
                    view += '<td></td>';
                    view += '<td>'+(list[i].registtime==undefined ? "" :list[i].registtime)+'</td>';
                }
                $("#list").html(view);
            }
            layer.close(loading);
        },
        error: function(){
            layer.msg('请求错误');
            layer.close(loading);
        }
    });
}
var tip_index = 0;
function show(data,className){
    tip_index = layer.tips(data, className, {time: 0, tips: 1});
}
function hide(){
    layer.close(tip_index);
}
/*获取角色列表*/
$.ajax({
    type: "POST",
    url: "/permission/findRole",
    data: {},
    xhrFields: {
        withCredentials: true
    },
    crossDomain: true,
    dataType: "json",
    success:function(backData){
        var list  = backData.list;
        var view=""
        view += '<option value="">全部</option>';
        for (var i = 0;i< list.length; i++ ) {
            view +='<option value="'+list[i].id+'">'+list[i].name+'</option>';
        }
        $("#roleName").html(view);
        layui.use(['element','form'], function() {
            var element = layui.element
                ,form = layui.form;
            form.render();
        });
    }
})
/*获取部门列表*/
$.ajax({
    type: "POST",
    url: "/permission/findDepartment",
    data: {},
    xhrFields: {
        withCredentials: true
    },
    crossDomain: true,
    dataType: "json",
    success:function(backData){
        var list  = backData.list;
        var view=""
        view += '<option value="">全部</option>';
        for (var i = 0;i< list.length; i++ ) {
            view +='<option value="'+list[i].id+'">'+list[i].name+'</option>';
        }
        $("#departmentName").html(view);
        layui.use(['element','form'], function() {
            var element = layui.element
                ,form = layui.form;
            form.render();
        });
    }
})

/*获取用户信息*/
function getUser(url,data){
    var loading = layer.load();
    $.ajax({
        type: "POST",
        url: url,
        data:data,
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        dataType: "json",
        success: function(backData) {
            var list = backData.list;
            if(list.length ==0){
                $("#list1").html('');
                $("#nullTip1").show();
                $("#nullTip1").html('暂无数据');
            }else {
                $("#nullTip1").hide();
                var view = "";
                for (var i = 0; i< list.length; i++){
                    view += '<tr>';
                    view += '<td>';
                    view += '<a class="layui-btn-sm chose layui-btn chose'+i+'" data="'+list[i].openid+'">选择</a>';
                    view += '</td>';
                    view += '<td>'+list[i].openid+'</td>'; /*id*/
                    view += '<td>'+list[i].nickName+'</td>';
                    view += '</tr>'
                }
                $("#list1").html(view);
                for (var i = 0; i< list.length; i++){
                    $(".chose"+i).click(function () {
                        $(".chose").html("选择")
                        $(".chose").parent().parent().css("background","#fff")
                        $(this).html("已选择");
                        $(this).parent().parent().css("background","#f2f2f2");
                        $("#openid").val($(this).attr("data"));
                    })
                }
            }
            layer.close(loading);
        },
        error: function(){
            layer.msg('请求错误');
            layer.close(loading);
        }
    });
}
/*获取用户信息*/
function choseUser(){
    $("#pageNum").val(1);
    getUser('/userManage/queryUser',$("#userform").serialize());
    getpage1('/userManage/queryUser',$("#userform").serialize());

    $("#getShopData").click(function () {
        var data = $("#userform").serializeObject();
        getpage1('/userManage/queryUser',data);
        getUser('/userManage/queryUser',data);
    })
    $("#goPage").click(function () {
        var data = $("#userform").serializeObject();
        getpage1('/userManage/queryUser',data);
        getUser('/userManage/queryUser',data);
    })
    var index = layer.open({
        type: 1 //此处以iframe举例
        , title: '选择用户信息'
        , area: ['800px', '600px']
        , shade: 0
        , btnAlign: ''
        , anim: 1
        , btn: ['取消', '保存']
        , maxmin: true
        , offset: [ //为了演示，随机坐标
            50
            ,200
        ]
        , content: $(".chosebox")
        , btn1:function () {
            layer.close(index);
        }
        , btn2: function () {
            layer.close(index);
        }
    });
}
/*新增修改*/
function getbox(openid,realName,accountName,role,roleid,department,departmentid,phone,email,id,statue,type){

    /*权限判断*/
    $.ajax({
        type: "POST",
        url: "/addEditSysUser",
        data: {},
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        dataType: "json",
        success:function(backData){
           var code  =  backData.code;
           if(code == 1){


               if(type == 1){
                   var title = "新增用户";
                   $.ajax({
                       type: "POST",
                       url: "/permission/findRole",
                       data: {},
                       xhrFields: {
                           withCredentials: true
                       },
                       crossDomain: true,
                       dataType: "json",
                       success:function(backData){
                           var backData = backData.list;
                           var view=""
                           for (var i = 0;i< backData.length; i++ ) {
                               if(backData[i].id == roleid){
                                   view +='<option value="'+backData[i].id+'" selected>'+backData[i].name+'</option>';
                               }else{
                                   view +='<option value="'+backData[i].id+'">'+backData[i].name+'</option>';
                               }
                           }
                           $("#role").html(view);
                           layui.use(['element','form'], function() {
                               var element = layui.element
                                   ,form = layui.form;
                               form.render();
                           });
                       }
                   })

                   $.ajax({
                       type: "POST",
                       url: "/permission/findDepartment",
                       data: {},
                       xhrFields: {
                           withCredentials: true
                       },
                       crossDomain: true,
                       dataType: "json",
                       success:function(backData){
                           var backData = backData.list;
                           var view=""
                           for (var i = 0;i< backData.length; i++ ) {
                               if(backData[i].id == departmentid){
                                   view +='<option value="'+backData[i].id+'" selected>'+backData[i].name+'</option>';
                               }else{
                                   view +='<option value="'+backData[i].id+'">'+backData[i].name+'</option>';
                               }

                           }
                           $("#department").html(view);
                           layui.use(['element','form'], function() {
                               var element = layui.element
                                   ,form = layui.form;
                               form.render();
                           });
                       }
                   })
               }else{
                   var title = "修改用户";
                   $("#openid").val(openid == "null"? "": openid);
                   $("#realName").val(realName == "null"? "": realName);
                   $("#accountName").val(accountName == "null"? "": accountName);
                   $("#role").val(roleid == "null"? "": roleid);
                   $("#department").val(departmentid == "null"? "": departmentid);
                   $("#phone").val(phone == "null"? "": phone);
                   $("#email").val(email == "null"? "": email);
                   $.ajax({
                       type: "POST",
                       url: "/permission/findRole",
                       data: {},
                       xhrFields: {
                           withCredentials: true
                       },
                       crossDomain: true,
                       dataType: "json",
                       success:function(backData){
                           var backData = backData.list;
                           var view=""
                           for (var i = 0;i< backData.length; i++ ) {
                               if(backData[i].id == roleid){
                                   view +='<option value="'+backData[i].id+'" selected>'+backData[i].name+'</option>';
                               }else{
                                   view +='<option value="'+backData[i].id+'">'+backData[i].name+'</option>';
                               }
                           }
                           $("#role").html(view);
                           layui.use(['element','form'], function() {
                               var element = layui.element
                                   ,form = layui.form;
                               form.render();
                           });
                       }
                   })

                   $.ajax({
                       type: "POST",
                       url: "/permission/findDepartment",
                       data: {},
                       xhrFields: {
                           withCredentials: true
                       },
                       crossDomain: true,
                       dataType: "json",
                       success:function(backData){
                           var backData = backData.list;
                           var view=""
                           for (var i = 0;i< backData.length; i++ ) {
                               if(backData[i].id == departmentid){
                                   view +='<option value="'+backData[i].id+'" selected>'+backData[i].name+'</option>';
                               }else{
                                   view +='<option value="'+backData[i].id+'">'+backData[i].name+'</option>';
                               }

                           }
                           $("#department").html(view);
                           layui.use(['element','form'], function() {
                               var element = layui.element
                                   ,form = layui.form;
                               form.render();
                           });
                       }
                   })
               }
               layer.open({
                   type: 1 //此处以iframe举例
                   , title: title
                   , area: ['400px', '600px']
                   , shade: 0
                   , btnAlign: ''
                   , anim: 1
                   , btn: ['取消', '保存']
                   , maxmin: true
                   , offset: [ //为了演示，随机坐标
                       100
                       ,390
                   ]
                   , content: $("#changebox")
                   , btn1:function () {
                       layer.closeAll();
                       $("#changebox").find("input").val("");
                   }
                   , btn2: function () {

                       openid = $("#openid").val();
                       realName = $("#realName").val();
                       accountName = $("#accountName").val();
                       role = $("#role").val();
                       department = $("#department").val();
                       phone = $("#phone").val();
                       email = $("#email").val();
                       var password = $("#password").val();
                       var statue = $("#statue").val();

                       $.ajax({
                           type: "POST",
                           url: '/permission/addSysMember',
                           data: {openid: openid, realName: realName, accountName: accountName, role: role, department: department, phone: phone, email: email,password: password,statue:statue, type: type},
                           xhrFields: {
                               withCredentials: true
                           },
                           crossDomain: true,
                           success: function(backData) {
                               if(type == 1){/*新增*/
                                   $.ajax({
                                       type: "POST",
                                       url: '/log/add',
                                       data: {actionid: 55, remark: "新增系统用户的oId："+$("#openid").val()},
                                       xhrFields: {
                                           withCredentials: true
                                       },
                                       crossDomain: true,
                                       success: function (backData) {
                                           console.log(backData);
                                       },
                                       error: function () {
                                           console.log(backData);
                                       }
                                   })
                               }else{/*修改*/
                                   $.ajax({
                                       type: "POST",
                                       url: '/log/add',
                                       data: {actionid: 55, remark: "修改系统用户id："+id+"修改系统用户oID"+openid},
                                       xhrFields: {
                                           withCredentials: true
                                       },
                                       crossDomain: true,
                                       success: function (backData) {
                                           console.log(backData);
                                       },
                                       error: function () {
                                           console.log(backData);
                                       }
                                   })
                               }
                               $("#changebox").find("input").val("");
                               layer.msg(backData);
                               getData('/permission/findSysMember', {});
                           }
                       })
                   }
               });
           }else{
               layer.msg('暂无权限')
           }
        }
    })

}
/*获取部门分页*/
function getpage(url,data) {
    var loading = layer.load();
    $.ajax({
        type: "POST",
        url: url,
        data:data,
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        dataType: "json",
        success: function(backData) {
            if(backData.pages == 0) {
                $(".pageBox").hide();
            }else {
                $(".pageBox").show();
                console.log(backData.pages);
                $("#page").Page({
                    totalPages: backData.pages,//分页总数
                    liNums: 7,//分页的数字按钮数(建议取奇数)
                    activeClass: 'activP', //active 类样式定义
                    pageNum: backData.pageNum,
                    callBack: function (page) {
                        $("#pageNum").val(page);
                        var data = {pageNum: page};
                        getData(url, data);
                    }
                });
                $("#pageValue").val(backData.pageNum);
            }
            layer.close(loading);
        },
        error: function () {
            layer.msg("请求错误");
            layer.close(loading);
        }
    })
}

/*获取用户信息分页*/
function getpage1(url,data) {
    var loading = layer.load();
    $.ajax({
        type: "POST",
        url: url,
        data:data,
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        dataType: "json",
        success: function(backData) {
            if(backData.pages == 0) {
                $(".pageBox").hide();
            }else {
                $(".pageBox").show();
                $("#page1").Page({
                    totalPages: backData.pages,//分页总数
                    liNums: 7,//分页的数字按钮数(建议取奇数)
                    activeClass: 'activP', //active 类样式定义
                    pageNum: backData.pageNum,
                    callBack: function (page) {
                        $("#pageNum1").val(page);
                        var data = $("#userform").serializeObject();
                        getUser(url, data);
                    }
                });
                $("#pageValue1").val(backData.pageNum);
            }
            layer.close(loading);
        },
        error: function () {
            layer.msg("请求错误");
            layer.close(loading);
        }
    })
}
