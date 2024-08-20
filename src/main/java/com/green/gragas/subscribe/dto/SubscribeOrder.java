package com.green.gragas.subscribe.dto;

import lombok.Data;

@Data
public class SubscribeOrder {
    private int soNum;
    private int siNum;
    private String userId;
    private String soName;
    private int soTel;
    private String soAddr;
    private String soAddrDe;
    private String soMemo;
    private String soStatus;
}
