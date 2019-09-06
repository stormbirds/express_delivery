/*异步表格获取数据的方法*/
function getDeviceData(url,data){/*这里调用的方法 在网页的的最下方看*/
    var loading = layer.load();
    console.log(url+","+data);
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
            console.log(backData)
            var list = backData.list;
            $("#total").html((backData.total==undefined?0:backData.total));
            if(list==undefined || list.length == 0){
                $("#list").html('');
                $("#nullTip").show();
                $("#nullTip").html('暂无数据');
            }else {
                $("#nullTip").hide();
                for (var i = 0; i< list.length; i++){
                    view += '<tr>';
                    view += '<td>';
                    if(list[i].state == 1){
                        view += '<a class="layui-btn-sm edit'+i+'" onmouseenter="show(\'电池详情\', \'.edit'+i+'\')" onmouseleave="hide()"' +
                            'onclick="getbox(\''+list[i].code+'\',\''+list[i].id+'\')"><i class="icon-iconset layui-icon"></i></a>';/*管理按钮*/
                        view += '<a class="layui-btn-sm setting'+i+'" onmouseenter="show(\'设置\', \'.setting'+i+'\')" onmouseleave="hide()"' +
                            'onclick="getSettingbox(\''+list[i].code+'\',\''+list[i].id+'\')"><i class="layui-icon-set-fill layui-icon"></i></a>';/*设置按钮*/
                    }else{
                        view += '';
                    }
                    view += '<a class="layui-btn-sm del'+i+'" onmouseenter="show(\'删除\',\'.del'+i+'\')" onmouseleave="hide()" onclick="del(\''+list[i].id+'\',\''+list[i].code+'\')"><i class="layui-icon-close-fill layui-icon"></i></a>';
                    view += '</td>';
                    view += '<td>'+list[i].id+'</td>';/*设备ID*/
                    view += '<td>'+list[i].code+'</td>';/*设备编号*/
                    view += '<td>'+((list[i].rtime == undefined || list[i].rtime == null)? "" :list[i].rtime)+'</td>';/*最后一次心跳*/
                    view += '<td>'+(list[i].aaname==undefined?"未绑定":list[i].aaname)+'</td>';/*所属区域代理名*/
                    view += '<td>'+(list[i].rsname==undefined?"未绑定":list[i].rsname)+'</td>';/*所属店铺名*/
                    view += '<td>'+list[i].name+'</td>';/*设备类型*/
                    view += '<td>';
                    if(list[i].ow==undefined || list[i].ow == null){/*手机卡 wifi判断*/
                        var sg = list[i].sg == undefined || list[i].sg == null? 0:list[i].sg;
                        view += '<p class="wifiline">';
                        if(sg == 1){/*信号强度*/
                            view += '<span style="height: 5px;background: #ccc;"></span><span style="height: 7px;"></span><span style="height: 10px;"></span><span style="height: 13px;"></span><span style="height: 16px;"></span>';
                        }else if(sg == 2){
                            view += '<span style="height: 5px;background: #ccc;"></span><span style="height: 7px;background: #ccc;"></span><span style="height: 10px;"></span><span style="height: 13px;"></span><span style="height: 16px;"></span>';
                        }else if(sg == 3){
                            view += '<span style="height: 5px;background: #ccc;"></span><span style="height: 7px;background: #ccc;"></span><span style="height: 10px;background: #ccc;"></span><span style="height: 13px;"></span><span style="height: 16px;"></span>';
                        }else if(sg == 4){
                            view += '<span style="height: 5px;background: #ccc;"></span><span style="height: 7px;background: #ccc;"></span><span style="height: 10px;background: #ccc;"></span><span style="height: 13px;background: #ccc;"></span><span style="height: 16px;"></span>';
                        }else if(sg == 5){
                            view += '<span style="height: 5px;background: #ccc;"></span><span style="height: 7px;background: #ccc;"></span><span style="height: 10px;background: #ccc;"></span><span style="height: 13px;background: #ccc;"></span><span style="height: 16px;background: #ccc;"></span>';
                        }else{
                            view += '<span style="height: 5px;"></span><span style="height: 7px;"></span><span style="height: 10px;"></span><span style="height: 13px;"></span><span style="height: 16px;"></span>';
                        }
                        view += '</p>';
                        view += '<p>强度：'+sg+'</p>';
                    }else{
                        view += '<img src="../../../img/wifi.png" width="24" height="24"/>';
                        view += '<p>wifi名称：'+(list[i].ow == null || list[i].ow == undefined? '无': list[i].ow)+'</p>';
                    }

                    view += '</td>';
                    view += '<td>';
                    switch (list[i].state) {/*在线情况*/
                        case (1):
                            view += '<p style="color: green"><span style="border-radius: 50%;width: 10px;height: 10px;margin-right: 5px;background: green;display: inline-block"></span>在线</p>';
                            break;
                        case (2):
                            view += '<p style="color: red"><span style="border-radius: 50%;width: 10px;height: 10px;margin-right: 5px;background: red;display: inline-block"></span>离线</p>';
                            break;
                    }
                    view += '</td>';

                    view += '<td>'+(list[i].bc == undefined? 0:list[i].bc)+'</td>';/*设备总数*/
                    view += '<td>'+(list[i].cb==undefined?0:list[i].cb)+'</td>';/*可借数量*/
                    view += '<td>'+(list[i].cr==undefined?0:list[i].cr)+'</td>';/*可还数量*/
                    view += '<td>'+(list[i].sd==undefined?0:list[i].sd)+'</td>';/*手机号码*/
                    /*view += '<td><img src=""/></td>';/!*微信二维码*!/
                    view += '<td><img src=""/></td>';/!*支付宝二维码*!/*/
                    var scode = list[i].scode==undefined?"未绑定":list[i].scode
                    view += '<td>'+scode+'</td>';/*所属店铺编号*/
                    view += '<td>'+(list[i].manager==undefined?"未绑定":list[i].manager)+'</td>';/*所属店铺管理员*/
                    /*view += '<td>'+(list[i].apname==undefined?"未绑定":list[i].apname)+'</td>';/!*所属平台名*!/*/
                    view += '<td>'+(list[i].paname==undefined?"未绑定":list[i].paname)+'</td>';/*所属省级代理名*/
                    view += '<td>'+(list[i].caname==undefined?"未绑定":list[i].caname)+'</td>';/*所属市级代理名*/
                    view += '<td>'+(list[i].saname==undefined?"未绑定":list[i].saname)+'</td>';/*所属业务代理名*/
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
var tip_index = 0;
function show(data,className){
    tip_index = layer.tips(data, className, {time: 0, tips: 1});
}
function hide(){
    layer.close(tip_index);
}

/*删除设备*/
function del(id,eqCode) {
    /*权限验证*/
    $.ajax({
        type: "POST",
        url: '/deldevice',
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
                        url: '/equipManage/delete',
                        data: {id: id},
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
                                    data: {actionid: 77, remark: "删除设备ID："+id+"，设备编号："+eqCode},
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
                                getDeviceData('/equipManage/listPage',{});
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

function getbox(equipCode,id){
    /*权限验证*/
    $.ajax({
        type: "POST",
        url: '/powerDetails',
        data: {},
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        dataType: "json",
        success: function(backData) {
            var code = backData.code;
            if(code == 1){
                var loading = layer.load();
                $.ajax({
                    type: "POST",
                    url: "/equipManage/equipPowerDetail",
                    data: {equipCode:equipCode},
                    xhrFields: {
                        withCredentials: true
                    },
                    crossDomain: true,
                    dataType: "json",
                    success: function(backData) {
                        console.log(backData.powerList);
                        if(backData.powerList == undefined || $.isEmptyObject(backData.powerList)) {
                            $(".pageBoxOth").hide();
                            $("#tips").html("<p>暂无任何电池信息</p>");
                        }else {
                            var map = backData.powerList
                            var view = '';
                            for (var key in map) {
                                view += '<tr>';
                                var value = map[key];
                                if (value.powerCode == null){
                                    view += '<td>';
                                    view += '<input type="checkbox" name="powers" lay-skin="primary" value="' + key + '">';
                                    view += '</td>';
                                    view += '<td>'+key+'</td>';//卡口
                                    view += '<td>该卡口电池已被租借或者已损坏</td>';
                                    view += '<td></td>';
                                    view += '<td></td>';
                                    view += '<td></td>';
                                    /*view += '<td></td>';*/
                                } else {
                                    view += '<td>';
                                    view += '<input type="checkbox" name="powers" lay-skin="primary" value="' + key + '">';
                                    view += '</td>';
                                    view += '<td>'+key+'</td>';//卡口
                                    view += '<td>'+value.powerCode+'</td>';//电池编号
                                    view += '<td>'+value.bc+'</td>';//电池电量
                                    view += '<td>'+value.wi+'</td>';//插线是否正常
                                    view += '<td>'+value.st+'</td>';//设备是否正常
                                    /*view += '<td>'+value.cardNumErrorNum+'</td>';//卡口错误次数*/
                                }
                                view += '</tr>';
                            }
                            view += '<input type="hidden" value="'+equipCode+'" name="eqCode"/>';
                            $("#shopList").html(view);
                            layui.use(['form'], function() {
                                var  form = layui.form
                                form.render();
                            })
                        }
                        layer.open({
                            type: 1 //此处以iframe举例
                            , title: '设备操作以及电池信息'
                            , area: ['850px', '600px']
                            , shade: 0
                            , btnAlign: ''
                            , anim: 1
                            , btn: [/*'重启', '关机',*/ '弹出','弹出全部']
                            , maxmin: true
                            , offset: [ //为了演示，随机坐标
                                100
                                ,390
                            ]
                            , content: $("#changbox")
                            /*, btn1:function () {
                                $.ajax({
                                    type: "POST",
                                    url: '/equipManage/offOrRest',
                                    data: {eqCode: equipCode, type:"rest"},
                                    xhrFields: {
                                        withCredentials: true
                                    },
                                    crossDomain: true,
                                    dataType: "json",
                                    success: function(backData) {
                                        $.ajax({
                                            type: "POST",
                                            url: '/log/add',
                                            data: {actionid: 58, remark: "重启的机器id"+id+"重启的机器编号："+equipCode},
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
                                        layer.msg(backData.msg)
                                    }
                                })
                            }
                            , btn2: function () {
                                $.ajax({
                                    type: "POST",
                                    url: '/equipManage/offOrRest',
                                    data: {eqCode: equipCode, type:"off"},
                                    xhrFields: {
                                        withCredentials: true
                                    },
                                    crossDomain: true,
                                    dataType: "json",
                                    success: function(backData) {
                                        $.ajax({
                                            type: "POST",
                                            url: '/log/add',
                                            data: {actionid: 59, remark: "关机的机器id"+id},
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
                                        layer.msg(backData.msg)
                                    }
                                })
                            }*/,btn1: function(){
                                var check = $("#checkform").serialize();
                                console.log(check);
                                $.ajax({
                                    type: "GET",
                                    url: "/equipManage/overhaulToPower",
                                    data: check,
                                    xhrFields: {
                                        withCredentials: true
                                    },
                                    crossDomain: true,
                                    dataType: "json",
                                    success: function(backData) {
                                        layer.msg(backData.msg)
                                    },
                                    error:function () {
                                        layer.msg('请求错误');
                                        layer.close(loading);
                                    }
                                })
                            },btn2: function(){

                                $.ajax({
                                    type: "POST",
                                    url: "/equipManage/overhaulAllPower",
                                    data: {eqCode: equipCode},
                                    xhrFields: {
                                        withCredentials: true
                                    },
                                    crossDomain: true,
                                    dataType: "json",
                                    success: function(backData) {
                                        $.ajax({
                                            type: "POST",
                                            url: '/log/add',
                                            data: {actionid: 61, remark: "弹出所有电池的设备id"+id+",设备编号："+equipCode},
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
                                        layer.msg(backData.msg)
                                    },
                                    error:function () {
                                        layer.msg('请求错误');
                                        layer.close(loading);
                                    }
                                })
                            }
                        });
                        layer.close(loading);
                    },
                    error: function () {
                        layer.msg("请求错误");
                        layer.close(loading);
                    }
                })
            }else{
                layer.msg('暂无权限');
            }
        }
    })

}

/*设置设备*/
function getSettingbox(equipCode,id){
    /*权限验证*/
    $.ajax({
        type: "POST",
        url: '/powerDetails',
        data: {},
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        dataType: "json",
        success: function(backData) {
            var code = backData.code;
            if(code == 1){
                var loading = layer.load();

                layer.open({
                    type: 1 //此处以iframe举例
                    , title: '设备操作'
                    , area: ['300px', '400px']
                    , shade: 0
                    , btnAlign: ''
                    , anim: 1
                    , maxmin: true
                    , offset: [ //为了演示，随机坐标
                        100
                        ,390
                    ]
                    , content: $("#settingBox")
                });
                /*重启*/
                $("#restar").click(function () {
                    $.ajax({
                        type: "POST",
                        url: '/equipManage/offOrRest',
                        data: {eqCode: equipCode, type:"rest"},
                        xhrFields: {
                            withCredentials: true
                        },
                        crossDomain: true,
                        dataType: "json",
                        success: function(backData) {
                            $.ajax({
                                type: "POST",
                                url: '/log/add',
                                data: {actionid: 58, remark: "重启的机器id"+id+"重启的机器编号："+equipCode},
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
                            layer.msg(backData.msg)
                        }
                    })
                })
                /*关机*/
                $("#close").click(function () {
                    $.ajax({
                        type: "POST",
                        url: '/equipManage/offOrRest',
                        data: {eqCode: equipCode, type:"off"},
                        xhrFields: {
                            withCredentials: true
                        },
                        crossDomain: true,
                        dataType: "json",
                        success: function(backData) {
                            $.ajax({
                                type: "POST",
                                url: '/log/add',
                                data: {actionid: 59, remark: "关机的设备id"+id+",设备编号："+equipCode},
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
                            layer.msg(backData.msg)
                        }
                    })
                })

                /*更换二维码*/
                $("#changeCode").click(function () {
                    $.ajax({
                        type: "POST",
                        url: '/qrEq/updateMqEqQrCode',
                        data: {eqCode: equipCode},
                        xhrFields: {
                            withCredentials: true
                        },
                        crossDomain: true,
                        dataType: "json",
                        success: function(backData) {
                            /*$.ajax({
                                type: "POST",
                                url: '/log/add',
                                data: {actionid: 59, remark: "关机的机器id"+id},
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
                            })*/
                            layer.msg(backData.msg)
                        }
                    })
                })

                /*链接WiFi*/
                $("#lineWifi").click(function () {
                    var i = 1;
                    if(i > 1){
                        console.log("第二次请求")
                    }else{
                        $.ajax({
                            type: "POST",
                            url: '/equipManage/findRoundWIFI',
                            data: {eqCode: equipCode},
                            xhrFields: {
                                withCredentials: true
                            },
                            crossDomain: true,
                            dataType: "json",
                            success: function(backData) {
                                if(backData.code == 1){
                                    $("#wifiList").html('');
                                    $("#wifitips").show();
                                    $("#wifitips").html(backData.msg);
                                }else{
                                    var list = backData.wifi;
                                    var view = '';
                                    for (var i=0; i<list.length; i++){
                                        view += '<tr>';
                                        view += '<td>';
                                        view += list[i];
                                        view += '</td>';
                                        view += '<td>';
                                        view += '<button class="layui-btn layui-btn-normal" onclick="enterPassword(\''+list[i]+'\',\''+equipCode+'\')">连接</button>'
                                        view += '</td>';
                                        view += '</tr>';
                                    }
                                    $("#wifiList").html(view);
                                    var wifiBox = layer.open(
                                        {
                                            type: 1 //此处以iframe举例
                                            , title: 'wifi列表'
                                            , area: ['300px', '400px']
                                            , shade: 0
                                            , btnAlign: ''
                                            , anim: 1
                                            , btn: ['取消','保存']
                                            , maxmin: true
                                            , offset: [ //为了演示，随机坐标
                                                100
                                                ,390
                                            ]
                                            ,content: $("#Wifibox")
                                        }
                                    )
                                    i++;
                                }
                                layer.msg(backData.msg)
                            }
                        })
                    }

                })
                layer.close(loading);

            }else{
                layer.msg('暂无权限');
            }
        }
    })

}


/*输入wifi密码*/
function enterPassword(name, eqCode){
    var wifiPassWordBox = layer.open(
        {
            type: 1 //此处以iframe举例
            , title: '输入密码'
            , area: ['300px', '400px']
            , shade: 0
            , btnAlign: ''
            , anim: 1
            , btn: ['取消','保存']
            , maxmin: true
            , offset: [ //为了演示，随机坐标
                100
                ,390
            ]
            , content: $("#Wifipasswordbox")
            ,btn1: function(){
                layer.close(wifiPassWordBox);
            }
            ,btn2: function () {
                $.ajax({
                    type: "POST",
                    url: '/equipManage/connectWIFI',
                    data: {eqCode: eqCode, name: name, pwd: $("#password").val()},
                    xhrFields: {
                        withCredentials: true
                    },
                    crossDomain: true,
                    success: function (backData) {
                        if(backData.code == 3){
                            layer.msg(backData.msg);
                            layer.closeAll()
                        }else if(backData.code == 1){
                            layer.msg(backData.msg)
                        }
                    },
                    error: function () {
                        layer.msg('请求错误！');
                    }
                })
            }
        }
    )
}

function chosedata(id , name) {
    $("#shopname").html(name);
    $("#shopid").html(id);
}

function getpage(url,data) {
    var loading = layer.load();
    console.log(url);
    console.log(data);
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
                        var data = $("#deviceform").serializeObject();
                        getDeviceData(url, data);/*这里调用接口*/
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