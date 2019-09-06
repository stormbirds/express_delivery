
function getAllAppArticleCategory() {

    $.ajax({
        type: "GET",
        url: "/apparticle/getAllAppArticleCategory",
        data:{},
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        dataType: "json",
        success: function(backData) {
            console.log("获取到所有分类：",backData)
            var appArticleCategorys = backData
            var categoryNum = backData.length
            var proHtml = ''
            if (categoryNum>0){
                for(var i=1; i<categoryNum+1;i++){
                    proHtml += '<option value="' + backData[i-1] + '">' + backData[i-1] + '</option>';

                }
                $("select[name=category]").append(proHtml);
            }
            return backData

        },
        error: function(){
            layer.msg('请求错误');
        }
    })
}

function filllist(backData) {
    var view = "";
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
            view += '<a class="layui-btn-sm detail'+i+'" onmouseenter="show(\'详情\',\'.detail'+i+'\')" onmouseleave="hide()" onclick="( window.location.href=\'../../apparticle/getAppArticleDetail/\' + \''+list[i].id+'\')"><i class="layui-icon-log layui-icon"></i></a>';
            view += '<a class="layui-btn-sm edit'+i+'" onmouseenter="show(\'编辑\',\'.edit'+i+'\')" onmouseleave="hide()" onclick="( window.location.href=\'../../apparticle/editAppArticleDetail/\' + \''+list[i].id+'\')"><i class="layui-icon-set-fill layui-icon"></i></a>';
            view += '<a class="layui-btn-sm del'+i+'" onmouseenter="show(\'删除\',\'.del'+i+'\')" onmouseleave="hide()" onclick="del(\''+list[i].id+'\')"><i class="layui-icon-close-fill layui-icon"></i></a>';
            view += '</td>';
            view += '<td>'+list[i].id+'</td>';
            view += '<td>'+list[i].title+'</td>';
            view += '<td>'+list[i].tags+'</td>';
            view += '<td>'+list[i].category+'</td>';
            view += '<td>'+list[i].createdAt+'</td>';
            view += '<td>'+(list[i].createdBy==undefined ? "" :list[i].createdBy)+'</td>'
            view += '<td>'+list[i].updateAt+'</td>';
            if(list[i].isOpen==0){
                view += '<td>未公开</td>';
            }else {
                view += '<td>公开</td>';
            }


            view += '</tr>';
        }
        $("#list").html(view);
    }
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
                var data = $("#agentform").serializeObject();
                data["pageNum"]=page
                getAllArticle( data);
            }
        });
        $("#pageValue").val(backData.pageNum);
    }
    layer.close(layer.load());
}

function getAllArticle(data) {
    var loading = layer.load();
    console.log(data)
    $.ajax({
        type: "GET",
        url: "/apparticle/getAllArticle",
        data:data==undefined?{}:data,
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        dataType: "json",
        success: function(backData) {

            console.log("获取到所有文章：",backData)
            filllist(backData)

        },
        error: function(){
            layer.msg('请求错误');
            layer.close(loading);
        }
    })
}
function searchArticle(data) {
    var loading = layer.load();
    console.log(data)
    $.ajax({
        type: "GET",
        url: "/apparticle/getAllArticleBySearch",
        data:data==undefined?{}:data,
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        dataType: "json",
        success: function(backData) {

            console.log("获取到所有文章：",backData)
            filllist(backData)

        },
        error: function(){
            layer.msg('请求错误');
            layer.close(loading);
        }
    })
}
var tip_index = 0;
function show(data,className){
    tip_index = layer.tips(data, className, {time: 0, tips: 1});
}
function hide(){
    layer.close(tip_index);
}
function go(id) {
    $.ajax({
        type: "GET",
        url: '/apparticle/getAppArticleDetail?id='+id,
        data: {},
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        dataType: "json",
        success: function (backData) {
            window.location.href= "detail.html?id="+id;
        }
    })

}

function del(id) {
    layer.confirm('是否确定删除？', {
        btn: ['取消','确定'] //按钮
    }, function(){
        layer.closeAll();
    }, function(){
        $.ajax({
            type: "DELETE",
            url: '/apparticle/deleteAppArticle',
            data: JSON.stringify({id:id}),
            contentType : "application/json",
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            dataType: "json",
            success: function(backData) {
                window.location.href = "index"
            }
        })
    });
}