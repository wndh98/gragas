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
    /*@GetMapping("/subscribe/subsOrderSelectOne/{soNum}")
    public List<SubscribeOrder> soSelectList(@PathVariable int soNum){
        List<SubscribeOrder> soList = sos.soSelectList(soNum);
        return soList;
    }*/
    @GetMapping("/subscribe/subsOrderselectNum/{userId}")
    public int soSelectNum(@PathVariable String userId){
        int soNum = sos.soSelectNum(userId);
        return soNum;
    }
    @PostMapping("/subscribe/subsOrder/regist")
    public int insertOrderInfo(@RequestBody SubscribeOrder subscribeOrder){
        int result = sos.insertOrderInfo(subscribeOrder);
        return result;
    }
}
