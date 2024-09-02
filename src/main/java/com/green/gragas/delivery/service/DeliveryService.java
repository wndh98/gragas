package com.green.gragas.delivery.service;


import com.green.gragas.delivery.dto.Delivery;

import java.util.Map;

public interface DeliveryService {

    int insert(Delivery delivery);

    Map<String, Object> deliveryList(String userId);

    Delivery select(int mdNum);

    int update(Delivery delivery);

    int delete(int mdNum);
}
