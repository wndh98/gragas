package com.green.gragas.order.controller;

import com.green.gragas.order.dto.OrderCart;
import com.green.gragas.order.service.OrderCartService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
public class OrderCartController {
    @Autowired
    OrderCartService ocs;

    @GetMapping("/orderCart/getOcId")
    public String getOcId(){
        return UUID.randomUUID().toString();
    }
    @GetMapping("/orderCart/list")
    public List<OrderCart> getOrderCartList(@RequestParam("ocId")String ocId ){
        return ocs.getOrderCartList(ocId);
    }
    @PostMapping("/orderCart/select")
    public OrderCart getOrderCartList(@RequestBody OrderCart orderCart){
        return ocs.getOrderCart(orderCart);
    }
    @PostMapping("/orderCart/saveCart")
    public int saveCart(@RequestBody OrderCart orderCart){
        return ocs.saveCart(orderCart);
    }
    @PostMapping("/orderCart/updateCart")
    public int updateCart(@RequestBody OrderCart orderCart){
        return ocs.updateCart(orderCart);
    }
    @PostMapping("/orderCart/deleteCart")
    public int deleteCart(@RequestBody OrderCart orderCart){
        return ocs.deleteCart(orderCart);
    }
}
