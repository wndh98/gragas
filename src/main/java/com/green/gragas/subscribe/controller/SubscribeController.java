package com.green.gragas.subscribe.controller;

import com.green.gragas.board.dto.Board;
import com.green.gragas.subscribe.dto.SubscribeItem;
import com.green.gragas.subscribe.service.SubscribeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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
    @GetMapping("/subscribe/titles")
    public List<SubscribeItem> titleList(){
        List<SubscribeItem> titleList = ss.titleList();
        return titleList;
    }
    /*@PostMapping("/subscribe/subscribeInsert")
    public int subscribeInsert(@RequestPart("subscribeItem") SubscribeItem subscribeItem, @PathVariable("siTitle") String siTitle,
                               @RequestParam(value = "siMainImg", required = false) MultipartFile siMainImg,@RequestParam(value = "siDesImg", required = false) MultipartFile siDesImg) {
        int result = ss.subscribeInsert(siTitle, subscribeItem,siMainImg,siDesImg);
        return result;
    }*/
    @PostMapping("/subscribe/subscribeInsert")
    public int subscribeInsert(@RequestPart("subscribeItem") SubscribeItem subscribeItem) {
            int result = ss.subscribeInsert(subscribeItem);
            return result;
    }
    @PostMapping("/subscribe/adminSubsUpdate")
    public int subscribeUpdate(@RequestPart("subscribeItem") SubscribeItem subscribeItem){
        int result = ss.subscribeUpdate(subscribeItem);
        return result;
    }
    @PostMapping("/subscribe/deleteSubscribe/{siNum}")
    public int subscribeDelete(@PathVariable int siNum){
        System.out.println(siNum);
        int result = ss.subscribeDelete(siNum);
        return result;
    }
}
