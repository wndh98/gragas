package com.green.gragas.board.service;

import com.green.gragas.board.dto.Board;
import com.green.gragas.board.dto.BoardFile;
import com.green.gragas.board.dto.SearchDTO;
import com.green.gragas.board.mapper.BoardFileMapper;
import com.green.gragas.board.mapper.BoardMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public class BoardServiceImpl implements  BoardService{
    BoardMapper bm;
    BoardFileMapper bfm;
    @Autowired
    public BoardServiceImpl(BoardMapper bm, BoardFileMapper bfm){
        this.bm=bm;
        this.bfm=bfm;
    }

    @Override
    public List<Board> boardList(String boardType, int pageNum) {
        int totalCnt=bm.totalCnt(boardType);
        SearchDTO search = new SearchDTO(totalCnt,pageNum,boardType);
        return bm.selectList(search);
    }

    @Override
    public int boardWrite(String boardType, Board board, MultipartFile[] bFiles) {
        int bNum = bm.nextBNum(boardType);
        if(board.getBNum()==0){
            board.setBRef(bNum);
        }else{
            bNum=board.getBNum();
            board.setBRef(bNum);
        }
        try {
            BoardFileUpload.fileUpload(bFiles,boardType,bNum);
            BoardFile boardFile = new BoardFile();
            boardFile.setBNum(board.getBNum());
            boardFile.setBfBoard(boardType);
            boardFile.setBfRoot();
            bfm.insertBoardFile();
        } catch (IOException e) {
            throw new RuntimeException(e);
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
