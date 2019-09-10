// function queryExpressTracking(pageNum, pageSize, platformId, platformOrderId, itemTitle, receiverName,
//                               receiverPhone, receiverProvince, receiverCity, receiverArea, receiverAddress,
//                               itemNum, trackingNo, shipperCode, trackingStatus,logisticStatus) {
function queryExpressTracking(data) {
    var view = "";
    $.ajax({
        type: "POST",
        url: "/app/v1/queryExpressTrackingRecord",
        data: data,
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        success: function(backData) {
            console.log(backData);
            $("#total").html(backData.data.total);
            var list = backData.data.records;
            for (var i = 0; i< list.length; i++){
                view += '<tr>';
                view += '<td>';
                view += '<a class="layui-btn-sm detail'+i+'" onmouseenter="show(\'详情\',\'.detail'+i+'\')" onmouseleave="hide()" onclick="appVersionDetail(\'\')"><i class="layui-icon-log layui-icon"></i></a>';
                view += '<a class="layui-btn-sm edit'+i+'" onmouseenter="show(\'编辑\', \'.edit'+i+'\')" onmouseleave="hide()"' +
                    'onclick="editAppVersion(\''+list[i].appId+'\',\''+list[i].appName+'\',\''+list[i].versionCode+'\',' +
                    '\''+list[i].versionName+'\',\''+list[i].appUrl+'\',\''+list[i].changeLog+'\',\''+list[i].updatedAt+'\',\''+list[i].forceUpgrade+'\',\''+list[i].fileSize+'\',\''+list[i].appOs+'\')"><i class="layui-icon-set-fill layui-icon"></i></a>';
                view += '<a class="layui-btn-sm del'+i+'" onmouseenter="show(\'删除\',\'.del'+i+'\')" onmouseleave="hide()" onclick="del(\''+list[i].appId+'\')"><i class="layui-icon-close-fill layui-icon"></i></a>';

                view += '</td>';

                view += '<td>'+(list[i].platformOrderId==undefined? "" :list[i].platformOrderId)+'</td>'/*发货单号*/
                view += '<td>'+(list[i].itemTitle==undefined ? "" :list[i].itemTitle)+'</td>'/*物品名称*/
                view += '<td>'+(list[i].receiverName==undefined ? "" :list[i].receiverName)+'</td>';/*收货人姓名*/
                view += '<td>'+list[i].receiverPhone+'</td>';/*收货人电话*/
                view += '<td>'+(list[i].receiverProvince==undefined? "":list[i].receiverProvince)+'</td>';/*收货人省份*/
                view += '<td>'+(list[i].receiverCity==undefined ? "" :list[i].receiverCity)+'</td>';/*收货人城市*/
                view += '<td>'+(list[i].receiverArea==undefined ? "" :list[i].receiverArea)+'</td>';/*收货人地区*/
                view += '<td>'+(list[i].receiverAddress==undefined ? "" :list[i].receiverAddress)+'</td>';/*详细收货地址*/
                view += '<td>'+(list[i].itemNum==undefined ? "" :list[i].itemNum)+'</td>';/*物品个数*/
                view += '<td>'+(list[i].trackingNo==undefined ? "" :list[i].trackingNo)+'</td>';/*物流编号*/
                view += '<td>'+(list[i].shipperCode==undefined ? "" :list[i].shipperCode)+'</td>';/*物流公司代码*/
                view += '<td>'+(list[i].trackingStatus==undefined ? "" :list[i].trackingStatus)+'</td>';/*追踪状态*/
                view += '<td>'+(list[i].logisticStatus==undefined ? "" :list[i].logisticStatus)+'</td>';/*快递状态*/
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
                    pageNum: backData.data.current,
                    callBack: function (page) {
                        $("#pageNum").val(page);
                        var data = $("#agentform").serializeObject();
                        data["pageNum"]=page
                        getAllArticle( data);
                    }
                });
                $("#pageValue").val(backData.data.current);
            }
        },
        error: function(){
            layer.msg('请求错误');
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

/*序列化转json*/
$.fn.serializeObject = function() {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name]) {
            if (!o[this.name].push) {
                o[this.name] = [ o[this.name] ];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
}