
$(function () {
    //JavaScript代码区域
    layui.use(['element', 'form', 'layer'], function () {
        var element = layui.element
            , form = layui.form
            , layer = layui.layer;
        var loading = layer.load();
        $("#dataId").val(GetIframeQueryString('id'));
        $.get('/orderInfo/getOrderInfoDetailsByID', {'orderId': GetIframeQueryString('id')}, function (backData) {
            console.log(backData);
            $("#headimg").attr('src', backData.mHeadImg)
            $("#nickname").html(backData.mNickName);
            if (typeof (backData.mType) != "undefined" && backData.mType != null) {
                if (backData.mType == 1) {
                    $("#userSource").html('微信');
                } else if (backData.mType == 2) {
                    $("#userSource").html('支付宝');
                } else if(backData.mType == 3){
                    $("#userSource").html('app');
                } else {
                    $("#userSource").html('微信（用户余额）');
                }
            }else{
                $("#userSource").html('');
            }
            if (backData.payType == 1) {
                $("#payType").html('微信');
            } else if(backData.payType == 2){
                $("#payType").html('支付宝');
            } else {
                $("#payType").html('微信（用户余额）');
            }
            $("#registrationTime").html(backData.registTime == null ? '' : backData.registTime);
            $("#oCode").html(backData.oCode);
            if (backData.orderStatus == 1) {
                $("#orderStatus").html('租借中');
            } else if (backData.orderStatus == 2) {
                $("#orderStatus").html('已归还');
            } else if (backData.orderStatus == 3){
                $("#orderStatus").html('已撤销');
            } else if (backData.orderStatus == 4){
                $("#orderStatus").html('请求中');
            } else if (backData.orderStatus == 5){
                $("#orderStatus").html('超时已结算');
            } else if (backData.orderStatus == 6){
                $("#orderStatus").html('异常订单');
            }
            $("#device").html(backData.contactName);
            /* TODO 租借设备*/
            $("#equip").html(backData.eCode);
            $("#powerBI").html(backData.poweBI);

            $("#openID").html(backData.openID);
            $("#bwShopName").html(backData.bwShopName);
            $("#totalLeaseTime").html(backData.orderTime == null ? '' : backData.orderTime);
            $("#lastBalance").html((backData.lastBalance == null ? 0 : backData.lastBalance)+"元" );
            $("#unitPrice").html(backData.unitPrice + "元/小时");
            $("#bill").html((backData.bill == null ? 0 : backData.bill)+"元");
            $("#useMinute").html((backData.useMinute == null ? 0 : backData.useMinute)+"分钟");
            $("#ownedAgent").html(backData.allUserMinute == null ? 0 : backData.allUserMinute);
            /*各级代理商分成金额*/
            var provinceExtractMoney = (typeof (backData.provinceMoney) == 'undefined' || backData.provinceMoney == null ? 0.0 : backData.provinceMoney);
            var cityExtractMoney = (typeof (backData.cityMoney) == 'undefined' || backData.cityMoney == null ? 0.0 : backData.cityMoney);
            var shopExtractMoney = (typeof (backData.shopMoney) == 'undefined' || backData.shopMoney == null ? 0.0 : backData.shopMoney);
            var areaExtractMoney = (typeof (backData.areaMoney) == 'undefined' || backData.areaMoney == null ? 0.0 : backData.areaMoney);
            var platExtractMoney = (typeof (backData.platMoney) == 'undefined' || backData.platMoney == null ? 0.0 : backData.platMoney);
            var salesExtractMoney = (typeof (backData.salesMoney) == 'undefined' || backData.salesMoney == null ? 0.0 : backData.salesMoney);

            /*总金额*/
            var allExtractMoney = (provinceExtractMoney+cityExtractMoney+shopExtractMoney+areaExtractMoney+platExtractMoney+salesExtractMoney).toFixed(2);
            console.log(allExtractMoney);
            $("#provinceExtractorder").html((allExtractMoney == 0 ? (typeof (backData.provinceExtract) == 'undefined' || backData.provinceExtract == null ? 0 : backData.provinceExtract) : ((provinceExtractMoney/allExtractMoney).toFixed(2))*100)+'%')
            $("#platExtractorder").html((allExtractMoney == 0 ? (typeof (backData.platExtract) == 'undefined' || backData.platExtract == null ? 0 : backData.platExtract) : ((platExtractMoney/allExtractMoney).toFixed(2))*100)+'%')
            $("#cityExtractorder").html((allExtractMoney == 0 ? (typeof (backData.cityExtract) == 'undefined' || backData.cityExtract == null ? 0 : backData.cityExtract) : ((cityExtractMoney/allExtractMoney).toFixed(2))*100)+'%')
            $("#areaExtractorder").html((allExtractMoney == 0 ? (typeof (backData.areaExtract) == 'undefined' || backData.areaExtract == null ? 0 : backData.areaExtract) : ((areaExtractMoney/allExtractMoney).toFixed(2))*100)+'%')
            $("#salesExtractorder").html((allExtractMoney == 0 ? (typeof (backData.salesExtract) == 'undefined' || backData.salesExtract == null ? 0 : backData.salesExtract) : ((salesExtractMoney/allExtractMoney).toFixed(2))*100)+'%')
            $("#shopExtractorder").html((allExtractMoney == 0 ? (typeof (backData.shopExtract) == 'undefined' || backData.shopExtract == null ? 0 : backData.shopExtract) : ((shopExtractMoney/allExtractMoney).toFixed(2))*100)+'%')

            /*各级代理商分成金额和比例*/
            $("#provinceAgentName").html(backData.provinceAgentName == null ? '' : backData.provinceAgentName);
            $("#provinceExtract").html((typeof (backData.provinceExtract) == 'undefined' || backData.provinceExtract == null ? 0 : backData.provinceExtract) + '%');
            $("#provinceExtractMoney").html((typeof (backData.provinceMoney) == 'undefined' || backData.provinceMoney == null ? 0.0 : backData.provinceMoney) + " 元");
            $("#cityAgentName").html(backData.cityAgentName == null ? '':backData.cityAgentName);
            $("#cityExtract").html((typeof (backData.cityExtract) == 'undefined' || backData.cityExtract == null ? 0 : backData.cityExtract) + '%');
            $("#cityExtractMoney").html((typeof (backData.cityMoney) == 'undefined' || backData.cityMoney == null ? 0.0 : backData.cityMoney) + "元");
            // $("#bwShopName").html(backData.bwShopName==null?'':backData.bwShopName);
            $("#bwShopName").html(backData.shopAgentName==null?'':backData.shopAgentName);
            $("#shopExtract").html((typeof (backData.shopExtract) == 'undefined' || backData.shopExtract == null ? 0 : backData.shopExtract) + '%');
            $("#shopExtractMoney").html((typeof (backData.shopMoney) == 'undefined' || backData.shopMoney == null ? 0.0 : backData.shopMoney) + "元");
            $("#areaAgentName").html(backData.areaAgentName==null?'':backData.areaAgentName);
            $("#areaExtract").html((typeof (backData.areaExtract) == 'undefined' || backData.areaExtract == null ? 0 : backData.areaExtract) + '%');
            $("#areaExtractMoney").html((typeof (backData.areaMoney) == 'undefined' || backData.areaMoney == null ? 0.0 : backData.areaMoney) + "元");
            $("#platName").html(backData.platName==null?'':backData.platName);
            $("#platExtract").html((typeof (backData.platExtract) == 'undefined' || backData.platExtract == null ? 0 : backData.platExtract) + '%');
            $("#platExtractMoney").html((typeof (backData.platMoney) == 'undefined' || backData.platMoney == null ? 0.0 : backData.platMoney) + "元");
            $("#salesAgentName").html(backData.salesAgentName==null?'':backData.salesAgentName);
            $("#salesExtract").html((typeof  (backData.salesExtract) == 'undefined' || backData.salesExtract == null ? 0 : backData.salesExtract) + '%');
            $("#salesExtractMoney").html((typeof (backData.salesMoney) == 'undefined' || backData.salesMoney == null ? 0.0 : backData.salesMoney) + "元");

            layer.close(loading);
        })
        // $.ajax({
        //     type: "GET",
        //     url: '/orderInfo/getOrderInfoDetailsByID?id='+1,/*接口*/
        //     xhrFields: {
        //         withCredentials: true
        //     },
        //     crossDomain: true,
        //     dataType: "json",
        //     success: function(backData) {
        //         console.log(backData);
        //         $("#headimg").attr('src',backData.mHeadImg)
        //         $("#nickname").html(backData.mNickName);
        //         if(backData.mType == 1){
        //             $("#userSource").html('微信');
        //         }else{
        //             $("#userSource").html('支付宝');
        //         }
        //         if(backData.payType == 1){
        //             $("#payType").html('微信');
        //         }else{
        //             $("#payType").html('支付宝');
        //         }
        //         $("#registrationTime").html(backData.registTime);
        //         $("#oCode").html(backData.oCode);
        //         if(backData.orderStatus == 1){
        //             $("#orderStatus").html('租借中');
        //         }else if(backData.orderStatus == 2){
        //             $("#orderStatus").html('已归还');
        //         }else{
        //             $("#orderStatus").html('已撤销');
        //         }
        //         $("#device").html(backData.contactName);/* TODO 租借设备*/
        //         $("#equip").html(backData.eCode);
        //         $("#powerBI").html(backData.poweBI);
        //
        //
        //         $("#bwShopName").html(backData.bwShopName);
        //         $("#totalLeaseTime").html(backData.orderTime);
        //         $("#lastBalance").html(backData.lastBalance);
        //         $("#unitPrice").html(backData.unitPrice+"元/小时");
        //         $("#bill").html(backData.bill);
        //         $("#useMinute").html(backData.useMinute);
        //         $("#ownedAgent").html(backData.allUserMinute);/*TODO 不明*/
        //         $("#provinceAgentName").html(backData.provinceAgentName);
        //         $("#provinceExtract").html(backData.provinceExtract+'%');
        //         $("#provinceExtractMoney").html(backData.provinceExtract * backData.bill +" 元");
        //         $("#cityAgentName").html(backData.cityAgentName);
        //         $("#cityExtract").html(backData.cityExtract+'%');
        //         $("#cityExtractMoney").html(backData.cityExtract * backData.bill+"元");
        //         $("#bwShopName").html(backData.bwShopName);
        //         $("#shopExtract").html(backData.shopExtract+'%');
        //         $("#shopExtractMoney").html(backData.shopExtract * backData.bill+"元");
        //         $("#areaAgentName").html(backData.areaAgentName);
        //         $("#areaExtract").html(backData.areaExtract+'%');
        //         $("#areaExtractMoney").html(backData.areaExtract * backData.bill+"元");
        //         $("#platName").html(backData.platName);
        //         $("#platExtract").html(backData.platExtract+'%');
        //         $("#platExtractMoney").html(backData.platExtract * backData.bill+"元");
        //         $("#salesAgentName").html(backData.salesAgentName);
        //         $("#salesExtract").html(backData.salesExtract+'%');
        //         $("#salesExtractMoney").html(backData.salesExtract * backData.bill+"元");
        //
        //         layer.close(loading);
        //     },
        //     error: function(){
        //         layer.msg('请求错误');
        //         layer.close(loading);
        //     }
        // });
    });
})
