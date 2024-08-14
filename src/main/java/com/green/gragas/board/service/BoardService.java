package com.green.gragas.board.service;

import com.green.gragas.board.dto.Board;

import java.util.List;

public interface BoardService {
    List<Board> boardList(String boardType, int pageNum);
}
