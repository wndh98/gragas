package com.green.gragas.order.mapper;

import com.green.gragas.order.dto.OrderCart;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface OrderCartMapper {

    int insertCart(OrderCart orderCart);

    int updateCart(OrderCart orderCart);

    int deleteCart(int ocNum);

    List<OrderCart> selectOrderCartList(String ocId);

    OrderCart selectOrderCart(OrderCart orderCart);
}
