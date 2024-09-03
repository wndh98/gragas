package com.green.gragas.subscribe.mapper;

import com.green.gragas.subscribe.dto.SubscribeOrder;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface SubscribeOrderMapper {

    int insertPreOrderInfo(SubscribeOrder subscribeOrder);
    String soSelectId(String userId);
    List<SubscribeOrder> soSelectList(int soNum);
    SubscribeOrder subsOrderSelectId(String soId);
    void subsPreOrderDelete(String soId);
    int insertOrderInfo(SubscribeOrder subsOrderSelect);
    int orderSelect(SubscribeOrder subscribeOrder);
}
