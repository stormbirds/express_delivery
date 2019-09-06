$(function(){
    $.ajax({
        type: 'GET',
        url: '/getSysMemberOpenid',
        data: {},
        success: function (backData) {
            var openid = backData;
            getfall(10);
            getfall(1);
            getfall(20);
            getfall(25);
            getfall(30);
            getfall(40);
            getdate()
            /*折线图*/
            var myChart;
            /*柱状图*/
            var deviceChart
            $.ajax({
                type: "GET",
                url: "/orderDivide/selectPlatOrderDivideThirtyDay",
                data: {openid: openid},
                xhrFields: {
                    withCredentials: true
                },
                crossDomain: true,
                success: function (backData) {

                    var json = backData;
                    var keylist = [];
                    var all = [];
                    var platform = [];
                    var other = [];
                    for (var i = 0; i< json.length; i++){

                        keylist.push(json[i]['diTime']);
                        all.push(json[i]['orderCountMoney']);
                    }
                    console.log(all+','+platform+','+other);
                    /*生成折线图*/
                    myChart = echarts.init(document.getElementById('thirdData'));
                    var option = {
                        title: {
                            text: '近30天分成总金额统计表',
                        },
                        tooltip: {
                            trigger: 'axis'
                        },
                        legend: {
                            data:['分成总金额'],
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
                                name:'分成总金额',
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
                    url: "/orderDivide/selectPlatOrderDivideThirtyDay",
                    data: {openid: openid},
                    xhrFields: {
                        withCredentials: true
                    },
                    crossDomain: true,
                    success: function (backData) {

                        var json = backData;
                        var keylist = [];
                        var all = [];
                        var platform = [];
                        var other = [];
                        for (var i = 0; i< json.length; i++){

                            keylist.push(json[i]['diTime']);
                            all.push(json[i]['orderCountMoney']);
                            platform.push(json[i]['diCountMoney']);
                            other.push(json[i]['elseCountMoney']);
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
                getfall(1);
            },30000);
        },
        error: function () {
            layer.msg("请求错误");
        }
    });

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

function setNumber(dom, number){
    var n = String(number),len = n.length;

    //如果新的数字短于当前的，要移除多余的i
    if(dom.find("i").length > len){
        dom.find("i:gt(" + (len - 1) + ")").remove();
    }

    //移除千分位分隔符
    dom.find("b").remove();

    //开始填充每一位
    for(var i=0;i<len;++i){
        //位数不足要补
        if(dom.find("i").length < len){
            dom.append("<i></i>");
        }

        var obj = dom.find("i").eq(i);
        console.log(obj);
        var y = -40 * parseInt(n.charAt(i), 10);

        //加分隔符
        if(i < len - 1 && (len - i - 1) % 3 == 0)
            $("<b></b>").insertAfter(obj);

        //利用动画变换数字
        obj.animate({ backgroundPositionY:y+"px" }, 350);
    }
};

/*收入分成情况*/
function getfall(type) {
    $.ajax({
        type: 'GET',
        url: '/orderDivide/selectAgentOrderDivideAndAgentExtact',
        data: {dayTypeNum: type},
        success: function (backData) {
            if(type == 10){/*昨天*/
                var fallChart = echarts.init(document.getElementById('allfall'));
                var option = {
                    title:{
                        text:"昨天各级收入分成情况"
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b}: {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        x: 'right',
                        data:['平台分成','省级代理分成','市级代理分成','区域代理分成','业务员分成','店铺分成']
                    },
                    series: [
                        {
                            name:'各级分成',
                            type:'pie',
                            radius: ['50%', '70%'],
                            avoidLabelOverlap: false,
                            label: {
                                normal: {
                                    show: false,
                                    position: 'center'
                                },
                                emphasis: {
                                    show: true,
                                    textStyle: {
                                        fontSize: '30',
                                        fontWeight: 'bold'
                                    }
                                }
                            },
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            data:[
                                {value:backData.platMoney == undefined? 0:backData.platMoney, name:'平台分成'},
                                {value:backData.provinceMoney == undefined? 0:backData.provinceMoney, name:'省级代理分成'},
                                {value:backData.cityMoney == undefined? 0:backData.cityMoney, name:'市级代理分成'},
                                {value:backData.areaMoney == undefined? 0:backData.areaMoney, name:'区域代理分成'},
                                {value:backData.salesMoney == undefined? 0:backData.salesMoney, name:'业务员分成'},
                                {value:backData.shopMoney == undefined? 0:backData.shopMoney, name:'店铺分成'}
                            ]
                        }
                    ]
                };
                fallChart.setOption(option);
                // 加上这一句即可
                window.onresize = fallChart.resize;
            }else if(type == 1){/*今天*/
                /*平台*/
                $("#loader1").html(backData.platMoney == undefined? "暂无数据":backData.platMoney);
                $('.loader1').ClassyLoader({
                    speed: 20,
                    diameter: 40,
                    fontSize: '32px',
                    fontColor: 'rgba(0,0,0,1)',
                    lineColor: 'rgba(0,204,255,1)',
                    percentage: backData.platExtact == undefined? 0:backData.platExtact,
                    remainingLineColor: 'rgba(204,204,204,0.4)'
                });
                /*省级*/
                $("#loader2").html(backData.provinceMoney== undefined? "暂无数据":backData.provinceMoney);
                $('.loader2').ClassyLoader({
                    speed: 20,
                    diameter: 40,
                    fontSize: '32px',
                    fontColor: 'rgba(0,0,0,1)',
                    lineColor: 'rgba(249,205,26,1)',
                    percentage: backData.provinceExtact== undefined? 0:backData.provinceExtact,
                    remainingLineColor: 'rgba(204,204,204,0.4)'
                });
                /*市级*/
                $("#loader3").html(backData.cityMoney== undefined? "暂无数据":backData.cityMoney);
                $('.loader3').ClassyLoader({
                    speed: 20,
                    diameter: 40,
                    fontSize: '32px',
                    fontColor: 'rgba(0,0,0,1)',
                    lineColor: 'rgba(0,204,255,1)',
                    percentage: backData.cityExtact== undefined? 0:backData.cityExtact,
                    remainingLineColor: 'rgba(204,204,204,0.4)'
                });
                /*区级*/
                $("#loader4").html(backData.areaMoney== undefined? "暂无数据":backData.areaMoney);
                $('.loader4').ClassyLoader({
                    speed: 20,
                    diameter: 40,
                    fontSize: '32px',
                    fontColor: 'rgba(0,0,0,1)',
                    lineColor: 'rgba(249,205,26,1)',
                    percentage: backData.areaExtact== undefined? 0:backData.areaExtact,
                    remainingLineColor: 'rgba(204,204,204,0.4)'
                });
                /*业务*/
                $("#loader5").html(backData.salesMoney== undefined? "暂无数据":backData.salesMoney);
                $('.loader5').ClassyLoader({
                    speed: 20,
                    diameter: 40,
                    fontSize: '32px',
                    fontColor: 'rgba(0,0,0,1)',
                    lineColor: 'rgba(0,204,255,1)',
                    percentage: backData.salesExtact== undefined? 0:backData.salesExtact,
                    remainingLineColor: 'rgba(204,204,204,0.4)'
                });
                /*店铺*/
                $("#loader6").html(backData.shopMoney== undefined? "暂无数据":backData.shopMoney);
                $('.loader6').ClassyLoader({
                    speed: 20,
                    diameter: 40,
                    fontSize: '32px',
                    fontColor: 'rgba(0,0,0,1)',
                    lineColor: 'rgba(249,205,26,1)',
                    percentage: backData.shopExtact== undefined? 0:backData.shopExtact,
                    remainingLineColor: 'rgba(204,204,204,0.4)'
                });
            }else{
                $("#plat"+type).html(backData.platMoney == undefined? "暂无数据":backData.platMoney)
                $("#pro"+type).html(backData.provinceMoney == undefined? "暂无数据":backData.provinceMoney)
                $("#city"+type).html(backData.cityMoney == undefined? "暂无数据":backData.cityMoney)
                $("#area"+type).html(backData.areaMoney == undefined? "暂无数据":backData.areaMoney)
                $("#sale"+type).html(backData.salesMoney == undefined? "暂无数据":backData.salesMoney)
                $("#shop"+type).html(backData.shopMoney == undefined? "暂无数据":backData.shopMoney)

                growth("plat");
                growth("pro");
                growth("city");
                growth("area");
                growth("sale");
                growth("shop");
            }
        },
        error: function () {
            layer.msg("请求错误");
        }
    });
}

/*计算月增长率*/
function growth(name){
    var lastmonth = $("#"+name+"40").html();
    var thismonth = $("#"+name+"30").html();
    var growth =   (thismonth - lastmonth)/(lastmonth == 0 ?1: lastmonth);
    if(growth < 0){
        $("#"+name).html((growth*100).toFixed(2)+"%<img src='../../../img/down.png' height='20'/>");/*降序*/
        $("#"+name).css({"color":'#00c305'});
    }else if(growth == 0){
        $("#"+name).html("0%"+"<span class=''>-</span>");
        $("#"+name).css("color",'#000');
    }else if(isNaN(parseInt(growth))){
        $("#"+name).html("暂无数据");
    }else{
        $("#"+name).html((growth*100).toFixed(2)+"%<img src='../../../img/docg.png'/>");/*升序*/
        $("#"+name).css({"color":'#f7353e'});
    }

}