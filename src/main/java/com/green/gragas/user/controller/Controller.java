package com.green.gragas.user.controller;

import com.green.gragas.user.dto.User;
import com.green.gragas.user.service.ProService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class Controller {
    @Autowired
    private ProService ps;

    @GetMapping("/main")
    public List<User> userList (){
        List<User> list=ps.userList();
        return list;
    }
    @GetMapping("/view/{userId}")
    public User userView(@PathVariable String userId){
        User user=ps.userCheck(userId);
        return user;
    }


}
