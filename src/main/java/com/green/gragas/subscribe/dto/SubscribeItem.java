package com.green.gragas.subscribe.dto;

import lombok.Data;
import org.apache.ibatis.type.Alias;

import java.sql.Date;
@Data
@Alias("subscribeItem")
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
