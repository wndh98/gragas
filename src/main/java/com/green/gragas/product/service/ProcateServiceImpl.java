package com.green.gragas.product.service;

import com.green.gragas.product.dto.EventItem;
import com.green.gragas.product.dto.ProductCate;
import com.green.gragas.product.mappers.ProcateMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProcateServiceImpl implements ProcateService {
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

    @Override
    public int procateUpdate(int pcNum, ProductCate procate) {
        procate.setPcNum(pcNum);
        return cm.procateUpdate(procate);
    }

    @Override
    public int procateDelete(int pcNum) {
        return cm.procateDelete(pcNum);
    }

    @Override
    public int procateDeleteList(List<Integer> pcNum) {
        int result = 0;
        for (int num : pcNum) {
            result = cm.procateDelete(num);
            if (result == 0) break;
        }
        return result;
    }

    @Override
    public ProductCate procateCheck(int pcNum) {
        return cm.procateCheck(pcNum);
    }
    /*===========================================================================*/
    @Override
    public List<EventItem> proeventList() {
        return cm.proeventList();
    }

    @Override
    public int proeventInsert(EventItem eitem) {
        return cm.proeventInsert(eitem);
    }

    @Override
    public int proeventUpdate(int eiNum, EventItem eitem) {
        eitem.setEiNum(eiNum);
        return cm.proeventUpdate(eitem);
    }

    @Override
    public int proeventDelete(int eiNum) {
        return cm.proeventDelete(eiNum);
    }

    @Override
    public EventItem proeventCheck(int eitem) {
        return cm.proeventCheck(eitem);
    }

    @Override
    public int proeventDeleteList(List<Integer> eiNum) {
        return cm.proeventDeleteList(eiNum);
    }

}
