/*异步表格获取数据的方法*/
function getDeviceData(url,data){/*这里调用的方法 在网页的的最下方看*/
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
            var list = backData.data.list;
            $("#total").html((backData.data.total==undefined?0:backData.data.total));
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
                        view += '<a class="layui-btn-sm video'+i+'" onmouseenter="show(\'绑定视频\', \'.video'+i+'\')" onmouseleave="hide()"' +
                            'onclick="bindbox(\''+list[i].eqCode+'\',\''+(backData.bang==null?0:backData.bang)+'\')"><i class="layui-icon-link layui-icon"></i></a>';/*视频按钮*/
                        view += '<a class="layui-btn-sm edit'+i+'" onmouseenter="show(\'视频列表\', \'.edit'+i+'\')" onmouseleave="hide()"' +
                            'onclick="getbindVideo(\''+list[i].eqCode+'\')"><i class="layui-icon-camera-fill layui-icon"></i></a>';/*修改按钮*/
                        view += '<a class="layui-btn-sm update'+i+'" onmouseenter="show(\'更新视频\', \'.update'+i+'\')" onmouseleave="hide()"' +
                            'onclick="update(\''+list[i].eqCode+'\')"><i class="layui-icon-upload layui-icon"></i></a>';/*更新视频按钮*/
                        view += '<a class="layui-btn-sm change'+i+'" onmouseenter="show(\'修改音量\', \'.change'+i+'\')" onmouseleave="hide()"' +
                            'onclick="change(\''+list[i].eqCode+'\',\'.change'+i+'\')"><i style="font-weight: 800;font-size: 24px" class="layui-icon-speaker layui-icon"></i></a>';/*调整音量按钮*/
                        view += '<a class="layui-btn-sm setting'+i+'" onmouseenter="show(\'设置logo\', \'.setting'+i+'\')" onmouseleave="hide()"' +
                            'onclick="setting(\''+list[i].eqCode+'\')"><i style="font-weight: 800;font-size: 24px" class="layui-icon-picture layui-icon"></i></a>';/*设置logo*/
                    }else{
                        view += '';
                    }
                    view += '</td>';
                    view += '<td>'+list[i].id+'</td>';/*ID*/
                    view += '<td>'+list[i].eqCode+'</td>';/*设备编号*/
                    view += '<td>'+(list[i].typeName==null?"":list[i].typeName)+'</td>';/*设备类型*/
                    view += '<td>'+(list[i].state==1?"在线":"离线")+'</td>';/*在线情况*/
                    view += '<td>'+(backData.bang==null?0:backData.bang)+'</td>';/*可绑视频数*/
                    view += '<td>'+(list[i].vnum==null?0:list[i].vnum)+'</td>';/*已绑视频数*/
                    view += '<td>'+(list[i].shopName==null?'':list[i].shopName)+'</td>';/*所属店铺名*/
                    view += '<td>'+(list[i].shopCode==null?'':list[i].shopCode)+'</td>';/*所属店铺编号*/
                    view += '</tr>';

                }
                $("#list").html(view);
            }
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
                        var data = $("#deviceform").serializeObject();
                        getDeviceData(url, data);/*这里调用接口*/
                    }
                });
                $("#pageValue").val(backData.data.pageNum);
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

