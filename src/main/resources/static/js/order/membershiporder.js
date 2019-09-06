$(function () {

})

/*异步表格获取数据的方法*/
function getOrderData(url, data) {
    console.log('url:' + url);
    console.log('data:' + data);
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
        success: function (backData) {
            var list = backData.data.list;
            console.log(list)
            $("#total").html(backData.total);
            if (list.length == 0) {
                $("#list").html('');
                $("#nullTip").show();
                $("#nullTip").html('暂无数据');
                $(".pageBox").hide();
            } else {
                $("#nullTip").hide();
                for (var i = 0; i < list.length; i++) {
                    view += '<tr>';
                    view += '<td>' + (typeof (list[i].memberShipName) == "undefined" || list[i].memberShipName == null ? "" : list[i].memberShipName) + '</td>';
                    view += '<td><img src="'+list[i].headImg+'" width="70px;" height="70px;" /><div>' + list[i].nickName + '[ID:' + list[i].mid + ']'+ '</div><div style="margin:3px 0;">'+list[i].openID +'</div></td>';
                    if(list[i].shopCode == null){
                        view += '<td>平台</td>'
                    }else{
                        view += '<td><p>'+list[i].shopName+'</p><p>'+list[i].shopCode+'</p></td>'
                    }
                    view += '<td>' + (typeof (list[i].bill) == "undefined" || list[i].bill == null ? 0 : list[i].bill) + '</td>';
                    view += '<td>' + (typeof (list[i].code) == "undefined" || list[i].code == null ? "" : list[i].code) + '</td>';
                    view += '<td>';
                    switch (list[i].memberType) {
                        case (1):
                            view += '微信';
                            break;
                        case (2):
                            view += '支付宝';
                            break;
                        case (3):
                            view += '其他';
                            break;
                    }
                    view += '</td>';
                    view += '<td>';
                    if (typeof (list[i].mGroup) != 'undefined' && list[i].mGroup != null) {
                        switch (list[i].mGroup) {
                            case (1):
                                view += '普通用户';
                                break;
                            case (2):
                                view += '店铺代理';
                                break;
                            case (3):
                                view += '业务代理';
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
                        }
                        view += '</td>';
                    } else {
                        view += '</td>';
                    }
                    view += '<td>';
                    switch (list[i].payStatus) {
                        case (1):
                            view += '<span style="color:red;">未支付</span>';
                            break;
                        case (2):
                            view += '<span style="color:blue;">已支付</span>';
                            break;
                    }
                    view += '</td>';
                    view += '<td style="padding: 0 10px">'+(typeof (list[i].orderTime) == "undefined" || list[i].orderTime == null || list[i].orderTime == "null" ? "" : list[i].orderTime)+'</td>'
                    view += '<td>';
                    switch (list[i].payType) {
                        case (1):
                            view += '微信';
                            break;
                        case (2):
                            view += '支付宝';
                            break;
                        case (3):
                            view += '微信（用户余额）';
                            break;
                        case (4):
                            view += 'app（用户余额）';
                            break;
                        case (5):
                            view += 'paypal';
                            break;
                        case (6):
                            view += '信用卡';
                            break;
                    }
                    view += '</td>';

                    view += '<td>' + (typeof (list[i].payCode) == "undefined" || list[i].payCode == null || list[i].payCode == "null" ? "" : list[i].payCode) + '</td>'
                    view += '</tr>';
                }
                $("#list").html(view);
                $(".pageBox").show();
                $("#page").Page({
                    totalPages: backData.data.pages,//分页总数
                    liNums: 7,//分页的数字按钮数(建议取奇数)
                    activeClass: 'activP', //active 类样式定义
                    pageNum: backData.data.pageNum,
                    callBack: function (page) {
                        $("#pageNum").val(page);
                        var data = $("#orderform").serializeObject();
                        getOrderData(url, data);
                    }
                });
                $("#pageValue").val(backData.data.pageNum);
            }

            layer.close(loading);
        },
        error: function () {
            layer.msg('请求错误');
            layer.close(loading);
        }
    });
}

var tip_index = 0;

function show(data, className) {
    tip_index = layer.tips(data, className, {time: 0, tips: 1});
}

function hide() {
    layer.close(tip_index);
}

/*异步导出方法*/
function exportData(url, data, fileType) {
    console.log('url:' + url);
    console.log('data:' + data);
    var loading = layer.load();
    var urlOrderPrefix = urlPrefix + ':8763/'
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

