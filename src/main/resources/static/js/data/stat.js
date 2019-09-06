$(function(){
    $.ajax({
        type: 'GET',
        url: '/getSysMemberOpenid',
        data: {},
        success: function (backData) {
            var openid = backData;
            getmoney(openid,1)
            getmoney(openid,"")
            getdevice(3)
            getdevice(1)
            getfall(10);
            getfall(50);
            getNumber()
            getAgent(8,50)
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
                        platform.push(json[i]['diCountMoney']);
                        other.push(json[i]['elseCountMoney']);
                    }
                    console.log(all+','+platform+','+other);
                    /*生成折线图*/
                    myChart = echarts.init(document.getElementById('thirdData'));
                    var option = {
                        title: {
                            text: '近30天租借情况',
                        },
                        tooltip: {
                            trigger: 'axis'
                        },
                        legend: {
                            data:['平台分成','其他总分成','订单总金额'],
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
                                name:'平台分成',
                                type:'line',
                                data:platform,
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
                                name:'其他总分成',
                                type:'line',
                                data:other,
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
                                name:'订单总金额',
                                type:'line',
                                data:all,
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

            /*柱状图*/
            $.ajax({
                type: "GET",
                url: "/orderDivide/selectPowerBICountByHour",
                data: {openid: openid},
                xhrFields: {
                    withCredentials: true
                },
                crossDomain: true,
                success: function (backData) {

                    var json = backData;
                    var keylist = [];
                    var count = [];
                    for (var i = 0; i< json.length; i++){
                        if(json[i]['type'] == 'betweenZeroAndOneHour'){
                            keylist.push('1h以下');
                        }else if(json[i]['type'] == 'betweenOneAndTwoHour'){
                            keylist.push('1-2h');
                        }else if(json[i]['type'] == 'betweenTwoAndFourHour'){
                            keylist.push('2-4h');
                        }else if(json[i]['type'] == 'betweenFourAndEightHour'){
                            keylist.push('4-8h');
                        }else if(json[i]['type'] == 'betweenEightAndInfinityHour'){
                            keylist.push('8h以上');
                        }

                        count.push(json[i]['hourCount']);
                    }
                    /*生成折线图*/
                    deviceChart = echarts.init(document.getElementById('hourChart'));
                    var option = {
                        title:{
                            text:'各个时段设备数分布'
                        },
                        color: ['#3398DB'],
                        tooltip : {
                            trigger: 'axis',
                            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                            }
                        },
                        grid: {
                            left: '3%',
                            right: '4%',
                            bottom: '3%',
                            containLabel: true
                        },
                        xAxis : [
                            {
                                type : 'category',
                                data : keylist,
                                axisTick: {
                                    alignWithLabel: true
                                }
                            }
                        ],
                        yAxis : [
                            {
                                type : 'value'
                            }
                        ],
                        series : [
                            {
                                name:'设备数量',
                                type:'bar',
                                barWidth: '60%',
                                data:count
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
                        option.series[0].data = platform;
                        option.series[1].data = other;
                        option.series[2].data = all;
                        myChart.setOption(option);
                    }
                })

                /*柱状图*/
                $.ajax({
                    type: "GET",
                    url: "/orderDivide/selectPowerBICountByHour",
                    data: {openid: openid},
                    xhrFields: {
                        withCredentials: true
                    },
                    crossDomain: true,
                    success: function (backData) {

                        var json = backData;
                        var keylist = [];
                        var count = [];
                        for (var i = 0; i < json.length; i++) {
                            if (json[i]['type'] == 'betweenZeroAndOneHour') {
                                keylist.push('1h以下');
                            } else if (json[i]['type'] == 'betweenOneAndTwoHour') {
                                keylist.push('1-2h');
                            } else if (json[i]['type'] == 'betweenTwoAndFourHour') {
                                keylist.push('2-4h');
                            } else if (json[i]['type'] == 'betweenFourAndEightHour') {
                                keylist.push('4-8h');
                            } else if (json[i]['type'] == 'betweenEightAndInfinityHour') {
                                keylist.push('8h以上');
                            }

                            count.push(json[i]['hourCount']);
                        }

                        if(!deviceChart){
                            return;
                        }

                        //更新数据
                        var option = deviceChart.getOption();
                        option.xAxis.data = keylist;
                        option.series[0].data = count;
                        deviceChart.setOption(option);
                    }
                });
                getdevice(1)
                getmoney(openid,1)
                getmoney(openid,"")
                getNumber()
                getdate()
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

/*获取总分成和今日分成*/
function getmoney(openid, type){
    $.ajax({
        type: 'GET',
        url: '/orderDivide/selectOrderCountMoneyByPlat',
        data: {openid: openid, dayTypeNum: type},
        success: function (backData) {
            if(type == 1){
                setNumber($('#today'),parseInt(backData))
            }else{
                setNumber($('#all'),parseInt(backData))
            }
        },
        error: function () {
            layer.msg("请求错误");
        }
    });
}
/*查询设备数*/
function getdevice(type){
    $.ajax({
        type: 'GET',
        url: '/memberCount/selectPlatEquipNums',
        data: {equipInfoState: type},
        success: function (backData) {
            if(type == 3){
                var ydbBackdata = backData-2400;
                if(ydbBackdata<=0 || ydbBackdata<backData){
                    setNumber($('#count'),(backData))
                }else{
                    setNumber($('#count'),(ydbBackdata))
                }

            }else if(type == 1){
                setNumber($('#online'),backData)
            }
        },
        error: function () {
            layer.msg("请求错误");
        }
    });
}

/*收入分成情况*/
function getfall(type) {
    $.ajax({
        type: 'GET',
        url: '/orderDivide/selectAgentOrderDivideAndAgentExtact',
        data: {dayTypeNum: type},
        success: function (backData) {
            if(type == 10){
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
            }else if(type == 50){
                var fallChart = echarts.init(document.getElementById('allfall'));
                var option = {
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b}: {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        x: 'left',
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
                                {value:backData.platMoney, name:'平台分成'},
                                {value:backData.provinceMoney, name:'省级代理分成'},
                                {value:backData.cityMoney, name:'市级代理分成'},
                                {value:backData.areaMoney, name:'区域代理分成'},
                                {value:backData.salesMoney, name:'业务员分成'},
                                {value:backData.shopMoney, name:'店铺分成'}
                            ]
                        }
                    ]
                };
                fallChart.setOption(option);
                // 加上这一句即可
                window.onresize = fallChart.resize;

            }
        },
        error: function () {
            layer.msg("请求错误");
        }
    });
}

/*查看 男女比例和微信支付宝的个数*/
function getNumber() {
    $.ajax({
        type: 'GET',
        url: '/memberCount/selectMemberCountByTypeAndSexGroup',
        data: {},
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
            $("#woth").html(woth);
            $("#wman").html(wman);
            $("#wwoman").html(wwoman);
            $("#aoth").html(aoth);
            $("#aman").html(aman);
            $("#awoman").html(awoman);
            var count = woth+wman+wwoman+aoth+aman+awoman;
            if(count == 0){
                $("#wbl").html('0%');
                $("#abl").html('0%');
            }else{
                var wechat = (woth+wman+wwoman)/count;
                var alipay = (aoth+aman+awoman)/count;
                $("#wbl").html((wechat*100).toFixed(2)+'%');
                $("#abl").html((alipay*100).toFixed(2)+'%');
            }

            $("#wall").html(count)
        },
        error: function () {
            layer.msg("请求错误");
        }
    });
}

/*查看各级代理人数*/
function getAgent(memberGroup, searchType) {
    $.ajax({
        type: 'GET',
        url: '/memberCount/selectMemberGroupCount',
        data: {memberGroup: memberGroup, searchType: searchType},
        success: function (backData) {
            var list = backData;
            for (var i=0; i< list.length; i++){
                var mGroup = list[i].mGroup;
                if(mGroup == 1){
                    $("#comm").html(list[i].mCount == undefined? "暂无数据": list[i].mCount);
                }else if(mGroup == 2){
                    $("#store").html(list[i].mCount == undefined? "暂无数据": list[i].mCount);
                }else if(mGroup == 3){
                    $("#sale").html(list[i].mCount == undefined? "暂无数据": list[i].mCount);
                }else if(mGroup == 4){
                    $("#area").html(list[i].mCount == undefined? "暂无数据": list[i].mCount);
                }else if(mGroup == 5){
                    $("#city").html(list[i].mCount == undefined? "暂无数据": list[i].mCount);
                }else if(mGroup == 6){
                    $("#pro").html(list[i].mCount == undefined? "暂无数据": list[i].mCount);
                }else{

                }
            }
        },
        error: function () {
            layer.msg("请求错误");
        }
    });
}