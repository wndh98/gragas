package com.green.gragas.order.controller;

import com.green.gragas.order.dto.OrderList;
import com.green.gragas.order.service.OrderDetailService;
import com.green.gragas.order.service.OrderListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class OrderController {
    @Autowired
    private OrderListService ols;
    @Autowired
    private OrderDetailService ods;

    @PostMapping("/preOrder/insert")
    public int preOrderListInsert(@RequestBody OrderList orderList){
        int result = 0;
        result = ols.preOrderListInsert(orderList);
        return result;
    }
    @PostMapping("/order/success")
    public int orderSuccess(@RequestBody OrderList orderList){
        int result = 0;
        result = ols.orderListInsert(orderList);
        return result;
    }

}
