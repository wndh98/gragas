package com.green.gragas.subscribe.controller;

import com.green.gragas.subscribe.dto.SubscribeItem;
import com.green.gragas.subscribe.service.SubscribeFileService;
import com.green.gragas.subscribe.service.SubscribeFileUpload;
import com.green.gragas.subscribe.service.SubscribeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.List;

@RestController
public class SubscribeController {
    @Autowired
    private SubscribeService ss;
    @Autowired
    private SubscribeFileService sfs;
    @Value("${project.upload.path}")
    private String rootPath;

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

    @PostMapping("/subscribe/subscribeInsert")
    public int subscribeUploadFile(
            @RequestPart("subscribeItem") SubscribeItem subscribeItem,
            @RequestPart("siMainImg") MultipartFile siMainImg,
            @RequestPart("siDesImg") MultipartFile siDesImg) throws IOException {
            int siNum = ss.nextSiNum();
            String mainImgFileName = SubscribeFileUpload.fileUpload(siMainImg,siNum,rootPath);
            String desImgFileName = SubscribeFileUpload.fileUpload(siDesImg,siNum, rootPath);
            subscribeItem.setSiMainImg(mainImgFileName);
            subscribeItem.setSiDesImg(desImgFileName);
            // DB에 저장
            int result = ss.subscribeInsert(subscribeItem);
            return result;

    }

    @PostMapping("/subscribe/adminSubsUpdate")
    public int subscribeUpdate(
            @RequestPart("subscribeItem") SubscribeItem subscribeItem,
            @RequestPart(value = "siMainImg", required = false) MultipartFile siMainImg,
            @RequestPart(value = "siDesImg", required = false) MultipartFile siDesImg) throws IOException {
        System.out.println(subscribeItem.getSiNum());
        if(siMainImg!=null&&siDesImg!=null){
            sfs.deleteFolder(rootPath,subscribeItem.getSiNum());
        }else if(siMainImg!=null&&siDesImg==null) {
            sfs.clearDirectory(rootPath, subscribeItem.getSiNum(),"siMainImg");
        }else if(siDesImg!=null&&siMainImg==null) {
            sfs.clearDirectory(rootPath, subscribeItem.getSiNum(),"siDesImg");
        }
        if(siMainImg!=null&&siDesImg!=null){
            String mainImgFileName = SubscribeFileUpload.fileUpload(siMainImg, subscribeItem.getSiNum(), rootPath);
            String desImgFileName = SubscribeFileUpload.fileUpload(siDesImg, subscribeItem.getSiNum(), rootPath);
            subscribeItem.setSiMainImg(mainImgFileName);
            subscribeItem.setSiDesImg(desImgFileName);
        }
        int result = ss.subscribeUpdate(subscribeItem);
        return result;
    }
    @PostMapping("/subscribe/deleteSubscribe/{siNum}")
    public int subscribeDelete(@PathVariable int siNum){
        sfs.deleteFolder(rootPath,siNum);
        int result = ss.subscribeDelete(siNum);
        return result;
    }
}
