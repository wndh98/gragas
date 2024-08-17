package com.green.gragas.board.service;

import com.green.gragas.board.dto.Board;

import java.util.List;

public interface BoardService {
    List<Board> boardList(String boardType, int pageNum);

    int boardWrite(String boardType, Board board);

    Board boardSearch(String boardType, int bNum);

    void increaseView(String boardType, int bNum);
}
