package cn.stormbirds.expressDelivery.entity;

import cn.stormbirds.expressDelivery.utils.ExcelColumn;
import lombok.Data;

/**
 * <p>
 * cn.stormbirds.expressDelivery.entity
 * </p>
 *
 * @author StormBirds Email：xbaojun@gmail.com
 * @since 2019/9/4 10:51
 */

@Data
public class LogisticCodeBean {
    @ExcelColumn(value = "订单号", col = 1)
    private String orderId;

    @ExcelColumn(value = "商品名称", col = 1)
    private String itemName;

    @ExcelColumn(value = "收货人/提货人", col = 1)
    private String receiver;

    @ExcelColumn(value = "收货人手机号/提货人手机号", col = 1)
    private String receiverPhone;

    @ExcelColumn(value = "收货人省份", col = 1)
    private String receiverProvince;

    @ExcelColumn(value = "收货人城市", col = 1)
    private String receiverCity;

    @ExcelColumn(value = "收货人地区", col = 1)
    private String receiverArea;

    @ExcelColumn(value = "详细收货地址/提货地址", col = 1)
    private String shippingAddress;

    @ExcelColumn(value = "商品规格", col = 1)
    private String productSpecifications;

    @ExcelColumn(value = "规格编码", col = 1)
    private String specificationCode;

    @ExcelColumn(value = "商品数量", col = 1)
    private String itemCount;

    @ExcelColumn(value = "运单号", col = 1)
    private String logisticCode;
}
