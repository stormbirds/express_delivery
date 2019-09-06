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
                var biSub=0.0;
                var agentSub=0.0;
                var apwSub=0.0;
                var agdSub=0.0;
                var agwSub=0.0;
                var baSub=0.0;
                var saleSub=0.0;
                var shopSub=0.0;
                for (var i = 0; i< list.length; i++) {
                    view += '<tr>';
                    /*店铺名称*/
                    view += '<td>' + (list[i].sname == null ? '':list[i].sname) + '</td>';
                    /*所在区域*/
                    view += '<td>' + (list[i].pcaName == null ? '':list[i].pcaName) + '</td>';
                    /*区域代理*/
                    view += '<td>' + (list[i].areaAgentName == null ? '':list[i].areaAgentName) + '</td>';
                    /*注册时间*/
                    view += '<td>' + (list[i].registtime == null ? '':list[i].registtime) + '</td>';
                    /*10口*/
                    view += '<td>' + (list[i].conEqTen == null ? 0.00:list[i].conEqTen) + '</td>';
                    /*5口*/
                    view += '<td>' + (list[i].conEqFi == null ? 0.00:list[i].conEqFi) + '</td>';
                    /*订单数量*/
                    biSub = biSub + list[i].conOrder;
                    view += '<td>' + (list[i].conOrder == null ? 0.00:list[i].conOrder )+ '</td>';
                    /*租金单价*/
                    view += '<td>' + (list[i].rentCost == null ? 0.00:list[i].rentCost)+'</td>';
                    /*使用时长*/
                    view += '<td>' + (list[i].utime == null ? 0.00:list[i].utime)+'</td>';
                    /*租金收益*/
                    agentSub = agentSub + list[i].urent;
                    view += '<td>' + (list[i].urent == null ? 0.00:list[i].urent)+'</td>';
                    /*平台*/
                    apwSub = apwSub + list[i].platRent;
                    view += '<td>' + (list[i].platRent == null ? 0.00:list[i].platRent)+'</td>';
                    /*省级*/
                    agdSub = agdSub + list[i].proRent;
                    view += '<td>' + (list[i].proRent == null ? 0.00:list[i].proRent)+'</td>';
                    /*市级*/
                    agwSub = agwSub + list[i].cityRent;
                    view += '<td>' + (list[i].cityRent == null ? 0.00:list[i].cityRent)+'</td>';
                    /*区域*/
                    baSub = baSub + list[i].areRent;
                    view += '<td>' + (list[i].areRent == null ? 0.00:list[i].areRent)+'</td>';
                    /*业务*/
                    saleSub = saleSub + list[i].saRent;
                    view += '<td>' + (list[i].saRent == null ? 0.00:list[i].saRent)+'</td>';
                    /*店铺*/
                    shopSub = shopSub + list[i].shopRent;
                    view += '<td>' + (list[i].shopRent == null ? 0.00:list[i].shopRent)+'</td>';
                    view += '</tr>';
                }
                /*小计*/
                view += '<tr>';
                view += '<td style="color: red"></td>';
                /*店铺名称*/
                view += '<td style="color: red"></td>';
                /*所在区域*/
                view += '<td style="color: red"></td>';
                /*区域代理*/
                view += '<td style="color: red"></td>';
                /*注册时间*/
                view += '<td style="color: red"></td>';
                /*10口*/
                view += '<td style="color: red">小计</td>';
                /*5口*/
                view += '<td style="color: red">'+ biSub.toFixed(2) +'</td>';
                /*订单数量*/
                view += '<td style="color: red"></td>';
                /*租金单价*/
                view += '<td style="color: red"></td>';
                /*使用时长*/
                view += '<td style="color: red">' + agentSub.toFixed(2) + '</td>';
                /*租金收益*/
                view += '<td style="color: red">' + apwSub.toFixed(2) + '</td>';
                /*平台*/
                view += '<td style="color: red">' + agdSub.toFixed(2) + '</td>';
                /*省级*/
                view += '<td style="color: red">' + agwSub.toFixed(2) + '</td>';
                /*市级*/
                view += '<td style="color: red">' + baSub.toFixed(2) + '</td>';
                /*区域*/
                view += '<td style="color: red">' + saleSub.toFixed(2) + '</td>';
                /*业务*/
                view += '<td style="color: red">' + shopSub.toFixed(2) + '</td>';
                /*店铺*/
                view += '</tr>';
                /*总计*/
                view += '<tr>';
                view += '<td style="color: green"></td>';
                /*店铺名称*/
                view += '<td style="color: green"></td>';
                /*所在区域*/
                view += '<td style="color: green"></td>';
                /*区域代理*/
                view += '<td style="color: green"></td>';
                /*注册时间*/
                view += '<td style="color: green"></td>';
                /*10口*/
                view += '<td style="color: green">总计</td>';
                /*5口*/
                view += '<td style="color: green">' + (backData.sum.orderSum == null? 0 :  backData.sum.orderSum.toFixed(2))+ '</td>';
                /*订单数量*/
                view += '<td style="color: green"></td>';
                /*租金单价*/
                view += '<td style="color: green"></td>';
                /*使用时长*/
                view += '<td style="color: green">' + (backData.sum.rentSum == null? 0 :  backData.sum.rentSum.toFixed(2)) + '</td>';
                /*租金收益*/
                view += '<td style="color: green">' + (backData.sum.apSum == null? 0 :  backData.sum.apSum.toFixed(2)) +  '</td>';
                /*平台*/
                view += '<td style="color: green">' + (backData.sum.paSum == null? 0 :  backData.sum.paSum.toFixed(2)) + '</td>';
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
    window.location.href = "/ssc/createAgsExcel?shopName="+$("#shopName").val()+"&shopCode="+$("#shopCode").val()+"&province"+$("#pro").val()+"&city"+$("#city").val()+"&area"+$("#area").val()+"&agentName"+$("#agentName").val()+"&sortType="+$("#sortType").val();;
}