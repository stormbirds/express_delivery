function queryExpressTracking(data) {
    var view = "";
    $.ajax({
        type: "POST",
        url: "/app/v1/trackQuery",
        data: data,
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        success: function(backData) {
            console.log(backData);
            if(backData.data.Success == true){
                var list = backData.data.Traces;
                if(list.length<=0){
                    layer.msg(backData.data.Reason);
                }else{
                    for (var i = 0; i< list.length; i++){
                        view += '<tr>';

                        view += '<td>'+(list[i].AcceptTime==undefined? "" :list[i].AcceptTime)+'</td>'/*快递单号*/
                        view += '<td>'+(list[i].AcceptStation==undefined ? "" :list[i].AcceptStation)+'</td>'/*快递公司编码*/
                        view += '<td>'+(list[i].Remark==undefined ? "" :list[i].Remark)+'</td>';/*快递状态*/
                    }
                    $("#list").html(view);
                }

            }else{
                layer.msg(backData.data.Reason);
            }


        },
        error: function(){
            layer.msg('请求错误');
        }
    });
}


/*序列化转json*/
$.fn.serializeObject = function() {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name]) {
            if (!o[this.name].push) {
                o[this.name] = [ o[this.name] ];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
}