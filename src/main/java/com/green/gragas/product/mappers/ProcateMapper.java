package com.green.gragas.product.mappers;

import com.green.gragas.product.dto.EventItem;
import com.green.gragas.product.dto.ProductCate;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ProcateMapper {
    
    int procateInsert(ProductCate procate);

    List<ProductCate> procateList();

    ProductCate procateCheck(int pcNum);

    int procateUpdate(ProductCate procate);

    int procateDelete(int pcNum);

    int procateCount(int pcNum);
    /*=========================================event=========================================*/
    List<EventItem> proeventList();

    int proeventInsert(EventItem eitem);

    int proeventUpdate(EventItem eitem);

    int proeventDelete(int eiNum);

    EventItem proeventCheck(int eiNum);


    int proeventDeleteList(List<Integer> eiNum);

    int nextEiNum();

    int nextPcNum();


}
