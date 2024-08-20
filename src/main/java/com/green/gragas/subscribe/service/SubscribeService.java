package com.green.gragas.subscribe.service;

import com.green.gragas.subscribe.dto.SubscribeItem;

import java.util.List;

public interface SubscribeService {
    List<SubscribeItem> itemList();
    SubscribeItem selectSubsItem(int siNum);
}
