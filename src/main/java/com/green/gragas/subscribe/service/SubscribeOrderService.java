package com.green.gragas.subscribe.service;

import com.green.gragas.subscribe.dto.SubscribeOrder;

import java.util.List;

public interface SubscribeOrderService {

    int insertOrderInfo(SubscribeOrder subscribeOrder);
    int soSelectNum(String userId);
    List<SubscribeOrder> soSelectList(int soNum);
    int orderSelect(SubscribeOrder subscribeOrder);
}
