/*异步表格获取数据的方法*/
function getCodeData(url,data){/*这里调用的方法 在网页的的最下方看*/
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
        success: function(backData) {
            var list = backData.list;
            if(list==undefined || list.length == 0){
                $("#list").html('');
                $("#nullTip").show();
                $("#nullTip").html('暂无数据');
                $(".pageBox").hide();
            }else {
                $("#nullTip").hide();
                $(".pageBox").show();
                for (var i = 0; i < list.length; i++) {
                    view += '<tr>';
                    view += '<td><a class="layui-btn-sm del' + i + '" onmouseenter="show(\'删除\',\'.del' + i + '\')" onmouseleave="hide()" onclick="del(\'' + list[i].id + '\',\'' + list[i].openid + '\',\'' + list[i].nickName + '\')"><i class="layui-icon-close-fill layui-icon"></i></a></td>';
                    view += '<td>' + (list[i].openid == undefined ? '' : list[i].openid) + '</td>';
                    view += '<td>' + (list[i].nickName == undefined ? '' : list[i].nickName) + '</td>';
                    view += '<td>' + (list[i].lastBalance == undefined ? '' : list[i].lastBalance) + '</td>';
                    view += '</tr>';
                }
                $("#list").html(view);
                $("#page").Page({
                    totalPages: backData.pages,//分页总数
                    liNums: 7,//分页的数字按钮数(建议取奇数)
                    activeClass: 'activP', //active 类样式定义
                    pageNum: backData.pageNum,
                    callBack: function (page) {
                        $("#pageNum").val(page);
                        var data = {openid: $("#uopenid").val(),nickName: $("#nickname").val(), pageNum: $("#pageNum").val()};
                        getCodeData(url, data);/*这里调用接口*/
                    }
                });
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

/*删除人员*/
function del(oid,openid,nickName) {
    /*权限验证*/
    $.ajax({
        type: "POST",
        url: '/walletStatisticaldel',
        data: {},
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        dataType: "json",
        success: function (backData) {
            var code = backData.code;
            if (code == 1) {
                var com = layer.confirm('是否确定删除？', {
                    btn: ['取消','确定'] //按钮
                }, function(){
                    layer.closeAll();
                }, function(){
                    $.ajax({
                        type: "POST",
                        url: '/userManage/deleteByPrimaryKey',
                        data: {id: oid},
                        xhrFields: {
                            withCredentials: true
                        },
                        crossDomain: true,
                        success: function(backData) {
                            console.log(backData);
                            if (backData == '删除成功'){
                                $.ajax({
                                    type: "POST",
                                    url: '/log/add',
                                    data: {actionid: 90, remark: "操作：删除不计入钱包统计用户，openid："+openid+"昵称："+nickName},
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
                                getCodeData('/userManage/selectAllMemberTemp',{});
                                getStat()
                                layer.msg(backData);
                                layer.close(com);
                            }else{
                                layer.msg(backData);
                            }
                        },
                        error:function (XMLHttpRequest, textStatus, errorThrown) {
                            layer.msg(textStatus)
                        }
                    })
                });
            } else {
                layer.msg('暂无权限');
            }
        }
    })
}

/*新增人员*/
$("#add").click(function () {
    /*权限验证*/
    $.ajax({
        type: "POST",
        url: '/walletStatisticalAdd',
        data: {},
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        dataType: "json",
        success: function (backData) {
            var code = backData.code;
            if (code == 1) {
                var that = this;
                //多窗口模式，层叠置顶
                layer.open({
                    type: 1 //此处以iframe举例
                    , title: '不计入钱包统计人员'
                    , area: ['390px', '260px']
                    , shade: 0
                    , anim: 1
                    , btn: ['取消', '保存']
                    , maxmin: true
                    , offset: [ //为了演示，随机坐标
                        300
                        ,390
                    ]
                    , content: $("#changbox")
                    , btn1:function () {
                        layer.closeAll();
                    }
                    , btn2:function () {
                        var loading = layer.load();
                        $.ajax({
                            type: "POST",
                            url: ' /userManage/addMemberTemp',
                            data: {openid: $("#openid").val()},
                            xhrFields: {
                                withCredentials: true
                            },
                            crossDomain: true,
                            success: function(backData) {
                                if(backData == '新增成功'){
                                    $.ajax({
                                        type: "POST",
                                        url: '/log/add',
                                        data: {actionid: 89, remark: "操作：新增不计入统计人员，openid："+$("#openid").val()},
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
                                    getCodeData('/userManage/selectAllMemberTemp',{openid: $("#uopenid").val(),nickName: $("#nickname").val(), pageNum: $("#pageNum").val()});
                                    getStat()
                                    layer.msg(backData);
                                }else{
                                    layer.msg(backData);
                                }
                                layer.close(loading);
                            },
                            error:function(){
                                layer.msg('请求错误');
                                layer.close(loading);
                            }
                        })
                    }
                });
            } else {
                layer.msg('暂无权限');
            }
        }
    })
})

/*查询钱包统计*/
function getStat(){
    $.ajax({
        type: "POST",
        url: '/userManage/selectTempLastBalance',
        data: {},
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        success: function(backData) {
            $('#agent').html((backData.agentLastbalance == undefined? 0: backData.agentLastbalance))
            $('#user').html((backData.userLastbalance == undefined? 0: backData.userLastbalance))
        },
        error: function(){
            layer.msg('请求错误');
        }
    });
}