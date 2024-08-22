package com.green.gragas.subscribe.service;

import com.green.gragas.subscribe.dto.SubscribeFile;
import com.green.gragas.subscribe.mapper.SubscribeFileMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public class SubscribeFileServiceImpl implements SubscribeFileService{
    @Autowired
    private SubscribeFileMapper sfm;
    @Override
    public void saveSubscribeFile(SubscribeFile subscribeFile) {
        sfm.insertSubscribeFile(subscribeFile);
    }
}
