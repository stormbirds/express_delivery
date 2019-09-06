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
                var cSub=0.0;
                var dcSub=0.0;
                var wrSub=0.0;
                var apdSub=0.0;
                var agentSub=0.0;
                var apwSub=0.0;
                var agdSub=0.0;
                var agwSub=0.0;
                var baSub=0.0;
                var saleSub=0.0;
                var shopSub=0.0;
                for (var i = 0; i< list.length; i++) {
                    view += '<tr>';
                    /*ID*/
                    view += '<td>' + (list[i].id == null ? '':list[i].id) + '</td>';
                    /*名称*/
                    view += '<td>' + (list[i].aname == null ? '':list[i].aname) + '</td>';
                    /*身份*/
                    view += '<td>';
                            if(list[i].mgroup == 2){
                                view += '店铺管理';
                            }else if(list[i].mgroup == 3){
                                view += '业务经理';
                            }else if(list[i].mgroup == 4){
                                view += '区域代理';
                            }else if(list[i].mgroup == 5){
                                view += '市级代理';
                            }else if(list[i].mgroup == 6){
                                view += '省级代理';
                            }else if(list[i].mgroup == 7){
                                view += '平台用户';
                            }
                    view += '</td>';
                    /*区域*/
                    view += '<td>' + (list[i].pcaName == null ? '':list[i].pcaName) + '</td>';
                    /*注册时间*/
                    view += '<td>' + (list[i].registtime == null ? '':list[i].registtime) + '</td>';
                    /*店铺数量*/
                    biSub = biSub + list[i].conShop;
                    view += '<td>' + (list[i].conShop == null ? 0.00:list[i].conShop )+ '</td>';
                    /*10口*/
                    cSub = cSub + list[i].conEqTen;
                    view += '<td>' + (list[i].conEqTen == null ? 0.00:list[i].conEqTen) + '</td>';
                    /*5口*/
                    dcSub = dcSub + list[i].conEqFi;
                    view += '<td>' + (list[i].conEqFi == null ? 0.00:list[i].conEqFi) + '</td>';
                    /*桌面*/
                    wrSub = wrSub + list[i].conEqZm;
                    view += '<td>' + (list[i].conEqZm == null ? 0.00:list[i].conEqZm)+'</td>';
                    /*租金总输入*/
                    apdSub = apdSub + list[i].sumRent;
                    view += '<td>' + (list[i].sumRent == null ? 0.00:list[i].sumRent)+'</td>';
                    /*代理分成*/
                    agentSub = agentSub + list[i].sumSale;
                    view += '<td>' + (list[i].sumSale == null ? 0.00:list[i].sumSale)+'</td>';
                    /*已提现*/
                    apwSub = apwSub + list[i].sumWithdraw;
                    view += '<td>' + (list[i].sumWithdraw == null ? 0.00:list[i].sumWithdraw)+'</td>';
                    /*余额*/
                    agdSub = agdSub + list[i].balance;
                    view += '<td>' + (list[i].balance == null ? 0.00:list[i].balance)+'</td>';
                    /*市级*/
                    agwSub = agwSub + list[i].agentCity;
                    view += '<td>' + (list[i].agentCity == null ? 0.00:list[i].agentCity)+'</td>';
                    /*区域*/
                    baSub = baSub + list[i].agentAre;
                    view += '<td>' + (list[i].agentAre == null ? 0.00:list[i].agentAre)+'</td>';
                    /*业务*/
                    saleSub = saleSub + list[i].agentSa;
                    view += '<td>' + (list[i].agentSa == null ? 0.00:list[i].agentSa)+'</td>';
                    /*店铺*/
                    shopSub = shopSub + list[i].agentShop;
                    view += '<td>' + (list[i].agentShop == null ? 0.00:list[i].agentShop)+'</td>';
                    view += '</tr>';
                }
                /*小计*/
                view += '<tr>';
                view += '<td style="color: red"></td>';
                /*ID*/
                view += '<td style="color: red"></td>';
                /*名称*/
                view += '<td style="color: red"></td>';
                /*身份*/
                view += '<td style="color: red"></td>';
                /*区域*/
                view += '<td style="color: red">小计</td>';
                /*注册时间*/
                view += '<td style="color: red">' + biSub.toFixed(2) + '</td>';
                /*店铺数量*/
                view += '<td style="color: red">' + cSub.toFixed(2) + '</td>';
                /*10口*/
                view += '<td style="color: red">' + dcSub.toFixed(2) + '</td>';
                /*5口*/
                view += '<td style="color: red">' + wrSub.toFixed(2) + '</td>';
                /*桌面*/
                view += '<td style="color: red">' + apdSub.toFixed(2) + '</td>';
                /*租金总输入*/
                view += '<td style="color: red">' + agentSub.toFixed(2) + '</td>';
                /*代理分成*/
                view += '<td style="color: red">' + apwSub.toFixed(2) + '</td>';
                /*已提现*/
                view += '<td style="color: red">' + agdSub.toFixed(2) + '</td>';
                /*余额*/
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
                /*ID*/
                view += '<td style="color: green"></td>';
                /*名称*/
                view += '<td style="color: green"></td>';
                /*身份*/
                view += '<td style="color: green"></td>';
                /*代理区域*/
                view += '<td style="color: green">总计</td>';
                /*注册时间*/
                view += '<td style="color: green">' + (backData.sum.shopSum == null? 0 :  backData.sum.shopSum.toFixed(2))+ '</td>';
                /*店铺数量*/
                view += '<td style="color: green">' + (backData.sum.tenEqSum == null? 0 :  backData.sum.tenEqSum.toFixed(2))+ '</td>';
                /*10口*/
                view += '<td style="color: green">' + (backData.sum.fiEqSum == null? 0 :  backData.sum.fiEqSum.toFixed(2)) + '</td>';
                /*5口*/
                view += '<td style="color: green">' + (backData.sum.zmEqSum == null? 0 :  backData.sum.zmEqSum.toFixed(2) )+ '</td>';
                /*桌面*/
                view += '<td style="color: green">' + (backData.sum.rentSum == null? 0 :  backData.sum.rentSum.toFixed(2)) + '</td>';
                /*租金总输入*/
                view += '<td style="color: green">' + (backData.sum.saleSum == null? 0 :  backData.sum.saleSum.toFixed(2)) + '</td>';
                /*代理分成*/
                view += '<td style="color: green">' + (backData.sum.wrSum == null? 0 :  backData.sum.wrSum.toFixed(2)) + '</td>';
                /*已提现*/
                view += '<td style="color: green">' + (backData.sum.balanceSum == null? 0 :  backData.sum.balanceSum.toFixed(2)) + '</td>';
                /*余额*/
                view += '<td style="color: green">' + (backData.sum.citySum == null? 0 :  backData.sum.citySum.toFixed(2)) + '</td>';
                /*市级*/
                view += '<td style="color: green">' + (backData.sum.areSum == null? 0 :  backData.sum.areSum.toFixed(2)) + '</td>';
                /*区域*/
                view += '<td style="color: green">' + (backData.sum.saSum == null? 0 :  backData.sum.saSum.toFixed(2)) + '</td>';
                /*业务*/
                view += '<td style="color: green">' + (backData.sum.ashopSum == null? 0 :  backData.sum.ashopSum.toFixed(2)) + '</td>';
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
    window.location.href = "/ags/createAgsExcel?name="+$("#name").val()+"&oid="+$("#oid").val()+"&province="+$("#pro").val()+"&city="+$("#city").val()+"&area="+$("#area").val()+"&sortType="+$("#sortType").val();
}