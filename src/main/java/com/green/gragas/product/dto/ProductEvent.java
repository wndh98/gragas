package com.green.gragas.product.dto;

import lombok.Data;
import org.apache.ibatis.type.Alias;

@Data
@Alias("productEvent")
public class ProductEvent {
    private int peNum;
    private int piNum;
    private int eiNum;
}
