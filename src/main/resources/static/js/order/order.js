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
            var list = backData.list;
            $("#total").html(backData.total);
            if (list.length == 0) {
                $("#list").html('');
                $("#nullTip").show();
                $("#nullTip").html('暂无数据');
            } else {
                $("#nullTip").hide();
                for (var i = 0; i < list.length; i++) {
                    view += '<tr>';
                    view += '<td>';
                    view += '<a class="layui-btn-sm detail' + i + '" onmouseenter="show(\'详情\',\'.detail' + i + '\')" onmouseleave="hide()" href="orderdetail.html?id=' + list[i].oid + '"><i class="layui-icon-log layui-icon"></i></a>';
                    if (list[i].orderStatus == 2 && list[i].payStatus == 2) {
                        view += '<a class="layui-btn-sm edit' + i + '" onmouseenter="show(\'已完结\', \'.edit' + i + '\')" onmouseleave="hide()" ><i class="layui-icon-set-fill layui-icon"></i></a>';
                    }else if(list[i].orderStatus ==3){
                        view += '<a class="layui-btn-sm edit' + i + '" onmouseenter="show(\'已完结\', \'.edit' + i + '\')" onmouseleave="hide()" ><i class="layui-icon-set-fill layui-icon"></i></a>';
                    }else if(list[i].orderStatus ==5 && list[i].payStatus == 2){
                        view += '<a class="layui-btn-sm edit' + i + '" onmouseenter="show(\'已完结\', \'.edit' + i + '\')" onmouseleave="hide()" ><i class="layui-icon-set-fill layui-icon"></i></a>';
                    } else{
                        view += '<a class="layui-btn-sm edit' + i + '" onmouseenter="show(\'编辑\', \'.edit' + i + '\')" onmouseleave="hide()" onclick="getbox(\'' + list[i].oid + '\',' + list[i].orderStatus + ',\''+list[i].oCode+'\','+24+',\''+list[i].payStatus+'\')"><i class="layui-icon-set-fill layui-icon"></i></a>';
                    }
                    view += '</td>';
                    view += '<td><img src="'+list[i].headImg+'" width="70px;" height="70px;" /><div>' + list[i].nickName + '[ID:' + list[i].mid + ']'+ '</div><div style="margin:3px 0;">'+list[i].openID +'</div></td>';
                    view += '<td>';
                    switch (list[i].memberType) {
                        case (1):
                            view += '微信';
                            break;
                        case (2):
                            view += '支付宝';
                            break;
                        case (3):
                            view += 'app';
                            break;
                    }
                    view += '</td>';
                    view += '<td><div style="margin:5px 0;">设备编号：</div><div  style="margin:5px 0;">' + list[i].equipCode + '</div><div  style="margin:5px 0;">电池编号：</div><div  style="margin:5px 0;">'+(typeof ( list[i].powerBI) == 'undefined' ||list[i].powerBI == null || list[i].powerBI == ''? '无' : list[i].powerBI)+'</div></td>';
                    view += '<td><div style="margin:10px 0;">店铺：' + list[i].bwShopName + '</div><div>'+list[i].orderTime+'</div></td>';
                    view += '<td><div style="margin:10px 0;">店铺：' + (typeof (list[i].bkShopName) == "undefined" || list[i].bkShopName == null ? "无" : list[i].bkShopName) + '</div><div>'+(list[i].bkTime == null ? '暂未归还' : list[i].bkTime)+'</div></td>';
                    view += '<td>' + list[i].unitPrice + '</td>';
                    view += '<td>' + (typeof (list[i].bill) == "undefined" || list[i].bill == null ? 0 : list[i].bill) + '</td>';
                    /*if (sign == 1) {
                        view += '<td>(¥)' + list[i].unitPrice + '</td>';
                        view += '<td>(¥)' + (typeof (list[i].bill) == "undefined" || list[i].bill == null ? 0 : list[i].bill) + '</td>';
                    }else if(sign == 2){
                        view += '<td>($)' + list[i].unitPrice + '</td>';
                        view += '<td>($)' + (typeof (list[i].bill) == "undefined" || list[i].bill == null ? 0 : list[i].bill) + '</td>';
                    }else if(sign == 3){
                        view += '<td>(€)' + list[i].unitPrice + '</td>';
                        view += '<td>(€)' + (typeof (list[i].bill) == "undefined" || list[i].bill == null ? 0 : list[i].bill) + '</td>';
                    }else if(sign == 4){
                        view += '<td>(S.R.)' + list[i].unitPrice + '</td>';
                        view += '<td>(S.R.)' + (typeof (list[i].bill) == "undefined" || list[i].bill == null ? 0 : list[i].bill) + '</td>';
                    }*/
                    view += '<td>' + list[i].oCode + '</td>';
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
                    view += '<td>';
                    switch (list[i].orderStatus) {
                        case (1):
                            view += '<span style="color:red;">租借中</span>';
                            break;
                        case (2):
                            view += '<span style="color:blue;">已归还</span>';
                            break;
                        case (3):
                            view += '<span style="color:blue;">已撤销</span>';
                            break;
                        case (4):
                            view += '<span style="color:red;">请求中</span>';
                            break;
                        case(5):
                            view += '<span style="color:blue;">超时已结算</span>';
                            break;
                    }
                    view += '</td>';
                    // view += '<td>' + list[i].nickName + '[ID:' + list[i].mid + ']' + '</td>';




                    // view += '<td>' + list[i].powerBI + '</td>';
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
                    view += '<td>';
                    if (typeof (list[i].agentGroup) != 'undefined' && list[i].agentGroup != null) {
                        switch (list[i].agentGroup) {
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
                    view += '<td>' + (typeof (list[i].agentOpenId) == "undefined" || list[i].agentOpenId == null ? "" : list[i].agentOpenId) + '</td>';
                    view += '<td>' + (typeof (list[i].agentName) == "undefined" || list[i].agentName == null ? "" : list[i].agentName) + '</td>';
                    view += '</tr>';
                }
                $("#list").html(view);
                getOrderBill(data);
                /*$(document).on('mouseenter', '.detail', function(){

                }).on('mouseleave', '.detail', function(){
                    layer.close(tip_index);
                });*/
                /*                $(document).on('mouseenter', '.edit', function(){
                                    tip_index = layer.tips('编辑', '.edit', {time: 0});
                                }).on('mouseleave', '.edit', function(){
                                    layer.close(tip_index);
                                });*/
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

function getbox(id, orderStatus,ocode,actionid,payStatus) {
    $("#bkTime").hide();
    if(orderStatus == 6){
        $("#zujie").hide();
        $("#back").hide();
    }else if(payStatus == 1 && orderStatus == 2){
        $("#zujie").hide();
        $("#back").hide();
    }else{
        $("#zujie").show();
        $("#back").show();
    }
    $('[name=orderStatus]').each(function (i, item) {
        if ($(item).val() == orderStatus) {
            $(item).prop('checked', true);
            layui.use('form', function () {
                var form = layui.form;
                form.render();
            });
        }
    });
    $("#orderId").val(id);
    var that = this;
    //多窗口模式，层叠置顶
    layer.open({
        type: 1 //此处以iframe举例
        , title: '修改订单状态'
        , area: ['390px', '260px']
        , shade: 0
        , anim: 1
        , btn: ['取消', '保存']
        , maxmin: true
        , offset: [ //为了演示，随机坐标
            300
            , 390
        ]
        , content: $("#changbox")
        , btn1: function () {
            $("#bkTime").val("");
            layer.closeAll();
        }
        , btn2: function () {
            var loading = layer.load();
            var data = $("#changeform").serialize();
            console.log(data);
            $.ajax({
                type: "POST",
                url: '/orderInfo/updateOrderInfoByID',
                data: data,
                xhrFields: {
                    withCredentials: true
                },
                crossDomain: true,
                success: function (backData) {
                    if (backData.code != "SUCCESS") {
                        layer.msg(backData.message);
                    }else {
                        var status;
                        if($('input:radio[name="orderStatus"]:checked').val() == 1){
                            status = '租借中';
                        }else if($('input:radio[name="orderStatus"]:checked').val() == 2){
                            status = '已归还';
                        }else{
                            status = '已撤销';
                        }
                        $.ajax({
                            type: "POST",
                            url: '/log/add',
                            data: {actionid: actionid, remark: "操作：修改，修改状态："+status+"，订单id："+id+"，订单编号："+ocode},
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
                        layer.msg(backData.message);
                    }
                    getOrderData("/orderInfo/index", $("#orderform").serialize())
                    $("#bkTime").val("");
                    layer.close(loading);
                },
                error: function () {
                    layer.msg('请求错误');
                    $("#bkTime").val("");
                    layer.close(loading);
                }
            })
        }
    });
}

function getTodayOrderCount() {
    var url = '/orderInfo/getTodayOrderCount';
    $.ajax({
        type: 'GET',
        url: url,
        data: {},
        success: function (backData) {
            $("#todayOrderCount").html(backData);
        }
    });
}

function getOrderBill(data) {
    var url = '/orderInfo/getOrderBillByParams';
    $.ajax({
        type: 'POST',
        url: url,
        data: data,
        success: function (backData) {
            $("#orderBill").html(backData);
        }
    });
}

function getpage(url, data) {
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
                $(".pageBox").hide();
            } else {
                $(".pageBox").show();
                $("#page").Page({
                    totalPages: backData.pages,//分页总数
                    liNums: 7,//分页的数字按钮数(建议取奇数)
                    activeClass: 'activP', //active 类样式定义
                    pageNum: backData.pageNum,
                    callBack: function (page) {
                        $("#pageNum").val(page);
                        var data = $("#orderform").serializeObject();
                        getOrderData(url, data);
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