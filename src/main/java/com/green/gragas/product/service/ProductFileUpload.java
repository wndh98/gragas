package com.green.gragas.product.service;

import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

public class ProductFileUpload {

    public static String fileUpload(MultipartFile file,String type, int num, String rootPath) throws IOException {
        if (file != null && !file.isEmpty()) {
            // Save file to the server
            String uploadDir = rootPath + "/"+type+"/" + num + "/";
            File directory = new File(uploadDir);
            if (!directory.exists()) {
                directory.mkdirs();
            }
            UUID uuid = UUID.randomUUID();
            String newFileName = uuid.toString() + file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf("."));
            File destFile = new File(uploadDir + newFileName);
            file.transferTo(destFile);
            return newFileName;
        }
        return null;
    }
}
