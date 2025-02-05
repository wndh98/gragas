package com.green.gragas.order.service;

import com.green.gragas.order.dto.OrderList;

import java.util.List;

public interface OrderListService {
    int preOrderListInsert(OrderList orderList);

    int orderListInsert(OrderList orderList);

    List<OrderList> getOrderList(String userId,String olStatus);

    int ordersCnt(String userId, String olStatus);
}
