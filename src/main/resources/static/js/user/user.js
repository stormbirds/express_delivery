$(function () {

})
/*异步表格获取数据的方法*/
function getUserData(url,data){
    var loading = layer.load();
    var view = "";
    $.ajax({
        type: "POST",
        url: url,
        data: data,
        // xhrFields: {
        //     withCredentials: true
        // },
        // crossDomain: true,
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
                for (var i = 0; i < list.length; i++) {
                    view += '<tr style="height: 90px;">';
                    view += '<td>';
                    view += '<a class="layui-btn-sm detail'+i+'" onmouseenter="show(\'详情\',\'.detail'+i+'\')" onmouseleave="hide()" onclick="go(\''+list[i].id+'\')"><i class="layui-icon-log layui-icon"></i></a>';
                    view += '<a class="layui-btn-sm edit'+i+'" onmouseenter="show(\'编辑\', \'.edit'+i+'\')" onmouseleave="hide()" onclick="getbox('+list[i].id+','+list[i].iswithdraw+','+list[i].isblock+','+list[i].vipStatus+',\''+list[i].openid+'\',33)"><i class="layui-icon-set-fill layui-icon"></i></a>';
                    view += '</td>';
                    view += '<td><img src="' + list[i].img + '" width="65" height="65"/>' +
                        // '<p>' + list[i].nickName + '</p>' +
                        '<p>' + list[i].openid + '</p></td>';
                    view += '<td>' + list[i].nickName +'</td>'
                    view += '<td>';
                    if (list[i].mType == 1) {
                        view += '微信';
                    } else if(list[i].mType == 2) {
                        view += '支付宝';
                    }else {
                        view += 'app'
                    }
                    view += '</td>';
                    view += '<td>';
                    switch (list[i].mGroup) {
                        case (1):
                            view += '普通用户';
                            break;
                        case (2):
                            view += '店铺管理';
                            break;
                        case (3):
                            view += '业务经理';
                            break;
                        case (4):
                            view += '区域代理';
                            break;
                        case (5):
                            view += '市级代理';
                            break;
                        case (6):
                            view += '省级代理';
                            break;
                        case (7):
                            view += '平台用户';
                            break;
                    }
                    view += '</td>';
                    // view += '<td>';
                    console.log(list[i].openId);
                    // if (list[i].openId == "") {
                    //     view += '测试用户';
                    // } else {
                    //     view += '真实用户';
                    // }
                    // view += '</td>';
                    if(list[i].deposit == undefined || list[i].deposit == "" || list[i].deposit == null){
                        view += '<td>0</td>';
                    }else{
                        view += '<td>' + list[i].deposit + '</td>';
                    }
                    if(list[i].lastBalance == undefined || list[i].lastBalance == "" || list[i].lastBalance == null){
                        view += '<td>0</td>';
                    }else{
                        view += '<td>' + list[i].lastBalance + '</td>';
                    }
                    /*if(list[i].extact == undefined || list[i].extact == "" || list[i].extact == null){
                        view += '<td>0</td>';
                    }else{
                        view += '<td>' + list[i].extact + '</td>';
                    }*/
                    if(list[i].applyMoney == undefined || list[i].applyMoney == "" || list[i].applyMoney == null){
                        view += '<td>0</td>';
                    }else{
                        view += '<td>' + list[i].applyMoney + '</td>';
                    }
                    view += '<td>' + list[i].borrowCount + '</td>';
                    view += '<td>' + list[i].registtime + '</td>'
                    view += '<td>';
                    if (list[i].iswithdraw == 1) {
                        view += '允许';
                    } else {
                        view += '禁止';
                    }
                    view += '</td>';
                    view += '<td>';
                    if (list[i].isblock == 1) {
                        view += '停用';
                    } else {
                        view += '启用';
                    }
                    view += '</td>';
                    view += '<td>';
                    if (list[i].vipStatus == 1) {
                        view += 'vip';
                    } else {
                        view += '普通';
                    }
                    view += '</td>';
                    view += '</tr>';
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
/*跳转详情页*/
function go(id) {
    /*权限验证*/
    $.ajax({
        type: "POST",
        url: '/userListDetails',
        data: {},
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        dataType: "json",
        success: function (backData) {
            var code = backData.code;
            if (code == 1) {
                window.location.href= "userdetail.html?id="+id;
            } else {
                layer.msg('暂无权限');
            }
        }
    })

}
function getbox(id,iswithdraw,isBlock,vipStatus,openid,actionid){

    /*权限验证*/
    $.ajax({
        type: "POST",
        url: '/userListEdit',
        data: {},
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        dataType: "json",
        success: function (backData) {
            var code = backData.code;
            if (code == 1) {
                $('[name=iswithdraw]').each(function(i,item){
                    if($(item).val()==iswithdraw){
                        $(item).prop('checked',true);
                        layui.use('form',function(){
                            var form = layui.form;
                            form.render();
                        });
                    }
                });
                $('[name=isblock]').each(function(i,item){
                    if($(item).val()==isBlock){
                        $(item).prop('checked',true);
                        layui.use('form',function(){
                            var form = layui.form;
                            form.render();
                        });
                    }
                });

                $('[name=type]').each(function(i,item){
                    if($(item).val()==vipStatus){
                        $(item).prop('checked',true);
                        layui.use('form',function(){
                            var form = layui.form;
                            form.render();
                        });
                    }
                });
                $("#userId").val(id);
                var that = this;
                //多窗口模式，层叠置顶
                layer.open({
                    type: 1 //此处以iframe举例
                    , title: '修改用户状态'
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
                        var data = $("#changeform").serializeObject();
                        $.ajax({
                            type: "POST",
                            url: '/userManage/updateUser',
                            data: data,
                            xhrFields: {
                                withCredentials: true
                            },
                            crossDomain: true,
                            success: function(backData) {
                                var status;
                                if($('input:radio[name="iswithdraw"]:checked').val() == 1){
                                    status = '允许提现';
                                }else if($('input:radio[name="iswithdraw"]:checked').val() == 2){
                                    status = '禁止提现';
                                }

                                var isblock;
                                if($('input:radio[name="isblock"]:checked').val() == 1){
                                    isblock = '停用账号';
                                }else if($('input:radio[name="isblock"]:checked').val() == 2){
                                    isblock = '启用账号';
                                }

                                var type;
                                if($('input:radio[name="type"]:checked').val() == 1){
                                    type = 'vip';
                                }else if($('input:radio[name="type"]:checked').val() == 2){
                                    type = '普通';
                                }
                                $.ajax({
                                    type: "POST",
                                    url: '/log/add',
                                    data: {actionid: actionid, remark: "操作：修改，修改状态："+status+"，"+isblock+"，"+type+"用户ID："+id+"用户oid："+openid},
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
                                layer.msg(backData);
                                getUserData('/userManage/queryUser',$("#userform").serialize());
                                layer.close(loading);
                            },
                            error:function(){
                                layer.msg('请求错误');
                                layer.close(loading);
                            }
                        })

                        var type = $("input[name='type']:checked").val()
                        $.ajax({
                            type: "POST",
                            url: '/userManage/setVIPUser',
                            data: {mid:id, type: type},
                            xhrFields: {
                                withCredentials: true
                            },
                            crossDomain: true,
                            success: function(backData) {
                                $.ajax({
                                    type: "POST",
                                    url: '/log/add',
                                    data: {actionid: actionid, remark: "修改用户ID："+id},
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
                                layer.msg(backData.msg);
                                getUserData('/userManage/queryUser',$("#userform").serialize());
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

}
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
                $("#page").Page({
                    totalPages: backData.pages,//分页总数
                    liNums: 7,//分页的数字按钮数(建议取奇数)
                    activeClass: 'activP', //active 类样式定义
                    pageNum: backData.pageNum,
                    callBack: function (page) {
                        $("#pageNum").val(page);
                        var data = $("#userform").serialize();
                        getUserData(url, data);
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

/*异步导出方法*/
function exportData(url, data, fileType) {
    console.log('url:' + url);
    console.log('data:' + data);
    var loading = layer.load();
    var urlOrderPrefix = urlPrefix + ':8083/'
    $.ajax({
        type: "POST",
        url: url,
        data: data,
        success: function (backData) {
            console.log("backData:" + backData)
            layer.close(loading);
            if (fileType == 'pdf') {
                location.href = urlOrderPrefix + backData + '.pdf';
            } else if (fileType == 'excel') {
                location.href = urlOrderPrefix + backData + '.xlsx';
            }
        },
        error: function () {
            layer.msg('请求错误');
            layer.close(loading);
        }
    });
}