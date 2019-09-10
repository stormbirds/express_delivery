function query(pageNum,pageSize,state,lgisticCode,shipperCode) {
    var view = "";
    $.ajax({
        type: "POST",
        url: "/app/v1/queryTrackingRecord",
        data: {pageNum:pageNum,pageSize:pageSize,state:state,lgisticCode:lgisticCode,shipperCode:shipperCode},
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        success: function(backData) {
            console.log(backData.data);
            $("#total").html(backData.data.total);
            var list = backData.data.records;
            for (var i = 0; i< list.length; i++){
                view += '<tr>';
                view += '<td>';
                view += '<a class="layui-btn-sm detail'+i+'" onmouseenter="show(\'详情\',\'.detail'+i+'\')" onmouseleave="hide()" onclick="trackingRecordDetail(\''+ list[i].id.toString() +'\')"><i class="layui-icon-log layui-icon"></i></a>';
                view += '<a class="layui-btn-sm edit'+i+'" onmouseenter="show(\'编辑\', \'.edit'+i+'\')" onmouseleave="hide()"' +
                    'onclick="editAppVersion(\''+list[i].appId+'\',\''+list[i].appName+'\',\''+list[i].versionCode+'\',' +
                    '\''+list[i].versionName+'\',\''+list[i].appUrl+'\',\''+list[i].changeLog+'\',\''+list[i].updatedAt+'\',\''+list[i].forceUpgrade+'\',\''+list[i].fileSize+'\',\''+list[i].appOs+'\')"><i class="layui-icon-set-fill layui-icon"></i></a>';
                view += '<a class="layui-btn-sm del'+i+'" onmouseenter="show(\'删除\',\'.del'+i+'\')" onmouseleave="hide()" onclick="del(\''+list[i].appId+'\')"><i class="layui-icon-close-fill layui-icon"></i></a>';

                view += '</td>';

                view += '<td>'+(list[i].logisticCode==undefined? "" :list[i].logisticCode)+'</td>'/*快递单号*/
                view += '<td>'+(list[i].shipperCode==undefined ? "" :list[i].shipperCode)+'</td>'/*快递公司编码*/
                view += '<td>'+(list[i].state==undefined ? "" :list[i].state)+'</td>';/*快递状态*/
                view += '<td>'+list[i].success+'</td>';/*快递订阅状态*/
                view += '<td>'+(list[i].estimatedDeliveryTime==undefined? "":list[i].estimatedDeliveryTime)+'</td>';/*预计送达时间*/
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

function trackingRecordDetail(logisticId){
    window.location.href = "trackingRecordDetail.html?logisticId="+logisticId ;
    // $.ajax({
    //     type: "POST",
    //     url: '/app/v1/queryTrackingTraces',
    //     data: {logisticId:logisticId},
    //     xhrFields: {
    //         withCredentials: true
    //     },
    //     crossDomain: true,
    //     dataType: "json",
    //     success: function (backData) {
    //         var code = backData.code;
    //         if (code == 1) {
    //             window.location.href = "trackingRecordDetail.html?list="+backData.data;
    //         } else {
    //             layer.msg('暂无权限');
    //         }
    //     }
    // })
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