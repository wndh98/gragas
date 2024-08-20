package com.green.gragas.user.mappers;

import com.green.gragas.user.dto.User;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface UserMapper {
    User findByUserId(@Param("userId") String userId);

    List<User> userList();

    User userCheck(String userId);

    int userJoin(User user);

    User userSerchId(String userName, String userPhone);
}
