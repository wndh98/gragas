package com.green.gragas.delivery.mappers;

import com.green.gragas.delivery.dto.Delivery;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface DeliveryMapper {

    int insert(Delivery delivery);
}
