package com.green.gragas.delivery.service;

import com.green.gragas.delivery.dto.Delivery;
import com.green.gragas.delivery.mappers.DeliveryMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;



@Service
public class DeliveryServiceImpl implements DeliveryService {
    @Autowired
    DeliveryMapper dm;

    @Override
    public int insert(Delivery delivery) {
        return dm.insert(delivery);
    }
}
