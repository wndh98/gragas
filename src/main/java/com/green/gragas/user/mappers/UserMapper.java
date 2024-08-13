package com.green.gragas.user.mappers;

import com.green.gragas.user.dto.User;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface UserMapper {
    List<User> userList();

    User userCheck(String userId);

    int userJoin(User user);
}
