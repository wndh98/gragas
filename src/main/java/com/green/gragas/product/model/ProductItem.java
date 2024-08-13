package com.green.gragas.product.model;

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
    private int piSour;
    private int piCarbonated;
    private String piImg;
    private String piContent;

    @Override
    public String toString() {
        return "ProductItem{" +
                "pcNum=" + pcNum +
                ", piNum=" + piNum +
                ", piName=" + piName +
                ", piDeli=" + piDeli +
                ", piAlcohol=" + piAlcohol +
                ", piSweet=" + piSweet +
                ", piSour=" + piSour +
                ", piCarbonated=" + piCarbonated +
                ", piImg=" + piImg +
                ", piContent=" + piContent +
                '}';
    }

}
