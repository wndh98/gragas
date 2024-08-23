package com.green.gragas.product.service;

import com.green.gragas.product.dto.ProductEvent;
import com.green.gragas.product.dto.ProductItem;

import java.util.List;

public interface ProductService {
     List<ProductItem> productList();

     ProductItem productCheck(int piNum);

     int productInsert(ProductItem product);

     int productUpdate(ProductItem product);

     int productDelete(int piNum);
     int productDelete(List<Integer> piNum);


     int nextPiNum();

   
     int peventInsert(List<Integer> eiNum,int piNum);

     int peventDelete(int piNum);

     List<ProductEvent> peventList(int eiNum);

     List<ProductEvent> peventList(int eiNum,int piNum);


     List<ProductEvent> peventCheke(int eiNum);

     int peventUpdate(List<ProductEvent> eiNum);

     List<ProductEvent> peventListPi(int piNum);
}
