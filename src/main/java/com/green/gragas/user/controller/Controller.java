package com.green.gragas.user.controller;

import com.green.gragas.user.service.ProService;
import com.green.gragas.user.dto.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class Controller {
    @Autowired
    private ProService ps;

    @GetMapping("/user/list")
    public List<User> userList (){
        List<User> list=ps.userList();
        return list;
    }
    @GetMapping("/user/view/{userId}")
    public User userView(@PathVariable String userId){
        User user=ps.userCheck(userId);
        return user;
    }
}
