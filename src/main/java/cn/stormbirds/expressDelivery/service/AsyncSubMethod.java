package cn.stormbirds.expressDelivery.service;

import cn.stormbirds.expressDelivery.entity.ExpressTracking;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * <p>
 *      批量物流编号订阅方法-异步的
 * </p>
 *
 * @author StormBirds Email：xbaojun@gmail.com
 * @since 2019/9/5 19:27
 */

@Service
public class AsyncSubMethod {

    @Autowired
    private IExpressTrackingService expressTrackingService;

    @Async
    public void subLogisticsTracking(List<ExpressTracking> expressTrackingList) {
        for (ExpressTracking expressTracking : expressTrackingList) {
            expressTrackingService.subLogisticsTracking(expressTracking);
        }
    }
}