/*设置Logo*/
function setting(eqCode) {
    $.ajax({
        type: "POST",
        url: "/basic/getBasicById",
        data: {id : 1},
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        dataType: "json",
        success: function(backData) {
            var logo = migUrl+backData.basicLogo;
            $("#settingLogo").attr("src", logo);
            var logo = layer.open({
                type: 1 //此处以iframe举例
                , title: '修改Logo'
                , area: ['440px', '440px']
                , shade: 0
                , btnAlign: ''
                , anim: 1
                , btn: ['保存','取消']
                , maxmin: true
                , offset: [ //为了演示，随机坐标
                    100
                    ,390
                ]
                , content: $("#settingBox")
                ,btn1: function(){
                    var loading = layer.load();
                    $.ajax({
                        type: "POST",
                        url: "/video/binDefalutLogo",
                        data: {eqCode: eqCode},
                        xhrFields: {
                            withCredentials: true
                        },
                        crossDomain: true,
                        dataType: "json",
                        success: function(backData) {
                            getDeviceData("/video/eqList",{})
                            layer.msg(backData.msg)
                            layer.close(logo);
                            layer.close(loading);

                        },
                        error:function () {
                            layer.msg('请求错误');
                            layer.close(logo);
                            layer.close(loading);
                        }
                    })
                },btn2: function(){
                    layer.closeAll();
                }
            });
        },
        error:function () {
            layer.msg("请求错误！");
        }
    })
}
/*修改音量*/
function change(eqCode,className) {
    $.ajax({
        type: "POST",
        url: '/video/findEqVolume',
        data:{eqCode: eqCode},
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        dataType: "json",
        success: function(backData) {
            if(backData.code == 1){
                layer.msg(backData.msg);
            }else if(backData.code == 3){
                var volBox = layer.tips("<div><div id='vol'></div><span class='layui-btn-sm'>音量</span></div>",className,{time:0});
                layui.use('slider', function(){
                    var $ = layui.$
                        ,slider = layui.slider;

                    slider.render({
                        elem: '#vol'
                        ,value: backData.vo
                        ,max:10
                        ,input: true //输入框
                        ,type: 'vertical' //垂直滑块
                        ,height: 100
                        ,change: function(value){
                            if($.cookie('value')== undefined || value != $.cookie('value')){
                                $.cookie('value',value);
                                $.ajax({
                                    type: "POST",
                                    url: '/video/adjustEqVolume',
                                    data:{eqCode: eqCode, volume: value},
                                    xhrFields: {
                                        withCredentials: true
                                    },
                                    crossDomain: true,
                                    dataType: "json",
                                    success: function(backData) {
                                        if(backData.code == 1){
                                            layer.msg(backData.msg);
                                        }else if(backData.code == 3){
                                            layer.msg(backData.msg);
                                        }
                                    }
                                })

                            }else{

                            }
                            //do something
                        }
                    });
                })
            }
        }
    })
}

/*绑定设备*/
function bindbox(eqCode,i){
    var view ='';
    $("#bindVideo").find('input').val('');
    var url = '/video/eqBindFindVideo';
    for (var j= 0; j<i; j++){
        view += '<tr><td>';
        view += '<a class="layui-btn-sm video'+j+'" onmouseenter="show(\'查看视频\', \'.video'+j+'\')" onmouseleave="hide()"' +
            'onclick="getUnbindVideo(\''+url+'\',\''+eqCode+'\',\''+i+'\')"><i class="layui-icon-video layui-icon"></i></a>';/*视频按钮*/
        view += '</td>';
        view += '<td><input id="vcode'+j+'" type="text" style="border: none;background: transparent;text-align: center"/></td>';
        view += '<td><input id="vname'+j+'" type="text" style="border: none;background: transparent;text-align: center"/></td>';
        view += '<input id="vId'+j+'" name="vid" type="hidden"/>';
        view += '</tr>';
    }
    view += '<input id="eqCode" name="eqCode" type="hidden"/>';
    $("#bindVideo").html(view);
    layer.open({
        type: 1 //此处以iframe举例
        , title: '绑定视频'
        , area: ['545px', '600px']
        , shade: 0
        , btnAlign: ''
        , anim: 1
        , btn: ['保存','取消']
        , maxmin: true
        , offset: [ //为了演示，随机坐标
            100
            ,390
        ]
        , content: $("#bindbox")
        ,btn1: function(){
            var loading = layer.load();
            var check = $("#bindForm").serialize();
            $.ajax({
                type: "POST",
                url: "/video/eqBindVideo",
                data: check,
                xhrFields: {
                    withCredentials: true
                },
                crossDomain: true,
                dataType: "json",
                success: function(backData) {
                    getDeviceData("/video/eqList",{})
                    layer.msg(backData.msg)
                    layer.close(loading);
                },
                error:function () {
                    layer.msg('请求错误');
                    layer.close(loading);
                }
            })
        },btn2: function(){
            layer.closeAll();
            $("#bindVideo").find('input').val('');
        }
    });
}

