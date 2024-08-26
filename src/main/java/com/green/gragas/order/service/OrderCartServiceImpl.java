package com.green.gragas.order.service;

import com.green.gragas.order.dto.OrderCart;
import com.green.gragas.order.mapper.OrderCartMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderCartServiceImpl implements OrderCartService{
    @Autowired
    OrderCartMapper ocm;
    @Override
    public int saveCart(OrderCart orderCart) {
        return ocm.insertCart(orderCart);
    }

    @Override
    public int updateCart(OrderCart orderCart) {
        return ocm.updateCart(orderCart);
    }

    @Override
    public int deleteCart(OrderCart orderCart) {
        return ocm.deleteCart(orderCart);
    }

    @Override
    public List<OrderCart> getOrderCartList(String ocId) {
        return ocm.selectOrderCartList(ocId);
    }

    @Override
    public OrderCart getOrderCart(OrderCart orderCart) {
        return ocm.selectOrderCart(orderCart);
    }
}
