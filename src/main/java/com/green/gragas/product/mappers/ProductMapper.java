package com.green.gragas.product.mappers;

import com.green.gragas.product.dto.ProductEvent;
import com.green.gragas.product.dto.ProductItem;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ProductMapper {
    List<ProductItem> productList();

    ProductItem productCheck(int piNum);

    int productInsert(ProductItem product);

    int productUpdate(ProductItem product);

    int productDelete(int piNum);

    int productDelete(List<Integer> piNum);

    int nextPiNum();

    int peventInsert();

    int peventDelete(int peNum);
}
