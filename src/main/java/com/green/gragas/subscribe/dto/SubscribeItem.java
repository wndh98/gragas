package com.green.gragas.subscribe.dto;

import lombok.Data;
import org.apache.ibatis.type.Alias;

import java.sql.Date;
@Data
@Alias("subscribeItem")
public class SubscribeItem {
    private int siNum;  //구독상품넘버
    private String siSubject; //구독상품 이름
    private String siContent; //구독상품 내용
    private String siDescription; // 구독상품설명
    private int siPrice; //구독가격
    private Date  siPayDate; //결제일
    private String siMainImg; //메인이미지
    private String siDesImg; //설명이미지
    private String siTitle; //구독상품 분류
    private Date siArrive; //도착일
}
