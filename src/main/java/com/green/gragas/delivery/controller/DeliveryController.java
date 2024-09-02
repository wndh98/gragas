package com.green.gragas.delivery.controller;

import com.green.gragas.delivery.dto.Delivery;
import com.green.gragas.delivery.service.DeliveryService;
import com.green.gragas.delivery.service.DeliveryServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

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

   @GetMapping("/delivery/select/{userId}")
   public Map<String, Object> deliveryList(@PathVariable("userId") String userId) {
       Map<String, Object> map = ds.deliveryList(userId);
       return map;
   }

   @GetMapping("/user/delivery/update/{mdNum}")
    public Delivery deliverySelect(@PathVariable("mdNum") int mdNum) {
        Delivery delivery = ds.select(mdNum);
        return delivery;
   }

   @PostMapping("/user/delivery/updateAction")
    public int deliveryUpdate(@RequestBody Delivery delivery) {
       int result = ds.update(delivery);
       return result;
   }

   @GetMapping("/user/delivery/delete/{mdNum}")
    public int deliveryDelete(@PathVariable("mdNum") int mdNum) {
        int result = ds.delete(mdNum);
        return result;
   }

}
