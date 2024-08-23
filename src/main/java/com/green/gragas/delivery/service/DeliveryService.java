package com.green.gragas.delivery.service;


import com.green.gragas.delivery.dto.Delivery;

public interface DeliveryService {

    int insert(Delivery delivery);

    Delivery select(String userId);
}
