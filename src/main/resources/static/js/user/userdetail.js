$(function () {
    //JavaScript代码区域
    layui.use(['element', 'form', 'layer'], function () {
        var element = layui.element
            , form = layui.form
            , layer = layui.layer;
        var loading = layer.load();
        $("#dataId").val(GetIframeQueryString('id'));
        $.ajax({
            type: "POST",
            url: '/userManage/detailsUser',/*接口*/
            data: {id: GetIframeQueryString('id')},
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            dataType: "json",
            success: function(backData) {
                console.log(backData);
                $("#headimg").attr('src',backData.img)
                $("#nickname").html(backData.nickName);
                $("#userid").html(backData.openid);
                $("#contactName").html(backData.realName);
                $("#contactphone").html(backData.phone);/*联系电话*/
                $("#contactemail").html(backData.email);
                $("#cwnedBusinessManager").html(backData.contactName);
                $("#businessManagerContactMethod").html(backData.contactPhone);
                $("#registrationTime").html(backData.registTime);
                if(backData.mType == 1){
                    $("#userType").html('微信');
                }else if(backData.mType == 2){
                    $("#userType").html('支付宝');
                }else{
                    $("#userType").html('app');
                }

                $("#numberOfLogons").html(backData.logginTime);
                /*$("#totalAssets").html(backData);*/
                $("#commonArea").html(backData.commonArea);
                $("#commonShops").html(backData.usalShop);
                $("#ownedAgent").html(backData.superiorProxy);
                switch (backData.proxyLevel) {
                    case (1):
                        $("#agentLevel").html('普通用户');
                        break;
                    case (2):
                        $("#agentLevel").html('店铺管理');
                        break;
                    case (3):
                        $("#agentLevel").html('业务经理');
                        break;
                    case (4):
                        $("#agentLevel").html('区域代理');
                        break;
                    case (5):
                        $("#agentLevel").html('市级代理');
                        break;
                    case (6):
                        $("#agentLevel").html('省级代理');
                        break;
                    case (7):
                        $("#agentLevel").html('平台用户');
                        break;
                }
                /*$("#agentAreax").html(backData.proxyArea);*/
                $("#agentContact").html(backData.proxyContactPhone);
                $("#agentArea").html(backData.proxyArea);/*代理区域*/
                $("#storeOwne").html(backData.belong);
                $("#theDivided").html(backData.extact);
                $("#subordinateAgent").html(backData.subordinateProxy);
                $("#owningEquipment").html(backData.device);/*拥有设备*/
                if(backData.iswithdraw == 1){
                    $("#iswithdraw").html("是");
                }else{
                    $("#iswithdraw").html("否");
                }
                if(backData.isblock == 1){
                    $("#isBlock").html("是");
                }else{
                    $("#isBlock").html("否");
                }

                form.render('select');
                layer.close(loading);
            },
            error: function(){
                layer.msg('请求错误');
                layer.close(loading);
            }
        });
        $.ajax({
            type: "POST",
            url: '/userManage/queryOrder',/*接口*/
            data: {id: GetIframeQueryString('id')},
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            dataType: "json",
            success: function(backData) {
                console.log(backData);
                if(backData.length == 0){
                    $("#list").html('');
                }
                var list = backData;
                var view = '';
                for (var i=0; i<list.length; i++){
                    view += '<tr>';
                    view += '<td>'+list[i].code+'</td>';
                    view += '<td>'+list[i].borrowStore+'</td>';
                    view += '<td>'+(list[i].backStore == null ? "" : list[i].backStore)+'</td>';
                    view += '<td>'+list[i].backTime+'</td>';
                    view += '<td>'+(list[i].orderMoney == null ? 0 : list[i].orderMoney)+'元</td>';
                    view += '</tr>';
                }
                $("#list").html(view);
                layer.close(loading);
            },
            error: function(){
                layer.msg('请求错误');
                layer.close(loading);
            }
        });
        $.ajax({
            type: "POST",
            url: '/userManage/detailsBill',/*接口*/
            data: {id: GetIframeQueryString('id')},
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            dataType: "json",
            success: function(backData) {
                $("#deposit").html(backData.deposit);
                $("#amountOfCashToBeRaised").html(backData.withdraw);
                $("#historyRecharge").html(backData.accrualHistory);
                $("#historicalConsumption").html(backData.billHistory);
                $("#numberOfPresent").html(backData.withdrawCount);/*提现次数*/
                $("#historicalMention").html(backData.allAccrual);
                $("#numberOfLeases").html(backData.borrowCount);
                $("#totalLeaseTime").html(backData.allUserMinute);
                $("#timeoutReturnTimes").html(backData.overTime);
                layer.close(loading);
            },
            error: function(){
                layer.msg('请求错误');
                layer.close(loading);
            }
        });
        $.ajax({
            type: "POST",
            url: '/userManage/detailagent',/*接口*/
            data: {id: GetIframeQueryString('id')},
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            dataType: "json",
            success: function(backData) {
                $("#ownedAgent").html(backData.superiorProxy);
                switch (backData.mGroup) {
                    case (1):
                        $("#agentLevel").html('普通用户');
                        break;
                    case (2):
                        $("#agentLevel").html('店铺管理');
                        break;
                    case (3):
                        $("#agentLevel").html('业务经理');
                        break;
                    case (4):
                        $("#agentLevel").html('区域代理');
                        break;
                    case (5):
                        $("#agentLevel").html('市级代理');
                        break;
                    case (6):
                        $("#agentLevel").html('省级代理');
                        break;
                    case (7):
                        $("#agentLevel").html('平台用户');
                        break;
                }
                $("#agentContact").html(backData.contactPhone);
                $("#agentArea").html(backData.area);
                $("#storeOwne").html(backData.withdrawCount);/*提现次数*/
                $("#shoparea").html(backData.allAccrual);
                $("#theDivided").html(backData.borrowCount);
                $("#subordinateAgent").html(backData.subordinateProxy);
                $("#owningEquipment").html(backData.device);
                layer.close(loading);
            },
            error: function(){
                layer.msg('请求错误');
                layer.close(loading);
            }
        });
    });
})