package com.green.gragas.subscribe.service;

import com.green.gragas.subscribe.dto.SubscribeFile;
import org.springframework.web.multipart.MultipartFile;

public interface SubscribeFileService {
    void saveSubscribeFile(SubscribeFile mainImgFile);
    void clearDirectory(String rootPath, int siNum, String fileType);
    void deleteFolder(String rootPath, int siNum);
}