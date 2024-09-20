package com.green.gragas.delivery.mappers;

import com.green.gragas.delivery.dto.Delivery;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface DeliveryMapper {
    int insert(Delivery delivery);
    List<Delivery> deliveryList(String userId);
    Delivery select(int mdNum);
    int update(Delivery delivery);
    int delete(int mdNum);
}
