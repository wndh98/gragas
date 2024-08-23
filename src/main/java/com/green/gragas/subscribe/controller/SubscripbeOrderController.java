package com.green.gragas.subscribe.controller;

import com.green.gragas.subscribe.dto.SubscribeOrder;
import com.green.gragas.subscribe.service.SubscribeOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SubscripbeOrderController {
    @Autowired
    public SubscribeOrderService sos;
    @PostMapping("/subsribe/subsOrder/regist")
    public int insertOrderInfo(@RequestPart("subscribeOrder")SubscribeOrder subscribeOrder){
        int result = sos.insertOrderInfo(subscribeOrder);
        return result;
    }
}
