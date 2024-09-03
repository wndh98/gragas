package com.green.gragas.subscribe.service;

import com.green.gragas.subscribe.dto.SubscribeOrder;
import com.green.gragas.subscribe.mapper.SubscribeOrderMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SubscribeOrderServiceImpl implements SubscribeOrderService{
    @Autowired
    private SubscribeOrderMapper som;
    public int insertPreOrderInfo(SubscribeOrder subscribeOrder) {
        return som.insertPreOrderInfo(subscribeOrder);
    }
    public String soSelectId(String userId) {return som.soSelectId(userId);}
    public List<SubscribeOrder> soSelectList(int soNum) {return som.soSelectList(soNum);}

    @Override
    public int insertOrderInfo(SubscribeOrder subscribeOrder) {
        int result = 0;
        System.out.println(subscribeOrder.getSoId());
        SubscribeOrder subsOrderSelect = som.subsOrderSelectId(subscribeOrder.getSoId());
        System.out.println(subsOrderSelect.getSoId());
        result = som.insertOrderInfo(subsOrderSelect);
        if(result==0) return result;

        som.subsPreOrderDelete(subscribeOrder.getSoId());
        return 1;
    }
}
