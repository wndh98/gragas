package com.green.gragas.subscribe.service;

import com.green.gragas.subscribe.dto.SubscribeItem;
import com.green.gragas.subscribe.mapper.SubscribeMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SubscribeServiceImpl implements SubscribeService{
    @Autowired
    SubscribeMapper sm;
    public List<SubscribeItem> itemList() {return sm.itemList();}
}
