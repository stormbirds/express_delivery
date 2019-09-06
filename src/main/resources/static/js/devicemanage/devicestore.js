/*异步表格获取数据的方法*/
function getDeviceData(url,data){/*这里调用的方法 在网页的的最下方看*/
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
            $("#total").html((backData.total==undefined?0:backData.total));
            if(backData.list==undefined || backData.list.length == 0){
                $("#list").html('');
                $("#nullTip").show();
                $("#nullTip").html('暂无数据');
            }else {
                var list = backData.list;
                $("#nullTip").hide();
                for (var i = 0; i< list.length; i++){
                    view += '<tr>';
                    view += '<td>';
                    view += '<a onclick="go(\''+list[i].rsCode+'\')" target="main" class="layui-btn-sm edit'+i+'" onmouseenter="show(\'绑定设备\', \'.edit'+i+'\')" onmouseleave="hide()"><i class="layui-icon-set-fill layui-icon"></i></a>';/*管理按钮*/
                    view += '</td>';
                    view += '<td>'+(list[i].rsCode==undefined ? "" : list[i].rsCode)+'</td>';/*店铺编号*/
                    view += '<td>'+(list[i].rsName==undefined ? "" : list[i].rsName)+'</td>';/*店铺名字*/
                    view += '<td>'+(list[i].pname==undefined ?  "": list[i].pname)+(list[i].cname==undefined ? "" : list[i].cname )+(list[i].areaname==undefined ? "" :list[i].areaname)+'</td>';/*地区*/
                    view += '<td>'+(list[i].openid==undefined ? "":list[i].openid)+'</td>';/*代理商openid*/
                    view += '<td>';
                    switch (list[i].rsIsBlock) {/*是否锁定*/
                        case (1):
                            view += '是';
                            break;
                        case (2):
                            view += '否';
                            break;
                    }
                    view += '</td>';
                    view += '<td>'+(list[i].rsregisttime)+'</td>';/*注册时间*/
                    view += '<td>'+(list[i].bindNum == undefined? 0:list[i].bindNum)+'</td>';/*已绑定设备数*/
                    view += '<td>'+(list[i].shopExtact==undefined ? 0 : list[i].shopExtact)+'</td>';/*店铺提成*/
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

/*跳转到绑定页*/
function go(id) {
    /*权限验证*/
    $.ajax({
        type: "POST",
        url: '/bindingDevice',
        data: {},
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        dataType: "json",
        success: function (backData) {
            var code = backData.code;
            if (code == 1) {
                window.location.href= "deviceDetail.html?id="+id;
            } else {
                layer.msg('暂无权限');
            }
        }
    })

}

function getpage(url,data) {
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
                        var data = $("#devicestoreform").serializeObject();
                        getDeviceData(url, data);/*这里调用接口*/
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
    var urlOrderPrefix = urlPrefix + ':8075/'
    $.ajax({
        type: "POST",
        url: url,
        data: data,
        success: function (backData) {
            console.log("backData:" + backData)
            layer.close(loading);
            if (fileType == 'pdf') {
                location.href = urlOrderPrefix + backData + '.pdf';
            }
            if (fileType == 'excel') {
                location.href = urlOrderPrefix + backData + '.xlsx';
            }
        },
        error: function () {
            layer.msg('请求错误');
            layer.close(loading);
        }
    });

}