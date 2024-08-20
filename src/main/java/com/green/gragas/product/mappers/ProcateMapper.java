package com.green.gragas.product.mappers;

import com.green.gragas.product.dto.ProductCate;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ProcateMapper {
    
    int procateInsert(ProductCate procate);

    List<ProductCate> procateList();
}
