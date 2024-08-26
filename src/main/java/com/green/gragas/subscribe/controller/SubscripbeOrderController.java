package com.green.gragas.subscribe.controller;

import com.green.gragas.subscribe.dto.SubscribeOrder;
import com.green.gragas.subscribe.service.SubscribeOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SubscripbeOrderController {
    @Autowired
    public SubscribeOrderService sos;
    @PostMapping("/subscribe/subsOrder/regist")
    public int insertOrderInfo(@RequestBody SubscribeOrder subscribeOrder){
        int result = sos.insertOrderInfo(subscribeOrder);
        return result;
    }
}
