package com.green.gragas.subscribe.mapper;

import com.green.gragas.subscribe.dto.SubscribeOrder;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface SubscribeOrderMapper {
    public int insertOrderInfo(SubscribeOrder subscribeOrder);
}
