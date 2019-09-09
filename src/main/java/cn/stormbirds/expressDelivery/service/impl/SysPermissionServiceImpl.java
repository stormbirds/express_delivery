package cn.stormbirds.expressDelivery.service.impl;

import cn.stormbirds.expressDelivery.entity.SysPermission;
import cn.stormbirds.expressDelivery.entity.SysRolePermission;
import cn.stormbirds.expressDelivery.entity.SysUserRole;
import cn.stormbirds.expressDelivery.mapper.SysPermissionMapper;
import cn.stormbirds.expressDelivery.service.ISysPermissionService;
import cn.stormbirds.expressDelivery.service.ISysRolePermissionService;
import cn.stormbirds.expressDelivery.service.ISysUserRoleService;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

/**
 * <p>
 * 权限表 服务实现类
 * </p>
 *
 * @author stormbirds
 * @since 2019-09-09
 */
@Service
public class SysPermissionServiceImpl extends ServiceImpl<SysPermissionMapper, SysPermission> implements ISysPermissionService {

    @Autowired
    private ISysUserRoleService userRoleService;
    @Autowired
    private ISysRolePermissionService rolePermissionService;

    @Override
    public List<SysPermission> findByAdminUserId(Long id) {
        List<SysUserRole> userRoles = userRoleService.list(Wrappers.<SysUserRole>lambdaQuery().eq(SysUserRole::getUserId, id));
        if (userRoles.isEmpty()) {
            return Collections.emptyList();
        }
        List<SysPermission> list = new ArrayList<>();
        userRoles
                .forEach(
                        sysUserRole -> list.addAll(listByIds(
                                rolePermissionService.list(
                                        Wrappers.<SysRolePermission>lambdaQuery()
                                                .eq(SysRolePermission::getRoleId, sysUserRole.getRoleId()))
                                        .stream().map(SysRolePermission::getPermissionId)
                                        .collect(Collectors.toList())))
                );
        return list;
    }
}
