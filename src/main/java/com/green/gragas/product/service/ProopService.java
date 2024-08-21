package com.green.gragas.product.service;

import com.green.gragas.product.dto.ProductOption;

import java.util.List;

public interface ProopService {

    List<ProductOption> proopList();

    ProductOption proopCheck(int poNum);

    int proopInsert(ProductOption proop);

    int proopUpdate(int poNum, ProductOption proop);

    int proopDelete(int poNum);

    int proopDelete(List<Integer> poNum);
}
