package com.green.gragas.board.service;

import com.green.gragas.board.dto.Board;
import com.green.gragas.board.dto.BoardFile;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

public interface BoardService {
    Map<String,Object> boardList(String boardType, int pageNum);

    int boardWrite(String boardType, Board board, MultipartFile[] bFiles);

    Board boardSearch(String boardType, int bNum);

    void increaseView(String boardType, int bNum);

    List<BoardFile> getFileList(String boardType, int bNum);
}
