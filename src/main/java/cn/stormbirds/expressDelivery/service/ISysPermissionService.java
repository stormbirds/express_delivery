package cn.stormbirds.expressDelivery.service;

import cn.stormbirds.expressDelivery.entity.SysPermission;
import com.baomidou.mybatisplus.extension.service.IService;

import java.util.List;

/**
 * <p>
 * 权限表 服务类
 * </p>
 *
 * @author stormbirds
 * @since 2019-09-09
 */
public interface ISysPermissionService extends IService<SysPermission> {

    List<SysPermission> findByAdminUserId(Long id);
}
