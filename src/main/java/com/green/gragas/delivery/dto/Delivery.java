package com.green.gragas.delivery.dto;

import lombok.Data;
import org.apache.ibatis.type.Alias;

import java.sql.Date;

@Data
@Alias("delivery")
public class Delivery {
    private int mdNum;
    private String userId;
    private String mdName;
    private String mdTel;
    private Date mdAddr;
    private String mdAddrDetail;
    private String mdMessage;

}
