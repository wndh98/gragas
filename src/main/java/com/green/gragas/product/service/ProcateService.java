package com.green.gragas.product.service;

import com.green.gragas.product.dto.EventItem;
import com.green.gragas.product.dto.ProductCate;

import java.util.List;

public interface ProcateService {
    int procateInsert(ProductCate procate);

    List<ProductCate> procateList();

    int procateUpdate(int pcNum, ProductCate procate);

    int procateDelete(List<Integer> pcNum);
    int procateDelete(int pcNum);


    ProductCate procateCheck(int pcNum);
/*===========================================================================*/
    List<EventItem> proeventList();

    int proeventInsert(EventItem eitem);

    int proeventUpdate(int eiNum, EventItem eitem);

    int proeventDelete(int eiNum);

    EventItem proeventCheck(int eitem);

    int proeventDelete(List<Integer> eiNum);
}
