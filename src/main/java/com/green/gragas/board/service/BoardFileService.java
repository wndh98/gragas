package com.green.gragas.board.service;

import com.green.gragas.board.dto.BoardFile;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.ResourceRegion;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;

import java.io.IOException;
import java.nio.file.Path;
import java.util.List;

public interface BoardFileService {
    HttpHeaders getHttpHeader(Path path, String fileName) throws IOException;
    List<BoardFile> getFileList(String boardType, int bNum);

    ResponseEntity<Resource> donwloadFile(int bfNum);
}
