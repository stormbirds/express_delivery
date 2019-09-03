package cn.stormbirds.expressDelivery.mapper;


import cn.stormbirds.expressDelivery.entity.User;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface UserMapper {

    @Select("select id , username , password from user where username = #{username}")
    User loadUserByUsername(@Param("username") String username);

    @Insert("INSERT INTO user (id, username , password) VALUES (#{id},#{username},#{password})")
    int save(@Param("id") Long id, @Param("username") String username, @Param("password") String password);
}
