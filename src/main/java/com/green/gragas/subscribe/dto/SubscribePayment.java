package com.green.gragas.subscribe.dto;

import lombok.Data;

import java.sql.Date;
@Data
public class SubscribePayment {
    private String spKey;
    private int soNum;
    private String spMethod;
    private String spStatus;
    private String spType;
    private Date spRequest;
    private Date spApprove;
}
