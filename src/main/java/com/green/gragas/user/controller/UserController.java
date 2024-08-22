package com.green.gragas.user.controller;

import com.green.gragas.user.service.UserService;
import com.green.gragas.user.dto.User;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
public class UserController {
    @Autowired
    private UserService us;

    @GetMapping("/view/{userId}")
    public User userView(@PathVariable String userId) {
        User user = us.userCheck(userId);
        return user;
    }

    @PostMapping("/user/joinForm")
    public int userJoin(@RequestBody User user) {
        int result = 0;
        User user2 = us.userCheck(user.getUserId());
        if(user2 == null) {
            result = us.userJoin(user);
        }
        return result;
    }

    @PostMapping("/user/searchIdForm")
    public User serchId(@PathVariable String userName, @PathVariable String userPhone) {
        User user = us.userSerchId(userName, userPhone);
        return user;
    }

    @PostMapping("/login")
    public int loginAction(@RequestBody User user, HttpServletRequest request) {

        int result = 0;

        User user2 = us.userCheck(user.getUserId());
        if(user2.getUserDel().equals("Y")) return -2;

        if (user2.getUserId().equals(user.getUserId())) {
            if (user.getUserPw().equals(user2.getUserPw())) {
                result = 1;
                HttpSession session = request.getSession();
                session.setAttribute("userId", user.getUserId());
            } else {
                result = -1;
            }
        }
        return result;
    }

    @GetMapping("/admin/user/list/{pageNum}")
    public Map<String, Object> userList(@PathVariable("pageNum") int pageNum) {
        Map<String, Object> map = us.userList(pageNum);
        return map;
    }

    @GetMapping("user/delete/{userId}")
    public int userDelete(@PathVariable("userId") String userId, HttpServletRequest request) {
        HttpSession session = request.getSession();

        int result = 0;
        result = us.userDelete(userId);
        if (result > 0) {
            session.invalidate();
        }
        return result;
    }

    @GetMapping("userSearch/{userId}")
    public User userUpdate(@PathVariable("userId") String userId) {
        User user = us.userCheck(userId);
        return user;
    }

    @PostMapping("user/updateAction")
    public int UpdateAction(@RequestBody User user) {
        int result = 0;
        result = us.userUpdate(user);
        return result;
    }
}
