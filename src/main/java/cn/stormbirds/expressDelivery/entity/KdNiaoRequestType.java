package cn.stormbirds.expressDelivery.entity;

import java.util.ArrayList;
import java.util.Arrays;

/**
 * <p>
 * cn.stormbirds.expressDelivery.entity
 * </p>
 *
 * @author StormBirds Email：xbaojun@gmail.com
 * @since 2019/9/6 10:10
 */


public enum KdNiaoRequestType {
    /**
     * 即时查询
     */
    INSTANT_QUERY("1002"),
    /**
     * 订阅物流跟踪
     */
    LOGISTICS_TRACKING_SUB("1008");

    private String requestCode;
    private String reqUrl;

    /**
     * 物流跟踪api、在途监控API等 订阅请求地址
     */
    private final String SUB_URL = "http://api.kdniao.com/api/dist";
    /**
     * 即时查询请求地址
     */
    private final String INSTANT_QUERY_URL = "http://api.kdniao.com/Ebusiness/EbusinessOrderHandle.aspx";
    private final String[] INSTANT_QUERY_CODES={"1002","8001"};
    private final String[] SUB_CODES={"1008","8008"};

    KdNiaoRequestType(String requestCode) {
        this.requestCode = requestCode;
        if(Arrays.asList(SUB_CODES).contains(requestCode)){
            this.reqUrl = this.SUB_URL;
        }else if(Arrays.asList(INSTANT_QUERY_CODES).contains(requestCode)){
            this.reqUrl = this.INSTANT_QUERY_URL;
        }

    }

    public String getRequestCode() {
        return this.requestCode;
    }

    public String getReqUrl(){
        return this.reqUrl;
    }
}
