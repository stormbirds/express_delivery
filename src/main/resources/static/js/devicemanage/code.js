/*异步表格获取数据的方法*/
function getCodeData(url,data){/*这里调用的方法 在网页的的最下方看*/
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
            console.log(backData)
            var list = backData.list;
            $("#total").html((backData.total==undefined?0:backData.total));
            if(list==undefined || list.length == 0){
                $("#list").html('');
                $("#nullTip").show();
                $("#nullTip").html('暂无数据');
            }else {
                $("#nullTip").hide();
                for (var i = 0; i< list.length; i++) {
                    view += '<tr>';
                    view += '<td>';
                    view += '<input type="checkbox" name="id" lay-skin="primary" value="' + list[i].id + '">'
                    view += '</td>';
                    /*id*/
                    view += '<td>' + list[i].id + '</td>';
                    view += '<td>';
                    view += '<div class="layui-inline">';
                    view += '<i style="cursor:pointer;margin: 0 10px;font-size:28px;top:6px;position: relative" class="layui-icon icon-erweima alipay' + i + '" onclick="getbox(\'' + list[i].aliQrcode + '\')" onmouseenter="show(\'支付宝二维码\', \'.alipay' + i + '\')" onmouseleave="hide()"></i>';
                    view += '</div>';
                    view += '<div class="layui-inline">';
                    view += '<i style="cursor:pointer;margin: 0 10px;font-size: 28px;top:6px;position: relative" class="layui-icon icon-erweima wechat' + i + '" onclick="getimg(\'' + list[i].wechatQrcode + '\')" onmouseenter="show(\'微信二维码\', \'.wechat' + i + '\')" onmouseleave="hide()"></i>';
                    view += '</div>';
                    view += '</td>';
                    /*二维码*/
                    view += '<td>' + (list[i].isbind == 1 ? "是" : "否") + '</td>';
                    /*设备编号*/
                    view += '<td>' + (list[i].eqcode == null? "" : list[i].eqcode) + '</td>';
                    /*设备类型*/
                    view += '<td>' + (list[i].shopName == null ? "" : list[i].shopName) + '</td>';
                    /*店铺名*/
                    view += '<td>' + getTime(list[i].registime) + '</td>';
                    /*生成时间*/
                    view += '</tr>';

                }
                $("#list").html(view);
                layui.use(['form'], function() {
                    var  form = layui.form
                    form.render();
                })
                for(var i = 0; i< list.length; i++){
                    var code = list[i].wechatQrcode
                    $(".img"+i+"").qrcode({
                        render: "canvas", //canvas方式
                        width: 88, //宽度
                        height: 88, //高度
                        text: code, //任意内容
                    });
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
function getbox(img){
    $("#img").attr("src", img);
    layer.open({
        type: 1 //此处以iframe举例
        , title: '支付宝二维码'
        , area: ['400px', '450px']
        , shade: 0
        , btnAlign: ''
        , anim: 1
        , maxmin: false
        , offset: [ //为了演示，随机坐标
            100
            ,390
        ]
        , content: $("#imgbox")
    });
}

function getimg(img){
    $("#code").html("");
    $("#code").qrcode({
        render: "canvas", //canvas方式
        width: 100, //宽度
        height: 100, //高度
        text: img, //任意内容
    });
    // 把canvas转换为image的
    var myCanvas = document.getElementsByTagName("canvas")[0];
    var src = convertCanvasToImage(myCanvas);
    function convertCanvasToImage(canvas){
        //新Image对象,可以理解为DOM;
        var image = new Image();
        //canvas.toDataURL返回的是一串Base64编码的URL,当然,浏览器自己肯定支持
        //指定格式PNG
        image.src = canvas.toDataURL("image/png");
        return image.src;
    }
    $("#img").attr("src", src);
    layer.open({
        type: 1 //此处以iframe举例
        , title: '微信二维码'
        , area: ['400px', '450px']
        , shade: 0
        , btnAlign: ''
        , anim: 1
        , maxmin: false
        , offset: [ //为了演示，随机坐标
            100
            ,390
        ]
        , content: $("#imgbox")
    });
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
                        var data = $("#codeform").serializeObject();
                        getCodeData(url, data);/*这里调用接口*/
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

function getwechat(){
    $.ajax({
        type: "POST",
        url: "/qrEq/findAllInfo",
        data: {},
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        dataType: "json",
        success:function(backData){
            var view=""
            for (var i = 0;i< backData.length; i++ ) {
                view +='<option value="'+backData[i].qrUrl+'+'+backData[i].id+'">'+backData[i].qrName+'</option>';
            }
            $("#wechat").html(view);
            layui.use(['element','form'], function() {
                var element = layui.element
                    ,form = layui.form;
                form.render();
            });
        }
    })
    var that = this;
    //多窗口模式，层叠置顶
    layer.open({
        type: 1 //此处以iframe举例
        , title: '生成二维码'
        , area: ['390px', '260px']
        , shade: 0
        , anim: 1
        , btn: ['取消', '生成']
        , maxmin: true
        , offset: [ //为了演示，随机坐标
            300
            , 390
        ]
        , content: $("#create")
        , btn1: function () {
            $("#number").val("");
            layer.closeAll();
        }
        , btn2: function () {
            var loading = layer.load();
            var data = $("#wechat").val();
            var number = $("#number").val();
            var arr = data.split("+");
            var url = arr[0];
            var value = arr[1];
            $.ajax({
                type: "POST",
                url: url+'/qrCode/createQr',
                data: {num: number, qrInfoId: value},
                xhrFields: {
                    withCredentials: true
                },
                crossDomain: true,
                success: function (backData) {
                    $.ajax({
                        type: "POST",
                        url: '/log/add',
                        data: {actionid: 42, remark: "生成二维码的公众号："+$("#wechat").val()},
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
                    getCodeData("/qrEq/findQr",{})
                    $("#number").val("");
                    layer.close(loading);
                },
                error: function () {
                    layer.msg('请求错误');
                    $("#number").val("");
                    layer.close(loading);
                }
            })
        }
    });
}

function out(){
    console.log($("#checkform").serialize());
    $.ajax({
        type: "POST",
        url: "/qrEq/createDownFile",
        data: $("#checkform").serialize(),
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        dataType: "json",
        success:function(backData){
            if(backData.code == 3){
                window.location.href = urlCode+":8090/qrEq/downQr?fileName="+backData.file;
                layer.msg(backData.msg);
            }else{
                layer.msg(backData.msg);
            }
        }
    })
}