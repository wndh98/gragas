package com.green.gragas.product.dto;

import lombok.Data;
import org.apache.ibatis.type.Alias;

@Data
@Alias("EventItem")
public class EventItem {
    private int eiNum;
    private String eiName;
    private String eiContent;
    //img
}
