package com.green.gragas.product.dto;

import lombok.Data;
import org.apache.ibatis.type.Alias;

@Data
@Alias("productOption")
public class ProductOption {
    private int poNum;
    private int piNum;
    private int poPrice;
    private int poSale;
    private String poName;
    private int poCnt;
}
