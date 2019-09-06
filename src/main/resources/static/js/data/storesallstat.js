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
            console.log(backData)
            var list = backData.list;
            $("#total").html((backData.total==undefined?0:backData.total));
            if(list==undefined || list.length == 0){
                $("#list").html('');
                $("#nullTip").show();
                $("#nullTip").html('暂无数据');
            }else {
                $("#nullTip").hide();
                for (var i = 0; i< list.length; i++) {
                    view += '<tr>';
                    /*店铺名称*/
                    view += '<td>' + (list[i].shopName == null ? "":list[i].shopName) + '</td>';
                    /*使用时长*/
                    view += '<td>' + (list[i].allUseMinute == null? 0: (list[i].allUseMinute/60).toFixed(0)) + '小时</td>';
                    /*租借费用*/
                    view += '<td>' + (list[i].allOrderBill == null? 0: list[i].allOrderBill) + '</td>';
                    /*平台*/
                    view += '<td>' + (list[i].platOrderBill == null? 0: list[i].platOrderBill) + '（'+(list[i].platExtact == null? 0: list[i].platExtact)+'%）</td>';
                    /*省*/
                    view += '<td>' + (list[i].provinceOrderBill == null? 0: list[i].provinceOrderBill) + '（'+(list[i].provinceExtact == null? 0: list[i].provinceExtact)+'%）</td>';
                    /*市*/
                    view += '<td>' + (list[i].cityOrderBill == null? 0: list[i].cityOrderBill) + '（'+(list[i].cityExtact == null? 0: list[i].cityExtact)+'%）</td>';
                    /*区域*/
                    view += '<td>' + (list[i].areaOrderBill == null? 0: list[i].areaOrderBill) + '（'+(list[i].areaExtact == null? 0: list[i].areaExtact)+'%）</td>';
                    /*业务*/
                    view += '<td>' + (list[i].salesOrderBill == null? 0: list[i].salesOrderBill) + '（'+(list[i].salesExtact == null? 0: list[i].salesExtact)+'%）</td>';
                    /*店铺*/
                    view += '<td>' + (list[i].shopOrderBill == null? 0: list[i].shopOrderBill)+ '（'+(list[i].shopExtact== null? 0: list[i].shopExtact)+'%）</td>';
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
                        var data = $("#codeform").serializeObject();
                        console.log(data);
                        getCodeData(url, data);/*这里调用接口*/
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