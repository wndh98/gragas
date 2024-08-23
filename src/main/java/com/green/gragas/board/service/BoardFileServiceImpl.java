package com.green.gragas.board.service;

import com.green.gragas.board.dto.BoardFile;
import com.green.gragas.board.mapper.BoardFileMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.core.io.support.ResourceRegion;
import org.springframework.http.ContentDisposition;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class BoardFileServiceImpl implements BoardFileService {
    @Autowired
    BoardFileMapper bfm;
    @Value("${project.upload.path}")
    private String rootPath;


    @Override
    public List<BoardFile> getFileList(String boardType, int bNum) {
        BoardFile boardFile = new BoardFile();
        boardFile.setBNum(bNum);
        boardFile.setBfBoard(boardType);
        boardFile.setBfRoot("/upload/board/" + boardType + "/" + bNum + "/");
        return bfm.selectList(boardFile);
    }

    @Override
    public ResponseEntity<Resource> donwloadFile(int bfNum) {
        BoardFile boardFile = bfm.selectBoardFile(bfNum);
        String pathStr = rootPath + boardFile.getBfRoot();
        System.out.println(pathStr);
        Path path = Paths.get(pathStr).resolve(boardFile.getBfRName()).normalize();
        try {
            Resource resource = new UrlResource(path.toUri());
            if (!resource.exists()) {
                throw new RuntimeException("파일을 찾을 수 없습니다: ");
            }
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                    .body(resource);
        } catch (MalformedURLException e) {
            throw new RuntimeException(e);
        }

    }

    @Override
    public void deleteFolder(String boardType, List<Integer> bNum) {
        BoardFile boardFile = new BoardFile();
        boardFile.setBfBoard(boardType);
        for (Integer b : bNum) {
            String filePath = rootPath + "/board/" + boardType + "/" + b;
            File folder = new File(filePath);
            if (folder.exists()) {
                File[] files = folder.listFiles();
                for (File file : files) {
                    file.delete(); // 하위 파일 삭제
                }
                folder.delete();
            }
            boardFile.setBNum(b);
            bfm.deleteBoardFile(boardFile);
        }
    }

    @Override
    public void deleteFile(String boardType, int bNum, List<Integer> bFileNum) {
        BoardFile boardFile = new BoardFile();
        boardFile.setBfBoard(boardType);
        boardFile.setBNum(bNum);
        if(bFileNum!=null && bFileNum.size()!=0) {
            for (Integer bfOrder : bFileNum) {
                boardFile.setBfOrder(bfOrder);
                BoardFile delBoardFile = bfm.selectBoardFileOrder(boardFile);
                String filePath = rootPath + "/board/" + boardType + "/" + bNum + "/" + delBoardFile.getBfRName();
                File file = new File(filePath);
                if (file.exists()) {
                    file.delete();
                }
                bfm.deleteBoardFileOrder(delBoardFile);
            }
        }
    }
}
