package com.green.gragas.product.dto;

import lombok.Data;
import org.apache.ibatis.type.Alias;

@Data
@Alias("productCate")
public class ProductCate {
private int pcNum;
private String pcName;
private String pcImg;
}

