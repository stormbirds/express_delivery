/*异步表格获取数据的方法*/
function getbindData(url,data){/*这里调用的方法 在网页的的最下方看*/
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
            console.log(backData)
            var list = backData;
            if(list==undefined || list.length == 0){
                $("#bind").html('');
                $("#null").show();
                $("#null").html('暂无数据');
            }else {
                $("#null").hide();
                for (var i = 0; i< list.length; i++){
                    view += '<tr>';
                    view += '<td>';
                    /*view += '<i class="layui-icon icon-erweima edit'+i+'" onmouseenter="show(\'生成二维码\', \'.edit'+i+'\')" onmouseleave="hide()"></i>';*/
                    view += '<i class="layui-icon icon-jiebang unbind'+i+'" onmouseenter="show(\'解绑设备\', \'.unbind'+i+'\')" onmouseleave="hide()" onclick="unbind('+list[i].id+',\''+list[i].code+'\')"></i>'
                    view += '</td>';
                    view += '<td>'+list[i].code+'</td>';/*设备ID*/
                    view += '<td>'+list[i].type+'</td>';/*设备编号*/
                    view += '<td>'+list[i].carnum+'</td>';/*设备类型*/
                    view += '<td><span class="code'+i+'"></span></td>';
                    view += '<td>'+getMyDate(list[i].registtime)+'</td>';
                    view += '<td>'+(list[i].smname == undefined?"":list[i].smname)+'</td>';
                    view += '</tr>';
                    var code = list[i].qrcodeId
                    $(".code"+i+"").qrcode({
                        render: "canvas", //canvas方式
                        width: 50, //宽度
                        height: 50, //高度
                        text: code, //任意内容
                    });
                }
                $("#bind").html(view);
            }
            layer.close(loading);
        },
        error: function(){
            layer.msg('请求错误');
            layer.close(loading);
        }
    });
}

function getunbindData(url,data){/*这里调用的方法 在网页的的最下方看*/
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
            if(backData.code == 1){
                $("#nobind").html('');
                $("#nullTip").show();
                $("#nullTip").html('暂无数据');
            }else if(backData.code == 3) {
                var list = backData.page.list;
                $("#nullTip").hide();
                for (var i = 0; i< list.length; i++){
                    view += '<tr>';
                    view += '<td>';
                    view += '<i class="layui-icon layui-icon-link bind'+i+'" onmouseenter="show(\'绑定设备\', \'.bind'+i+'\')" onmouseleave="hide()" onclick="bind('+list[i].	id+',\''+list[i].code+'\')"></i>'
                    view += '</td>';
                    view += '<td>'+list[i].code+'</td>';/*设备ID*/
                    view += '<td>'+list[i].type+'</td>';/*设备编号*/
                    view += '<td>'+list[i].carnum+'</td>';/*设备类型*/
                    view += '</tr>';
                }
                $("#nobind").html(view);
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
    tip_index = layer.tips(data, className, {time: 0, tips: 4});
}
function hide(){
    layer.close(tip_index);
}
/*解绑*/
function unbind(id,eqCode){
    var loading = layer.load();
    $.ajax({
        type: "POST",
        url: "/equipManage/untieEquip",
        data:{equipId : id},
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        dataType: "json",
        success: function(backData) {
            var code = backData.code;
            var msg = "";
            if(code == 1){
                msg="参数不正确"
            }else if(code == 2){
                msg="该设备未绑定二维码，无法解绑";
            }else if(code == 3){
                msg="解绑成功";
                $.ajax({
                    type: "POST",
                    url: '/log/add',
                    data: {actionid: 38, remark: "操作：解绑设备，店铺编号："+$("#code").val()+"，设备编号："+eqCode},
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
            layer.msg(msg);
            layer.close(loading);
            getbindData("/equipManage/bundedByshopCode",{shopCode:$("#code").val()});
            getunbindData("/equipManage/findNotBundEquip",$("#unbind").serializeObject());
        },
        error: function(){
            layer.msg('请求错误');
            layer.close(loading);
        }
    });
}
/*绑定设备*/
function bind(id,eqCode){
    var data = {equipId: id, shopCode: $("#code").val()};
    var loading = layer.load();
    $.ajax({
        type: "POST",
        url: "/equipManage/bundEquip",
        data:data,
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        dataType: "json",
        success: function(backData) {
            var code = backData.code;
            var msg = "";
            if(code == 1){
                msg="参数错误"
            }else if(code == 2){
                msg="绑定失败，该设备不在库中";
            }else if(code == 3){
                msg="绑定成功";
                $.ajax({
                    type: "POST",
                    url: '/log/add',
                    data: {actionid: 38, remark: "操作：绑定设备，店铺编号："+$("#code").val()+"，设备编号："+eqCode},
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
            }else if(code == 4){
                msg="绑定失败，该设备已经被绑定，请先解绑再绑定";
            }else if(code == 5){
                msg="绑定失败，该店铺不存在";
            }else if(code == 13){
                msg="该设备未绑定二维码，无法进行店铺绑定";
            }
            layer.msg(msg);
            layer.close(loading);
            getbindData("/equipManage/bundedByshopCode",{shopCode:$("#code").val()});
            getunbindData("/equipManage/findNotBundEquip",$("#unbind").serializeObject);
        },
        error: function(){
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
            if(backData.page == undefined) {
                $(".pageBox").hide();
            }else {
                $(".pageBox").show();
                $("#page").Page({
                    totalPages: backData.page.pages,//分页总数
                    liNums: 7,//分页的数字按钮数(建议取奇数)
                    activeClass: 'activP', //active 类样式定义
                    pageNum: backData.page.pageNum,
                    callBack: function (page) {
                        $("#pageNum").val(page);
                        var data = $("#unbind").serializeObject();
                        getunbindData(url,data);/*这里调用接口*/
                    }
                });
                $("#pageValue").val(backData.page.pageNum);
            }
            layer.close(loading);
        },
        error: function () {
            layer.msg("请求错误");
            layer.close(loading);
        }
    })
}