package com.green.gragas.user.controller;

import com.green.gragas.user.service.ProService;
import com.green.gragas.user.dto.User;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.net.http.HttpRequest;
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

    @PostMapping("/user/serchIdForm")
    public User serchId(@PathVariable String userName, @PathVariable String userPhone) {
        User user = ps.userSerchId(userName, userPhone);
        return user;
    }
    @PostMapping("/login")
    public int loginAction(@RequestBody User user, HttpServletRequest request) {

        int result =0;

        User user2 = ps.userCheck(user.getUserId());
        if(user2.getUserId().equals(user.getUserId())) {
            if(user.getUserPw().equals(user2.getUserPw())) {
                result = 1;
                HttpSession session = request.getSession();
                session.setAttribute("userId", user.getUserId());
            }else {
                result = -1;
            }
        }
        //TODO
        // 아이디 비밀번호 일치시 세션저장 결과값 1로 반환
        // 아이디 불일치시 0으로 반환
        // 비밀번호 불일치시 -1로 반환
        return result;
    }
    @GetMapping("/sessionTest")
    public void sessionTest(HttpServletRequest request){
        HttpSession session = request.getSession();
        System.out.println(session.getAttribute("userId"));
    }
}
