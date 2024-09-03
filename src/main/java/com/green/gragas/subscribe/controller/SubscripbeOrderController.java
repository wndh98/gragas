package com.green.gragas.subscribe.controller;

import com.green.gragas.subscribe.dto.SubscribeOrder;
import com.green.gragas.subscribe.dto.SubscribePayment;
import com.green.gragas.subscribe.service.SubscribeOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class SubscripbeOrderController {
    @Autowired
    public SubscribeOrderService sos;
    @GetMapping("/subscribe/subsOrderselectNum/{userId}")
    public String soSelectId(@PathVariable String userId){
        String soId = sos.soSelectId(userId);
        return soId;
    }
    @PostMapping("/subsOrder/insert")
    public int insertPreOrderInfo(@RequestBody SubscribeOrder subscribeOrder){
        int result = sos.insertPreOrderInfo(subscribeOrder);
        return result;
    }
    @PostMapping("/subscribe/success")
    public int insertOrderInfo(@RequestBody SubscribeOrder subscribeOrder){
        int result = 0;
        result = sos.insertOrderInfo(subscribeOrder);
        return result;
    }

    @PostMapping("/subscribe/order")
    public int orderSelect(@RequestBody SubscribeOrder subscribeOrder) {
        int result = 0;
        result = sos.orderSelect(subscribeOrder);
        return result;
    }
}
