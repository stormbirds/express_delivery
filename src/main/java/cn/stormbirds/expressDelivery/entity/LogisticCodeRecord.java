package cn.stormbirds.expressDelivery.entity;

import com.alibaba.fastjson.annotation.JSONField;
import com.alibaba.fastjson.serializer.ToStringSerializer;
import com.baomidou.mybatisplus.annotation.IdType;
import java.time.LocalDate;
import com.baomidou.mybatisplus.annotation.TableId;
import java.io.Serializable;
import java.time.LocalDateTime;

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
@ApiModel(value="LogisticCodeRecord对象", description="")
public class LogisticCodeRecord implements Serializable {

    private static final long serialVersionUID = -4441415820057099885L;
    @ApiModelProperty(value = "id")
    @JSONField(serializeUsing= ToStringSerializer.class)
    private Long id;

    @ApiModelProperty(value = "快递单号")
    private String logisticCode;

    @ApiModelProperty(value = "快递公司编码")
    private String shipperCode;

    @ApiModelProperty(value = "物流状态: 0-无轨迹，1-已揽收，2-在途中，3-签收,4-问题件")
    private Integer state;

    @ApiModelProperty(value = "商户ID")
    private String eBusinessId;

    @ApiModelProperty(value = "成功与否")
    private Boolean success;

    @ApiModelProperty(value = "失败原因")
    private String reason;

    @ApiModelProperty(value = "订阅接口的Bk值")
    private String callback;

    @ApiModelProperty(value = "预计到达时间yyyy-mm-dd")
    private LocalDateTime estimatedDeliveryTime;


}
