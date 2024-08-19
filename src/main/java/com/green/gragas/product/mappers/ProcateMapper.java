package com.green.gragas.product.mappers;

import com.green.gragas.product.dto.EventItem;
import com.green.gragas.product.dto.ProductCate;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ProcateMapper {
    
    int procateInsert(ProductCate procate);

    List<ProductCate> procateList();

    int procateUpdate(ProductCate procate);

    int procateDelete(int pcNum);

    ProductCate procateCheck(int pcNum);
    /*=========================================event=========================================*/
    List<EventItem> proeventList();

    int proeventInsert(EventItem eitem);
}
