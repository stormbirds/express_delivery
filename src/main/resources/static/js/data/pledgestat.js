$(function(){
    getdate()
    getPledge();
    /*折线图*/
    var myChart;
    $.ajax({
        type: "GET",
        url: "/memberCount/selectDepositThirtyDayGroup",
        data: {},
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        success: function (backData) {

            var json = backData;
            var keylist = [];
            var income = [];
            var out = [];
            for (var i = 0; i< json.length; i++){
                if(json[i]['tallyType'] == 1){
                    income.push(json[i]['countAccrual']);
                    keylist.push(json[i]['tradingTime']);
                }else{
                    out.push(json[i]['countAccrual']);
                }
            }
            /*生成折线图*/
            myChart = echarts.init(document.getElementById('thirdData'));
            var option = {
                title: {
                    text: '近30天押金变化',
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data:['押金充值','押金提现'],
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
                        name:'押金充值',
                        type:'line',
                        data:income,
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
                        name:'押金提现',
                        type:'line',
                        data:out,
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
            url: "/memberCount/selectDepositThirtyDayGroup",
            data: {},
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            success: function (backData) {
                var json = backData;
                var keylist = [];
                var income = [];
                var out = [];
                for (var i = 0; i< json.length; i++){

                    if(json[i]['tallyType'] == 1){
                        keylist.push(json[i]['tradingTime']);
                        income.push(json[i]['countAccrual']);
                    }else{
                        out.push(json[i]['countAccrual']);
                    }
                }
                if(!myChart){
                    return;
                }

                //更新数据
                var option = myChart.getOption();
                option.xAxis.data = keylist;
                option.series[0].data = income;
                option.series[1].data = out;
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
    $.ajax({
        type: "GET",
        url: "/memberCount/selectMemberDepositCount",
        data: {},
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        success: function (backData) {
            var list = backData;
            var tpledge = 0;
            var twithdraw = 0;

            var ypledge = 0;
            var ywithdraw = 0;

            var bpledge = 0;
            var bwithdraw = 0;

            var spledge = 0;
            var swithdraw = 0;

            var mpledge = 0;
            var mwithdraw = 0;

            var apledge = 0;
            var awithdraw = 0;

            var tmpledge = 0;
            var tmwithdraw = 0;
            for (var i= 0; i<list.length; i++){
                var dayType = list[i].dayType;
                var tayllType = list[i].tayllType;
                if(dayType == "today" && tayllType == 1){/*当天总押金*/
                    tpledge = (list[i].countAccrual == undefined? 0:list[i].countAccrual);
                    $("#tloading").html((list[i].orderDepositMoney == undefined? 0:list[i].orderDepositMoney));

                }else if(dayType == "today" && tayllType == 2) {/*当天提现押金*/
                    twithdraw = (list[i].countAccrual == undefined? 0:list[i].countAccrual);

                }else if(dayType == "yesterday" && tayllType == 1) {/*昨天总押金*/
                    ypledge = (list[i].countAccrual == undefined? 0:list[i].countAccrual);
                    $("#yloading").html((list[i].orderDepositMoney == undefined? 0:list[i].orderDepositMoney));

                }else if(dayType == "yesterday" && tayllType == 2) {/*昨天提现押金*/
                    ywithdraw = (list[i].countAccrual == undefined? 0:list[i].countAccrual);

                }else if(dayType == "theDayFeforeYesterday" && tayllType == 1) {/*前天总押金*/
                    bpledge = (list[i].countAccrual == undefined? 0:list[i].countAccrual);
                    $("#bloading").html((list[i].orderDepositMoney == undefined? 0:list[i].orderDepositMoney));

                }else if(dayType == "theDayFeforeYesterday" && tayllType == 2) {/*前天提现押金*/
                    bwithdraw = (list[i].countAccrual == undefined? 0:list[i].countAccrual);

                }else if(dayType == "sevenDay" && tayllType == 1) {/*七天总押金*/
                    spledge = (list[i].countAccrual == undefined? 0:list[i].countAccrual);
                    $("#sloading").html((list[i].orderDepositMoney == undefined? 0:list[i].orderDepositMoney));

                }else if(dayType == "sevenDay" && tayllType == 2) {/*七天提现押金*/
                    swithdraw = (list[i].countAccrual == undefined? 0:list[i].countAccrual);

                }else if(dayType == "thirtyDay" && tayllType == 1) {/*本月总押金*/
                    mpledge = (list[i].countAccrual == undefined? 0:list[i].countAccrual);
                    $("#mloading").html((list[i].orderDepositMoney == undefined? 0:list[i].orderDepositMoney));

                }else if(dayType == "thirtyDay" && tayllType == 2) {/*本月提现押金*/
                    mwithdraw = (list[i].countAccrual == undefined? 0:list[i].countAccrual);

                }else if(dayType == "allDay" && tayllType == 1) {/*总计总押金*/
                    apledge = (list[i].countAccrual == undefined? 0:list[i].countAccrual);
                    $("#aloading").html((list[i].orderDepositMoney == undefined? 0:list[i].orderDepositMoney));

                }else if(dayType == "allDay" && tayllType == 2) {/*总计提现押金*/
                    awithdraw = (list[i].countAccrual == undefined? 0:list[i].countAccrual);

                }else if(dayType == "thisMonth" && tayllType == 1) {/*本月押金*/
                    tmpledge = (list[i].countAccrual == undefined? 0:list[i].countAccrual);
                    $("#tmloading").html((list[i].orderDepositMoney == undefined? 0:list[i].orderDepositMoney));

                }else if(dayType == "thisMonth" && tayllType == 2) {/*本月提现押金*/
                    tmwithdraw = (list[i].countAccrual == undefined? 0:list[i].countAccrual);

                }
            }
            $("#tremain").html((tpledge-twithdraw).toFixed(2));
            $("#yremain").html((ypledge-ywithdraw).toFixed(2));
            $("#bremain").html((bpledge-bwithdraw).toFixed(2));
            $("#sremain").html((spledge-swithdraw).toFixed(2));
            $("#mremain").html((mpledge-mwithdraw).toFixed(2));
            $.ajax({
                type: "POST",
                url: "/permission/loginUser",
                data: {},
                xhrFields: {
                    withCredentials: true
                },
                crossDomain: true,
                success: function(backData) {
                    var depart = backData.loginUserDepartment;/*部门名称*/
                    if (depart == "BOSS"){
                        $("#aremain").html(((apledge-awithdraw)+10000000).toFixed(2));
                        $("#apledge").html((apledge+10000000));
                    }else{
                        $("#aremain").html((apledge-awithdraw).toFixed(2));
                        $("#apledge").html(apledge);
                    }
                },
                error: function(){
                    alert('请求错误');
                }
            });
            $("#tmremain").html((tmpledge-tmwithdraw).toFixed(2));
            $("#tpledge").html(tpledge);
            $("#twithdraw").html(twithdraw);
            $("#ypledge").html(ypledge);
            $("#ywithdraw").html(ywithdraw);
            $("#bpledge").html(bpledge);
            $("#bwithdraw").html(bwithdraw);
            $("#spledge").html(spledge);
            $("#swithdraw").html(swithdraw);
            $("#mpledge").html(mpledge);
            $("#mwithdraw").html(mwithdraw);
            $("#awithdraw").html(awithdraw);
            $("#tmpledge").html(tmpledge);
            $("#tmwithdraw").html(tmwithdraw);

        }
    })
}