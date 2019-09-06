$(function () {

})
console.log($.cookie('lang'))
var Details = "详情";
var Edit = "编辑";
var Nodata = "暂无数据";
if($.cookie('lang') == undefined || $.cookie('lang') == "zh"){
    Details = '详情';
    Edit = "编辑";
    Nodata = "暂无数据";
}else if($.cookie('lang') == 'en'){
    Details = 'Details';
    Edit = "Edit";
    Nodata = "No Data";
}
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
            var list = backData.data.list;
            $("#total").html(backData.data.total);
            if(list.length ==0){
                $("#list").html('');
                $("#nullTip").show();
                $("#nullTip").html(Nodata);
            }else {
                $("#nullTip").hide();

                for (var i = 0; i < list.length; i++) {
                    view += '<tr>';
                    view += '<td>';
                    view += '<a class="layui-btn-sm edit'+i+'" onmouseenter="show(\''+Edit+'\', \'.edit'+i+'\')" onmouseleave="hide()" onclick="getbox('+list[i].ID+','+list[i].ISVALID+',\''+list[i].MEMBER_SHIP_NAME+'\',94)"><i class="layui-icon-set-fill layui-icon"></i></a>';
                    view += '</td>';
                    view += '<td>' + list[i].MEMBER_SHIP_NAME +'</td>'
                    view += '<td>' + list[i].MEMBER_SHIP_ROOF_FEE +'</td>'
                    view += '<td>' + list[i].MEMBER_SHIP_FREE_USETIME +'</td>'
                    view += '<td>' + list[i].MEMBER_SHIP_FEE +'</td>'
                    if(list[i].SHOP_CODE == null){
                        view += '<td>平台</td>'
                    }else{
                        view += '<td><p>'+list[i].SHOP_NAME+'</p><p>'+list[i].SHOP_CODE+'</p></td>'
                    }
                    view += '<td>';
                    if (list[i].ISVALID == 1) {
                        view += '有效';
                    } else {
                        view += '无效';
                    }
                    view += '</td>';
                    view += '</tr>';
                }
                $("#list").html(view);

                $("#page").Page({
                    totalPages: backData.data.pages,//分页总数
                    liNums: 7,//分页的数字按钮数(建议取奇数)
                    activeClass: 'activP', //active 类样式定义
                    pageNum: backData.data.pageNum,
                    callBack: function (page) {
                        $("#pageNum").val(page);
                        var data = $("#userform").serialize();
                        getUserData(url, data);
                    }
                });
                $("#pageValue").val(backData.data.pageNum);
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

function getbox(id,ISVALID,name,actionId){
    $("#fee").hide();
    $("#rooFee").hide();
    $("#useTime").hide();
    /*权限验证*/
    $.ajax({
        type: "POST",
        url: '/membershipEdit',
        data: {},
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        dataType: "json",
        success: function (backData) {
            var code = backData.code;
            if (code == 1) {
                $('[name=isValid]').each(function(i,item){
                    if($(item).val()==ISVALID){
                        $(item).prop('checked',true);
                        layui.use('form',function(){
                            var form = layui.form;
                            form.render();
                        });
                    }
                });
                $("#name").val(name)
                $("#userId").val(id);
                var that = this;
                //多窗口模式，层叠置顶
                layer.open({
                    type: 1 //此处以iframe举例
                    , title: '修改会员套餐'
                    , area: ['500px', '260px']
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
                            url: '/memberShip/updateMemberShipSetting',
                            data: data,
                            xhrFields: {
                                withCredentials: true
                            },
                            crossDomain: true,
                            success: function(backData) {

                                layer.msg(backData.msg);
                                getUserData('/memberShip/listMemberShipSetting',$("#userform").serialize());
                                layer.close(loading);
                                $.ajax({
                                    type: "POST",
                                    url: '/log/add',
                                    data: {actionid: actionId, remark: "操作：修改，修改会员套餐名："+name},
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