$(document).ready(function () {
    toPage();
});

//分页参数设置 这些全局变量关系到分页的功能
var startAllAppoint = 0;
var limitAllAppoint = 10;
var currentPageAllAppoint = 1;
var totalPageAllAppoint = 0;
var dataLength = 0;

//ajax请求后台数据
function getShopCustomerManagePageInfo(id, url) {
    $.ajax({
        type: "post",
        async: false,
        url: url,
        data: {start: startAllAppoint, limit: limitAllAppoint},
        success: function (data, status) {
            data = eval("(" + data + ")");
            getShopCustomesInfo(data.root, id);
            startAllAppoint = data.currentResult;//当前页数(后台返回)
            totalPageAllAppoint = data.totalPage;//总页数(后台返回)

        }
    });

}


function getShopCustomesInfo(data, id) {
    var s = "<tr><th>姓名</th><th>性别</th><th>电话</th><th>备案楼盘</th><th>已成交</th><th>归属经纪人</th><th>添加时间</th></tr>";
    $.each(data, function (v, o) {
        s += '<tr><td>' + o.cusName + '</td>';
        s += '<td>' + o.cusSex + '</td>';
        s += '<td>' + o.phone + '</td>';
        s += '<td>' + o.records + '</td>';
        s += '<td>' + o.alreadyDeal + '</td>';
        s += '<td>' + o.theMedi + '</td>';
        s += '<td>' + o.addTime + '</td></tr>';
    });

    if (data.length > 0) {
        $("#" + id).html(s);
    } else {
        $("#page1").hide();
        $("#" + id).html("<br/><span style='width:10%;height:30px;display:block;margin:0 auto;'>暂无数据</span>");
    }


}


function toPage() {

    layui.use(['form', 'laypage', 'layedit', 'layer', 'laydate'], function () {
        var form = layui.form(),
            layer = layui.layer,
            layedit = layui.layedit,
            laydate = layui.laydate,
            laypage = layui.laypage;

        var nums = 10;
        //调用分页
        laypage({
            elem: 'paged'
            , pages: totalPageAllAppoint //得到总页数，在layui2.X中使用count替代了，并且不是使用"总页数"，而是"总记录条数"
            , curr: currentPageAllAppoint
            , skip: true
            , jump: function (obj, first) {

                currentPageAllAppoint = obj.curr;
                startAllAppoint = (obj.curr - 1) * limitAllAppoint;
                //document.getElementById('biuuu_city_list').innerHTML = render(obj, obj.curr);
                if (!first) { //一定要加此判断，否则初始时会无限刷新
                    getShopCustomerManagePageInfo();//一定要把翻页的ajax请求放到这里，不然会请求两次。
                    //location.href = '?page='+obj.curr;
                }
            }
        });


    });
};