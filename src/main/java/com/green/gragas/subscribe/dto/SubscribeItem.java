package com.green.gragas.subscribe.dto;

import lombok.Data;

import java.sql.Date;
@Data
public class SubscribeItem {
    private int siNum;
    private String siSubject;
    private String siContent;
    private String siDescription;
    private int siPrice;
    private Date  siPayDate;
    private String siMainImg;
    private String siDesImg;
    private String siTitle;
    private Date siArrive;
}
