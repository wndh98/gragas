package com.green.gragas.product.controller;

import com.green.gragas.product.dto.ProductItem;
import com.green.gragas.product.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class ProductController {
    @Autowired
    private ProductService ps;

    @GetMapping("/product/list")
    public List<ProductItem> productList() {
        List<ProductItem> list = ps.productList();
        return list;
    }

    @GetMapping("/product/view/{piNum}")
    public ProductItem productView(@PathVariable int piNum) {
        ProductItem productItem = ps.productCheck(piNum);
        return productItem;
    }

    @PostMapping("/product/insert")
    public int productInsert(@RequestBody ProductItem product) {
        int result = ps.productInsert(product);

        return result;
    }

    @PostMapping("/product/update/{piNum}")
    public int productUpdate(@PathVariable int piNum, @RequestBody ProductItem product) {
        int result = ps.productUpdate(piNum,product);
        return result;
    }
    @GetMapping("/product/delete/{piNum}")
    public int productDelete(@PathVariable int piNum){
        int result = ps.productDelete(piNum);
        return result;
    }
    @PostMapping("/product/deleteList")
    public int productDelete(@RequestBody List<Integer> piNum){

        int result = ps.productDeleteList(piNum);
        return result;
    }

}
