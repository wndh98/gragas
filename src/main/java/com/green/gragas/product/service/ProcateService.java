package com.green.gragas.product.service;

import com.green.gragas.product.dto.ProductCate;

import java.util.List;

public interface ProcateService {
    int procateInsert(ProductCate procate);

    List<ProductCate> procateList();
}
