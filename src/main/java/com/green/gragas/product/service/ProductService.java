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

     List<ProductItem> peventList(int eiNum,String orderType);

     List<ProductEvent> peventList(int eiNum,int piNum);


     List<ProductEvent> peventCheke(int eiNum);

     int peventUpdate(int piNum,int[] eiNum);

     List<ProductEvent> peventListPi(int piNum);

     void deleteFile(int piNum, String type);

     List<ProductItem> productListPcNum(int pcNum, String orderType);
}
