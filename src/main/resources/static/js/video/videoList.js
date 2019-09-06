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
                    view += '<a class="layui-btn-sm video'+i+'" onmouseenter="show(\'删除视频\', \'.video'+i+'\')" onmouseleave="hide()"' +
                        'onclick="del(\''+list[i].id+'\')"><i class="layui-icon-close-fill layui-icon"></i></a>';/*视频按钮*/
                    view += '</td>';
                    view += '<td>'+list[i].id+'</td>';/*视频ID*/
                    view += '<td>'+list[i].fileCode+'</td>';/*视频编号*/
                    view += '<td>'+list[i].fileName+'</td>';/*视频名称*/
                    view += '<td><p onclick="play(\''+list[i].fileUrl+'\')" style="margin: 0;cursor: pointer">点击播放</p></td>';/*视频内容*/
                    view += '<td>'+(list[i].fileSize==null?0:((list[i].fileSize/(1024*1024)).toFixed(2)))+'M</td>';/*视频大小*/
                    view += '<td>'+(list[i].fileType==null?'':list[i].fileType)+'</td>';/*视频格式*/
                    view += '<td>'+(list[i].evnum==null?0:list[i].evnum)+'</td>';/*已绑设备数*/
                    view += '<td>'+(list[i].createtime==null?'':list[i].createtime)+'</td>';/*上传时间*/
                    view += '<td>'+(list[i].operator==null?0:list[i].operator)+'</td>';/*操作人*/
                    view += '</tr>';

                }
                $("#list").html(view);

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
/*删除视频*/
function del(id) {
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
                        url: '/video/deleVideo',
                        data: {vId: id},
                        xhrFields: {
                            withCredentials: true
                        },
                        crossDomain: true,
                        dataType: "json",
                        success: function(backData) {
                            if (backData.code == 3){
                                /*$.ajax({
                                    type: "POST",
                                    url: '/log/add',
                                    data: {actionid: 77, remark: "删除设备ID："+id},
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
                                getDeviceData('/video/videoList',{});
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
/*上传视频*/
function upload(){
    initVideo();
    /*查询标签*/
    $.ajax({
        type: "POST",
        url: "/video/findAllVideoLable",
        data: {},
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        dataType: "json",
        success: function(backData) {
            if(backData.code == 3){
                var list = backData.data;
                var view ="";
                for (var i=0; i< list.length; i++){
                    view += '<li data="'+list[i].id+'">'+list[i].labelName+'</li>';
                }
                view += '<li id="add" onclick="addlabel()">添加</li>';
                $("#labelList").html(view);
                $("#labelList").find("li").click(function () {
                    $("#labelList").find("li").removeClass("choseLabel");
                    $(this).addClass("choseLabel");
                    $("#label").val($(this).attr("data"));
                })
                getDeviceData('/video/videoList',{});
            }
        },
        error:function () {
            layer.msg('查询视频标签错误');
        }
    })
    var upload = layer.open({
        type: 1 //此处以iframe举例
        , title: '上传视频'
        , area: ['580px', '600px']
        , shade: 0
        , btnAlign: ''
        , anim: 1
        , btn: ['保存','取消']
        , maxmin: true
        , offset: [ //为了演示，随机坐标
            100
            ,390
        ]
        , content: $("#changebox")
        , btn1: function(){
            var check = $("#addVideo").serialize();
            var loading = layer.load();
            $.ajax({
                type: "POST",
                url: "/video/addVideo",
                data: check,
                xhrFields: {
                    withCredentials: true
                },
                crossDomain: true,
                dataType: "json",
                success: function(backData) {
                    if (backData.code == 1){
                        layer.msg(backData.msg);
                    }else if(backData.code == 3){
                        layer.msg(backData.msg);
                    }
                    getDeviceData("/video/videoList",{})
                    layer.close(loading);
                    layer.close(upload);
                },
                error:function () {
                    layer.msg('请求错误');
                    layer.close(loading);
                }
            })
        },btn2: function(){
            layer.closeAll();
        }
    });
}
/*初始化上传控件*/
function initVideo() {
    $("#videoName").val("");
    $("#initVideo").html('<div class="file-loading" id="uploadBox"><input id="logo" name="file" type="file" multiple></div>');
    $("#logo").fileinput({
        uploadUrl: '/video/fileUpload',
        uploadAsync: true,
        language:'zh',
        overwriteInitial: false,
        initialPreviewAsData: true,
        maxFileCount:1,
        showUpload: false
    })/**/
    $("#logo").on("filebatchselected", function(event, files) {
        $(this).fileinput("upload");
    })
    $("#logo").on("fileuploaded", function(event, data) {
        console.log(data);
        $("#file").val(data.response.data[0]);
    });
    $("#logo").on('fileuploaderror', function(event, data, msg) {  //一个文件上传失败
        console.log('文件上传失败！'+msg);
    });
}
/*添加标签*/
function addlabel() {
    $("#add").remove();
    var addBox = layer.open({
        type: 1 //此处以iframe举例
        , title: '添加标签'
        , area: ['580px', '200px']
        , shade: 0
        , btnAlign: ''
        , anim: 1
        , btn: ['保存','取消']
        , maxmin: true
        , offset: [ //为了演示，随机坐标
            100
            ,390
        ]
        , content: $("#addBox")
        , btn1: function () {
            $.ajax({
                type: "POST",
                url: "/video/addLable",
                data: {name: $("#labelname").val()},
                xhrFields: {
                    withCredentials: true
                },
                crossDomain: true,
                dataType: "json",
                success: function(backData) {
                    if(backData.code == 1){
                        $("#labelList").append('<li id="add" onclick="addlabel()">添加</li>')
                        layer.msg(backData.msg);
                        layer.close(addBox);
                    }else if(backData.code == 3){
                        $("#labelList").append('<li data="'+backData.id+'">'+backData.lableName+'</li><li id="add" onclick="addlabel()">添加</li>')
                        layer.msg(backData.msg);
                        layer.close(addBox);
                    }
                    $("#labelList").find("li").click(function () {
                        $("#labelList").find("li").removeClass("choseLabel");
                        $(this).addClass("choseLabel");
                        $("#label").val($(this).attr("data"));
                    })

                },
                error:function () {
                    layer.msg('添加标签错误');
                }
            })
        }
        ,btn2: function () {
            $("#labelList").append('<li id="add" onclick="addlabel()">添加</li>')
            layer.close(addBox);
        }
    })
}

/*播放方法*/
function play(src) {
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