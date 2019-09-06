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
                $("#nullTip").hide();
                var bilSub = 0;
                var apSub = 0;
                var paSub = 0;
                var caSub = 0;
                var aaSub = 0;
                var saSub = 0;
                var maSub = 0;
                for (var i = 0; i< list.length; i++) {
                    view += '<tr>';
                    /*时间*/
                    view += '<td>' + (list[i].otime == null ? "":list[i].otime) + '</td>';
                    /*订单编号*/
                    view += '<td>' + (list[i].orcode == null ? "":list[i].orcode) + '</td>';
                    /*租借店铺*/
                    view += '<td>' + (list[i].bkshop == null ? "":list[i].bkshop) + '</td>';
                    /*归还店铺*/
                    view += '<td>' + (list[i].bwshop == null ? "":list[i].bwshop) + '</td>';
                    /*设备编号*/
                    view += '<td>' + (list[i].eqcode == null ? "":list[i].eqcode) + '</td>';
                    /*使用时长*/
                    view += '<td>' + (list[i].utime == null ? 0:((list[i].utime/60).toFixed(2)) )+ '小时</td>';
                    /*单价*/
                    view += '<td>' + (list[i].uprice == null ? 0:list[i].uprice) + '</td>';
                    /*结算金额*/
                    bilSub = bilSub+list[i].bil;
                    view += '<td>' + (list[i].bil == null ? 0:list[i].bil) + '</td>';
                    /*平台*/
                    apSub = apSub+list[i].apmoney
                    view += '<td><p>' + (list[i].apmoney == null ? 0:list[i].apmoney) +'</p><p>'+ (list[i].apn == null ? "":list[i].apn) +'</p></td>';
                    /*省代*/
                    paSub = paSub+list[i].pamoney
                    view += '<td><p>' + (list[i].pamoney == null ? 0:list[i].pamoney) +'</p><p>'+ (list[i].pan == null ? "":list[i].pan) +'</p></td>';
                    /*市代*/
                    caSub = caSub+list[i].camoney
                    view += '<td><p>' + (list[i].camoney == null ? 0:list[i].camoney) +'</p><p>'+ (list[i].can == null ? "":list[i].can) +'</p></td>';
                    /*区域*/
                    aaSub = aaSub+list[i].aamoney
                    view += '<td><p>' + (list[i].aamoney == null ? 0:list[i].aamoney) +'</p><p>'+ (list[i].aan == null ? "":list[i].aan) +'</p></td>';
                    /*业务*/
                    saSub = saSub+list[i].samoney
                    view += '<td><p>' + (list[i].samoney == null ? 0:list[i].samoney) +'</p><p>'+ (list[i].san == null ? "":list[i].san) +'</p></td>';
                    /*店铺*/
                    maSub = maSub+list[i].mamoney
                    view += '<td><p>' + (list[i].mamoney == null ? 0:list[i].mamoney) +'</p><p>'+ (list[i].man == null ? "":list[i].man) +'</p></td>';
                    view += '</tr>';
                }
                /*小计*/
                view += '<tr>';
                /*时间*/
                view += '<td style="color: red">小计</td>';
                /*订单编号*/
                view += '<td></td>';
                /*租借店铺*/
                view += '<td></td>';
                /*归还店铺*/
                view += '<td></td>';
                /*设备编号*/
                view += '<td></td>';
                /*使用时长*/
                view += '<td></td>';
                /*单价*/
                view += '<td></td>';
                /*结算金额*/
                view += '<td style="color: red">' + bilSub.toFixed(2) + '</td>';
                /*平台*/
                view += '<td style="color: red">' + apSub.toFixed(2) + '</td>';
                /*省代*/
                view += '<td style="color: red">' + paSub.toFixed(2) + '</td>';
                /*市代*/
                view += '<td style="color: red">' + caSub.toFixed(2) + '</td>';
                /*区域*/
                view += '<td style="color: red">' + aaSub.toFixed(2) + '</td>';
                /*业务*/
                view += '<td style="color: red">' + saSub.toFixed(2) + '</td>';
                /*店铺*/
                view += '<td style="color: red">' + maSub.toFixed(2) + '</td>';
                view += '</tr>';
                /*总计*/
                view += '<tr>';
                /*时间*/
                view += '<td style="color: green">总计</td>';
                /*订单编号*/
                view += '<td></td>';
                /*租借店铺*/
                view += '<td></td>';
                /*归还店铺*/
                view += '<td></td>';
                /*设备编号*/
                view += '<td></td>';
                /*使用时长*/
                view += '<td></td>';
                /*单价*/
                view += '<td></td>';
                /*结算金额*/
                view += '<td style="color: green">' + (backData.sum.bilsum == null? 0 :  backData.sum.bilsum.toFixed(2))+ '</td>';
                /*平台*/
                view += '<td style="color: green">' + (backData.sum.apsum == null? 0 :  backData.sum.apsum.toFixed(2)) + '</td>';
                /*省代*/
                view += '<td style="color: green">' + (backData.sum.pasum == null? 0 :  backData.sum.pasum.toFixed(2) )+ '</td>';
                /*市代*/
                view += '<td style="color: green">' + (backData.sum.casum == null? 0 :  backData.sum.casum.toFixed(2)) + '</td>';
                /*区域*/
                view += '<td style="color: green">' + (backData.sum.aasum == null? 0 :  backData.sum.aasum.toFixed(2)) + '</td>';
                /*业务*/
                view += '<td style="color: green">' + (backData.sum.sasum == null? 0 :  backData.sum.sasum.toFixed(2)) + '</td>';
                /*店铺*/
                view += '<td style="color: green">' + (backData.sum.masum == null? 0 :  backData.sum.masum.toFixed(2)) + '</td>';
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
    $.ajax({
        type: "POST",
        url: "/rankShopStatement/exportRankShopSaleCountByExcel",
        data: $("#codeform").serialize(),
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        dataType: "json",
        success:function(backData){
            if(backData.code == "success"){
                window.location.href = urlCode+":8764/"+backData.fileName+".xlsx";
                /*window.location.href = "http://192.168.100.23:8764/"+backData.fileName+".xlsx";*/
            }else{
            }
        }
    })
}