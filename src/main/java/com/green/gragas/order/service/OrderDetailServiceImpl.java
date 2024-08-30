package com.green.gragas.order.service;

import com.green.gragas.order.dto.OrderList;
import com.green.gragas.order.mapper.OrderDetailMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrderDetailServiceImpl implements OrderDetailService{
    @Autowired
    private OrderDetailMapper odm;

    @Override
    public int preOrderDetailInsert(OrderList orderList) {
        return 0;
    }
}
