/*异步表格获取数据的方法*/
function getShopData(url,data){
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
                    view += '<a class="layui-btn-sm detail'+i+'" onmouseenter="show(\'详情\',\'.detail'+i+'\')" onmouseleave="hide()" onclick="go(\''+list[i].id+'\')"><i class="layui-icon-log layui-icon"></i></a>';
                    view += '<a class="layui-btn-sm edit'+i+'" onmouseenter="show(\'编辑\', \'.edit'+i+'\')" onmouseleave="hide()"' +
                        'onclick="getbox(\''+list[i].id+'\',\''+list[i].pname+'\',\''+list[i].cname+'\',' +
                        '\''+list[i].areaname+'\',\''+list[i].area+'\')"><i class="layui-icon-set-fill layui-icon"></i></a>';
                    view += '<a class="layui-btn-sm coupon'+i+'" onmouseenter="show(\'优惠券\',\'.coupon'+i+'\')" onmouseleave="hide()" onclick="coupon(\''+list[i].id+'\')"><i class="layui-icon-file layui-icon"></i></a>';
                    if(list[i].eqcon == 0){
                        view += '<a class="layui-btn-sm del'+i+'" onmouseenter="show(\'删除\',\'.del'+i+'\')" onmouseleave="hide()" onclick="del(\''+list[i].id+'\',\''+list[i].code+'\')"><i class="layui-icon-close-fill layui-icon"></i></a>';
                    }else{
                        view += '';
                    }
                    view += '</td>';
                    /*view += '<td><img src="'+migUrl+list[i].sLogo+'"/></td>'; /!*id*!/*/
                    view += '<td>'+(list[i].code==undefined? "" :list[i].code)+'</td>'/*店铺编号*/
                    view += '<td>'+(list[i].sName==undefined ? "" :list[i].sName)+'</td>'/*店铺名字*/
                    view += '<td>'+(list[i].pname==undefined ? "" :list[i].pname)+(list[i].cname==undefined ? "" :list[i].cname)+(list[i].areaname==undefined ? "" :list[i].areaname)+'</td>';
                    view += '<td>'+list[i].eqcon+'</td>';
                    view += '<td>'+((list[i].arpOpenid==null ? list[i].arcOpenid :list[i].arpOpenid) || (list[i].arcOpenid==null ?list[i].araOpenid :list[i].arcOpenid) || (list[i].araOpenid==null ? list[i].arsOpenid :list[i].araOpenid) || (list[i].arsOpenid==null ? list[i].openid :list[i].arsOpnid)||(list[i].openid==undefined ? "" :list[i].openid))+'</td>';/*openid*/
                    view += '<td>'+((list[i].arpName==null ? list[i].arcName : list[i].arpName) || (list[i].arcName==null ? list[i].arName : list[i].arcName) || (list[i].arName==null ? list[i].arsName : list[i].arName) || (list[i].arsName==null ? list[i].araName : list[i].arsName) ||(list[i].araName==undefined ? "" :list[i].araName))+'</td>';/*代理名称*/
                    view += '<td>'+list[i].sPhone+'</td>';/*openid*/
                    view += '<td>'+(list[i].platExtract==undefined? 0:list[i].platExtract)+'</td>';/*openid*/
                    view += '<td>'+(list[i].provinceExtact==undefined? 0:list[i].provinceExtact)+'</td>';/*openid*/
                    view += '<td>'+(list[i].cityExtact==undefined? 0:list[i].cityExtact)+'</td>';/*openid*/
                    view += '<td>'+(list[i].areaExtact==undefined? 0:list[i].areaExtact)+'</td>';/*openid*/
                    view += '<td>'+(list[i].salesExtact==undefined? 0:list[i].salesExtact)+'</td>';/*openid*/
                    view += '<td>'+(list[i].shopExtact==undefined? 0:list[i].shopExtact)+'</td>';/*openid*/
                    view += '<td>'+(list[i].shopProfitMoney==undefined? 0:list[i].shopProfitMoney)+'</td>';/*openid*/
                     if(list[i].isblock == 1){
                         view += '<td>是</td>';
                     }else{
                         view += '<td>否</td>';
                     }                              /*是否停用*/

                    if(list[i].isquick == 1){
                        view += '<td>是</td>';
                    }else{
                        view += '<td>否</td>';  /*是否快速停用*/
                    }
                    if(list[i].isonecode == 1){
                        view += '<td>是</td>';
                    }else{
                        view += '<td>否</td>';  /*所属平台*/
                    }

                    view += '<td>'+(list[i].registtime)+'</td>';/*注册时间*/


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
/*跳到详情页*/
function go(id) {
    /*权限验证*/
    $.ajax({
        type: "POST",
        url: '/shopCenterDetails',
        data: {},
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        dataType: "json",
        success: function (backData) {
            var code = backData.code;
            if (code == 1) {
                window.location.href= "shopdetail.html?id="+id;
            } else {
                layer.msg('暂无权限');
            }
        }
    })

}
/*优惠券*/
function coupon(id){
    $.cookie('shopId',id);
    var couponBox = layer.open({
        type: 2 //此处以iframe举例
        , title: '店铺优惠券'
        , area: ['1450px', '730px']
        , shade: 0
        , btnAlign: ''
        , anim: 1
        , maxmin: true
        , offset: [ //为了演示，随机坐标
            50
            ,150
        ]
        , content: 'coupon.html'
    });
}
/*删除店铺*/
function del(id,storecode) {
    /*权限验证*/
    $.ajax({
        type: "POST",
        url: '/delstore',
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
                        url: '/rankShop/delete',
                        data: {id: id},
                        xhrFields: {
                            withCredentials: true
                        },
                        crossDomain: true,
                        dataType: "json",
                        success: function(backData) {
                            if (backData.code == 3){
                                $.ajax({
                                    type: "POST",
                                    url: '/log/add',
                                    data: {actionid: 76, remark: "删除店铺ID："+id+"店铺编号："+storecode},
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
                                getShopData('/rankShop/pages',{});
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

/*修改店铺*/
function getbox(id,pname,cname,areaname,area){
/*
    console.log(id+','+aName+','+pname+','+cname+','+areaname+','+mGroup+','+isblock+','+contactName+','+contactPhone);
*/
    /*权限验证*/
    $.ajax({
        type: "POST",
        url: '/shopCenterEdit',
        data: {},
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        dataType: "json",
        success: function (backData) {
            var code = backData.code;
            if (code == 1) {
                window.location.href = "changeshop.html?id="+id+"&pname="+pname+"&cname="+cname+"&areaname="+areaname+"&area="+area;
                /*$("#id").val(id);
                $("#sName").val(sName);
                $("#sPhone").val(sPhone);
                $("#pthisname").html(pname);
                $("#cthisname").html(cname);
                $("#areathisname").html(areaname);
                $("#sAddress").val(sAddress);
                $("#sCoordinate").val(sCoordinate);
                $("#remark").val(remark == undefined ? "":remark);
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
                    , btn: ['取消', '保存', '修改更多']
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
                                    $.ajax({
                                        type: "POST",
                                        url: '/log/add',
                                        data: {actionid: 46, remark: "修改店铺ID："+id},
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
                                    layer.msg('修改成功');
                                    getShopData('/rankShop/pages',{});
                                }else{
                                    layer.msg('修改失败');
                                }
                            }
                        })
                    },btn3: function () {
                        window.location.href = "changeshop.html?id="+id+"&pname="+pname+"&cname="+cname+"&areaname="+areaname+"&area="+area;
                    }
                });*/
            } else {
                layer.msg('暂无权限');
            }
        }
    })

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

/*异步导出方法*/
function exportData(url, data, fileType) {
    console.log('url:' + url);
    console.log('data:' + data);
    var loading = layer.load();
    var urlOrderPrefix = urlPrefix + ':8075/'
    $.ajax({
        type: "POST",
        url: url,
        data: data,
        success: function (backData) {
            console.log("backData:" + backData)
            layer.close(loading);
            if (fileType == 'pdf') {
                location.href = urlOrderPrefix + backData + '.pdf';
            }  if (fileType == 'excel') {
                location.href = urlOrderPrefix + backData + '.xlsx';
            }
        },
        error: function () {
            layer.msg('请求错误');
            layer.close(loading);
        }
    });
}