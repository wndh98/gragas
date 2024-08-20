package com.green.gragas.product.service;

import com.green.gragas.product.dto.ProductOption;
import com.green.gragas.product.mappers.ProopMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProopServiceImpl implements ProopService{
    @Autowired
    ProopMapper om;

    @Override
    public List<ProductOption> proopList() {
        return om.proopList();
    }

    @Override
    public ProductOption proopCheck(int poNum) {
        return om.proopCheck(poNum);
    }

    @Override
    public int proopInsert(ProductOption proop) {
        return om.proopInsert(proop);
    }

    @Override
    public int proopUpdate(int poNum, ProductOption proop) {
        proop.setPoNum(poNum);
        return om.proopUpdate(proop);
    }

    @Override
    public int proopDelete(int poNum) {
        return om.proopDelete(poNum);
    }

    @Override
    public int proopDeleteList(List<Integer> poNum) {
        return om.proopDeleteList(poNum);
    }
}
