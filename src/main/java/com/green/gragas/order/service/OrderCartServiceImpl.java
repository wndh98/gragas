package com.green.gragas.order.service;

import com.green.gragas.order.dto.OrderCart;
import com.green.gragas.order.mapper.OrderCartMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderCartServiceImpl implements OrderCartService {
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
    public int deleteCart(int ocNum) {
        return ocm.deleteCart(ocNum);
    }

    @Override
    public List<OrderCart> getOrderCartList(String ocId) {
        return ocm.selectOrderCartList(ocId);
    }

    @Override
    public OrderCart getOrderCart(OrderCart orderCart) {
        return ocm.selectOrderCart(orderCart);
    }

    @Override
    public int getTotalPrice(String ocId) {
        return ocm.selectTotalPrice(ocId);
    }

    @Override
    public String getProductName(String ocId) {
        List<OrderCart> orderCarts = ocm.selectOrderCartList(ocId);
        String productName = "";
        int cartSize = orderCarts.size();
        productName = orderCarts.get(0).getPiName();
        if (cartSize > 1) productName += "외 " + cartSize + " 종";

        return productName;
    }
}
