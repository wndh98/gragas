package com.green.gragas.subscribe.controller;

import com.green.gragas.subscribe.dto.SubscribeItem;
import com.green.gragas.subscribe.service.SubscribeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class SubscribeController {
    @Autowired
    private SubscribeService ss;

    @GetMapping("/subscribe/productList")
    public List<SubscribeItem> itemList(){
        List<SubscribeItem> list = ss.itemList();
        return list;
    };

}
