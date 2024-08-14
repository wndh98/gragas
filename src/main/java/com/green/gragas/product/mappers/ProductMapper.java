package com.green.gragas.product.mappers;

import com.green.gragas.product.dto.ProductItem;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.type.Alias;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Mapper
public interface ProductMapper {
    List<ProductItem> productList();
    ProductItem productCheck(int piNum);

    int productInsert(ProductItem product);

    int productUpdate(ProductItem product);

    int productDelete(int piNum);
}
