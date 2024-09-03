package com.green.gragas.product.dto;

import lombok.Data;
import org.apache.ibatis.type.Alias;

@Data
@Alias("productItem")
public class ProductItem {
    private int piNum;
    private int pcNum;
    private String piName;
    private int piDeli;
    private int piAlcohol;
    private int piSweet;
    private int piCarbonated;
    private String piImg;
    private String piContent;
    private int piPrice;
    private int piSale;
    private int poCnt;
    private String piDel;
    private int[] eiNum;
}
