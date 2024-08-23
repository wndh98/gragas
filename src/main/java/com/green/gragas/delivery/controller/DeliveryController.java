package com.green.gragas.delivery.controller;

import com.green.gragas.delivery.dto.Delivery;
import com.green.gragas.delivery.service.DeliveryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class DeliveryController {
    @Autowired
    private DeliveryService ds;

    @PostMapping("/user/delivery/input")
    public int deliveryInput(@RequestBody Delivery delivery) {
        int result = 0;
        result = ds.insert(delivery);
        return result;
    }

}
