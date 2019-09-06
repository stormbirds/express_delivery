function getAll(){
    var loading = layer.load();
    var view = "";
    $.ajax({
        type: "GET",
        url: "/appversion/getall",
        data:{},
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        dataType: "json",
        success: function(backData) {
            console.log(backData);
            var list = backData.list;
            $("#total").html(backData.total);
            if(list.length ==0){
                $("#list").html('');
                $("#nullTip").show();
                $("#nullTip").html('暂无数据');
            }else {
                $("#nullTip").hide();
                for (var i = 0; i< list.length; i++){
                    var appId = list[i].appId
                    var appName = list[i].appName
                    var versionCode = list[i].versionCode
                    var versionName = list[i].versionName
                    var appUrl = list[i].appUrl
                    var changeLog = list[i].changeLog
                    var updatedAt = list[i].updatedAt
                    var forceUpgrade = list[i].forceUpgrade
                    var fileSize = list[i].fileSize
                    var appOs = list[i].appOs
                    view += '<tr>';
                    view += '<td>';
                    view += '<a class="layui-btn-sm detail'+i+'" onmouseenter="show(\'详情\',\'.detail'+i+'\')" onmouseleave="hide()" onclick="appVersionDetail(\''+appId+'\',\''+appName+'\',\''+versionCode+'\',\''+versionName+'\',\''+appUrl+'\',\''+changeLog+'\',\''+updatedAt+'\',\''+forceUpgrade+'\',\''+fileSize+'\',\''+appOs+'\')"><i class="layui-icon-log layui-icon"></i></a>';
                    view += '<a class="layui-btn-sm edit'+i+'" onmouseenter="show(\'编辑\', \'.edit'+i+'\')" onmouseleave="hide()"' +
                        'onclick="editAppVersion(\''+list[i].appId+'\',\''+list[i].appName+'\',\''+list[i].versionCode+'\',' +
                        '\''+list[i].versionName+'\',\''+list[i].appUrl+'\',\''+list[i].changeLog+'\',\''+list[i].updatedAt+'\',\''+list[i].forceUpgrade+'\',\''+list[i].fileSize+'\',\''+list[i].appOs+'\')"><i class="layui-icon-set-fill layui-icon"></i></a>';
                    view += '<a class="layui-btn-sm del'+i+'" onmouseenter="show(\'删除\',\'.del'+i+'\')" onmouseleave="hide()" onclick="del(\''+list[i].appId+'\')"><i class="layui-icon-close-fill layui-icon"></i></a>';

                    view += '</td>';

                    view += '<td>'+(list[i].appId==undefined? "" :list[i].appId)+'</td>'/*店铺编号*/
                    view += '<td>'+(list[i].appName==undefined ? "" :list[i].appName)+'</td>'/*店铺名字*/
                    view += '<td>'+(list[i].versionCode==undefined ? "" :list[i].versionCode)+'</td>';
                    view += '<td>'+list[i].versionName+'</td>';/*openid*/
                    view += '<td>'+(list[i].appUrl==undefined? "":list[i].appUrl)+'</td>';/*openid*/
                    view += '<td>'+(list[i].changeLog==undefined? "":list[i].changeLog)+'</td>';/*openid*/
                    view += '<td>'+(list[i].updatedAt==undefined? "":list[i].updatedAt)+'</td>';/*openid*/
                    view += '<td>'+(list[i].forceUpgrade==undefined? 0:list[i].forceUpgrade)+'</td>';/*openid*/
                    view += '<td>'+(list[i].fileSize==undefined? 0:list[i].fileSize)+'</td>';/*openid*/
                    view += '<td>'+(list[i].appOs==undefined? 0:list[i].appOs)+'</td>';/*openid*/
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
function appVersionDetail(appId,appName,versionCode,versionName,appUrl,changeLog,updatedAt,forceUpgrade,fileSize,appOs) {
    $.ajax({
        type: "POST",
        url: '/appVersionEdit',
        data: {},
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        dataType: "json",
        success: function (backData) {
            var code = backData.code;
            if (code == 1) {
                window.location.href = "appversiondetail.html?appId="+appId+"&appName="+appName+"&versionCode="+versionCode+"&versionName="+versionName+"&appUrl="+appUrl+"&changeLog="+changeLog+"&updatedAt="+updatedAt+"&forceUpgrade="+forceUpgrade+"&fileSize="+fileSize+"&appOs="+appOs;
            } else {
                layer.msg('暂无权限');
            }
        }
    })
}
function editAppVersion(appId,appName,versionCode,versionName,appUrl,changeLog,updatedAt,forceUpgrade,fileSize,appOs) {
    $.ajax({
        type: "POST",
        url: '/appVersionEdit',
        data: {},
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        dataType: "json",
        success: function (backData) {
            var code = backData.code;
            if (code == 1) {
                window.location.href = "editappversion.html?appId="+appId+"&appName="+appName+"&versionCode="+versionCode+"&versionName="+versionName+"&appUrl="+appUrl+"&changeLog="+changeLog+"&updatedAt="+updatedAt+"&forceUpgrade="+forceUpgrade+"&fileSize="+fileSize+"&appOs="+appOs;
            } else {
                layer.msg('暂无权限');
            }
        }
    })
}

function del(id) {
    console.log("传入参数 ",id)
    if(window.confirm('确定？')){
        $.ajax({
            type: "DELETE",
            url: '/appversion/delApp',
            data: JSON.stringify({id:id}),
            contentType : "application/json",
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            dataType: "json",
            success: function (backData) {
                window.location.href = "index"
            }
        })
        return true;
    }else{
        //alert("取消");
        return false;
    }

}