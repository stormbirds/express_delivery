function getDetail(){
    var loading = layer.load();
    $.ajax({
        type: "POST",
        url: '/agentPlat/selectDetails',
        data: {id: GetIframeQueryString('id')},
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        dataType: "json",
        success: function(backData) {
            console.log(backData);
             //$("#nickName").html(backData.nickName)
             $("#agentID").html(backData.openid==undefined ? "" :backData.openid);
             $("#contactName").html(backData.contactName==undefined ? "" : backData.contactName);
             $("#contactPhone").html(backData.contactPhone==undefined ? "" : backData.contactPhone);
             $("#serviveManager").html(backData.opname==undefined ? "" : backData.opname);
             $("#registTime").html(backData.rgtime);
             $("#agentaName").html(backData.aName==undefined ? "" : backData.aName);
             $("#agentAccount").html(backData.account == undefined ? "" :backData.account);
             var level;
             switch (backData.mgid) {
                case (2):
                    level = '店铺管理';
                    break;
                case (3):
                    level = '业务经理';
                    break;
                case (4):
                    level = '区域代理';
                    break;
                case (5):
                    level = '市级代理';
                    break;
                case (6):
                    level = '省级代理';
                    break;
                 case (7):
                     level = '平台代理';
                     break;
            }
             $("#agentLevel").html(level);
             $("#agentLocatedArea").html(backData.pname+''+backData.cname+''+backData.areaname);
             $("#agentCustomerManagerId").html(backData.manager);
             if(backData.isblock == 1){
                 $("#isblock").html('已停用');
             }else{
                 $("#isblock").html('未停用');
             }

             $("#logins").html(backData.loginNums);
            $("#headimg").attr('src', backData.headImg)
            layer.close(loading);
        },
        error: function(){
            layer.msg('请求错误');
            layer.close(loading);
        }
    });
}
/*获取店铺*/
function getShopData(url,data){
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
                    /*view += '<td>';
                    view += '<a class="layui-btn-sm detail'+i+'" onmouseenter="show(\'详情\',\'.detail'+i+'\')" onmouseleave="hide()" href="shopdetail.html?id='+list[i].id+'"><i class="layui-icon-log layui-icon"></i></a>';
                    view += '</td>';*/
                    view += '<td>'+(list[i].code==undefined? "" :list[i].code)+'</td>'/*店铺编号*/
                    view += '<td>'+(list[i].rsName==undefined ? "" :list[i].rsName)+'</td>'/*店铺名字*/
                    view += '<td>'+(list[i].pname==undefined ? "" :list[i].pname)+(list[i].cname==undefined ? "" :list[i].cname)+(list[i].areaname==undefined ? "" :list[i].areaname)+'</td>';
/*
                    view += '<td>'+(list[i].openid==undefined ? "" :list[i].openid)+'</td>';/!*openid*!/
*/
                    view += '<td>'+list[i].sPhone+'</td>';/*openid*/
                    view += '<td>'+(list[i].platExtact==undefined? 0:list[i].platExtact)+'</td>';/*openid*/
                    view += '<td>'+(list[i].provinceExtact==undefined? 0:list[i].provinceExtact)+'</td>';/*openid*/
                    view += '<td>'+(list[i].cityExtact==undefined? 0:list[i].cityExtact)+'</td>';/*openid*/
                    view += '<td>'+(list[i].areaExtact==undefined? 0:list[i].areaExtact)+'</td>';/*openid*/
                    view += '<td>'+(list[i].salesExtact==undefined? 0:list[i].salesExtact)+'</td>';/*openid*/
                    view += '<td>'+(list[i].shopExtact==undefined? 0:list[i].shopExtact)+'</td>';/*openid*/
                    view += '<td>'+(list[i].shopProfitMoney==undefined? 0:list[i].shopProfitMoney)+'</td>';/*openid*/
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

/*获取设备*/
function getDeviceData(url,data){/*这里调用的方法 在网页的的最下方看*/
    var loading = layer.load();
    console.log(url+","+data);
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
            var list = backData.list;
            $("#total").html((backData.total==undefined?0:backData.total));
            if(list==undefined || list.length == 0){
                $("#list").html('');
                $("#nullTip1").show();
                $("#nullTip1").html('暂无数据');
            }else {
                $("#nullTip").hide();
                for (var i = 0; i< list.length; i++){
                    view += '<tr>';
                  /*  view += '<td>'+list[i].code+'</td>';/!*设备ID*!/*/
                    view += '<td>'+list[i].code+'</td>';/*设备编号*/
                    view += '<td>'+list[i].typeName+'</td>';/*设备类型*/
                    view += '<td>';
                    switch (list[i].state) {/*在线情况*/
                        case (1):
                            view += '在线';
                            break;
                        case (2):
                            view += '离线';
                            break;
                    }
                    view += '</td>';

                    view += '</tr>';

                }
                $("#list1").html(view);
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

function getpage(url,data) {
    var loading = layer.load();
    $.ajax({
        type: "POST",
        url: url,
        data: data,
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        dataType: "json",
        success: function (backData) {
            if (backData.pages == 0) {
                $("#pageBox").hide();
            } else {
                $("#pageBox").show();
                console.log(backData.pages);
                $("#page").Page({
                    totalPages: backData.pages,//分页总数
                    liNums: 7,//分页的数字按钮数(建议取奇数)
                    activeClass: 'activP', //active 类样式定义
                    pageNum: backData.pageNum,
                    callBack: function (page) {
                        var data = {id: GetIframeQueryString('id'),pageNum: page}
                        getShopData(url, data);
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

function getpage1(url,data) {
    var loading = layer.load();
    console.log(url);
    console.log(data);
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
            if(backData.pages == 0) {
                $("#pageBox1").hide();
            }else {
                $("#pageBox1").show();
                $("#page1").Page({
                    totalPages: backData.pages,//分页总数
                    liNums: 7,//分页的数字按钮数(建议取奇数)
                    activeClass: 'activP', //active 类样式定义
                    pageNum: backData.pageNum,
                    callBack: function (page) {
                        var data = {id: GetIframeQueryString('id'),pageNum: page}
                        getDeviceData(url, data);/*这里调用接口*/
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