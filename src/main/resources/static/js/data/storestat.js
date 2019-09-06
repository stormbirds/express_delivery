$(function(){
    getdate()
    getStore('/orderDivide/selectShopThirtyDayDivide',1);
    getpage('/orderDivide/selectShopThirtyDayDivide');
    /*折线图*/
    var myChart;
    $.ajax({
        type: "GET",
        url: "/orderDivide/selectShopCountThirtyDayAll",
        data: {},
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        success: function (backData) {

            var json = backData;
            var keylist = [];
            var all = [];
            for (var i = 0; i< json.length; i++){

                keylist.push(json[i]['diTime']);
                all.push(json[i]['shopCount']);
            }
            console.log(all);
            /*生成折线图*/
            myChart = echarts.init(document.getElementById('thirdData'));
            var option = {
                title: {
                    text: '近30天店铺每日新增数量',
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data:['新增数量'],
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                calculable : true,
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: keylist
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        name:'新增数量',
                        type:'line',
                        data:all,
                        smooth: false,
                        lineStyle:{
                            color:'#7cb5ec'
                        },
                        itemStyle:{
                            normal:{
                                color: '#7cb5ec',
                                bordercolor: '#7cb5ec'
                            }
                        },
                        label: {
                            normal: {
                                show: true,
                                position: 'top',
                                color:'#000'
                            }
                        }
                    }
                ]
            };
            myChart.setOption(option);
            // 加上这一句即可
            window.onresize = myChart.resize;
        }
    })


    window.setInterval(function () {
        /*折线图*/
        $.ajax({
            type: "GET",
            url: "/orderDivide/selectShopCountThirtyDayAll",
            data: {},
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            success: function (backData) {

                var json = backData;
                var keylist = [];
                var all = [];
                for (var i = 0; i< json.length; i++){
                    keylist.push(json[i]['diTime']);
                    all.push(json[i]['shopCount']);
                }
                if(!myChart){
                    return;
                }

                //更新数据
                var option = myChart.getOption();
                option.xAxis.data = keylist;
                option.series[0].data = all;
                myChart.setOption(option);
            }
        })
        getdate();
    },30000);

})

function getStore(url,page){
    var deviceChart
    /*柱状图*/
    $.ajax({
        type: "GET",
        url: url,
        data: {pageNum: page, pageSize: 10},
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        success: function (backData) {

            var json = backData.list;
            var keylist = [];
            var count = [];
            for (var i = 0; i< json.length; i++){

                keylist.push(json[i]['shopName']);
                count.push(json[i]['diCountMoney']);
            }
            //定义数组
            var klen = keylist.length;
            var keylistNew = $.map(keylist, function (v, i) {// map方法匿名函数传的值v是值、i是索引。
                return keylist[klen - 1 - i];
            });
            var clen = count.length;
            var countNew = $.map(count, function (v, i) {// map方法匿名函数传的值v是值、i是索引。
                return count[clen - 1 - i];
            });
            /*生成折线图*/
            deviceChart = echarts.init(document.getElementById('allfall'));
            var option = {
                title:{
                    text:'单月内店铺收入排行'
                },
                color: ['#3398DB'],
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                legend: {
                    data: []
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    type: 'value',
                    boundaryGap: [0, 0.01]
                },
                yAxis: {
                    type: 'category',
                    data: keylistNew
                },
                series: [
                    {
                        name: '店铺收入',
                        type: 'bar',
                        data: countNew
                    }
                ]
            };

            deviceChart.setOption(option);
            // 加上这一句即可
            window.onresize = deviceChart.resize;
        }
    })
}

function getdate(){
    var date=new Date();
    var year=date.getFullYear(); //获取当前年份
    var mon=date.getMonth()+1; //获取当前月份
    var da=date.getDate(); //获取当前日
    var day=date.getDay(); //获取当前星期几
    var h=date.getHours(); //获取小时
    var m=date.getMinutes(); //获取分钟
    var s=date.getSeconds(); //获取秒
    $("#date").html(year+'年'+mon+'月'+da+'日 '+getzf(h)+':'+getzf(m)+':'+getzf(s));
}

function getpage(url) {
    $.ajax({
        type: "GET",
        url: url,
        data:{pageNum:1, pageSize:10},
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        dataType: "json",
        success: function(backData) {
            console.log(backData)
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
                        getStore(url, page);/*这里调用接口*/
                    }
                });
                $("#pageValue").val(backData.pageNum);
            }
        },
        error: function () {
            layer.msg("请求错误");
        }
    })
}

