package com.green.gragas.subscribe.mapper;

import com.green.gragas.subscribe.dto.SubscribeFile;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface SubscribeFileMapper {

    int insertSubscribeFile(SubscribeFile subscribeFile);
}
