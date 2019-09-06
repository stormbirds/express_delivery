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
            var list = backData.data.list;
            $("#total").html(backData.data.total);
            if(list.length ==0){
                $("#list").html('');
                $("#nullTip").show();
                $("#nullTip").html('暂无数据');
            }else {
                $("#nullTip").hide();
                for (var i = 0; i< list.length; i++){
                    view += '<tr>';
                    /*view += '<td>';
                    view += '<a class="layui-btn-sm edit'+i+'" onmouseenter="show(\'编辑\', \'.edit'+i+'\')" onmouseleave="hide()"' +
                        'onclick="getbox(\''+list[i].openid+'\',\''+list[i].realName+'\',\''+list[i].accountName+'\',\''+list[i].role+'\',\''+list[i].roleId+'\',\''+list[i].department+'\',\''+list[i].departmentId+'\',\''+list[i].phone+'\',\''+list[i].email+'\',\''+list[i].id+'\',\''+list[i].statue+'\',\''+2+'\')"><i class="layui-icon-set-fill layui-icon"></i></a>';
                    view += '</td>';*/
                    view += '<td>'+(list[i].syscont==undefined ? "" :list[i].syscont)+'</td>';
                    view += '<td></td>';
                    view += '<td></td>';
                    view += '<td>'+(list[i].optime==undefined ? "" :list[i].optime)+'</td>';
                    view += '<td>'+(list[i].mname==undefined? "" :list[i].mname)+'</td>';
                    view += '<td>'+(list[i].aname==undefined? "" :list[i].aname)+'</td>';
                    view += '<td>'+(list[i].content==undefined ? "" :list[i].content)+'</td>';
                    if(list[i].ident == 1){
                        view += '<td>系统后台</td>';
                    }else{
                        view += '<td>代理商后台</td>';
                    }
                    /*view += '<td>'+(list[i].arcont==undefined ? "" :list[i].arcont)+'</td>';
                    view += '<td>'+(list[i].arname==undefined ? "" :list[i].arname)+'</td>';
                    view += '<td>'+(list[i].oid==undefined ? "" :list[i].oid)+'</td>';*/
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

/*获取功能列表*/
$.ajax({
    type: "POST",
    url: "/permission/findActionOfModule",
    data: {},
    xhrFields: {
        withCredentials: true
    },
    crossDomain: true,
    dataType: "json",
    success:function(backData){
        var list  = backData;
        var view=""
        view += '<option value="">全部</option>';
        for (var i = 0;i< list.length; i++ ) {
            view +='<option value="'+list[i].id+'">'+list[i].name+'</option>';
        }
        $("#actionId").html(view);
        layui.use(['element','form'], function() {
            var element = layui.element
                ,form = layui.form;
            form.render();
        });
    }
})

/*获取用户信息分页*/
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
                        var data = $("#userpartform").serializeObject();
                        getData(url, data);
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
