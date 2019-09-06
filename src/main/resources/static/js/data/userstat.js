$(function(){
    getdate()
    /*折线图*/
    var myChart;
    $.ajax({
        type: "GET",
        url: "/memberCount/selectMemberThirtyDayMemberDay",
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

                keylist.push(json[i]['registTime']);
                all.push(json[i]['mCount'] == null ? 0: json[i]['mCount']);
            }
            /*生成折线图*/
            myChart = echarts.init(document.getElementById('thirdData'));
            var option = {
                title: {
                    text: '近30天用户每日新增数量',
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data:['新增用户数量'],
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

    var myWechat;
    var myAlipay
    $.ajax({
        type: "GET",
        url: "/memberCount/selectMemberCountByTypeAndSexGroup",
        data: {},
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        success: function (backData) {

            var list = backData;
            var woth = 0;
            var wman = 0;
            var wwoman = 0;
            var aoth = 0;
            var aman = 0;
            var awoman = 0;
            for (var i =0; i<list.length; i++){
                var sex = list[i].sex;
                var mType = list[i].mType;
                if(sex == 0 && mType == 1){/*微信其他*/
                    woth = (list[i].mCount == undefined? 0:list[i].mCount);

                }else if(sex == 1 && mType == 1) {/*微信男*/
                    wman = (list[i].mCount == undefined? 0:list[i].mCount);

                }else if(sex == 2 && mType == 1) {/*微信女*/
                    wwoman = (list[i].mCount == undefined? 0:list[i].mCount);

                }else if(sex == 0 && mType == 2) {/*支付宝其他*/
                    aoth = (list[i].mCount == undefined? 0:list[i].mCount);

                }else if(sex == 1 && mType == 2) {/*支付宝男*/
                    aman = (list[i].mCount == undefined? 0:list[i].mCount);

                }else if(sex == 2 && mType == 2) {/*支付宝女*/
                    awoman = (list[i].mCount == undefined? 0:list[i].mCount);

                }
            }
            var data = [{value: wman, name: '男性'}, {value: wwoman, name: '女性'}];
            var data2 = [{value: aman, name: '男性'}, {value: awoman, name: '女性'}, {value: aoth, name: '其他'}];
            /*生成饼状图*/
            myWechat = echarts.init(document.getElementById('wechat'));
            myAlipay = echarts.init(document.getElementById('alipay'));
            var option = {
                title : {
                    text: '微信用户男女占比',
                    x:'left'
                },
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    x : 'center',
                    y : 'bottom',
                    data:['男性','女性']
                },
                toolbox: {
                    show : true,
                    feature : {
                        mark : {show: true},
                        dataView : {show: true, readOnly: false},
                        magicType : {
                            show: true,
                            type: ['pie', 'funnel']
                        },
                        restore : {show: true},
                        saveAsImage : {show: true}
                    }
                },
                calculable : true,
                series : [
                    {
                        name:'微信用户',
                        type:'pie',
                        radius : [20, 110],
                        center : ['25%', '50%'],
                        roseType : 'radius',
                        x: 'center',
                        label: {
                            normal: {
                                show: true
                            },
                            emphasis: {
                                show: true
                            }
                        },
                        lableLine: {
                            normal: {
                                show: true
                            },
                            emphasis: {
                                show: true
                            }
                        },
                        data: data
                    }
                ]
            };

            var option2 = {
                title : {
                    text: '支付宝用户男女占比',
                    x:'left'
                },
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    x : 'center',
                    y : 'bottom',
                    data:['男性','女性','其他']
                },
                toolbox: {
                    show : true,
                    feature : {
                        mark : {show: true},
                        dataView : {show: true, readOnly: false},
                        magicType : {
                            show: true,
                            type: ['pie', 'funnel']
                        },
                        restore : {show: true},
                        saveAsImage : {show: true}
                    }
                },
                calculable : true,
                series : [
                    {
                        name:'支付宝用户',
                        type:'pie',
                        radius : [20, 110],
                        center : ['25%', '50%'],
                        roseType : 'radius',
                        label: {
                            normal: {
                                show: true
                            },
                            emphasis: {
                                show: true
                            }
                        },
                        lableLine: {
                            normal: {
                                show: true
                            },
                            emphasis: {
                                show: true
                            }
                        },
                        data: data2
                    }
                ]
            };
            myWechat.setOption(option);
            // 加上这一句即可
            window.onresize = myWechat.resize;
            myAlipay.setOption(option2);
            // 加上这一句即可
            window.onresize = myAlipay.resize;
        }
    })

    var deviceChart
    /*柱状图*/
    $.ajax({
        type: "GET",
        url: '/memberCount/selectMemberCountHour',
        data: {},
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        success: function (backData) {

            var json = backData;
            var count = [];
            for (var i = 0; i< json.length; i++){
                count.push(json[i]['hourCount']);
            }

            /*生成折线图*/
            deviceChart = echarts.init(document.getElementById('user'));
            var option = {
                title:{
                    text:'用户租借时长统计'
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
                    data: ['1h以下','1h-2h','2h-4h','4h-6h','6h-8h','8h以上']
                },
                series: [
                    {
                        name: '用户人数',
                        type: 'bar',
                        data: count
                    }
                ]
            };
            deviceChart.setOption(option);
            // 加上这一句即可
            window.onresize = deviceChart.resize;
        }
    })


    window.setInterval(function () {
        /*折线图*/
        $.ajax({
            type: "GET",
            url: "/memberCount/selectMemberThirtyDayMemberDay",
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
                    keylist.push(json[i]['registTime']);
                    all.push(json[i]['mCount'] == null ? 0: json[i]['mCount']);
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


