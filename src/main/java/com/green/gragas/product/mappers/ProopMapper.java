package com.green.gragas.product.mappers;

import com.green.gragas.product.dto.ProductOption;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ProopMapper {

    List<ProductOption> proopList();

    ProductOption proopCheck(int poNum);

    int proopInsert(ProductOption proop);

    int proopUpdate(ProductOption proop);

    int proopDelete(int poNum);

    int proopDeleteList(List<Integer> poNum);

    List<ProductOption> proopListPi(int piNum);

    ProductOption proopSelectOne(int piNum);
}
