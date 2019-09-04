package cn.stormbirds.expressDelivery.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import java.time.LocalDateTime;
import com.baomidou.mybatisplus.annotation.TableId;
import java.io.Serializable;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
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
@ApiModel(value="LogisticCodeTraces对象", description="")
public class LogisticCodeTraces implements Serializable {

    private static final long serialVersionUID = -4729075392155520666L;
    @ApiModelProperty(value = "id")
    private Long id;
    @ApiModelProperty(value = "快递记录id")
    private Long logisticId;

    @ApiModelProperty(value = "事件")
    private String acceptStation;

    @ApiModelProperty(value = "发生时间")
    private LocalDateTime acceptTime;

    @ApiModelProperty(value = "备注")
    private String remark;


}
