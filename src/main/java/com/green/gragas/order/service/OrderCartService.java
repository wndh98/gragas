package com.green.gragas.order.service;

import com.green.gragas.order.dto.OrderCart;

import java.util.List;

public interface OrderCartService {

    int saveCart(OrderCart orderCart);

    int updateCart(OrderCart orderCart);

    int deleteCart(int ocNum);

    List<OrderCart> getOrderCartList(String ocId);

    OrderCart getOrderCart(OrderCart orderCart);

    int getTotalPrice(String ocId);

    String getProductName(String ocId);
}
