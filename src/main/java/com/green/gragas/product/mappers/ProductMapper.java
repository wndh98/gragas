package com.green.gragas.product.mappers;

import com.green.gragas.product.dto.ProductEvent;
import com.green.gragas.product.dto.ProductItem;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface ProductMapper {
    List<ProductItem> productList();

    ProductItem productCheck(int piNum);

    int productInsert(ProductItem product);

    int productUpdate(ProductItem product);

    int productDelete(int piNum);

    int productDelete(List<Integer> piNum);

    int nextPiNum();

    int peventInsert(Map<String, Object> map);

    int peventDelete(int piNum);

    List<ProductEvent> peventList(int eiNum);


    List<ProductEvent> peventListPe(ProductEvent productEvent);

    List<ProductEvent> peventCheke(int eiNum);

    int peventUpdate(Map<String, Object> map);

    List<ProductEvent> peventListPi(int piNum);
}
