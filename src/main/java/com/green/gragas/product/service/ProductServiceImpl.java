package com.green.gragas.product.service;

import com.green.gragas.product.dto.ProductItem;
import com.green.gragas.product.mappers.ProductMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {
    @Autowired
    ProductMapper pm;

    public List<ProductItem> productList() {
        return pm.productList();
    }

    public ProductItem productCheck(int piNum) {
        return pm.productCheck(piNum);
    }
}
