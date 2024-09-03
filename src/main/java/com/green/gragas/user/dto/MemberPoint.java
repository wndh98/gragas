package com.green.gragas.user.dto;

import lombok.Data;
import org.apache.ibatis.type.Alias;

import java.sql.Date;
@Data
@Alias("memberPoint")
public class MemberPoint {
    private int mpNum;
    private String userId;
    private String mpSubject;
    private int mpPoint;
    private Date mpRegist;
}
