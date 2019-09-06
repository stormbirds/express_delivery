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
                    /*设备编号*/
                    view += '<td>' + (list[i].eqCode == null ? '':list[i].eqCode) + '</td>';
                    /*设备类型*/
                    view += '<td>' + (list[i].eqTypeName == null ? '':list[i].eqTypeName) + '</td>';
                    /*店铺名称*/
                    view += '<td>' + (list[i].shopName == null ? '':list[i].shopName) + '</td>';
                    /*所属区域*/
                    view += '<td>' + (list[i].pcaName == null ? "":list[i].pcaName) + '</td>';
                    /*区域代理*/
                    view += '<td>' + (list[i].areaAgentName == null ? "":list[i].areaAgentName) + '</td>';
                    /*注册时间*/
                    view += '<td>' + (list[i].registtime == null ? '':list[i].registtime )+ '</td>';
                    /*订单数量*/
                    cSub = cSub + list[i].conOrder;
                    view += '<td>' + (list[i].conOrder == null ? 0.00:list[i].conOrder) + '</td>';
                    /*收益*/
                    dcSub = dcSub + list[i].allRent;
                    view += '<td>' + (list[i].allRent == null ? 0.00:list[i].allRent) + '</td>';
                    /*平台*/
                    wrSub = wrSub + list[i].platRent;
                    view += '<td>' + (list[i].platRent == null ? 0.00:list[i].platRent)+'</td>';
                    /*省级*/
                    apdSub = apdSub + list[i].proRent;
                    view += '<td>' + (list[i].proRent == null ? 0.00:list[i].proRent)+'</td>';
                    /*市级*/
                    apwSub = apwSub + list[i].cityRent;
                    view += '<td>' + (list[i].cityRent == null ? 0.00:list[i].cityRent)+'</td>';
                    /*区域*/
                    agdSub = agdSub + list[i].areRent;
                    view += '<td>' + (list[i].areRent == null ? 0.00:list[i].areRent)+'</td>';
                    /*业务*/
                    agwSub = agwSub + list[i].saRent;
                    view += '<td>' + (list[i].saRent == null ? 0.00:list[i].saRent)+'</td>';
                    /*店铺*/
                    baSub = baSub + list[i].shopRent;
                    view += '<td>' + (list[i].shopRent == null ? 0.00:list[i].shopRent)+'</td>';
                    view += '</tr>';
                }
                /*小计*/
                view += '<tr>';
                view += '<td style="color: red">小计</td>';
                /*设备编号*/
                view += '<td style="color: red"></td>';
                /*设备类型*/
                view += '<td style="color: red"></td>';
                /*店铺名称*/
                view += '<td style="color: red"></td>';
                /*所属区域*/
                view += '<td style="color: red"></td>';
                /*区域代理*/
                view += '<td style="color: red"></td>';
                /*注册时间*/
                view += '<td style="color: red">' + cSub.toFixed(2) + '</td>';
                /*订单数量*/
                view += '<td style="color: red">' + dcSub.toFixed(2) + '</td>';
                /*收益*/
                view += '<td style="color: red">' + wrSub.toFixed(2) + '</td>';
                /*平台*/
                view += '<td style="color: red">' + apdSub.toFixed(2) + '</td>';
                /*省级*/
                view += '<td style="color: red">' + apwSub.toFixed(2) + '</td>';
                /*市级*/
                view += '<td style="color: red">' + agdSub.toFixed(2) + '</td>';
                /*区域*/
                view += '<td style="color: red">' + agwSub.toFixed(2) + '</td>';
                /*业务*/
                view += '<td style="color: red">' + baSub.toFixed(2) + '</td>';
                /*店铺*/
                view += '</tr>';
                /*总计*/
                view += '<tr>';
                view += '<td style="color: green">总计</td>';
                /*设备编号*/
                view += '<td style="color: green"></td>';
                /*设备类型*/
                view += '<td style="color: green"></td>';
                /*店铺名称*/
                view += '<td style="color: green"></td>';
                /*所属区域*/
                view += '<td style="color: green"></td>';
                /*区域代理*/
                view += '<td style="color: green"></td>';
                /*注册时间*/
                view += '<td style="color: green">' + (backData.sum.orderSum == null? 0 :  backData.sum.orderSum.toFixed(2))+ '</td>';
                /*订单数量*/
                view += '<td style="color: green">' + (backData.sum.rentSum == null? 0 :  backData.sum.rentSum.toFixed(2))+ '</td>';
                /*收益*/
                view += '<td style="color: green">' + (backData.sum.apSum == null? 0 :  backData.sum.apSum.toFixed(2)) + '</td>';
                /*平台*/
                view += '<td style="color: green">' + (backData.sum.paSum == null? 0 :  backData.sum.paSum.toFixed(2) )+ '</td>';
                /*省级*/
                view += '<td style="color: green">' + (backData.sum.caSum == null? 0 :  backData.sum.caSum.toFixed(2)) + '</td>';
                /*市级*/
                view += '<td style="color: green">' + (backData.sum.aaSum == null? 0 :  backData.sum.aaSum.toFixed(2)) + '</td>';
                /*区域*/
                view += '<td style="color: green">' + (backData.sum.saSum == null? 0 :  backData.sum.saSum.toFixed(2)) + '</td>';
                /*业务*/
                view += '<td style="color: green">' + (backData.sum.shopSum == null? 0 :  backData.sum.shopSum.toFixed(2)) + '</td>';
                /*店铺*/
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
    window.location.href = "/eqs/createAgsExcel?time="+$("#test1").val()+"&eqCode="+$("#eqCode").val()+"&shopName="+$("#shopName").val()+"&agentName="+$("#agentName").val()+"&agentOid="+$("#agentOid").val()+"&sortType="+$("#sortType").val();
}