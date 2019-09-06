$(function(){
    getdate()
    getPledge();
    /*折线图*/
    var myChart;
    $.ajax({
        type: "GET",
        url: "/equipInfoStatement/selectEquipInfoThirtyDayCount",
        data: {},
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        success: function (backData) {

            var json = backData;
            var keylist = [];
            var five = [];
            var ten = [];
            for (var i = 0; i< json.length; i++){
                if(json[i]['cardNum'] == 5){
                    five.push(json[i]['memberCount']==null? 0:json[i]['memberCount']);
                    keylist.push(json[i]['dayNum']);
                }else{
                    ten.push(json[i]['memberCount']==null? 0:json[i]['memberCount']);
                }
            }
            /*生成折线图*/
            myChart = echarts.init(document.getElementById('thirdData'));
            var option = {
                title: {
                    text: '近30天设备在线人数',
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data:['五口人数','十口人数'],
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
                        name:'五口',
                        type:'line',
                        data:five,
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
                        name:'十口',
                        type:'line',
                        data:ten,
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
            url: "/equipInfoStatement/selectEquipInfoThirtyDayCount",
            data: {},
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            success: function (backData) {
                var json = backData;
                var keylist = [];
                var five = [];
                var ten = [];
                for (var i = 0; i< json.length; i++){
                    if(json[i]['cardNum'] == 5){
                        five.push(json[i]['memberCount']==null? 0:json[i]['memberCount']);
                        keylist.push(json[i]['dayNum']);
                    }else{
                        ten.push(json[i]['memberCount']==null? 0:json[i]['memberCount']);
                    }
                }
                if(!myChart){
                    return;
                }

                //更新数据
                var option = myChart.getOption();
                option.xAxis.data = keylist;
                option.series[0].data = five;
                option.series[1].data = ten;
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

function getPledge(){
    var myAllpie;
    var myOnlinepie;
    $.ajax({
        type: "GET",
        url: "/equipInfoStatement/selectEquipTypeAndStatusCount",
        data: {},
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        success: function (backData) {
            var list = backData;
            var fiveonline = 0;
            var fiveoffline = 0;

            var tenonline = 0;
            var tenoffline = 0;

            var tableonline = 0;
            var tableoffline = 0;

            var ledonline = 0;
            var ledoffline = 0;

            var passonline = 0;
            var passoffline = 0;

            for (var i= 0; i<list.length; i++){
                var cardNum = list[i].cardNum;/*卡口数*/
                var state = list[i].state;/*状态*/
                if(cardNum == 5 && state == 1){/*五口在线*/
                    fiveonline = (list[i].countNum == undefined? 0:list[i].countNum);

                }else if(cardNum == 5 && state == 2) {/*五口离线*/
                    fiveoffline = (list[i].countNum == undefined? 0:list[i].countNum);

                }else if(cardNum == 10 && state == 1) {/*十口在线*/
                    tenonline = (list[i].countNum == undefined? 0:list[i].countNum);

                }else if(cardNum == 10 && state == 2) {/*十口离线*/
                    tenoffline = (list[i].countNum == undefined? 0:list[i].countNum);

                }
            }

            $("#fiveall").html((fiveonline+fiveoffline));
            $("#tenall").html((tenonline+tenonline));
            $("#tableall").html((tableonline+tableoffline));
            $("#ledall").html((ledonline+ledoffline));
            $("#passall").html((passonline+passoffline));
            $("#fiveonline").html(fiveonline);
            $("#fiveoffline").html(fiveoffline);
            $("#tenonline").html(tenonline);
            $("#tenoffline").html(tenoffline);
            $("#tableonline").html(tableonline);
            $("#tableoffline").html(tableoffline);
            $("#ledonline").html(ledonline);
            $("#ledoffline").html(ledoffline);
            $("#passonline").html(passonline);
            $("#passoffline").html(passoffline);

            var alldata = [
                {value:(fiveonline+fiveoffline), name:'五口'},
                {value:(tenonline+tenonline), name:'十口'},
                {value:(tableonline+tableoffline), name:'桌面'},
                {value:(ledonline+ledoffline), name:'十口LED'},
                {value:(passonline+passoffline), name:'五口密码'},
            ]

            var onlinedata = [
                {value: fiveonline , name:'五口'},
                {value: tenonline, name:'十口'},
                {value: tableonline, name:'桌面'},
                {value: ledonline, name:'十口LED'},
                {value: passonline, name:'五口密码'},
            ]
            /*总设备饼状图*/
            myAllpie = echarts.init(document.getElementById('all'));
            var option1 = {
                title : {
                    text: '总设备所占比例',
                    x:'center'
                },
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    left: 'left',
                    data: ['五口','十口','桌面','十口LED','五口密码']
                },
                series : [
                    {
                        name: '设备数量',
                        type: 'pie',
                        radius : '55%',
                        center: ['50%', '60%'],
                        label:{            //饼图图形上的文本标签
                            normal:{
                                show:true,
                                position:'inner', //标签的位置
                                textStyle : {
                                    fontWeight : 300 ,
                                    fontSize : 16    //文字的字体大小
                                },
                                formatter:'{d}%'


                            }
                        },
                        data: alldata,
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            }
            myAllpie.setOption(option1);
            // 加上这一句即可
            window.onresize = myAllpie.resize;


            /*在线设备饼状图*/
            myOnlinepie = echarts.init(document.getElementById('online'));
            var option = {
                title : {
                    text: '在线设备所占比例',
                    x:'center'
                },
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    left: 'left',
                    data: ['五口','十口','桌面','十口LED','五口密码']
                },
                series : [
                    {
                        name: '设备数量',
                        type: 'pie',
                        radius : '55%',
                        center: ['50%', '60%'],
                        label:{            //饼图图形上的文本标签
                            normal:{
                                show:true,
                                position:'inner', //标签的位置
                                textStyle : {
                                    fontWeight : 300 ,
                                    fontSize : 16    //文字的字体大小
                                },
                                formatter:'{d}%'


                            }
                        },
                        data: onlinedata,
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            }
            myOnlinepie.setOption(option);
            // 加上这一句即可
            window.onresize = myOnlinepie.resize;
        }
    })
}