package com.green.gragas.delivery.service;

import com.green.gragas.delivery.dto.Delivery;
import com.green.gragas.delivery.mappers.DeliveryMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;


@Service
public class DeliveryServiceImpl implements DeliveryService {
    @Autowired
    DeliveryMapper dm;

    @Override
    public int insert(Delivery delivery) {
        return dm.insert(delivery);
    }

    @Override
    public Map<String, Object> deliveryList(String userId) {
        Map<String,Object> map = new HashMap<>();
        map.put("deliveryList", dm.deliveryList(userId));
        return map;
    }

    @Override
    public Delivery select(int mdNum) {
        return dm.select(mdNum);
    }

    @Override
    public int update(Delivery delivery) {
        return dm.update(delivery);
    }

    @Override
    public int delete(int mdNum) {
        return dm.delete(mdNum);
    }

}
