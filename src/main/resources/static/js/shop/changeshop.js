$(function () {
    var id = GetIframeQueryString("id");
    var pname = GetIframeQueryString("pname");
    var cname = GetIframeQueryString("cname");
    var area = GetIframeQueryString("area");
    $("#pthisname").html(pname);
    $("#cthisname").html(cname);
    $("#id").val(id);
    console.log(id);
    //JavaScript代码区域
    layui.config({
        base: '../../js/modules/' //你存放新模块的目录，注意，不是layui的模块目录
    }).use('address'); //加载入口
    layui.use(['element','form', 'laydate', 'layer', 'address'], function(){
        var element = layui.element
            ,form = layui.form
            ,laydate = layui.laydate
            ,layer = layui.layer
            ,$ = layui.jquery
            ,picker = layui.picker
            ,address = layui.address();

        $("#chosepoint").click(function(){
            layer.open({
                type: 2,
                area: ['700px', '500px'],
                fixed: false, //不固定
                maxmin: true,
                title: '选择坐标',
                content: 'chosepoint.html'
            });
        })
        $.ajax({
            type: "POST",
            url: "/agentPlat/editAgent",
            data: {id : id},
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            success: function (backData) {
                $("#code").val(backData.code);
                $("#sName").val(backData.sName);
                $("#areathisname").html(backData.ar_name);
                $("#lo").val(backData.lo);
                $("#la").val(backData.la);
                $("input[name='highCostForeign']").val(backData.highCostForeign);
                $("input[name='rentCostForeign']").val(backData.rentCostForeign);
                $("input[name='sPhone']").val(backData.sPhone);
                $("select[name='freeUsetime']").val(backData.freeUsetime);
                $("input[name='rentCost']").val(backData.rentCost);
                $("input[name='highCost']").val(backData.highCost);
                $("input[name='sAddress']").val(backData.sAddress);
                $("input[name='sCoordinate']").val(backData.sCoordinate);
                $("input[name='shopRequire']").val(backData.shopRequire);
                $("input[name='shopProfit']").val(backData.shopProfit);
                $("input[name='settleAsk']").val(backData.settleAsk);
                $("input[name='remark']").val(backData.remark);

                $("input[name='plat']").val(backData.apId);
                $("input[name='apName']").val(backData.apName);
                $("input[name='apPhone']").val(backData.apPhone);
                $("input[name='apOid']").val(backData.apOid);
                $("input[name='platExtract']").val(backData.apN);
                $("input[name='overtimePlatExtract']").val(backData.oapN);

                $("input[name='provinceAgent']").val(backData.paId);
                $("input[name='paName']").val(backData.paName);
                $("input[name='paPhone']").val(backData.paPhone);
                $("input[name='paOid']").val(backData.paOid);
                $("input[name='provinceExtact']").val(backData.paN);
                $("input[name='overtimeProvinceExtact']").val(backData.opaN);

                $("input[name='cityAgent']").val(backData.caId);
                $("input[name='caName']").val(backData.caName);
                $("input[name='caOid']").val(backData.caOid);
                $("input[name='caPhone']").val(backData.caPhone);
                $("input[name='cityExtact']").val(backData.caN);
                $("input[name='overtimeCityExtact']").val(backData.ocaN);

                $("input[name='areaAgent']").val(backData.aaId);
                $("input[name='aaName']").val(backData.aaName);
                $("input[name='aaPhone']").val(backData.aaPhone);
                $("input[name='aaOid']").val(backData.aaOid);
                $("input[name='areaExtact']").val(backData.aaN);
                $("input[name='overtimeAreaExtact']").val(backData.oaaN);

                $("input[name='salesAgent']").val(backData.saId);
                $("input[name='saName']").val(backData.saName);
                $("input[name='saPhone']").val(backData.saPhone);
                $("input[name='saOid']").val(backData.saOid);
                $("input[name='salesExtact']").val(backData.saN);
                $("input[name='overtimeSalesExtact']").val(backData.osaN);

                $("input[name='manager']").val(backData.maId);
                $("input[name='maName']").val(backData.maName);
                $("input[name='maPhone']").val(backData.maPhone);
                $("input[name='maOid']").val(backData.maOid);
                $("input[name='shopExtact']").val(backData.maN);
                $("input[name='overtimeShopExtact']").val(backData.omaN);

                $("input[name='spm']").val(backData.spm);
                if(backData.logo == null || backData.logo == undefined || backData.logo == ""){

                }else{
                    $("#nowlogo").attr("src",migUrl+backData.logo);
                }


                $("#img7").attr("src", backData.apImg);
                $("#img6").attr("src", backData.paImg);
                $("#img5").attr("src", backData.caImg);
                $("#img4").attr("src", backData.aaImg);
                $("#img3").attr("src", backData.saImg);
                $("#img2").attr("src", backData.maImg);
                form.render();
            },
            error: function () {
                layer.msg("请求错误");

            }
        })

        $(".clear").click(function(){
            var id = $(this).attr("data");
            console.log(id);
            if(id == 7){
                $("input[name='plat']").val("");
                $("input[name='apName']").val("");
                $("input[name='apPhone']").val("");
                $("input[name='apOid']").val("");
                $("input[name='platExtract']").val("");
                $("input[name='overtimePlatExtract']").val("");
            }else if(id == 6){
                $("input[name='provinceAgent']").val("");
                $("input[name='paName']").val("");
                $("input[name='paPhone']").val("");
                $("input[name='paOid']").val("");
                $("input[name='provinceExtact']").val("");
                $("input[name='overtimeProvinceExtact']").val("");
            }else if(id == 5){
                $("input[name='cityAgent']").val("");
                $("input[name='caName']").val("");
                $("input[name='caOid']").val("");
                $("input[name='caPhone']").val("");
                $("input[name='cityExtact']").val("");
                $("input[name='overtimeCityExtact']").val("");
            }else if(id == 4){
                $("input[name='areaAgent']").val("");
                $("input[name='aaName']").val("");
                $("input[name='aaPhone']").val("");
                $("input[name='aaOid']").val("");
                $("input[name='areaExtact']").val("");
                $("input[name='overtimeAreaExtact']").val("");
            }else if(id == 3){
                $("input[name='salesAgent']").val("");
                $("input[name='saName']").val("");
                $("input[name='saPhone']").val("");
                $("input[name='saOid']").val("");
                $("input[name='salesExtact']").val("");
                $("input[name='overtimeSalesExtact']").val("");
            }else if(id == 2){
                $("input[name='manager']").val("");
                $("input[name='maName']").val("");
                $("input[name='maPhone']").val("");
                $("input[name='maOid']").val("");
                $("input[name='shopExtact']").val("");
                $("input[name='overtimeShopExtact']").val("");
            }


            $("#img"+id).removeAttr("src");
        })


        $("#add").click(function(){
            var overtimePlatExtract = $("input[name='overtimePlatExtract']").val();
            var overtimeProvinceExtact = $("input[name='overtimeProvinceExtact']").val();
            var overtimeCityExtact = $("input[name='overtimeCityExtact']").val();
            var overtimeAreaExtact = $("input[name='overtimeAreaExtact']").val();
            var overtimeSalesExtact = $("input[name='overtimeSalesExtact']").val();
            var overtimeShopExtact = $("input[name='overtimeShopExtact']").val();
            var all = overtimePlatExtract+overtimeProvinceExtact+overtimeCityExtact+overtimeAreaExtact+overtimeSalesExtact+overtimeShopExtact;
            if(all != 100 && all != 0 && all< 0){
                layer.msg("超时结算提成输入错误！")
            }else {
                console.log($("#changestore").serializeObject());
                $.ajax({
                    type: "POST",
                    url: "/agentPlat/editAgentGo",
                    data: $("#changestore").serializeObject(),
                    xhrFields: {
                        withCredentials: true
                    },
                    crossDomain: true,
                    dataType: "json",
                    success: function (backData) {
                        /*if(backData > 0){
                            layer.msg('修改成功！');
                        }else if(backData == -3){
                            layer.msg('分成比例错误，重新检查修改');
                        }else if(backData == -1){
                            layer.msg('请输入修改内容');
                        }else if(backData == -2){
                            layer.msg('请选择所在地区');
                        }else{
                            layer.msg('修改失败');
                        }*/
                        if(backData.code == 3){
                            $.ajax({
                                type: "POST",
                                url: '/log/add',
                                data: {actionid: 46, remark: "修改店铺ID："+$("#id").val()+"修改店铺编号："+$("#code").val()},
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
                            window.location.href="shopindex"
                            $("input").val();
                            layer.msg(backData.msg);
                        }else if(backData.code == 1){
                            layer.msg(backData.msg);
                        }
                    }
                })
            }
        })


    })

})


function getAgent(url,data){
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
        dataType: "json",
        success: function(backData) {
            var list = backData.list;
            if(list.length ==0){
                $("#list").html('');
                $("#nullTip").show();
                $("#nullTip").html('暂无数据');
            }else {
                $("#nullTip").hide();
                for (var i = 0; i< list.length; i++){
                    view += '<tr>';
                    view += '<td>';
                    view += '<a class="layui-btn-sm chose layui-btn" id="chose'+i+'" data="'+list[i].openid+'" headImg="'+list[i].headImg+'" contactName="'+list[i].nickName+'", contactPhone="'+list[i].contactPhone+'", arid = "'+list[i].id+'">选择</a>';
                    view += '</td>';
                    view += '<td><img src="'+list[i].headImg+'"/></td>'; /*id*/
                    view += '<td><p>'+list[i].openid+'</p></td>';
                    view += '<td><p>'+list[i].nickName+'</p></td>';
                    view += '</tr>'


                }
                $("#list").html(view);
                for (var i = 0; i< list.length; i++){
                    $("#chose"+i).click(function () {
                        var mgid = $("#mgid").val();
                        $(".chose").html("选择")
                        $(".chose").parent().parent().css("background","#fff")
                        $(this).html("已选择");
                        $(this).parent().parent().css("background","#f2f2f2");
                        $("#openid"+mgid).val($(this).attr("data"));
                        $("#img"+mgid).attr("src",$(this).attr("headImg"));
                        $("#name"+mgid).val($(this).attr("contactName"));
                        /*$("#phone"+mgid).val($(this).attr("contactPhone"));*/
                        $("#arid"+mgid).val($(this).attr("arid"));
                    })
                }
            }
            layer.close(loading);
        },
        error: function(){
            layer.msg('请求错误');
            layer.close(loading);
        }
    });
}

