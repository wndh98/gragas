package com.green.gragas.delivery.dto;

import lombok.Data;
import org.apache.ibatis.type.Alias;

@Data
@Alias("delivery")
public class Delivery {
    private int mdNum;
    private String userId;
    private String mdName;
    private String mdTel;
    private String mdAddr;
    private String mdAddrDetail;
    private String mdMessage;

}
