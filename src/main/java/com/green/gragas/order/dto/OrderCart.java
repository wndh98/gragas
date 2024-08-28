package com.green.gragas.order.dto;

import lombok.Data;
import org.apache.ibatis.type.Alias;

@Data
@Alias("orderCart")
public class OrderCart {
    private int ocNum;
    private String ocId;
    private int piNum;
    private int poNum;
    private String userId;
    private int ocCnt;
    private String piName;
    private String piImg;
    private String poName;
    private int poPrice;
    private int poSale;
    private int poCnt;
}
