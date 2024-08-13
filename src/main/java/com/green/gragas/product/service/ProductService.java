package com.green.gragas.product.service;

import com.green.gragas.product.dto.ProductItem;

import java.util.List;

public interface ProductService {
     List<ProductItem> productList();

     ProductItem productCheck(int piNum);
}
