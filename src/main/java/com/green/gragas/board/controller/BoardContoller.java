package com.green.gragas.board.controller;

import com.green.gragas.board.dto.Board;
import com.green.gragas.board.service.BoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class BoardContoller {

    private BoardService bs;
    @Autowired
    private BoardContoller(BoardService bs){
        this.bs=bs;
    }

    @GetMapping("/board/{boardType}/list/{pageNum}")
    public List<Board> getBoardList(@PathVariable("boardType") String boardType,@PathVariable("pageNum") int pageNum){
        List<Board> list = bs.boardList(boardType,pageNum);
        return list;
    }
}
