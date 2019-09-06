$(function () {

})

function convertTime(time) {
    var d = new Date(time);
    var year = d.getFullYear();
    var month = d.getMonth() + 1;
    if (month < 10) {
        month = "0" + month;
    }
    var date = d.getDate();
    if (date < 10) {
        date = "0" + date;
    }
    var hour = d.getHours();
    if (hour < 10) {
        hour = "0" + hour;
    }
    var minutes = d.getMinutes();
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    var seconds = d.getSeconds();
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    var times = year + '-' + month + '-' + date + ' ' + hour + ':' + minutes + ':' + seconds;
    return times;
}

/*异步表格获取数据的方法*/
function getShopsData(url, data) {
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
                    list[i].isVeryfi == 1 ? "disable" : "";
                    if(list[i].isvalid == 1 && list[i].isVeryfi == 1){
                        view += '<a class="layui-btn-sm detail' + i + '" onmouseenter="show(\'详情\',\'.detail' + i + '\')" onmouseleave="hide()" onclick="getDetail(\''+list[i].mwaNumbers+'\')"><i class="layui-icon-log layui-icon"></i></a>';
                    }else{
                        view += '<a class="layui-btn-sm detail' + i + '" onmouseenter="show(\'审核未通过\',\'.detail' + i + '\')" onmouseleave="hide()"><i class="layui-icon-log layui-icon"></i></a>';
                    }
                    if(list[i].isVeryfi == 1){
                        view += '<a class="layui-btn-sm edit' + i + '" onmouseenter="show(\'已审核\', \'.edit' + i + '\')" onmouseleave="hide()" disable="disabled"><i class="layui-icon-set-fill layui-icon"></i></a>';
                    }else{
                        view += '<a class="layui-btn-sm edit' + i + '" onmouseenter="show(\'编辑\', \'.edit' + i + '\')" onmouseleave="hide()" onclick="getbox(' + list[i].mwaId + ','+27+')"><i class="layui-icon-set-fill layui-icon"></i></a>';
                    }
                    view += '</td>';
                    /*操作*/
                    view += '<td>' + list[i].applyTime + '</td>'
                    /*申请时间*/
                    view += '<td>' + (list[i].agentName == null ? "": list[i].agentName) + '</td>';
                    /*代理名称*/
                    view += '<td>' + list[i].nickName + '</td>';
                    /*用户昵称*/
                    if (typeof (list[i].agentGroup) != 'undefined' && list[i].agentGroup != null) {
                        view += '<td>';
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
                        view += '<td></td>';
                    }
                    /*代理身份*/
                    view += '<td></td>';
                    /*设备数量*/
                    view += '<td></td>';
                    /*账户余额*/
                    view += '<td style="color: red">' + ((typeof(list[i].applyMoney)== 'undefined' || list[i].applyMoney ==null ? 0 : list[i].applyMoney )) + '</td>';
                    /*提现金额*/
                    view += '<td>' + list[i].mwaNumbers + '</td>';
                    /*申请单号*/
                    view += '<td>' + (list[i].isVeryfi == 1 ? "已审核" : "未审核") + '</td>';
                    /*审核状态*/
                    view += '<td>' + (list[i].isvalid == null ? '' : (list[i].isvalid == 1 ? '是' : '否')) + '</td>';
                    /*有效提现*/
                    view += '<td>' + list[i].agentOpenId + '</td>';
                    /*代理OID*/

                    /*view += '<td>' + list[i].mOpenId + '</td>';
                    /!*用户OID*!/*/
                    view += '<td>' + list[i].mId + '</td>';
                    /*用户UID*/

                    /*view += '<td>';
                    switch (list[i].mType) {
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
                    /!*用户类型*!/
                    view += '<td>';
                    switch (list[i].withdrawType) {
                        case (1):
                            view += "押金提现";
                            break;
                        case (2):
                            view += "店铺提现";
                            break;
                        case (3):
                            view += "业务提现";
                            break;
                        case (4):
                            view += "区域提现";
                            break;
                        case (5):
                            view += "市级提现";
                            break;
                        case (6):
                            view += "省级提现";
                            break;
                        case (7):
                            view += "平台提现";
                            break;
                    }
                    view += '</td>';
                    /!*提现类型*!/*/
                    view += '</tr>';
                }
                $("#list").html(view);
                getNoVeryfiMoney(data)
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

function getbox(id,actionid) {
    /*验证权限*/
    $.ajax({
        type: "POST",
        url: '/agentWithdrawApproval',
        data: {},
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        success: function (backData) {
           var code = backData.code;
           if(code == 1){
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
                       $.ajax({
                           type: "POST",
                           url: '/memberWithdrawApply/updateIsValidMemberWithdrawApply',
                           data: data,
                           xhrFields: {
                               withCredentials: true
                           },
                           crossDomain: true,
                           success: function (backData) {
                               $.ajax({
                                   type: "POST",
                                   url: '/log/add',
                                   data: {actionid: actionid, remark: "商家提现申请id:"+id},
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
                               }else if(backData == -5){
                                   layer.msg("转账失败");
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
           }else{
               layer.msg('暂无权限');
           }
        },
        error: function () {
            layer.msg('请求错误');
        }
    })
}

function getDetail(id) {
    /*权限验证*/
    $.ajax({
        type: 'POST',
        url: '/agentWithdrawDetails',
        data: {},
        success: function (backData) {
            var code = backData.code;
            if(code == 1){
                $("#mwaId").val(id);
                var that = this;
                //多窗口模式，层叠置顶
                layer.open({
                    type: 1 //此处以iframe举例
                    , title: '商家提现详情'
                    , area: ['500px', '300px']
                    , shade: 0
                    , anim: 1
                    , btn: ['关闭']
                    , maxmin: true
                    , offset: [ //为了演示，随机坐标
                        300
                        , 390
                    ]
                    , content: $("#detailbox")
                    , btn1: function () {
                        layer.closeAll();
                    }
                });
                $.ajax({
                    type: "GET",
                    url: urlPay+"/pay/queryEntPay",
                    data: {partnerTradeNo: id},
                    xhrFields: {
                        withCredentials: true
                    },
                    crossDomain: true,
                    success: function(backData) {
                        var list = backData;
                        $("#refundRecvAccount").val(list.partnerTradeNo);
                        $("#code").val(list.partnerTradeNo);
                        $("#refundFee").val(((list.paymentAmount)/100)+"元");
                        $("#refundSuccessTime").val(list.transferTime);
                        if(list.returnCode == "SUCCESS"){
                            $("#refundStatus").val("提现成功");
                        }else{
                            $("#refundStatus").val("提现失败");
                        }

                    },
                    error: function(){
                        alert("请求错误")
                    }
                });
            }else{
                layer.msg('暂无权限');
            }
        }
    });

}

function getTodayCountWMA() {
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
                        var data = $("#shopsform").serializeObject();
                        getShopsData(url, data);
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