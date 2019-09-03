package cn.stormbirds.expressDelivery.service.impl;

import cn.stormbirds.expressDelivery.entity.LogisticsTrackingSubBean;
import cn.stormbirds.expressDelivery.service.LogisticsTrackingService;
import cn.stormbirds.expressDelivery.entity.LogisticsTrackingTrailBean;
import com.alibaba.fastjson.JSONObject;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

/**
 * <p>
 * cn.stormbirds.express_delivery.service.impl
 * </p>
 *
 * @author StormBirds Email：xbaojun@gmail.com
 * @since 2019/9/3 18:49
 */

@Service
public class LogisticsTrackingServiceImpl implements LogisticsTrackingService {
    @Override
    public boolean subLogisticsTracking(LogisticsTrackingSubBean subBean) {
        return false;
    }

    @Async("asyncPoolTaskExecutor")
    @Override
    public void logisticsTrackinghandle(String requestData, String requestType, String dataSign) {
        if("101".equals(requestType)){
            LogisticsTrackingTrailBean trailBean = JSONObject.parseObject(requestData,LogisticsTrackingTrailBean.class);
        }else if("107".equals(requestType)){

        }
    }
}
