package com.green.gragas.board.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;

public class BoardFileUpload {
    public static List<String> fileUpload(MultipartFile[] files,String boardType,int bNum,String rootPath) throws IOException {
        List<String> fileNames=new ArrayList<String>();
        if (files != null && files.length > 0) {
            for (MultipartFile file : files) {
                // Save file to the server (you may want to save it to a specific location)
                String uploadDir = rootPath+"/board/"+boardType+"/"+bNum+"/";
                File directory = new File(uploadDir);
                if (!directory.exists()) {
                    directory.mkdirs();
                }
                UUID uuid =UUID.randomUUID();
                String newFileName=uuid.toString()+file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf("."));
                file.transferTo(new File(uploadDir + newFileName));
                fileNames.add(newFileName);
            }
        }
        return fileNames;
    }
}
