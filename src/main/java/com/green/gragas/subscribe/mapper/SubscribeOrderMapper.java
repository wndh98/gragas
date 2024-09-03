package com.green.gragas.subscribe.mapper;

import com.green.gragas.subscribe.dto.SubscribeOrder;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface SubscribeOrderMapper {

    int insertOrderInfo(SubscribeOrder subscribeOrder);
    int soSelectNum(String userId);
    List<SubscribeOrder> soSelectList(int soNum);
    int orderSelect(SubscribeOrder subscribeOrder);
}
