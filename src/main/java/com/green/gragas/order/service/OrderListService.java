package com.green.gragas.order.service;

import com.green.gragas.order.dto.OrderList;

public interface OrderListService {
    int preOrderListInsert(OrderList orderList);

    int orderListInsert(OrderList orderList);
}
