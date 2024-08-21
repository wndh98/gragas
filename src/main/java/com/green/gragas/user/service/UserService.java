package com.green.gragas.user.service;

import com.green.gragas.user.dto.User;

import java.util.List;
import java.util.Map;

public interface UserService {

    Map<String, Object> userList(int pageNum);

    User userCheck(String userId);

    int userJoin(User user);

    User userSerchId(String userName, String userPhone);

    int userDelete(String userId);

    int userUpdate(User user);
}
