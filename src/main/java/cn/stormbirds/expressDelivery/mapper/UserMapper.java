package cn.stormbirds.expressDelivery.mapper;

import cn.stormbirds.expressDelivery.entity.AuthUser;
import cn.stormbirds.expressDelivery.entity.User;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

/**
 * <p>
 *  Mapper 接口
 * </p>
 *
 * @author stormbirds
 * @since 2019-09-04
 */
public interface UserMapper extends BaseMapper<User> {

    @Select("select id , username , password from user where username = #{username}")
    AuthUser loadUserByUsername(@Param("username") String username);

    @Insert("INSERT INTO user (id, username , password) VALUES (#{id},#{username},#{password})")
    int save(@Param("id") Long id, @Param("username") String username, @Param("password") String password);
}
