var videoArr = [];
/*异步表格获取数据的方法*/
function getVideoData(url,data){/*这里调用的方法 在网页的的最下方看*/
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
                    var arr = new Array(4);
                    arr[0] = list[i].id;
                    arr[1] = list[i].fileCode;
                    arr[2] = list[i].fileName;
                    arr[3] = list[i].fileUrl;
                    view += '<tr>';
                    view += '<td>';
                    view += '<input type="checkbox" name="video" lay-skin="primary" value="' + arr + '" lay-filter="test">';
                    view += '</td>';
                    view += '<td>'+list[i].id+'</td>';/*视频ID*/
                    view += '<td>'+list[i].fileCode+'</td>';/*视频编号*/
                    view += '<td>'+list[i].fileName+'</td>';/*视频名称*/
                    view += '<td>';
                  /*  view += '<a class="layui-btn-sm video'+i+'" onmouseenter="show(\'删除视频\', \'.video'+i+'\')" onmouseleave="hide()"' +
                        'onclick="del(\''+list[i].id+'\')"><i class="layui-icon-close-fill layui-icon"></i></a>';/!*视频按钮*!/*/
                    view += '<a class="layui-btn-sm play'+i+'" onmouseenter="show(\'播放视频\', \'.play'+i+'\')" onmouseleave="hide()"' +
                        'onclick="play(\''+list[i].fileUrl+'\')"><i class="layui-icon-play layui-icon"></i></a>';/*视频按钮*/
                    view += '</td>';
                    view += '</tr>';

                }
                $("#bindvideolist").html(view);
                layui.use(['form'], function() {
                    var  form = layui.form
                    form.render();
                    form.on('checkbox(test)', function(obj){
                        var arr = obj.value.split(',');
                        if(obj.othis[0].attributes[0].value == 'layui-unselect layui-form-checkbox layui-form-checked'){
                            if(videoArr.indexOf(arr[0])>= 0){

                            }else{
                                videoArr.push(arr[0]);
                                var length = $("#numlist").children().length;
                                $("#numlist").append('<tr><td>'+(length+1)+'</td></tr>')
                                var view = '';
                                view += '<tr>';
                                view += '<input type="hidden" name="id" value="'+arr[0]+'"/>';/*视频ID*/
                                view += '<td>'+arr[1]+'</td>';/*视频编号*/
                                view += '<td>'+arr[2]+'</td>';/*视频名称*/
                                view += '<td>';
                                view += '<a class="layui-btn-sm remove'+arr[0]+'" onmouseenter="show(\'移除视频\', \'.remove'+arr[0]+'\')" onmouseleave="hide()"' +
                                    'onclick="remove(\''+arr[0]+'\')"><i class="layui-icon-close-fill layui-icon"></i></a>';/*视频按钮*/
                                view += '<a class="layui-btn-sm play'+arr[0]+'" onmouseenter="show(\'播放视频\', \'.play'+arr[0]+'\')" onmouseleave="hide()"' +
                                    'onclick="play(\''+arr[3]+'\')"><i class="layui-icon-play layui-icon"></i></a>';/*视频按钮*/
                                view += '</td>';
                                view += '</tr>';
                                $("#videolist").append(view);
                                var foo = document.getElementById("videolist");
                                Sortable.create(foo, { group: "omega" });
                                var height = $('#videoTable').height();
                                $("#numTable").css('height', (height+2));
                            }
                        }else{

                        }

                    });
                })
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
                            var data = $("#videoform").serializeObject();
                            getVideoData(url, data);/*这里调用接口*/
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
/*移除视频*/
function remove(id) {
    /*权限验证*/
    console.log(videoArr);
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
                layer.confirm('是否确定移除？', {
                    btn: ['取消','确定'] //按钮
                }, function(){
                    layer.closeAll();
                }, function(){
                    $('.remove'+id).parent().parent().remove();
                    videoArr.splice($.inArray(id,videoArr),1);
                    var length = ($("#numlist tr").length)-1;
                    if(length <= 0){
                        $("#numlist").html('');
                    }else{
                        var view ='';
                        for (var i=0; i< length; i++ ){
                            view += '<tr><td>'+(i+1)+'</td></tr>'
                        }
                        $("#numlist").html(view);
                        var height = $('#videoTable').height();
                        $("#numTable").css('height', (height+2));
                    }
                });
            } else {
                layer.msg('暂无权限');
            }
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
            ,190
        ]
        , content: $("#videobox")
    });
}