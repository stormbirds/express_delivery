package cn.stormbirds.expressDelivery.entity;

import com.alibaba.fastjson.annotation.JSONField;
import com.alibaba.fastjson.serializer.ToStringSerializer;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

import java.io.Serializable;
import java.time.LocalDateTime;

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
public class LogisticCodeTraces implements Serializable{

    private static final long serialVersionUID = -4729075392155520666L;


    @ApiModelProperty(value = "id")
    @JSONField(serializeUsing= ToStringSerializer.class)
    private Long id;

    @ApiModelProperty(value = "快递记录id")
    private Long logisticId;

    @ApiModelProperty(value = "事件")
    private String acceptStation;

    @ApiModelProperty(value = "发生时间")
    private LocalDateTime acceptTime;

    @ApiModelProperty(value = "备注")
    private String remark;


    public String getId() {
        return id.toString();
    }

    @Override
    public String toString() {
        return "LogisticCodeTraces{" +
                "id='" + id + '\'' +
                ", logisticId=" + logisticId +
                ", acceptStation='" + acceptStation + '\'' +
                ", acceptTime=" + acceptTime +
                ", remark='" + remark + '\'' +
                '}';
    }
}
