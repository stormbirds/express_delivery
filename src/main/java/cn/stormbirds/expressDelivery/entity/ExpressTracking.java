package cn.stormbirds.expressDelivery.entity;

import com.alibaba.fastjson.annotation.JSONField;
import com.alibaba.fastjson.serializer.ToStringSerializer;
import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableField;
import java.io.Serializable;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;
import lombok.experimental.Accessors;

/**
 * <p>
 * 
 * </p>
 *
 * @author stormbirds
 * @since 2019-09-04
 */
@Builder
@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
@NoArgsConstructor
@AllArgsConstructor
@ApiModel(value="ExpressTracking对象", description="")
public class ExpressTracking implements Serializable {

    private static final long serialVersionUID = 262560756964342662L;

    @ApiModelProperty(value = "id")
    @JSONField(serializeUsing= ToStringSerializer.class)
    private Long id;

    @ApiModelProperty(value = "发货平台在本系统中id对应user表id")
    private Long platformId;

    @ApiModelProperty(value = "发货平台订单")
    private String platformOrderId;

    @ApiModelProperty(value = "物品名称")
    private String itemTitle;

    @ApiModelProperty(value = "收货人姓名")
    private String receiverName;

    @ApiModelProperty(value = "收货人电话")
    private String receiverPhone;

    @ApiModelProperty(value = "收货人省份")
    private String receiverProvince;

    @ApiModelProperty(value = "收货人城市")
    private String receiverCity;

    @ApiModelProperty(value = "收货人地区")
    private String receiverArea;

    @ApiModelProperty(value = "详细收货地址")
    private String receiverAddress;

    @ApiModelProperty(value = "物品个数")
    private Integer itemNum;

    @ApiModelProperty(value = "物流编号")
    private String trackingNo;

    @ApiModelProperty(value = "物流公司代码")
    private String shipperCode;

    @ApiModelProperty(value = "订单追踪状态0-录入、1-订阅追踪中、2追踪完成")
    private Integer trackingStatus;

    @ApiModelProperty(value = "快递订单状态0-只录入未知、1-订单状态正常、2-订单状态异常")
    @TableField("Logistic_status")
    private Integer logisticStatus;


}
