package com.green.gragas.subscribe.service;

import com.green.gragas.subscribe.dto.SubscribeOrder;
import com.green.gragas.subscribe.dto.SubscribePayment;
import com.green.gragas.subscribe.mapper.SubscribeOrderMapper;
import com.green.gragas.subscribe.mapper.SubscribePMMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

@Service
public class SubscribePMServiceImpl implements SubscribePMService{
    @Autowired
    private SubscribePMMapper spmm;
    @Autowired
    private SubscribeOrderMapper som;

//    public int insertPMInfo(SubscribePayment spm) {
//        int result = 0;
//        System.out.println(spm.getSoId());
//        SubscribeOrder subsOrderSelect = som.subsOrderSelectId(spm.getSoId());
//        System.out.println(subsOrderSelect.getSoId());
//        result = spmm.insertOrderInfo(subsOrderSelect);
//        if(result==0) return result;
//
//        som.subsOrderDelete(spm.getSoId());
//        return 1;
//    }
}
