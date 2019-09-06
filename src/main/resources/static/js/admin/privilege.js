/*异步表格获取数据的方法*/
function getData(url,data){
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
                    view += '<a class="layui-btn-sm edit'+i+'" onmouseenter="show(\'编辑\', \'.edit'+i+'\')" onmouseleave="hide()"' +
                        'onclick="getbox('+list[i].name+','+list[i].manger+')"><i class="layui-icon-set-fill layui-icon"></i></a>';
                    view += '</td>';
                    /*view += '<td><img src="'+migUrl+list[i].sLogo+'"/></td>'; /!*id*!/*/
                    view += '<td>'+(list[i].code==undefined? "" :list[i].code)+'</td>'/*店铺编号*/
                    view += '<td>'+(list[i].sName==undefined ? "" :list[i].sName)+'</td>'/*店铺名字*/
                    view += '<td>'+getTime(list[i].registtime)+'</td>';/*注册时间*/
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
function getbox(id,sName){
/*
    console.log(id+','+aName+','+pname+','+cname+','+areaname+','+mGroup+','+isblock+','+contactName+','+contactPhone);
*/
    $("#id").val(id);
    $("#sName").val(sName);
    $("#sPhone").val(sPhone);
    $("#pthisname").html(pname);
    $("#cthisname").html(cname);
    $("#areathisname").html(areaname);
    $("#sAddress").val(sAddress);
    $("#sCoordinate").val(sCoordinate);
    $("#remark").val(remark);
    $('[name=isblock]').each(function(i,item){
        if($(item).val()==isblock){
            $(item).prop('checked',true);
            layui.use('form',function(){
                var form = layui.form;
                form.render();
            });
        }
    });
    $('[name=isquick]').each(function(i,item){
        if($(item).val()==isquick){
            $(item).prop('checked',true);
            layui.use('form',function(){
                var form = layui.form;
                form.render();
            });
        }
    });

    layer.open({
        type: 1 //此处以iframe举例
        , title: '修改店铺'
        , area: ['800px', '450px']
        , shade: 0
        , btnAlign: ''
        , anim: 1
        , btn: ['取消', '保存']
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
                url: '/rankShop/update',
                data: data,
                xhrFields: {
                    withCredentials: true
                },
                crossDomain: true,
                dataType: "json",
                success: function(backData) {
                    console.log(backData);
                    if (backData == 1){
                        layer.msg('修改成功');
                        getShopData('/rankShop/pages',{});
                    }else{
                        layer.msg('修改失败');
                    }
                }
            })
        },btn3: function () {
            window.location.href = "changeshop.html?id="+id+"&pname="+pname+"&cname="+cname+"&areaname="+areaname;
        }
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
                        var data = $("#shopform").serializeObject();
                        getShopData(url, data);
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
