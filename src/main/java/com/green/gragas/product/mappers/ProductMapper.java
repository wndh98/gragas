package com.green.gragas.product.mappers;

import com.green.gragas.product.dto.ProductItem;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ProductMapper {
    List<ProductItem> productList();
    ProductItem productCheck(int piNum);
}
