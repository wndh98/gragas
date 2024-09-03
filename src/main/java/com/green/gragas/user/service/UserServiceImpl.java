package com.green.gragas.user.service;

import com.green.gragas.user.dto.User;
import com.green.gragas.user.dto.UserSearchDTO;
import com.green.gragas.user.mappers.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserMapper um;

    @Override
    public Map<String, Object> userList(int pageNum) {
        Map<String,Object> map = new HashMap<>();
        int totalCnt = um.totalCnt();
        UserSearchDTO userSearchDTO = new UserSearchDTO(totalCnt, pageNum);
        map.put("searchDto", userSearchDTO);
        map.put("userList", um.userList(userSearchDTO));
        return map;
    }

    @Override
    public User userCheck(String userId) {
        return um.userCheck(userId);
    }

    @Override
    public int userJoin(User user) {
        return um.userJoin(user);
    }

    @Override
    public Map<String, Object> userSearchId(User user) {
        Map<String,Object> map = new HashMap<>();
        map.put("userList", um.userSearchIdList(user));
        return map;
    }

    @Override
    public int userDelete(String userId) {
        return um.userDelete(userId);
    }

    @Override
    public int userUpdate(User user) {
        return um.userUpdate(user);
    }

    @Override
    public User userSearchPw(User user) {
        return um.userSearchPw(user);
    }

    @Override
    public int userListDelete(List<String> userId) {
        return um.userListDelete(userId);
    }

    @Override
    public void couponUpdate() {
        um.couponUpdate();
    }

    @Override
    public void useCouponUpdate(String userId) {
        um.useCouponUpdate(userId);
    }

    @Override
    public void adminInsert(String userId, String userPw) {
        um.adminInsert(userId, userPw);
    }
}
