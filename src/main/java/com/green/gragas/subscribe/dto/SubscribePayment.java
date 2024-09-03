package com.green.gragas.subscribe.dto;

import lombok.Data;
import org.apache.ibatis.type.Alias;

import java.sql.Date;
@Data
@Alias("subscribePm")
public class SubscribePayment {
    private String soId;
    private int siNum;
    private String userId;
    private int soPrice;
    private String soPayment;
    private Date soRegist;
    private Date soPayRegist;
    private String soName;
    private int soTel;
    private String soAddr;
    private String soAddrDe;
    private Date createdAt;
    private Date updatedAt;
}