/*获取代理商信息*/
function choseAgent(mgid){
    $("#mgid").val(mgid);
    $("#pageNum").val(1);
    getAgent("/rankShop/listAgentWithMember",$("#agentform").serializeObject());
    getpage('/rankShop/listAgentWithMember',$("#agentform").serializeObject())

    $("#getShopData").click(function () {
        $("#pageNum").val(1);
        var data = $("#agentform").serializeObject();
        getAgent("/rankShop/listAgentWithMember",data);
        getpage('/rankShop/listAgentWithMember',data);
    })
    $("#goPage").click(function () {
        var data = $("#agentform").serializeObject();
        getAgent("/rankShop/listAgentWithMember",data);
        getpage('/rankShop/listAgentWithMember',data);
    })
    layer.open({
        type: 1 //此处以iframe举例
        , title: '选择代理商'
        , area: ['1000px', '800px']
        , shade: 0
        , btnAlign: ''
        , anim: 1
        , btn: ['取消', '保存']
        , maxmin: true
        , offset: [ //为了演示，随机坐标
            50
            ,200
        ]
        , content: $(".chosebox")
        , btn1:function () {
            layer.closeAll();
        }
        , btn2: function () {
            layer.closeAll();
        }
    });
}
/*分页*/
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
        dataType: "json",
        success: function(backData) {
            if(backData.pages == 0) {
                $(".pageBox").hide();
            }else {
                $(".pageBox").show();
                console.log(backData.pages);
                $("#page").Page({
                    totalPages: backData.pages,//分页总数
                    liNums: 7,//分页的数字按钮数(建议取奇数)
                    activeClass: 'activP', //active 类样式定义
                    pageNum: backData.pageNum,
                    callBack: function (page) {
                        $("#pageNum").val(page);
                        var data = $("#agentform").serializeObject();
                        getAgent(url, data);
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