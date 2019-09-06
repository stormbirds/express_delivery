$(function(){
    getdate()
    /*折线图*/
    var myChart;
    $.ajax({
        type: "GET",
        url: "/orderDivide/selectAgentThirtyDayRegisterCount",
        data: {},
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        success: function (backData) {

            var json = backData;
            var timelist = [];
            var store = [];/*店铺*/
            var sall = [];/*业务*/
            var area = [];/*区域*/
            var city = [];/*城市*/
            var pro = [];/*省级*/
            for (var i = 0; i< json.length; i++){

                timelist.push(json[i]['registTime']);
                if(json[i]['mGroup'] == 2){
                    store.push(json[i]['agentCount'])
                }else if(json[i]['mGroup'] == 3){
                    sall.push(json[i]['agentCount'])
                }else if(json[i]['mGroup'] == 4){
                    area.push(json[i]['agentCount'])
                }else if(json[i]['mGroup'] == 5){
                    city.push(json[i]['agentCount'])
                }else if(json[i]['mGroup'] == 6){
                    pro.push(json[i]['agentCount'])
                }
            }
            var time = timelist.slice(0,29);
            /*生成折线图*/
            myChart = echarts.init(document.getElementById('thirdData'));
            var option = {
                title: {
                    text: '近30天代理商新增数量',
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data:['店铺代理','业务代理','区域代理','市级代理','省级代理'],
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
                    data: time
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        name:'店铺代理',
                        type:'line',
                        data:store,
                        smooth: false,
                        lineStyle:{
                            color:'#e6892e'
                        },
                        itemStyle:{
                            normal:{
                                color: '#e6892e',
                                bordercolor: '#e6892e'
                            }
                        },
                        label: {
                            normal: {
                                show: true,
                                position: 'top',
                                color:'#000'
                            }
                        }
                    },
                    {
                        name:'业务代理',
                        type:'line',
                        data:sall,
                        smooth: false,
                        lineStyle:{
                            color:'#2d8048'
                        },
                        itemStyle:{
                            normal:{
                                color: '#2d8048',
                                bordercolor: '#2d8048'
                            }
                        },
                        label: {
                            normal: {
                                show: true,
                                position: 'top',
                                color:'#000'
                            }
                        }
                    },
                    {
                        name:'区域代理',
                        type:'line',
                        data:area,
                        smooth: false,
                        lineStyle:{
                            color:'#ce0a51'
                        },
                        itemStyle:{
                            normal:{
                                color: '#ce0a51',
                                bordercolor: '#ce0a51'
                            }
                        },
                        label: {
                            normal: {
                                show: true,
                                position: 'top',
                                color:'#000'
                            }
                        }
                    },
                    {
                        name:'市级代理',
                        type:'line',
                        data:city,
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
                    },
                    {
                        name:'省级代理',
                        type:'line',
                        data:pro,
                        smooth: false,
                        lineStyle:{
                            color:'#61a0a8'
                        },
                        itemStyle:{
                            normal:{
                                color: '#61a0a8',
                                bordercolor: '#61a0a8'
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
/*代理商占比*/
    var myAgent;
    $.ajax({
        type: "GET",
        url: "/memberCount/selectAgentGroupCount",
        data: {},
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        success: function (backData) {

            var list = backData;
            var store = 0;
            var sall = 0;
            var area = 0;
            var city = 0;
            var pro = 0;
            for (var i =0; i<list.length; i++){
                var mGroup = list[i].mGroup;
                if(mGroup == 2){/*店铺*/
                    store = (list[i].agentCount == undefined? 0:list[i].agentCount);
                }else if(mGroup == 3) {/*业务*/
                    sall = (list[i].agentCount == undefined? 0:list[i].agentCount);
                }else if(mGroup == 4) {/*区域*/
                    area = (list[i].agentCount == undefined? 0:list[i].agentCount);
                }else if(mGroup == 5) {/*市级*/
                    city = (list[i].agentCount == undefined? 0:list[i].agentCount);
                }else if(mGroup == 6) {/*省级*/
                    pro = (list[i].agentCount == undefined? 0:list[i].agentCount);
                }
            }
            var data = [{value: store, name: '店铺代理'}, {value: sall, name: '业务代理'}, {value: area, name: '区域代理'}, {value: city, name: '市级代理'}, {value: pro, name: '省级代理'}];
            /*生成饼状图*/
            myAgent = echarts.init(document.getElementById('angentNum'));
            var option = {
                title : {
                    text: '各级代理商占比',
                    x:'center'
                },
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    left: 'left',
                    data: ['店铺代理','业务代理','区域代理','市级代理','省级代理']
                },
                series : [
                    {
                        name: '代理商占比',
                        type: 'pie',
                        radius : '55%',
                        center: ['50%', '60%'],
                        data: data,
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            };

            myAgent.setOption(option);
            // 加上这一句即可
            window.onresize = myWechat.resize;
        }
    })
/*轮询*/
    window.setInterval(function () {
        /*折线图*/
        $.ajax({
            type: "GET",
            url: "/orderDivide/selectAgentThirtyDayRegisterCount",
            data: {},
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            success: function (backData) {

                var json = backData;
                var timelist = [];
                var store = [];/*店铺*/
                var sall = [];/*业务*/
                var area = [];/*区域*/
                var city = [];/*城市*/
                var pro = [];/*省级*/
                for (var i = 0; i< json.length; i++){

                    timelist.push(json[i]['registTime']);
                    if(json[i]['mGroup'] == 2){
                        store.push(json[i]['agentCount'])
                    }else if(json[i]['mGroup'] == 3){
                        sall.push(json[i]['agentCount'])
                    }else if(json[i]['mGroup'] == 4){
                        area.push(json[i]['agentCount'])
                    }else if(json[i]['mGroup'] == 5){
                        city.push(json[i]['agentCount'])
                    }else if(json[i]['mGroup'] == 6){
                        pro.push(json[i]['agentCount'])
                    }
                }
                var time = timelist.slice(0,29);
                if(!myChart){
                    return;
                }

                //更新数据
                var option = myChart.getOption();
                option.xAxis.data = time;
                option.series[0].data = store;
                option.series[1].data = sall;
                option.series[2].data = area;
                option.series[3].data = city;
                option.series[4].data = pro;
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


