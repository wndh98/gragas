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

    @Override
    public int boardWrite(String boardType, Board board) {
        if(board.getBNum()==0){
            int ref = bm.nextBNum(boardType);
            board.setBRef(ref);
        }else{
            board.setBRef(board.getBNum());
        }

        board.setBoardType(boardType);
        return bm.insertBoard(board);
    }

    @Override
    public Board boardSearch(String boardType, int bNum) {
        Board board=new Board();
        board.setBoardType(boardType);
        board.setBNum(bNum);
        return bm.selectBoard(board);
    }

    @Override
    public void increaseView(String boardType, int bNum) {
        Board board=new Board();
        board.setBoardType(boardType);
        board.setBNum(bNum);
        bm.increaseView(board);
    }
}
