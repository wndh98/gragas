package com.green.gragas.user.service;

import com.green.gragas.user.dto.User;
import com.green.gragas.user.mappers.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class ProServiceImpl implements ProService {
    @Autowired
    UserMapper um;
    @Override
    public List<User> userList() {
        return um.userList();
    }

    @Override
    public User userCheck(String userId) {
        return um.userCheck(userId);
    }
}
