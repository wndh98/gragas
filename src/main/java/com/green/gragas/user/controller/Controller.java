package com.green.gragas.user.controller;

import com.green.gragas.user.service.ProService;
import com.green.gragas.user.dto.User;
import lombok.Data;
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

    @PostMapping("/joinForm")
    public int userJoin(@RequestParam(value="userId") String userId, @RequestParam(value="userPw") String userPw,
                         @RequestParam(value="userName") String userName, @RequestParam(value="userPhone") String userPhone) {
        User user = new User();
        user.setUserId(userId);
        user.setUserPw(userPw);
        user.setUserName(userName);
        user.setUserPhone(userPhone);

        int result = 0;
        result = ps.userJoin(user);

        return result;
    }

}
