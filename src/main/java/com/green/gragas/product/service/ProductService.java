package com.green.gragas.product.service;

import com.green.gragas.product.dto.ProductItem;

import java.util.List;
import java.util.Optional;

public interface ProductService {
     List<ProductItem> productList();

     ProductItem productCheck(int piNum);

     int productInsert(ProductItem product);

     int productUpdate(int piNum, ProductItem product);

     int productDelete(int piNum);
}
