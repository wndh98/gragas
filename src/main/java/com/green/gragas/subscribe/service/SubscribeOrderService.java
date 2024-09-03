package com.green.gragas.subscribe.service;

import com.green.gragas.subscribe.dto.SubscribeOrder;

import java.util.List;

public interface SubscribeOrderService {

    int insertPreOrderInfo(SubscribeOrder subscribeOrder);
    String soSelectId(String userId);
    List<SubscribeOrder> soSelectList(int soNum);
    int insertOrderInfo(SubscribeOrder subscribeOrder);
}
