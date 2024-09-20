package com.green.gragas.product.service;

import com.green.gragas.product.dto.EventItem;
import com.green.gragas.product.dto.ProductCate;
import com.green.gragas.product.mappers.ProcateMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.File;
import java.util.List;

@Service
public class ProcateServiceImpl implements ProcateService {
    @Autowired
    ProcateMapper cm;
    @Value("${project.upload.path}")
    private String rootPath;

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
    public int nextEiNum() {
        return cm.nextEiNum();
    }

    @Override
    public int nextPcNum() {
        return cm.nextPcNum();
    }

    public int procateDelete(List<Integer> pcNum) {
        int result = 0;
        result = cm.procateCountList(pcNum);
        if (result > 0) return -1;
        for (int num : pcNum) {
            result = cm.procateDelete(num);
            if (result == 0) break;
        }
        return result;
    }

    @Override
    public int procateDelete(int pcNum) {
        int result = 0;
        result = cm.procateCount(pcNum);
        if (result > 0) return -1;
        return cm.procateDelete(pcNum);
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
    public EventItem proeventCheck(int eiNum) {
        return cm.proeventCheck(eiNum);
    }


    @Override
    public int proeventDelete(int eiNum) {
        return cm.proeventDelete(eiNum);
    }

    public int proeventDelete(List<Integer> eiNum) {
        int result = 0;
        for (int num : eiNum) {
            result = cm.proeventDelete(num);
            if (result == 0) break;
        }
        return result;
    }


    public void deletePcImgFile(int pcNum) {
        ProductCate productCate = cm.procateCheck(pcNum);
        String filePath = rootPath + "/procate/" + pcNum + "/" + productCate.getPcImg();
        File file = new File(filePath);
        if (file.exists()) {
            file.delete();
        }
    }

    @Override
    public void deleteEiContentFile(int eiNum) {
        EventItem eitem = cm.proeventCheck(eiNum);
        String filePath = rootPath + "/event/" + eiNum + "/" + eitem.getEiContent();
        File file = new File(filePath);
        if (file.exists()) {
            file.delete();
        }
    }
}
