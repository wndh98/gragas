package com.green.gragas.user.dto;

import lombok.Data;
import org.apache.ibatis.type.Alias;

import java.sql.Date;

@Data
@Alias("user")
public class User {
    private String userId;
    private String userLevel;
    private String userPw;
    private String userName;
    private Date userBirth;
    private String userPhone;
    private int userPoint;
    private String userCoupon;
    private String userDel;
    private Date userRegist;
    //조인용
    private String ulImg;

}
