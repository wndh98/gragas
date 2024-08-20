package com.green.gragas.user.service;

import com.green.gragas.user.dto.User;

import java.util.List;

public interface ProService {

    List<User> userList();

    User userCheck(String userId);

    int userJoin(User user);

    User userSerchId(String userName, String userPhone);
}
