package com.green.gragas.subscribe.controller;

import com.green.gragas.subscribe.dto.SubscribeOrder;
import com.green.gragas.subscribe.service.SubscribeOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class SubscripbeOrderController {
    @Autowired
    public SubscribeOrderService sos;
    @GetMapping("/subscribe/subsOrderselectNum/{userId}")
    public int soSelectNum(@PathVariable String userId){
        int soNum = sos.soSelectNum(userId);
        return soNum;
    }
    @PostMapping("/subsOrder/insert")
    public int insertOrderInfo(@RequestBody SubscribeOrder subscribeOrder){
        int result = sos.insertOrderInfo(subscribeOrder);
        return result;
    }

    @PostMapping("/subscribe/order")
    public int orderSelect(@RequestBody SubscribeOrder subscribeOrder) {
        int result = 0;
        result = sos.orderSelect(subscribeOrder);
        return result;
    }
}
