package com.green.gragas.user.service;

import com.green.gragas.user.dto.User;
import com.green.gragas.user.dto.UserSearchDTO;
import com.green.gragas.user.mappers.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    UserMapper um;
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
    public User userSerchId(String userName, String userPhone) {
        return um.userSerchId(userName, userPhone);
    }

    @Override
    public int userDelete(String userId) {
        return um.userDelete(userId);
    }

    @Override
    public int userUpdate(User user) {
        return um.userUpdate(user);
    }
}
