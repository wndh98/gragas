package com.green.gragas.board.service;

import com.green.gragas.board.dto.Board;
import com.green.gragas.board.dto.SearchDTO;
import com.green.gragas.board.mapper.BoardMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BoardServiceImpl implements  BoardService{
    BoardMapper bm;
    @Autowired
    public BoardServiceImpl(BoardMapper bm){
        this.bm=bm;
    }

    @Override
    public List<Board> boardList(String boardType, int pageNum) {
        int totalCnt=bm.totalCnt(boardType);
        SearchDTO search = new SearchDTO(totalCnt,pageNum,boardType);
        return bm.selectList(search);
    }
}
