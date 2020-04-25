package mapper;

import bean.UserEntity;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Component;

@Component
public interface UserMapper {

    @Select("select * from user where name = #{name}")
    public UserEntity selectUserByName(String name);

    @Insert("insert into user(name,pwd) values (#{name},#{pwd})")
    public int insertUser(UserEntity user);
}
