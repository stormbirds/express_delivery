layui.define(["form","jquery"],function(exports){
    var form = layui.form,
        $ = layui.jquery,
        Address = function(){};
    var province, city, area;
    Address.prototype.provinces = function() {
        //加载省数据
        var proHtml = '',that = this;
        $.get("../../js/modules/address.json", function (data) {
            for (var i = 0; i < data.length; i++) {
                proHtml += '<option value="' + data[i].code + '">' + data[i].name + '</option>';
            }
            //初始化省数据
            $("select[name=province]").append(proHtml);
            form.render();
            form.on('select(province)', function (proData) {
                $("select[name=area]").html('<option value="">请选择县/区</option>');
                var value = proData.value;
                if (value > 0) {
                    that.citys(data[$(this).index() - 1].childs);
                    $('#pthisname').html($(this).context.textContent);
                    province = $(this).context.textContent;
                } else {
                    $("select[name=city]").attr("disabled", "disabled");
                }
            });
        })
    }

    //加载市数据
    Address.prototype.citys = function(citys) {
        var cityHtml = '<option value="">请选择市</option>',that = this;
        for (var i = 0; i < citys.length; i++) {
            cityHtml += '<option value="' + citys[i].code + '">' + citys[i].name + '</option>';
        }
        $("select[name=city]").html(cityHtml).removeAttr("disabled");
        form.render();
        form.on('select(city)', function (cityData) {
            var value = cityData.value;
            if (value > 0) {
                that.areas(citys[$(this).index() - 1].childs);
                $('#cthisname').html($(this).context.textContent);
                city = $(this).context.textContent;
            } else {
                $("select[name=area]").attr("disabled", "disabled");
            }
        });
    }

    //加载县/区数据
    Address.prototype.areas = function(areas) {
        var areaHtml = '<option value="">请选择县/区</option>';
        for (var i = 0; i < areas.length; i++) {
            areaHtml += '<option value="' + areas[i].code + '">' + areas[i].name + '</option>';
        }
        $("select[name=area]").html(areaHtml).removeAttr("disabled");
        form.on('select(area)', function (areaData) {
            var value = areaData.value;
            if (value > 0) {
                $('#areathisname').html($(this).context.textContent);
                area = $(this).context.textContent;
                var address = province+city+area;
                var map = new BMap.Map("map");
                var point = new BMap.Point(116.331398,39.897445);
                map.centerAndZoom(point,11);
                var localSearch = new BMap.LocalSearch(map);
                localSearch.setSearchCompleteCallback(function (searchResult) {
                    map.clearOverlays();
                    var poi = searchResult.getPoi(0);
                    var mk = new BMap.Marker(poi.point);
                    map.addOverlay(mk);//标出所在地
                    map.panTo(poi.point);//地图中心移动
                    mk.setAnimation(BMAP_ANIMATION_BOUNCE);
                    map.centerAndZoom(poi.point, 13);
                    $("#sCoordinate").val(poi.point.lng+","+poi.point.lat);
                });
                localSearch.search(address);
            }
        });
        form.render();
    }

    var address = new Address();
    exports("address",function(){
        address.provinces();
    });
})