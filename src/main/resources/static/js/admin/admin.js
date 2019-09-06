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
                        'onclick="getbox(\''+list[i].name+'\',\''+list[i].id+'\',\''+list[i].bossid+'\',\''+list[i].bossName+'\',\''+2+'\')"><i class="layui-icon-set-fill layui-icon"></i></a>';
                    view += '</td>';
                    /*view += '<td><img src="'+migUrl+list[i].sLogo+'"/></td>'; /!*id*!/*/
                    view += '<td>'+(list[i].name==undefined? "" :list[i].name)+'</td>';/*店铺编号*/
                    view += '<td>'+(list[i].bossName==undefined ? "" :list[i].bossName)+'</td>';/*店铺名字*/
                    view += '<td>'+list[i].registime+'</td>';/*注册时间*/
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
/*获取用户信息*/
function getUser(url,data){
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
            if(list.length ==0){
                $("#list1").html('');
                $("#nullTip1").show();
                $("#nullTip1").html('暂无数据');
            }else {
                $("#nullTip1").hide();
                for (var i = 0; i< list.length; i++){
                    view += '<tr>';
                    view += '<td>';
                    view += '<a class="layui-btn-sm chose layui-btn chose'+i+'" data="'+list[i].id+'" name="'+list[i].realName+'">选择</a>';
                    view += '</td>';
                    view += '<td>'+list[i].id+'</td>'; /*id*/
                    view += '<td><p>'+list[i].openid+'</p></td>';
                    view += '<td><p>'+list[i].realName+'</p></td>';
                    view += '<td><p>'+(list[i].role == null?'无':list[i].role)+'</p></td>';
                    view += '<td><p>'+(list[i].department == null?'无': list[i].department)+'</p></td>';
                    view += '<td><p>'+(list[i].statue == 1 ? "启用":"停用")+'</p></td>';
                    view += '</tr>'
                }
                $("#list1").html(view);
                for (var i = 0; i< list.length; i++){
                    $(".chose"+i).click(function () {
                        $(".chose").html("选择")
                        $(".chose").parent().parent().css("background","#fff")
                        $(this).html("已选择");
                        $(this).parent().parent().css("background","#f2f2f2");
                        $("#boss").val($(this).attr("name"));
                        $("#bossid").val($(this).attr("data"));
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
    getUser("/permission/findSysMember",{});
    getpage1('/permission/findSysMember',{});

    $("#goPage").click(function () {
        getUser("/permission/findSysMember",{});
        getpage1('/permission/findSysMember',{});
    })
    var index = layer.open({
        type: 1 //此处以iframe举例
        , title: '选择用户信息'
        , area: ['1000px', '800px']
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
function getbox(name,id,bossid,bossName,type){
    /*权限验证*/
    $.ajax({
        type: "POST",
        url: '/departmentManagerAddEdit',
        data: {},
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        success: function(backData) {
            var code = backData.code;
            if(code == 1){
                if(type == 1){
                    var title = "新增部门";
                }else{
                    var title = "修改部门";
                    $("#name").val(name);
                    $("#boss").val(bossName);
                    $("#bossid").val(bossid);
                    $("#bmid").val(id);
                }
                layer.open({
                    type: 1 //此处以iframe举例
                    , title: title
                    , area: ['400px', '280px']
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
                    }
                    , btn2: function () {
                        name = $('#name').val();
                        bossName = $('#boss').val();
                        bossid = $("#bossid").val();
                        id = $("#bmid").val();
                        $.ajax({
                            type: "POST",
                            url: '/permission/addDepartment',
                            data: {name: name, type: type, boss: bossid, id: id},
                            xhrFields: {
                                withCredentials: true
                            },
                            crossDomain: true,
                            success: function(backData) {
                                if(type == 1){/*新增*/
                                    $.ajax({
                                        type: "POST",
                                        url: '/log/add',
                                        data: {actionid: 52, remark: "新增部门名称："+$("#name").val()},
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
                                        data: {actionid: 52, remark: "修改部门ID："+id+"修改部门名称"+name},
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
                                layer.msg(backData);
                                getData('/permission/findDepartment',{});
                            },
                            error:function () {
                                layer.msg("请求错误");
                            }
                        })
                    }
                });
            }else{
                layer.msg('暂无权限');
            }
        },
        error:function () {
            layer.msg("请求错误");
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
                        var data = $("#shopform").serializeObject();
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
                        $("#pageValue1").val(page);
                        var data = $("#pageform1").serializeObject();
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
