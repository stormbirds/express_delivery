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
                    view += '<a class="layui-btn-sm change'+i+'" onmouseenter="show(\'设置权限\', \'.change'+i+'\')" onmouseleave="hide()"' +
                        'onclick="changebox('+list[i].id+')"><i class="layui-icon-survey layui-icon"></i></a>';
                    view += '<a class="layui-btn-sm edit'+i+'" onmouseenter="show(\'编辑\', \'.edit'+i+'\')" onmouseleave="hide()"' +
                        'onclick="getbox(\''+list[i].id+'\',\''+list[i].name+'\',\''+2+'\',\''+list[i].code+'\')"><i class="layui-icon-set-fill layui-icon"></i></a>';
                    view += '</td>';
                    view += '<td>'+(list[i].id==undefined? "" :list[i].id)+'</td>'/*角色id*/
                    view += '<td>'+(list[i].code==undefined ? "" :list[i].code)+'</td>'/*角色编号*/
                    view += '<td>'+(list[i].name==undefined ? "" :list[i].name)+'</td>';/*角色名称*/
                    view += '<td></td>';/*创建时间*/
                    view += '<td></td>';/*用户数量*/
                    view += '<td></td>';/*备注*/
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
/*修改或者新增角色*/
function getbox(id,name,type,code){
    /*权限验证*/
    $.ajax({
        type: "POST",
        url: '/roleManagerAddEdit',
        data: {},
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        success: function(backData) {
            var code = backData.code;
            if(code == 1){
                if(type == 1){
                    var title = '新增角色';

                }else{
                    var title = '修改角色';
                    $("#code").val(code);
                    $("#name").val(name);
                }

                layer.open({
                    type: 1 //此处以iframe举例
                    , title: title
                    , area: ['400px', '280px']
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
                        if(type == 1){
                            id = null;
                        }
                        code= $("#code").val();
                        name= $("#name").val();
                        $.ajax({
                            type: "POST",
                            url: '/permission/addrole',
                            data: {id: id,name: name,code: code,type: type},
                            xhrFields: {
                                withCredentials: true
                            },
                            crossDomain: true,
                            success: function(backData) {
                                if(type == 1){/*新增*/
                                    $.ajax({
                                        type: "POST",
                                        url: '/log/add',
                                        data: {actionid: 53, remark: "新增角色编号："+$("#code").val()},
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
                                }else{/*修改*/
                                    $.ajax({
                                        type: "POST",
                                        url: '/log/add',
                                        data: {actionid: 53, remark: "修改角色id："+id+"修改角色编号："+code},
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
                                }
                                layer.msg(backData);
                                getData('/permission/findRole',{});
                            },
                            error: function () {
                                layer.msg('请求错误')
                            }
                        })
                    }
                });
            }else{
                layer.msg('暂无权限');
            }
        },
        error: function () {
            layer.msg('请求错误')
        }
    })

}


/*查询和修改权限*/
function changebox(id){
    $("#qxid").val(id);
    /*权限验证*/
    $.ajax({
        type: 'POST',
        url: '/setAction',
        traditional:true,
        data: {},
        success: function(backData){
            var code = backData.code;
            if(code == 1){
                layui.config({
                    base: '../../js/extends/',
                }).extend({
                    authtree: 'authtree',
                });
                layui.use(['authtree','element', 'form', 'layer'], function () {
                    var authtree = layui.authtree
                        ,element = layui.element
                        ,form = layui.form
                        ,layer = layui.layer;

                    $.ajax({
                        type: 'POST',
                        url: '/permission/findActionMenu',
                        data: {id: id},
                        dataType: 'json',
                        success: function(data){
                            console.log(data);
                            // 渲染时传入渲染目标ID，树形结构数据（具体结构看样例，checked表示默认选中），以及input表单的名字
                            authtree.render('#LAY-auth-tree-index', data.data.trees, {
                                inputname: 'authids[]',
                                layfilter: 'lay-check-auth',
                                //openall: true,
                                autowidth: true,
                            });

                            /*// PS:使用 form.on() 会引起了事件冒泡延迟的BUG，需要 setTimeout()，并且无法监听全选/全不选
                            form.on('checkbox(lay-check-auth)', function(data){
                                // 注意这里：需要等待事件冒泡完成，不然获取叶子节点不准确。
                                setTimeout(function(){
                                    console.log('监听 form 触发事件数据', data);
                                    // 获取选中的叶子节点
                                    var leaf = authtree.getLeaf('#LAY-auth-tree-index');
                                    console.log('leaf', leaf);
                                    // 获取最新选中
                                    var lastChecked = authtree.getLastChecked('#LAY-auth-tree-index');
                                    console.log('lastChecked', lastChecked);
                                    // 获取最新取消
                                    var lastNotChecked = authtree.getLastNotChecked('#LAY-auth-tree-index');
                                    console.log('lastNotChecked', lastNotChecked);
                                }, 100);
                            });
                            // 使用 authtree.on() 不会有冒泡延迟
                            authtree.on('change(lay-check-auth)', function(data) {
                                console.log('监听 authtree 触发事件数据', data);
                                // 获取所有节点
                                var all = authtree.getAll('#LAY-auth-tree-index');
                                console.log('all', all);
                                // 获取所有已选中节点
                                var checked = authtree.getChecked('#LAY-auth-tree-index');
                                console.log('checked', checked);
                                // 获取所有未选中节点
                                var notchecked = authtree.getNotChecked('#LAY-auth-tree-index');
                                console.log('notchecked', notchecked);
                                // 获取选中的叶子节点
                                var leaf = authtree.getLeaf('#LAY-auth-tree-index');
                                console.log('leaf', leaf);
                                // 获取最新选中
                                var lastChecked = authtree.getLastChecked('#LAY-auth-tree-index');
                                console.log('lastChecked', lastChecked);
                                // 获取最新取消
                                var lastNotChecked = authtree.getLastNotChecked('#LAY-auth-tree-index');
                                console.log('lastNotChecked', lastNotChecked);
                            });
                            authtree.on('deptChange(lay-check-auth)', function(data) {
                                console.log('监听到显示层数改变',data);
                            });*/
                        }
                    });
                    layer.open({
                        type: 1 //此处以iframe举例
                        , title: '设置权限'
                        , area: ['400px', '650px']
                        , shade: 0
                        , btnAlign: ''
                        , anim: 1
                        , btn: ['取消','重置','全选','保存']
                        , maxmin: true
                        , offset: [ //为了演示，随机坐标
                            100
                            ,390
                        ]
                        , content: $("#changeqx")
                        , btn1:function () {
                            layer.closeAll();
                        }
                        , btn2:function(){
                            uncheckAll('#LAY-auth-tree-index')
                            return false;
                        }
                        , btn3:function(){
                            checkAll('#LAY-auth-tree-index')
                            return false;
                        }
                        , btn4: function () {
                            var authids = authtree.getChecked('#LAY-auth-tree-index');
                            /*obj.field.authids = authids*/;

                            $.ajax({
                                type: 'POST',
                                url: '/permission/addRoleResource',
                                traditional:true,
                                data: {actionId: authids, id:id},
                                success: function(res){
                                    $.ajax({
                                        type: "POST",
                                        url: '/log/add',
                                        data: {actionid: 54, remark: "修改权限的角色id："+id},
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
                                    layer.msg(res);
                                },
                                error: function(){
                                    layer.msg("请求错误");
                                }
                            });
                        }
                    });



                })
            }else{
                layer.msg('暂无权限');
            }
        },
        error: function(){
            layer.msg("请求错误");
        }
    });



}
/*重置方法*/
function uncheckAll(dst){
    layui.use(['jquery', 'layer', 'authtree'], function(){
        var layer = layui.layer;
        var authtree = layui.authtree;

        authtree.uncheckAll(dst);
    });
}
/*全选方法*/
function checkAll(dst){
    layui.use(['jquery', 'layer', 'authtree'], function(){
        var layer = layui.layer;
        var authtree = layui.authtree;

        authtree.checkAll(dst);
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