/*绑定视频查看视频*/
function getUnbindVideo(url,data,i){/*这里调用的方法 在网页的的最下方看*/
    var loading = layer.load();
    $("#eqCode").val(data);
    var vdata = $("#videoForm").serialize();
    var view = "";
    $.ajax({
        type: "POST",
        url: url,
        data:vdata,
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        dataType: "json",
        success: function(backData) {
            var list = backData.data.list;
            $("#total").html((backData.data.total==undefined?0:backData.data.total));
            if(list==undefined || list.length == 0){
                $("#vblist").html('');
                $("#vnullTip").show();
                $("#vnullTip").html('暂无数据');
            }else {
                $("#nullTip").hide();
                for (var i = 0; i< list.length; i++){
                    view += '<tr>';
                    view += '<td>';
                    if(list[i].isBan > 0 ){
                        view += '已绑定';
                    }else{
                        view += '<input type="radio" name="video" lay-skin="primary" value="' + list[i].id + '+'+list[i].fileCode+'+'+list[i].fileName+'+'+list[i].fileUrl+'">'
                    }
                    view += '</td>';
                    view += '<td>'+list[i].fileCode+'</td>';/*视频编号*/
                    view += '<td>'+list[i].fileName+'</td>';/*视频名称*/
                    view += '<td onclick="play(\''+list[i].fileUrl+'\')">点我播放</td>';/*视频内容*/
                    view += '<td>'+(list[i].labelName==null?"":list[i].labelName)+'</td>';/*标签*/
                    view += '</tr>';
                }
                $("#vblist").html(view);
                layui.use(['form'], function() {
                    var  form = layui.form
                    form.render();
                })
            }
            if(backData.data.pages == 0) {
                $("#vpageBox").hide();
            }else {
                $("#vpageBox").show();
                $("#vpage").Page({
                    totalPages: backData.data.pages,//分页总数
                    liNums: 7,//分页的数字按钮数(建议取奇数)
                    activeClass: 'activP', //active 类样式定义
                    pageNum: backData.data.pageNum,
                    callBack: function (page) {
                        var data = $("#videoForm").serializeObject();
                        getUnbindVideo(url, data, i);/*这里调用接口*/
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

    var videoRadio = layer.open({
        type: 1 //此处以iframe举例
        , title: '视频列表'
        , area: ['800px', '600px']
        , shade: 0
        , btnAlign: ''
        , anim: 1
        , btn: ['保存','取消']
        , maxmin: true
        , offset: [ //为了演示，随机坐标
            100
            ,390
        ]
        , content: $("#videoList")
        ,btn1: function(){
            var check = $("#videoRadio").serializeObject();
            console.log(check.video);
            var arr = check.video.split('+');
            console.log(arr[0]);
            $("#vId"+(i-1)).val(arr[0])
            $("#vcode"+(i-1)).val(arr[1])
            $("#vname"+(i-1)).val(arr[2])
            layer.close(videoRadio);
        },btn2: function(){
            layer.close(videoRadio);
        }
    });
    $("#getUnbind").click(function () {
        $("#vpageNum").val(1);
        getUnbindVideo(url,data,i);
    })
}

/*设备拥有视频*/
function getbindVideo(eqCode){/*这里调用的方法 在网页的的最下方看*/
    /*权限验证*/
    $("#eq").val(eqCode);
    $.ajax({
        type: "POST",
        url: '/powerDetails',
        data: {},
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        dataType: "json",
        success: function (backData) {
            var code = backData.code;
            if (code == 1) {
                var loading = layer.load();
                var data = {eqCode: eqCode};
                $.ajax({
                    type: "POST",
                    url: '/video/findEqBindedVideo',
                    data: data,
                    xhrFields: {
                        withCredentials: true
                    },
                    crossDomain: true,
                    dataType: "json",
                    success: function (backData) {
                        var list = backData.data;
                        $("#total").html((backData.total == undefined ? 0 : backData.data.total));
                        if (list == undefined || list.length == 0) {
                            $("#shopList").html('');
                            $("#tips").show();
                            $("#tips").html('暂无数据');
                        } else {
                            $("#tips").hide();
                            var view = "";
                            console.log(list.length);
                            for (var i = 0; i < list.length; i++) {
                                view += '<tr>';
                                view += '<td>';
                                view += '<a class="layui-btn-sm video' + i + '" onmouseenter="show(\'解绑视频\', \'.video' + i + '\')" onmouseleave="hide()"' +
                                    'onclick="unbindVideo(\'' + list[i].id + '\')"><i class="layui-icon-delete layui-icon"></i></a>';
                                /*解绑*/
                                view += '<a class="layui-btn-sm unbind' + i + '" onmouseenter="show(\'播放视频\', \'.unbind' + i + '\')" onmouseleave="hide()"' +
                                    'onclick="play(\'' + list[i].fileUrl + '\')"><i class="layui-icon-play layui-icon"></i></a>';
                                /*播放*/
                                view += '</td>';
                                view += '<td>' + list[i].fileCode + '</td>';
                                /*视频编号*/
                                view += '<td>' + list[i].fileName + '</td>';
                                /*视频名称*/
                                view += '<td>'+ ((list[i].fileSize/(1024*1024)).toFixed(2))+'M</td>';
                                /*视频大小*/
                                view += '<td>' + (list[i].createtime == null ? "" : list[i].createtime) + '</td>';
                                /*绑定时间*/
                                view += '<td>' + (list[i].operator == null ? "" : list[i].operator) + '</td>';
                                /*操作人*/
                                view += '</tr>';
                            }
                            $("#shopList").html(view);
                        }
                        var bindVideo = layer.open({
                            type: 1 //此处以iframe举例
                            , title: '已绑视频列表'
                            , area: ['800px', '600px']
                            , shade: 0
                            , btnAlign: ''
                            , anim: 1
                            , maxmin: true
                            , offset: [ //为了演示，随机坐标
                                100
                                ,390
                            ]
                            , content: $("#changbox")
                        });
                        layer.close(loading);
                    },
                    error: function () {
                        layer.msg('请求错误');
                        layer.close(loading);
                    }
                });
            } else {
                layer.msg('暂无权限');
            }
        }
    })
}

/*解绑视频*/
function unbindVideo(id) {
    var loading = layer.load();
    $.ajax({
        type: "POST",
        url: '/video/untying',
        data: {evId: id},
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        dataType: "json",
        success: function (backData) {
            var eqCode = $("#eq").val();
            getbindVideo(eqCode);
            layer.msg(backData.msg);
            layer.close(loading);
        },
        error: function () {
            layer.msg('请求错误');
            layer.close(loading);
        }
    });
}

/*更新视频*/
function update(eqCode) {
    var loading = layer.load();
    $.ajax({
        type: "POST",
        url: '/video/updateEqVideo',
        data: {eqCode: eqCode},
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        dataType: "json",
        success: function (backData) {
            layer.msg(backData.msg);
            layer.close(loading);
        },
        error: function () {
            layer.msg('请求错误');
            layer.close(loading);
        }
    });
}

/*播放方法*/
function play(src) {
    console.log(src);
    $("#video").attr("src",src);
    layer.open({
        type: 1 //此处以iframe举例
        , title: '视频内容'
        , area: ['580px', '600px']
        , shade: 0
        , btnAlign: ''
        , anim: 1
        , maxmin: true
        , offset: [ //为了演示，随机坐标
            100
            ,390
        ]
        , content: $("#videobox")
    });
}