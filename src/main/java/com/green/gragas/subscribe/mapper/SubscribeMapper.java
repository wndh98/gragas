package com.green.gragas.subscribe.mapper;

import com.green.gragas.subscribe.dto.SubscribeItem;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface SubscribeMapper {
    List<SubscribeItem> itemList();
    SubscribeItem selectSubsItem(int siNum);
    int subscribeInsert(SubscribeItem subscribeItem);
    int subscribeUpdate(SubscribeItem subscribeItem);
    int subscribeDelete(int siNum);
    List<SubscribeItem> titleList();
    int nextSiNum();
    int getPrice(int siNum);
    String getSiSubject(int siNum);
}
