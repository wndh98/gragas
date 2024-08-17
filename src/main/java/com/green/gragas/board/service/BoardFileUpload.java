package com.green.gragas.board.service;

import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

public class BoardFileUpload {
    public static String fileUpload(MultipartFile[] files,String boardType,int bNum) throws IOException {

        if (files != null && files.length > 0) {
            for (MultipartFile file : files) {
                // Save file to the server (you may want to save it to a specific location)
                String uploadDir = "uploads/"+boardType+"/"+bNum+"/";
                File directory = new File(uploadDir);
                if (!directory.exists()) {
                    directory.mkdirs();
                }
                UUID uuid =UUID.randomUUID();

                file.transferTo(new File(uploadDir + file.getOriginalFilename()));
            }
        }
        return "";
    }
}
