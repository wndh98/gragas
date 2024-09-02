package com.green.gragas.subscribe.service;

import com.green.gragas.subscribe.dto.SubscribeFile;
import com.green.gragas.subscribe.mapper.SubscribeFileMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.io.File;

@Service
public class SubscribeFileServiceImpl implements SubscribeFileService{
    @Autowired
    private SubscribeFileMapper sfm;
    @Override
    public void saveSubscribeFile(SubscribeFile subscribeFile) {
        sfm.insertSubscribeFile(subscribeFile);
    }
    public void clearDirectory(String rootPath, int siNum, String fileType) {
        // Define the directory path for the images
        String directoryPath = rootPath + "/subscribe/" + siNum + "/";

        // Define file name patterns (e.g., siMainImg, siDesImg)
        String filePattern = fileType != null ? fileType + "*" : "*";

        // Delete existing files in the directory matching the pattern
        File directory = new File(directoryPath);
        if (directory.exists()) {
            File[] files = directory.listFiles((dir, name) -> name.startsWith(filePattern));
            if (files != null) {
                for (File file : files) {
                    if (!file.isDirectory()) {
                        file.delete(); // Delete each file matching the pattern
                    }
                }
            }
        } else {
            // Create the directory if it does not exist
            directory.mkdirs();
        }
    }
    public void deleteFolder(String rootPath, int siNum) {
        // 삭제할 폴더의 경로를 정의합니다.
        String directoryPath = rootPath + "/subscribe/" + siNum + "/";

        // 디렉토리를 나타내는 File 객체를 생성합니다.
        File directory = new File(directoryPath);

        // 디렉토리가 존재하는지 확인합니다.
        if (directory.exists()) {
            // 모든 파일과 하위 디렉토리를 재귀적으로 삭제합니다.
            deleteRecursively(directory);
        } else {
            System.out.println("디렉토리가 존재하지 않습니다: " + directoryPath);
        }
    }

    private void deleteRecursively(File file) {
        // 파일이 디렉토리인 경우, 내부의 모든 파일을 삭제합니다.
        if (file.isDirectory()) {
            File[] files = file.listFiles();
            if (files != null) {
                for (File f : files) {
                    // 재귀적으로 파일/폴더를 삭제합니다.
                    deleteRecursively(f);
                }
            }
        }
        // 파일 또는 빈 디렉토리를 삭제합니다.
        file.delete();
    }

}
