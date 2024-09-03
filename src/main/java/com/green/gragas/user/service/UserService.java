package com.green.gragas.user.service;

import com.green.gragas.user.dto.User;

import java.util.List;
import java.util.Map;

public interface UserService {

    Map<String, Object> userList(int pageNum);

    User userCheck(String userId);

    int userJoin(User user);

    Map<String, Object> userSearchId(User user);

    int userDelete(String userId);

    int userUpdate(User user);

    User userSearchPw(User user);

    int userListDelete(List<String> userId);

    void couponUpdate();
    void useCouponUpdate(String userId);
    void adminInsert(String userId, String userPw);
}
