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
            var list = backData.data.list;
            $("#total").html((backData.data.total==undefined?0:backData.data.total));
            if(list==undefined || list.length == 0){
                $("#list").html('');
                $("#nullTip").show();
                $("#nullTip").html('暂无数据');
                $(".pageBox").hide();
            }else {
                $(".pageBox").show();
                $("#nullTip").hide();
                var rechargeSub=0.0;
                var rpSub=0.0;
                var wiSub=0.0;
                var wrpSub=0.0;
                var biSub=0.0;
                var cSub=0.0;
                var dcSub=0.0;
                var wrSub=0.0;
                var apdSub=0.0;
                var apwSub=0.0;
                var agdSub=0.0;
                var agwSub=0.0;
                var baSub=0.0;
                for (var i = 0; i< list.length; i++) {
                    view += '<tr>';
                    /*日期*/
                    view += '<td>' + (list[i].date_time == null ? 0.00:list[i].date_time) + '</td>';
                    /*充值*/
                    rechargeSub = rechargeSub + list[i].recharge;
                    view += '<td>' + (list[i].recharge == null ? 0.00:list[i].recharge) + '</td>';
                    /*扣手续费*/
                    rpSub = rpSub + list[i].recharge_poundge;
                    view += '<td>' + (list[i].recharge_poundge == null ? 0.00:list[i].recharge_poundge) + '</td>';
                    /*提现*/
                    wiSub = wiSub + list[i].withdraw;
                    view += '<td>' + (list[i].withdraw == null ? 0.00:list[i].withdraw) + '</td>';
                    /*返手续费*/
                    wrpSub = wrpSub + list[i].withdraw_return_poundge;
                    view += '<td>' + (list[i].withdraw_return_poundge == null ? 0.00:list[i].withdraw_return_poundge) + '</td>';
                    /*租借中*/
                    biSub = biSub + list[i].borrowing;
                    view += '<td>' + (list[i].borrowing == null ? 0.00:list[i].borrowing )+ '</td>';
                    /*结余*/
                    cSub = cSub + list[i].cash;
                    view += '<td>' + (list[i].cash == null ? 0.00:list[i].cash) + '</td>';
                    /*押金留存*/
                    dcSub = dcSub + list[i].depoit_cash;
                    view += '<td>' + (list[i].depoit_cash == null ? 0.00:list[i].depoit_cash) + '</td>';
                    /*微信租金*/
                    wrSub = wrSub + list[i].wx_rent;
                    view += '<td>' + (list[i].wx_rent == null ? 0.00:list[i].wx_rent)+'</td>';
                    /*平台分成*/
                    apdSub = apdSub + list[i].ap_divide;
                    view += '<td>' + (list[i].ap_divide == null ? 0.00:list[i].ap_divide)+'</td>';
                    /*平台提现*/
                    apwSub = apwSub + list[i].ap_withdraw;
                    view += '<td>' + (list[i].ap_withdraw == null ? 0.00:list[i].ap_withdraw)+'</td>';
                    /*代理分成*/
                    agdSub = agdSub + list[i].agent_divide;
                    view += '<td>' + (list[i].agent_divide == null ? 0.00:list[i].agent_divide)+'</td>';
                    /*代理提现*/
                    agwSub = agwSub + list[i].agent_withdraw;
                    view += '<td>' + (list[i].agent_withdraw == null ? 0.00:list[i].agent_withdraw)+'</td>';
                    /*账户留存*/
                    baSub = baSub + list[i].balance;
                    view += '<td>' + (list[i].balance == null ? 0.00:list[i].balance)+'</td>';
                    view += '</tr>';
                }
                /*小计*/
                view += '<tr>';
                view += '<td style="color: red">小计</td>';
                /*充值*/
                view += '<td style="color: red">' + rechargeSub.toFixed(2) + '</td>';
                /*扣手续费*/
                view += '<td style="color: red">' + rpSub.toFixed(2) + '</td>';
                /*提现*/
                view += '<td style="color: red">' + wiSub.toFixed(2) + '</td>';
                /*返手续费*/
                view += '<td style="color: red">' + wrpSub.toFixed(2) + '</td>';
                /*租借中*/
                view += '<td style="color: red">' + biSub.toFixed(2) + '</td>';
                /*结余*/
                view += '<td style="color: red">' + cSub.toFixed(2) + '</td>';
                /*押金留存*/
                view += '<td style="color: red">' + dcSub.toFixed(2) + '</td>';
                /*微信租金*/
                view += '<td style="color: red">' + wrSub.toFixed(2) + '</td>';
                /*平台分成*/
                view += '<td style="color: red">' + apdSub.toFixed(2) + '</td>';
                /*平台提现*/
                view += '<td style="color: red">' + apwSub.toFixed(2) + '</td>';
                /*代理分成*/
                view += '<td style="color: red">' + agdSub.toFixed(2) + '</td>';
                /*代理提现*/
                view += '<td style="color: red">' + agwSub.toFixed(2) + '</td>';
                /*账户留存*/
                view += '<td style="color: red">' + baSub.toFixed(2) + '</td>';
                view += '</tr>';
                /*总计*/
                view += '<tr>';
                view += '<td style="color: green">总计</td>';
                /*充值*/
                view += '<td style="color: green">' + (backData.sum.rechargesum == null? 0 :  backData.sum.rechargesum.toFixed(2))+ '</td>';
                /*扣手续费*/
                view += '<td style="color: green">' + (backData.sum.rpsum == null? 0 :  backData.sum.rpsum.toFixed(2))+ '</td>';
                /*提现*/
                view += '<td style="color: green">' + (backData.sum.wisum == null? 0 :  backData.sum.wisum.toFixed(2))+ '</td>';
                /*设备编号*/
                view += '<td style="color: green">' + (backData.sum.wrpsum == null? 0 :  backData.sum.wrpsum.toFixed(2))+ '</td>';
                /*返手续费*/
                view += '<td style="color: green">' + (backData.sum.bisum == null? 0 :  backData.sum.bisum.toFixed(2))+ '</td>';
                /*租借中*/
                view += '<td style="color: green">' + (backData.sum.csum == null? 0 :  backData.sum.csum.toFixed(2))+ '</td>';
                /*结余*/
                view += '<td style="color: green">' + (backData.sum.dcsum == null? 0 :  backData.sum.dcsum.toFixed(2))+ '</td>';
                /*押金留存*/
                view += '<td style="color: green">' + (backData.sum.wrsum == null? 0 :  backData.sum.wrsum.toFixed(2)) + '</td>';
                /*微信租金*/
                view += '<td style="color: green">' + (backData.sum.apdsum == null? 0 :  backData.sum.apdsum.toFixed(2) )+ '</td>';
                /*平台分成*/
                view += '<td style="color: green">' + (backData.sum.apwsum == null? 0 :  backData.sum.apwsum.toFixed(2)) + '</td>';
                /*平台提现*/
                view += '<td style="color: green">' + (backData.sum.agdsum == null? 0 :  backData.sum.agdsum.toFixed(2)) + '</td>';
                /*代理分成*/
                view += '<td style="color: green">' + (backData.sum.agwsum == null? 0 :  backData.sum.agwsum.toFixed(2)) + '</td>';
                /*代理提现*/
                view += '<td style="color: green">' + (backData.sum.basum == null? 0 :  backData.sum.basum.toFixed(2)) + '</td>';
                view += '</tr>';
                $("#list").html(view);
                $("#page").Page({
                    totalPages: backData.data.pages,//分页总数
                    liNums: 7,//分页的数字按钮数(建议取奇数)
                    activeClass: 'activP', //active 类样式定义
                    pageNum: backData.data.pageNum,
                    callBack: function (page) {
                        $("#pageNum").val(page);
                        var data = $("#codeform").serializeObject();
                        console.log(data);
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
        success: function(backData) {
            if(backData.data.pages == 0) {
                $(".pageBox").hide();
            }else {
                $(".pageBox").show();
                $("#page").Page({
                    totalPages: backData.data.pages,//分页总数
                    liNums: 7,//分页的数字按钮数(建议取奇数)
                    activeClass: 'activP', //active 类样式定义
                    pageNum: backData.data.pageNum,
                    callBack: function (page) {
                        $("#pageNum").val(page);
                        var data = $("#codeform").serializeObject();
                        console.log(data);
                        getCodeData(url, data);/*这里调用接口*/
                    }
                });
                $("#pageValue").val(backData.data.pageNum);
            }
            layer.close(loading);
        },
        error: function () {
            layer.msg("请求错误");
            layer.close(loading);
        }
    })
}

function out(){
    /*$.ajax({
        type: "GET",
        url: "/divideOrd/createWxDivideExcel",
        data: $("#codeform").serialize(),
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        dataType: "json",
        success:function(backData){
            alert("成功")
        },
        error: function () {
            alert("失败")
        }
    })*/
    window.location.href = "/divideOrd/createWxDivideExcel?time="+$("#test1").val();
}