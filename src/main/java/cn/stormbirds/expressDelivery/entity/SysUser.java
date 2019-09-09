package cn.stormbirds.expressDelivery.entity;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
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
 * @since 2019-09-09
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
@ApiModel(value="SysUser对象", description="")
public class SysUser implements Serializable {

    private static final long serialVersionUID = 5558956449067812418L;

    @ApiModelProperty(value = "主键")
    private Long id;

    @ApiModelProperty(value = "用户名")
    private String username;

    @ApiModelProperty(value = "用户密码")
    private String password;

    @ApiModelProperty(value = "注册时间")
    private LocalDateTime createdAt;

    @ApiModelProperty(value = "是否启用")
    private Boolean enabled;

    @ApiModelProperty(value = "账号是否被锁定")
    private Boolean accountNonLocked;

    @ApiModelProperty(value = "上次更新密码时间")
    private LocalDateTime lastPasswordResetDate;

    @ApiModelProperty(value = "商户手机")
    private String phone;

    @ApiModelProperty(value = "商户省份")
    private String province;

    @ApiModelProperty(value = "商户城市")
    private String city;

    @ApiModelProperty(value = "商户地区")
    private String expArea;

    @ApiModelProperty(value = "详细地址")
    private String address;

    @ApiModelProperty(value = "用户邮件地址，默认用来接收快递单报警信息")
    private String email;


}
