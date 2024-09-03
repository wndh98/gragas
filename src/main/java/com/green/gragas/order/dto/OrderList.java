package com.green.gragas.order.dto;

import lombok.Data;
import org.apache.ibatis.type.Alias;

import java.sql.Date;

@Data
@Alias("orderList")
public class OrderList {
    private String olId;
    private String userId;
    private int olPrice;
    private int olDeli;
    private int olCnt;
    private String olPayment;
    private int olPay;
    private Date olRegist;
    private Date olPayRegist;
    private int olPoint;
    private String olName;
    private String olTel;
    private String olAddress;
    private String olAddressDetail;
    private String olMemo;
    private String olUseCoupon;



}
