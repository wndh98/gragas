package com.green.gragas.product.service;

import com.green.gragas.product.dto.ProductCate;
import com.green.gragas.product.mappers.ProcateMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProcateServiceImpl implements ProcateService{
    @Autowired
    ProcateMapper cm;
    @Override
    public int procateInsert(ProductCate procate) {
        return cm.procateInsert(procate);
    }

    @Override
    public List<ProductCate> procateList() {
        return cm.procateList();
    }
}
