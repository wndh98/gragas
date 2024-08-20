package com.green.gragas.product.service;

import com.green.gragas.product.dto.ProductItem;
import com.green.gragas.product.dto.ProductOption;

import java.util.List;

public interface ProductService {
     List<ProductItem> productList();

     ProductItem productCheck(int piNum);

     int productInsert(ProductItem product);

     int productUpdate(int piNum, ProductItem product);

     int productDelete(int piNum);
     int productDeleteList(List<Integer> piNum);


}
