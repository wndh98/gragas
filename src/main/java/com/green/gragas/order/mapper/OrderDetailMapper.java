package com.green.gragas.order.mapper;

import com.green.gragas.order.dto.OrderDetail;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface OrderDetailMapper {
    int preOrderDetailInsert(OrderDetail orderDetail);

    void deletePreOrderDetail(String olId);

    List<OrderDetail> preOrderDetailSelects(String olId);

    int orderDetailInsert(OrderDetail orderDetail);
}
