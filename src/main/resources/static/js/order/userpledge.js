$(function () {

})


/*异步表格获取数据的方法*/
function getData(url, data) {
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
                    view += '<td>' + list[i].tradingTime + '</td>'
                    /*申请时间*/
                    view += '<td>' + list[i].nickName + '</td>';
                    /*用户昵称*/
                    view += '<td></td>';
                    /*账户余额*/
                    view += '<td style="color:red;">' + ((typeof(list[i].mdrAccrual)== 'undefined' || list[i].mdrAccrual ==null ? 0 : list[i].mdrAccrual )) + '</td>';
                    /*提现金额*/
                    view += '<td>' + list[i].mdrNumbers + '</td>';
                    /*申请单号*/
                    view += '<td>' + list[i].mOpenId + '</td>';
                    /*用户OID*/
                    view += '<td>' + list[i].mId + '</td>';
                    /*用户UID*/
                    view += '<td>';
                    switch (list[i].mType) {
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
                    /*用户类型*/
                    // view += '<td>' + ((typeof(list[i].lastBalance)== 'undefined' || list[i].lastBalance ==null ? 0 : list[i].lastBalance )) + '</td>';
                    /*提现余额*/
                    view += '<td>';
                    switch (list[i].tradingType) {
                        case (1):
                            view += '微信';
                            break;
                        case (2):
                            view += '支付宝';
                            break;
                        case (3):
                            view += '个人钱包';
                            break;
                    }
                    view += '</td>';
                    view += '<td>' + (list[i].tallyType == null ? '' : (list[i].tallyType == 1 ? '入账' : '出账')) + '</td>';
                    view += '<td>' + (list[i].isWithDraw == null ? '' : (list[i].isWithDraw == 1 ? '允许' : '禁止')) + '</td>';
                    /*提现类型*/
                    view += '<td>' + (list[i].mIsBlock == null ? '' : (list[i].mIsBlock == 1 ? '禁用' : '正常')) + '</td>';
                    /*审核状态*/
                    view += '<td></td>';
                    /*审核状态*/
                    view += '</tr>';
                }
                $("#list").html(view);
            }
            layer.close(loading);
        },
        error: function () {
            layer.msg('请求错误');
            layer.close(loading);
        }
    });
}

/*var tip_index = 0;

function show(data, className) {
    tip_index = layer.tips(data, className, {time: 0, tips: 1});
}

function hide() {
    layer.close(tip_index);
}*/

/*导出*/
function exportData(url, data, fileType) {
    var loading = layer.load();
    $.ajax({
        type: "POST",
        url: url,
        data: data,
        success: function (backData) {
            layer.close(loading);
            if (fileType == 'pdf') {
                location.href = orderFullPath + backData + '.pdf';
            } else if (fileType == 'excel') {
                location.href = orderFullPath + backData + '.xlsx';
            }
        },
        error: function () {
            layer.msg('请求错误');
            layer.close(loading);
        }
    });
}

/*function getbox(id) {

    $("#mwaId").val(id);
    var that = this;
    //多窗口模式，层叠置顶
    layer.open({
        type: 1 //此处以iframe举例
        , title: '提现审核'
        , area: ['500px', '300px']
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
            layer.closeAll();
        }
        , btn2: function () {
            var loading = layer.load();
            var data = $("#changeform").serialize();
            console.log(data);
            $.ajax({
                type: "POST",
                url: '/memberWithdrawApply/updateIsValidMemberWithdrawApply',
                data: data,
                xhrFields: {
                    withCredentials: true
                },
                crossDomain: true,
                success: function (backData) {
                    if(backData == -1 ||backData == 0){
                        layer.msg("修改异常");
                    }else if(backData == -2){
                        layer.msg("代理商申请记录不存在");
                    }else if(backData == -3){
                        layer.msg("用户不存在");
                    }else if(backData == -4){
                        layer.msg("用户已被停用");
                    }else if(backData == 1){
                        layer.msg("修改成功");
                    }

                    getShopsData('/memberWithdrawApply/getMemberWithdrawApplyByPage',$("#shopsform").serializeObject());
                    layer.close(loading);
                },
                error: function () {
                    layer.msg('请求错误');
                    layer.close(loading);
                }
            })
        }
    });
}*/

/*function getTodayCountWMA() {
    var url = '/memberWithdrawApply/getTodayCountWMA';
    $.ajax({
        type: 'GET',
        url: url,
        data: {},
        success: function (backData) {
            $("#todayCountMWA").html(backData);
        }
    });
}

function getNoVeryfiMoney(data) {
    var url = '/memberWithdrawApply/getNoVeryfiMoney';
    $.ajax({
        type: 'POST',
        url: url,
        data: data,
        success: function (backData) {
            $("#noVeryfiMoney").html(backData);
        }
    });
}*/


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
                        var data = $("#shopsform").serializeObject();
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