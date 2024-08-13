package com.green.gragas.user.dto;

import lombok.Data;
import org.apache.ibatis.type.Alias;

@Data
@Alias("user")
public class User {
    private String userId;
    private String userLevel;
    private String userPw;
    private String userName;
    private String userPhone;
    private String userEmail;
    private int userPoint;
    private String userCoupon;
    private String userDel;

}
