package com.green.gragas.order.service;

import com.green.gragas.order.dto.OrderCart;
import com.green.gragas.order.dto.OrderDetail;
import com.green.gragas.order.dto.OrderList;
import com.green.gragas.order.mapper.OrderCartMapper;
import com.green.gragas.order.mapper.OrderDetailMapper;
import com.green.gragas.order.mapper.OrderListMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderListServiceImpl implements OrderListService {
    @Autowired
    private OrderListMapper olm;
    @Autowired
    private OrderDetailMapper odm;
    @Autowired
    private OrderCartMapper ocm;

    @Override
    public int preOrderListInsert(OrderList orderList) {
        int result =0;
        List<OrderCart> orderCarts = ocm.selectOrderCartList(orderList.getOlId());
        int totalPrice = 0;
        String olId=orderList.getOlId();
        olm.deletePreOrderList(olId);
        odm.deletePreOrderDetail(olId);

        for(OrderCart orderCart : orderCarts){
            int price = orderCart.getPrice();
            totalPrice+=price;
        }
        orderList.setOlPay(totalPrice);
        result = olm.preOrderListInsert(orderList);
        if(result==0)return result;

        for(OrderCart orderCart : orderCarts){
            OrderDetail orderDetail = new OrderDetail(olId,orderCart);
            result = odm.preOrderDetailInsert(orderDetail);
            if(result==0)return result;
        }
        return result;
    }

    @Override
    public int orderListInsert(OrderList orderList) {
        int result = 0;
        OrderList orderListSelect = olm.preOrderListSelect(orderList.getOlId());
            result = olm.orderListInsert(orderListSelect);
        if(result == 0)return result;
        List<OrderDetail> orderDetails = odm.preOrderDetailSelects(orderList.getOlId());
        for(OrderDetail orderDetail:orderDetails){
            result = odm.orderDetailInsert(orderDetail);
            if(result == 0)return result;
        }
        olm.deletePreOrderList(orderList.getOlId());
        ocm.deleteCartId(orderList.getOlId());
        return 1;
    }
}
