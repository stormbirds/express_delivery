package cn.stormbirds.expressDelivery.utils;

/**
 * <p>
 * cn.stormbirds.expressDelivery.utils
 * </p>
 *
 * @author StormBirds Email：xbaojun@gmail.com
 * @since 2019/9/4 15:13
 */


public class CommonParameters {
    public static final String SHIPPER_CODE_YTO= "YT";
    public static final String SHIPPER_CODE_ZTO= "ZT";
    /**
     * 运单状态：未知、录入
     */
    public static final int LOGISTIC_STATUS_UNKNOWN = 0;
    /**
     * 追踪状态：录入状态
     */
    public static final int TRACKING_STATUS_RECORD = 0;

    /**
     * 追踪状态：订阅成功
     */
    public static final int TRACKING_STATUS_RUNNING = 1;
    /**
     * 追踪状态：快递已完成
     */
    public static final int TRACKING_STATUS_COMPLETE = 2;
}
