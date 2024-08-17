package com.green.gragas.user.controller;

import com.green.gragas.product.dto.ProductItem;
import com.green.gragas.user.service.ProService;
import com.green.gragas.user.dto.User;
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

    @PostMapping("/user/joinForm")
    public int userJoin(@RequestBody User user) {
        int result = 0;
        result = ps.userJoin(user);
        return result;
    }

    @PostMapping("/emailLogin")
    public int userLogin(@PathVariable String userId, @PathVariable String userPw) {
        int result = 0;

        User user=ps.userCheck(userId);

        return result;
    }

    @PostMapping("/user/serchIdForm")
    public User serchId(@PathVariable String userName, @PathVariable String userPhone) {
        User user = ps.userSerchId(userName, userPhone);
        return user;
    }

}
