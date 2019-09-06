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
            $("#total1").html((backData.data.total==undefined?0:backData.data.total));
            if(list==undefined || list.length == 0){
                $("#list").html('');
                $("#nullTip1").show();
                $("#nullTip1").html('暂无数据');
            }else {
                $("#nullTip").hide();
                for (var i = 0; i< list.length; i++){
                    view += '<tr>';
                    view += '<td>';
                    if(list[i].state == 1){
                        view += '<input type="checkbox" name="id" lay-skin="primary" value="' + list[i].eqCode + '">';
                    }else{
                        view += '';
                    }
                    view += '</td>';
                    view += '<td>'+list[i].id+'</td>';/*ID*/
                    view += '<td>'+list[i].eqCode+'</td>';/*设备编号*/
                    view += '<td>'+(list[i].shopName==null?'':list[i].shopName)+'</td>';/*所属店铺名*/
                    view += '<td>'+(list[i].shopCode==null?'':list[i].shopCode)+'</td>';/*所属店铺编号*/
                    view += '</tr>';

                }
                $("#binddevicelist").html(view);
                layui.use(['form'], function() {
                    var  form = layui.form
                    form.render();
                })
            }
            if(backData.data.pages == 0) {
                $(".pageBox").hide();
            }else {
                $(".pageBox").show();
                $("#page1").Page({
                    totalPages: backData.data.pages,//分页总数
                    liNums: 7,//分页的数字按钮数(建议取奇数)
                    activeClass: 'activP', //active 类样式定义
                    pageNum: backData.data.pageNum,
                    callBack: function (page) {
                        $("#pageNum1").val(page);
                        console.log(page)
                        var data = $("#deviceform").serializeObject();
                        getDeviceData(url, data);/*这里调用接口*/
                    }
                });
                $("#pageValue1").val(backData.data.pageNum);
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



