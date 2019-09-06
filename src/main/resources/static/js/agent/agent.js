/*异步表格获取数据的方法*/

function getAgentData(url,data,type){
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
            $("#total").html(backData.total);
            if(list.length ==0){
                $("#list").html('');
                $("#nullTip").show();
                $("#nullTip").html('暂无数据');
            }else {
                $("#nullTip").hide();
                for (var i = 0; i< list.length; i++){
                    view += '<tr>';
                    view += '<td>';
                    view += '<a class="layui-btn-sm detail'+i+'" onmouseenter="show(\'详情\',\'.detail'+i+'\')" onmouseleave="hide()" onclick="go(\''+list[i].id+'\')"><i class="layui-icon-log layui-icon"></i></a>';
                    view += '<a class="layui-btn-sm edit'+i+'" onmouseenter="show(\'编辑\', \'.edit'+i+'\')" onmouseleave="hide()"' +
                        'onclick="getbox(\''+(list[i].arOpenid==undefined ? "" :list[i].arOpenid)+'\',\''+list[i].agentRelation+'\',\''+list[i].id+'\',\''+list[i].aName+'\',' +
                        '\''+list[i].pname+'\',\''+list[i].cname+'\',\''+list[i].areaname+'\',' +
                        '\''+list[i].mgid+'\',\''+list[i].isblock+'\',\''+(list[i].contactName==undefined ? "" :list[i].contactName)+'\',' +
                        '\''+(list[i].contactPhone==undefined ? "" : list[i].contactPhone)+'\',\''+(list[i].account==undefined ? "" : list[i].account)+'\',\''+list[i].openid+'\')"><i class="layui-icon-set-fill layui-icon"></i></a>';
                    view += '<a class="layui-btn-sm del'+i+'" onmouseenter="show(\'删除\',\'.del'+i+'\')" onmouseleave="hide()" onclick="del(\''+list[i].id+'\',\''+list[i].openid+'\')"><i class="layui-icon-close-fill layui-icon"></i></a>';
                    view += '</td>';
                    view += '<td>'+list[i].id+'</td>';
                    view += '<td>';
                    switch (list[i].mgid) {
                        case (2):
                            view += '店铺管理';
                            break;
                        case (3):
                            view += '业务经理';
                            break;
                        case (4):
                            view += '区域代理';
                            break;
                        case (5):
                            view += '市级代理';
                            break;
                        case (6):
                            view += '省级代理';
                            break;
                        case (7):
                            view += '平台用户';
                            break;
                    }
                    view += '</td>';
                    view += '<td>'+(list[i].openid==undefined ? "" :list[i].openid)+'</td>'
                    if(type == 2){
                        view += '<td>'+(list[i].account==undefined? "" : list[i].account.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2'))+'</td>'
                    }else{
                        view += '<td>'+(list[i].account==undefined? "" : list[i].account)+'</td>'
                    }
                    view += '<td>';
                    view += '<p>'+(list[i].aName==undefined ? "" : list[i].aName)+'</p>';
                    /* view += '<p><label th:text="#{agentDtl-contactPhone}"></label>：'+list[i].arcontactphone+'</p>';*/
                    /*view += '<p>总提现：'+list[i].arcontactphone+'</p>';*/
                    view += '</td>';
                    view += '<td>'+list[i].pname+list[i].cname+list[i].areaname+'</td>';

                    view += '<td>'+(list[i].contactName==undefined ? "" : list[i].contactName)+'</td>';/*联系人姓名*/
                    if(type == 2){
                        view += '<td>'+(list[i].contactPhone==undefined? "" : list[i].contactPhone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2'))+'</td>'
                    }else{
                        view += '<td>'+(list[i].contactPhone==undefined? "" : list[i].contactPhone)+'</td>'
                    }
                    view += '<td>'+(list[i].manager==undefined ? 0 :list[i].manager)+'</td>';/*客服经理ID*/
                    view += '<td>'+(list[i].opname==undefined ? "" : list[i].opname)+'</td>';/*业务经理姓名*/
                    /*var time = backData.registTime;
                    time = new Date(time);
                    time = time.toLocaleString();*/
                    view += '<td>'+(list[i].rgtime)+'</td>';/*注册时间*/
                    if(list[i].isblock == 1){
                        view += '<td>已停用</td>';
                    }else{
                        view += '<td>未停用</td>';
                    }
                    /*view += '<td>';
                    view += '<p>总交易'+list[i].arname+'</p>';
                    view += '<p>当日：'+list[i].arcontactphone+'</p>';
                    view += '<p>当月：'+list[i].arcontactphone+'</p>';
                    view += '</td>';
                    view += '<td>';
                    view += '<p>'+list[i].arname+'</p>';/!*用户量*!/
                    view += '<p>当日新增：'+list[i].arcontactphone+'</p>';
                    view += '<p>当月新增：'+list[i].arcontactphone+'</p>';
                    view += '</td>';
                    view += '<td>';
                    view += '<p>管辖代理'+list[i].arname+'人</p>';/!*用户量*!/
                    view += '<p>管辖店铺：'+list[i].arcontactphone+'</p>';
                    view += '<p>设备数：'+list[i].arcontactphone+'台</p>';
                    view += '</td>';*/
                    view += '</tr>';
                    console.log(list[i].mgid+','+list[i].isblock);
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
var tip_index = 0;
function show(data,className){
    tip_index = layer.tips(data, className, {time: 0, tips: 1});
}
function hide(){
    layer.close(tip_index);
}
/*添加代理商*/
function addagent(){
    $("#isblock").hide();
    $("#openid").val("");
    $("#agentId").val("");
    $("#agentName").val("");
    $("#pthisname").html("");
    $("#cthisname").html("");
    $("#areathisname").html("");
    $("#mGroup").val("");
    $("#araccount").val("");
    $("#accountname").val("");
    $("#accountphone").val("");
    $("#choseAgent").show();
    layer.open({
        type: 1 //此处以iframe举例
        , title: '添加代理商'
        , area: ['800px', '450px']
        , shade: 0
        , btnAlign: ''
        , anim: 1
        , btn: ['取消', '添加']
        , maxmin: true
        , offset: [ //为了演示，随机坐标
            100
            ,390
        ]
        , content: $("#changebox")
        , btn1:function () {
            layer.closeAll();
        }
        , btn2: function () {
            var data = $("#changeform").serializeObject();
            console.log(data);
            $.ajax({
                type: "POST",
                url: '/agentPlat/insert/',
                data: data,
                xhrFields: {
                    withCredentials: true
                },
                crossDomain: true,
                dataType: "json",
                success: function(backData) {
                    console.log(backData);
                    if (backData.code ==  3 ){
                        $.ajax({
                            type: "POST",
                            url: '/log/add',
                            data: {actionid: 48, remark: "添加代理商oId："+$("#openid").val()},
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
                        layer.msg(backData.msg);
                        getAgentData('/agentPlat/pages',{});
                        getpage('/agentPlat/pages',$("#agentform").serializeObject())
                    }else{
                        layer.msg(backData.msg);
                    }
                },
                error: function () {
                    layer.msg('请求错误')
                }
            })
        }
    });
}

function go(id) {
    /*权限验证*/
    $.ajax({
        type: "POST",
        url: '/agentCenterDetails',
        data: {},
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        dataType: "json",
        success: function (backData) {
            var code = backData.code;
            if (code == 1) {
                window.location.href= "agentdetail.html?id="+id;
            } else {
                layer.msg('暂无权限');
            }
        }
    })

}
/*修改代理商*/
function getbox(arOpenid,agentRelation,id,aName,pname,cname,areaname,mgid,isblock,contactName,contactPhone, account, openid){
/*
    console.log(id+','+aName+','+pname+','+cname+','+areaname+','+mGroup+','+isblock+','+contactName+','+contactPhone);
*/
    /*权限验证*/
    $.ajax({
        type: "POST",
        url: '/agentCenterEdit',
        data: {},
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        dataType: "json",
        success: function (backData) {
            var code = backData.code;
            if (code == 1) {
                $("#openid").val(openid);
                $("#isblock").show();
                $("#agentRelation").val(agentRelation == "undefined" ? "" : agentRelation)
                $("#agentopenid").val(arOpenid)
                $("#agentId").val(id);
                $("#agentName").val(aName);
                $("#pthisname").html(pname);
                $("#cthisname").html(cname);
                $("#areathisname").html(areaname);
                $("#mGroup").val(mgid);
                $("#araccount").val(account);
                $("#accountname").val(contactName);
                $("#accountphone").val(contactPhone);
                $('[name=isblock]').each(function (i, item) {
                    if ($(item).val() == isblock) {
                        $(item).prop('checked', true);
                        layui.use('form', function () {
                            var form = layui.form;
                            form.render();
                        });
                    }
                });
                $("#choseAgent").hide();
                layer.open({
                    type: 1 //此处以iframe举例
                    , title: '修改代理商'
                    , area: ['800px', '450px']
                    , shade: 0
                    , btnAlign: ''
                    , anim: 1
                    , btn: ['取消', '保存']
                    , maxmin: true
                    , offset: [ //为了演示，随机坐标
                        100
                        , 390
                    ]
                    , content: $("#changebox")
                    , btn1: function () {
                        layer.closeAll();
                    }
                    , btn2: function () {
                        var data = $("#changeform").serializeObject();
                        $.ajax({
                            type: "POST",
                            url: '/agentPlat/update',
                            data: data,
                            xhrFields: {
                                withCredentials: true
                            },
                            crossDomain: true,
                            dataType: "json",
                            success: function (backData) {
                                if (backData.code == 3) {
                                    $.ajax({
                                        type: "POST",
                                        url: '/log/add',
                                        data: {actionid: 50, remark: "修改代理商的id：" + id + "修改代理商oid" + arOpenid},
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
                                    layer.msg(backData.msg);
                                    getAgentData('/agentPlat/pages', {});
                                    getpage('/agentPlat/pages', $("#agentform").serializeObject())
                                } else {
                                    layer.msg(backData.msg);
                                }
                            },
                            error: function () {
                                layer.msg('请求错误')
                            }
                        })
                    }
                });
            } else {
                layer.msg('暂无数据');
            }
        }
    })

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
        dataType: "json",
        success: function(backData) {
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
                        var data = $("#agentform").serializeObject();
                        getAgentData(url, data);
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

/*获取用户信息*/
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
            console.log(backData);
            var list = backData.list;
            if(list.length ==0){
                $("#listuser").html('');
                $("#nullTip1").show();
                $("#nullTip1").html('暂无数据');
            }else {
                $("#nullTip1").hide();
                for (var i = 0; i< list.length; i++){
                    view += '<tr>';
                    view += '<td>';
                    view += '<a class="layui-btn-sm layui-btn chose" id="chose'+i+'" data="'+list[i].openid+'"">选择</a>';
                    view += '</td>';
                    view += '<td><img src="'+list[i].headImg+'"/></td>'; /*id*/
                    view += '<td><p>'+list[i].nickName+'</p><p>'+list[i].openid+'</p></td>';
                    view += '<td>';
                    switch (list[i].mType) {
                        case (1):
                            view += '微信';
                            break;
                        case (2):
                            view += '支付宝';
                            break;
                    }
                    view += '</td>';
                    view += '</tr>'


                }
                $("#listuser").html(view);
                /*传递代理商信息*/
                for (var i = 0; i< list.length; i++){
                    $("#chose"+i).click(function () {
                        $(".chose").html("选择")
                        $(".chose").parent().parent().css("background","#fff")
                        $(this).html("已选择");
                        $(this).parent().parent().css("background","#f2f2f2");
                        $("#openid").val($(this).attr("data"));
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

/*获取用户信息*/
function getSuperiorAgent(url,data){
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
            console.log(backData);
            var list = backData.list;
            if(list.length ==0){
                $("#SuperiorAgentlist").html('');
                $("#nullTip2").show();
                $("#nullTip2").html('暂无数据');
            }else {
                $("#nullTip").hide();
                for (var i = 0; i< list.length; i++){
                    view += '<tr>';
                    view += '<td>';
                    view += '<a class="layui-btn-sm layui-btn chose" id="agent'+i+'" data="'+list[i].id+'" openid="'+list[i].openid+'">选择</a>';
                    view += '</td>';
                    view += '<td><img src="'+list[i].headImg+'"/></td>'; /*id*/
                    view += '<td><p>'+list[i].nickName+'</p><p>'+list[i].openid+'</p></td>';
                    view += '<td>';
                    switch (list[i].mgid) {
                        case (2):
                            view += '店铺管理';
                            break;
                        case (3):
                            view += '业务经理';
                            break;
                        case (4):
                            view += '区域代理';
                            break;
                        case (5):
                            view += '市级代理';
                            break;
                        case (6):
                            view += '省级代理';
                            break;
                        case (7):
                            view += '平台用户';
                            break;
                    }
                    view += '</td>';
                    view += '</tr>'


                }
                $("#SuperiorAgentlist").html(view);
                /*传递代理商信息*/
                for (var i = 0; i< list.length; i++){
                    $("#agent"+i).click(function () {
                        $(".chose").html("选择")
                        $(".chose").parent().parent().css("background","#fff")
                        $(this).html("已选择");
                        $(this).parent().parent().css("background","#f2f2f2");
                        $("#agentRelation").val($(this).attr("data"));
                        $("#agentopenid").val($(this).attr("openid"))
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
function choseAgent(){
    $("#pageNum").val(1);
    getUser("/agentPlat/memberExtPages",$("#userform").serializeObject());
    getuserpage('/agentPlat/memberExtPages',$("#userform").serializeObject())

    $("#getUserData").click(function () {
        $("#pageNum1").val(1);
        var data = $("#userform").serializeObject();
        getUser("/agentPlat/memberExtPages",data);
        getuserpage('/agentPlat/memberExtPages',data);
    })
    $("#goPage1").click(function () {
        var data = $("#userform").serializeObject();
        getUser("/agentPlat/memberExtPages",data);
        getuserpage('/agentPlat/memberExtPages',data);
    })
    var index = layer.open({
        type: 1 //此处以iframe举例
        , title: '选择用户'
        , area: ['800px', '500px']
        , shade: 0
        , btnAlign: ''
        , anim: 1
        , btn: ['取消', '保存']
        , maxmin: true
        , offset: [ //为了演示，随机坐标
            50
            ,200
        ]
        , content: $("#agentData")
        , btn1:function () {
            layer.close(index);
        }
        , btn2: function () {
            layer.close(index);
        }
    });
}

/*获取代理商信息*/
function choseSuperiorAgent(){
    $("#pageNum2").val(1);
    $("#openidinput").val("");
    $("#nickname").val("");
    getSuperiorAgent("/agentPlat/pages",$("#SuperiorAgentfrom").serializeObject());
    getSuperiorAgentpage('/agentPlat/pages',$("#SuperiorAgentfrom").serializeObject())


    $("#getSuperiorAgent").click(function () {
        $("#pageNum2").val(1);
        var data = $("#SuperiorAgentfrom").serializeObject();
        getSuperiorAgent("/agentPlat/pages",data);
        getSuperiorAgentpage('/agentPlat/pages',data);
    })
    $("#goPage2").click(function () {
        var data = $("#SuperiorAgentfrom").serializeObject();
        getSuperiorAgent("/agentPlat/pages",data);
        getSuperiorAgentpage('/agentPlat/pages',data);
    })
    var index = layer.open({
        type: 1 //此处以iframe举例
        , title: '选择上级代理商'
        , area: ['800px', '500px']
        , shade: 0
        , btnAlign: ''
        , anim: 1
        , btn: ['取消', '保存']
        , maxmin: true
        , offset: [ //为了演示，随机坐标
            50
            ,200
        ]
        , content: $("#SuperiorAgent")
        , btn1:function () {
            layer.close(index);
        }
        , btn2: function () {
            layer.close(index);
        }
    });
}

function getSuperiorAgentpage(url,data) {
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
                $("#page2").Page({
                    totalPages: backData.pages,//分页总数
                    liNums: 7,//分页的数字按钮数(建议取奇数)
                    activeClass: 'activP', //active 类样式定义
                    pageNum: backData.pageNum,
                    callBack: function (page) {
                        $("#pageNum2").val(page);
                        var data = $("#SuperiorAgentfrom").serializeObject();
                        getSuperiorAgent(url, data);
                    }
                });
                $("#pageValue2").val(backData.pageNum);
            }
            layer.close(loading);
        },
        error: function () {
            layer.msg("请求错误");
            layer.close(loading);
        }
    })
}

function getuserpage(url,data) {
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

/*异步导出方法*/
function exportData(url, data, fileType) {
    console.log('url:' + url);
    console.log('data:' + data);
    var loading = layer.load();
    var urlOrderPrefix = urlPrefix + ':8075/'
    $.ajax({
        type: "POST",
        url: url,
        data: data,
        success: function (backData) {
            console.log("backData:" + backData)
            layer.close(loading);
            if (fileType == 'pdf') {
                location.href = urlOrderPrefix + backData + '.pdf';
            }  if (fileType == 'excel') {
                location.href = urlOrderPrefix + backData + '.xlsx';
            }
        },
        error: function () {
            layer.msg('请求错误');
            layer.close(loading);
        }
    });
}

/*删除代理商*/
function del(id,openid) {
    /*权限验证*/
    $.ajax({
        type: "POST",
        url: '/delAgent',
        data: {},
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        dataType: "json",
        success: function (backData) {
            var code = backData.code;
            if (code == 1) {
                layer.confirm('是否确定删除？', {
                    btn: ['取消','确定'] //按钮
                }, function(){
                    layer.closeAll();
                }, function(){
                    $.ajax({
                        type: "POST",
                        url: '/agentPlat/deleAgent',
                        data: {agentId: id},
                        xhrFields: {
                            withCredentials: true
                        },
                        crossDomain: true,
                        dataType: "json",
                        success: function(backData) {
                            if (backData.code == 3){
                                $.ajax({
                                    type: "POST",
                                    url: '/log/add',
                                    data: {actionid: 59, remark: "删除代理商ID："+id+"代理商openid："+openid},
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
                                getAgentData('/agentPlat/pages',{},2);
                                layer.msg(backData.msg);
                            }else{
                                layer.msg(backData.msg);
                            }
                        }
                    })
                });
            } else {
                layer.msg('暂无权限');
            }
        }
    })

}