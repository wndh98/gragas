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
    public int insertOrderInfo(SubscribeOrder subscribeOrder) {
        return som.insertOrderInfo(subscribeOrder);
    }
    public int soSelectNum(String userId) {return som.soSelectNum(userId);}
    public List<SubscribeOrder> soSelectList(int soNum) {return som.soSelectList(soNum);}
}
