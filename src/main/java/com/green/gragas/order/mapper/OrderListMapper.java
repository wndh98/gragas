package com.green.gragas.order.mapper;

import com.green.gragas.order.dto.OrderList;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface OrderListMapper {
    int preOrderListInsert(OrderList orderList);

    void deletePreOrderList(String olId);

    OrderList preOrderListSelect(String olId);

    int orderListInsert(OrderList orderListSelect);

    List<OrderList> selectOrderList(Map<String,Object> map);

    int ordersCnt(String olStatus);
}
