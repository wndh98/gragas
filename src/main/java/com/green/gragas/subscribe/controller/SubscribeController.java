package com.green.gragas.subscribe.controller;

import com.green.gragas.subscribe.dto.SubscribeItem;
import com.green.gragas.subscribe.service.SubscribeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class SubscribeController {
    @Autowired
    private SubscribeService ss;

    @GetMapping("/subscribe/itemList")
    public List<SubscribeItem> itemList(){
        List<SubscribeItem> sublist = ss.itemList();
        return sublist;
    }
    @GetMapping("/subscribe/description/{siNum}")
    public SubscribeItem selectSubsItem(@PathVariable int siNum){
            SubscribeItem sItem = ss.selectSubsItem(siNum);
            return sItem;
    }


}
