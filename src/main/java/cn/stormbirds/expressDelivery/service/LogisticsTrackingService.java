package cn.stormbirds.expressDelivery.service;

import cn.stormbirds.expressDelivery.entity.ExpressTracking;
import cn.stormbirds.expressDelivery.entity.LogisticsTrackingSubBean;

import java.util.List;

/**
 * <p>
 * cn.stormbirds.express_delivery.service
 * </p>
 *
 * @author StormBirds Email：xbaojun@gmail.com
 * @since 2019/9/3 18:41
 */


public interface LogisticsTrackingService {


    /**
     * 处理快递跟踪轨迹查询结果
     * @param requestData
     * @param requestType
     * @param dataSign
     */
    void logisticsTrackinghandle(String requestData, String requestType, String dataSign);
}
