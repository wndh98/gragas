package com.green.gragas.product.service;

import com.green.gragas.product.dto.ProductEvent;
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

    @Override
    public int productInsert(ProductItem product) {
        return pm.productInsert(product);
    }

    @Override
    public int productUpdate(int piNum, ProductItem product) {
        product.setPiNum(piNum);
        return pm.productUpdate(product);
    }

    @Override
    public int productDelete(int piNum) {
        return pm.productDelete(piNum);
    }

    @Override
    public int productDelete(List<Integer> piNum) {
        int result =0;
        for(int num:piNum){
            result = pm.productDelete(num);
            if(result==0)break;
        }
        return result;
    }

    @Override
    public int nextPiNum() {
        return pm.nextPiNum();
    }

    @Override
    public int peventInsert() {
        return pm.peventInsert();
    }

    @Override
    public int peventDelete(int peNum) {
        return pm.peventDelete(peNum);
    }


}
