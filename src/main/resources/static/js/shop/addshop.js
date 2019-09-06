/*异步表格获取数据的方法*/

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

function getUser(url,data){
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
                $("#list1").html('');
                $("#nullTip").show();
                $("#nullTip").html('暂无数据');
            }else {
                $("#nullTip").hide();
                for (var i = 0; i< list.length; i++){
                    view += '<tr>';
                    view += '<td>';
                    view += '<a class="layui-btn-sm chose layui-btn chose'+i+'" data="'+list[i].openid+'" headImg="'+list[i].headImg+'", userid = "'+list[i].id+'">选择</a>';
                    view += '</td>';
                    view += '<td><img src="'+list[i].headImg+'"/></td>'; /*id*/
                    view += '<td><p>'+list[i].openid+'</p></td>';
                    view += '<td><p>'+list[i].nickName+'</p></td>';
                    view += '</tr>'


                }
                $("#list1").html(view);
                for (var i = 0; i< list.length; i++){
                    $(".chose"+i).click(function () {
                        $(".chose").html("选择")
                        $(".chose").parent().parent().css("background","#fff")
                        $(this).html("已选择");
                        $(this).parent().parent().css("background","#f2f2f2");
                        $("#openid1").val($(this).attr("data"));
                        $("#img1").attr("src",$(this).attr("headImg"));
                        $("#arid1").val($(this).attr("userid"));
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

/*获取普通用户信息*/
function choseUser(){
    $("#pageNum1").val(1);
    getUser("/rankShop/getMemberWithRankManager",$("#userform").serializeObject());
    getpage1('/rankShop/getMemberWithRankManager',$("#userform").serializeObject())

    $("#getShopData1").click(function () {
        $("#pageNum1").val(1);
        var data = $("#userform").serializeObject();
        getUser("/rankShop/getMemberWithRankManager",data);
        getpage1('/rankShop/getMemberWithRankManager',data);
    })
    $("#goPage").click(function () {
        var data = $("#userform").serializeObject();
        getUser("/rankShop/getMemberWithRankManager",data);
        getpage1('/rankShop/getMemberWithRankManager',data);
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
        , content: $(".chosebox1")
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

function getpage1(url,data) {
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
                $("#page1").Page({
                    totalPages: backData.pages,//分页总数
                    liNums: 7,//分页的数字按钮数(建议取奇数)
                    activeClass: 'activP', //active 类样式定义
                    pageNum: backData.pageNum,
                    callBack: function (page) {
                        $("#pageNum1").val(page);
                        var data = $("#userform").serializeObject();
                        getUser(url, data);
                    }
                });
                $("#pageValue1").val(backData.pageNum);
            }
            layer.close(loading);
        },
        error: function () {
            layer.msg("请求错误");
            layer.close(loading);
        }
    })
}