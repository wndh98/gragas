package com.green.gragas.subscribe.service;

import com.green.gragas.subscribe.dto.SubscribeItem;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface SubscribeService {
    List<SubscribeItem> itemList();
    SubscribeItem selectSubsItem(int siNum);
    int subscribeInsert(SubscribeItem subscribeItem);
    int subscribeUpdate(SubscribeItem subscribeItem);
    int subscribeDelete(int siNum);
    List<SubscribeItem> titleList();
    int subscribeUploadFile(SubscribeItem subscribeItem, MultipartFile siMainImg, MultipartFile siDesImg,String rootPath);
    int nextSiNum();
    int getPrice(int siNum);
    String getSiSubject(int siNum);
}
