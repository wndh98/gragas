package com.green.gragas.user.mappers;

import com.green.gragas.user.dto.User;
import com.green.gragas.user.dto.UserSearchDTO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

@Mapper
public interface UserMapper {
    User findByUserId(@Param("userId") String userId);

    List<User> userList(UserSearchDTO pageNum);

    User userCheck(String userId);

    int userJoin(User user);

    List<User> userSearchIdList(User user);

    int totalCnt();

    int userDelete(String userId);

    int userUpdate(User user);

    User userSearchPw(User user);

    int userListDelete(List<String> userId);
}
