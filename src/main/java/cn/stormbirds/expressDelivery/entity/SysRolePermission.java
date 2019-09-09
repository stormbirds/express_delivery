package cn.stormbirds.expressDelivery.entity;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

import java.io.Serializable;

/**
 * <p>
 * 权限列表中权限名对应权限表中详细权限关系
 * </p>
 *
 * @author stormbirds
 * @since 2019-09-09
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
@ApiModel(value="SysRolePermission对象", description="权限列表中权限名对应权限表中详细权限关系")
public class SysRolePermission implements Serializable {

    private static final long serialVersionUID = -5276336205912693790L;

    @ApiModelProperty(value = "权限列表对应id")
    private Long roleId;

    @ApiModelProperty(value = "详细权限表对应id")
    private Long permissionId;


}
