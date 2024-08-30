package com.green.gragas.user.controller;

import com.green.gragas.user.service.UserService;
import com.green.gragas.user.dto.User;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.security.SecureRandom;
import java.util.List;
import java.util.Map;

@RestController
public class UserController {
    @Autowired
    private UserService us;

    @Autowired
    private PasswordEncoder pwEncoder;

    public String makeRandomPw(int len) {
        //소문자, 대문자, 숫자
        final String chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        SecureRandom rm = new SecureRandom();
        StringBuffer sb = new StringBuffer();

        for(int i=0; i<len; i++) {
            //무작위로 문자열의 인덱스 반환
            int index = rm.nextInt(chars.length());
            //index의 위치한 랜덤값
            sb.append(chars.charAt(index));
        }
        return sb.toString();
    }

/*    @GetMapping("/view/{userId}")
    public User userView(@PathVariable String userId) {
        User user = us.userCheck(userId);
        return user;
    }*/

    @PostMapping("/user/joinForm")
    public int userJoin(@RequestBody User user) {
        int result = 0;
        User user2 = us.userCheck(user.getUserId());
        if(user2 == null) {
            user.setUserPw(pwEncoder.encode(user.getUserPw()));
            result = us.userJoin(user);
        }
        return result;
    }

    @PostMapping("/user/searchId")
    public Map<String, Object> searchId(@RequestBody User user) {
        Map<String, Object> map = us.userSearchId(user);
        return map;
    }

    @PostMapping("/user/searchPw")
    public String searchPw(@RequestBody User user) {
        User user2 = us.userSearchPw(user);
        String userPw = makeRandomPw(10);
        if(user2 != null) {
            System.out.println(userPw);
            user2.setUserPw(pwEncoder.encode(userPw));
            int result = us.userUpdate(user2);
            return userPw;
        }

        return "정보가 옳지 않습니다";
    }

    @PostMapping("/login")
    public int loginAction(@RequestBody User user, HttpServletRequest request) {
        int result = 0;
        User user2 = us.userCheck(user.getUserId());
        if(user2==null)return result;
        if(user2.getUserDel().equals("Y")) return -2;

        if (pwEncoder.matches(user.getUserPw(), user2.getUserPw())) {
            result = 1;
            HttpSession session = request.getSession();
            session.setAttribute("userId", user.getUserId());
        } else {
            result = -1;
        }
        return result;
    }

    @GetMapping("/logout")
    public ResponseEntity<String> logout(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }
        return ResponseEntity.ok("Logout successful");
    }

    @GetMapping("/admin/user/list/{pageNum}")
    public Map<String, Object> userList(@PathVariable("pageNum") int pageNum) {
        Map<String, Object> map = us.userList(pageNum);
        return map;
    }

    @PostMapping("/admin/user/delete")
    public int userListDelete(@RequestBody List<String> userId) {
        int result = 0;
        result = us.userListDelete(userId);
        return result;
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
    public User userSelect(@PathVariable("userId") String userId) {
        User user = us.userCheck(userId);
        return user;
    }

    @PostMapping("user/updateAction")
    public int Update(@RequestBody User user) {
        int result = 0;
        user.setUserPw(pwEncoder.encode(user.getUserPw()));
        result = us.userUpdate(user);
        return result;
    }
}
