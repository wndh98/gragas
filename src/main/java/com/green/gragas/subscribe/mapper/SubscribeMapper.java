package com.green.gragas.subscribe.mapper;

import com.green.gragas.subscribe.dto.SubscribeItem;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface SubscribeMapper {
    List<SubscribeItem> itemList();
}
