
$(function () {
    //JavaScript代码区域
    layui.use(['element', 'form', 'layer'], function () {
        var element = layui.element
            , form = layui.form
            , layer = layui.layer;
        var loading = layer.load();
        console.log(GetIframeQueryString('id'))
 /*       $("#dataId").val(GetIframeQueryString('id'));*/
        $.ajax({
            type: "POST",
            url: '/rankShop/selectDetails',/*接口*/
            data: {id: GetIframeQueryString('id')},
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            dataType: "json",
            success: function(backData) {
                $("#headimg").attr('src', migUrl+backData.sLogo)
                $("#userid").html(backData.openid);
                $("#code").html(backData.code);
                $("#sName").html(backData.sName);
                $("#area").html(backData.pname+backData.cname+backData.areaname);/*联系电话*/
                $("#sPhone").html(backData.sPhone);
                $("#rentCostForeign").html(backData.rentCostForeign);
                $("#highCostForeign").html(backData.highCostForeign);
                $("#shopProfitMoney").html(backData.shopProfitMoney=="" || backData.shopProfitMoney==null ||backData.shopProfitMoney==undefined ? "0" : backData.shopProfitMoney);
                $("#registtime").html(backData.registtime);
                $("#platExtract").html(backData.platExtract == "" || backData.platExtract == null || backData.platExtract == undefined ? "0" : backData.platExtract);
                $("#provinceExtact").html(backData.provinceExtact == "" || backData.provinceExtact == null || backData.provinceExtact == undefined ? "0" : backData.provinceExtact);
                $("#cityExtact").html(backData.cityExtact == "" || backData.cityExtact == null || backData.cityExtact == undefined ? "0" : backData.cityExtact);
                $("#areaExtact").html(backData.areaExtact == "" || backData.areaExtact == null || backData.areaExtact == undefined ? "0" : backData.areaExtact);
                $("#salesExtact").html(backData.salesExtact == "" || backData.salesExtact == null || backData.salesExtact == undefined ? "0" : backData.salesExtact);
                $("#shopExtact").html(backData.shopExtact == "" || backData.shopExtact == null || backData.shopExtact == undefined ? "0" : backData.shopExtact);
                $("#araName").html(backData.araName=="" || backData.araName==null || backData.araName ==undefined ? "" : backData.araName);

                $("#platName").html(backData.apName == "" || backData.apName == null || backData.apName == undefined ? "无" : backData.apName);
                $("#provinceName").html(backData.arpName == "" || backData.arpName == null || backData.arpName == undefined ? "无" : backData.arpName);
                $("#cityName").html(backData.arcName == "" || backData.arcName == null || backData.arcName == undefined ? "无" : backData.arcName);
                $("#areaName").html(backData.arName == "" || backData.arName == null || backData.arName == undefined ? "无" : backData.arName);
                $("#salesName").html(backData.arsName == "" || backData.arsName == null || backData.arsName == undefined ? "无" : backData.arsName);
                $("#shopName").html(backData.araName == "" || backData.araName == null || backData.araName == undefined ? "无" : backData.araName);

                $("#freeUsetime").html(backData.freeUsetime+"分钟");
                $("#rentCost").html(backData.rentCost+"元");
                $("#highCost").html(backData.highCost+"元");
                switch (backData.mgid) {
                    case (1):
                        $("#mgid").html('普通用户');
                        break;
                    case (2):
                        $("#mgid").html('店铺管理');
                        break;
                    case (3):
                        $("#mgid").html('业务经理');
                        break;
                    case (4):
                        $("#mgid").html('区域代理');
                        break;
                    case (5):
                        $("#mgid").html('市级代理');
                        break;
                    case (6):
                        $("#mgid").html('省级代理');
                        break;
                    case (7):
                        $("#mgid").html('平台用户');
                        break;
                }
                if(backData.isonecode == 1){
                    $("#isonecode").html('是');
                }else{
                    $("#isonecode").html('否');
                }
                if(backData.isquick == 1){
                    $("#isquick").html("是");
                }else{
                    $("#isquick").html("否");
                }
                if(backData.isblock == 1){
                    $("#isBlock").html("是");
                }else{
                    $("#isBlock").html("否");
                }

                layer.close(loading);
            },
            error: function(){
                layer.msg('请求错误');
                layer.close(loading);
            }
        });
    });




})