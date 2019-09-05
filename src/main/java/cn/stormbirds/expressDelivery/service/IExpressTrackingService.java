package cn.stormbirds.expressDelivery.service;

import cn.stormbirds.expressDelivery.entity.ExpressTracking;
import cn.stormbirds.expressDelivery.entity.LogisticCodeBean;
import com.alibaba.fastjson.JSONObject;
import com.baomidou.mybatisplus.extension.service.IService;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author stormbirds
 * @since 2019-09-04
 */
public interface IExpressTrackingService extends IService<ExpressTracking> {

    List<ExpressTracking> importByExcel(MultipartFile file, Long userId);

    /**
     * 订阅快递跟踪 同步方法
     * @param subBean
     * @return
     */
    boolean subLogisticsTracking(ExpressTracking subBean);

    /**
     * 批量订阅 异步方法
     * @param expressTrackingList
     */
    void subLogisticsTracking(List<ExpressTracking> expressTrackingList);

    /**
     * 即时查询
     * @return
     */
    JSONObject trackQuery(String shipperCode,String logisticCode,String orderCode);

}
