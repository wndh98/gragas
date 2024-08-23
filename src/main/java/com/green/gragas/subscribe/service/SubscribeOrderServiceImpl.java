package com.green.gragas.subscribe.service;

import com.green.gragas.subscribe.dto.SubscribeOrder;
import com.green.gragas.subscribe.mapper.SubscribeOrderMapper;
import org.springframework.stereotype.Service;

@Service
public class SubscribeOrderServiceImpl implements SubscribeOrderService{
    private SubscribeOrderMapper som;
    public int insertOrderInfo(SubscribeOrder subscribeOrder) {return som.insertOrderInfo(subscribeOrder); }
}
