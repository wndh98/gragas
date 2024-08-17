package com.green.gragas.board.controller;

import com.green.gragas.board.dto.Board;
import com.green.gragas.board.service.BoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Arrays;
import java.util.List;

@RestController
public class BoardContoller {

    private BoardService bs;

    @Autowired
    private BoardContoller(BoardService bs) {
        this.bs = bs;
    }

    @GetMapping("/board/{boardType}/list/{pageNum}")
    public List<Board> getBoardList(@PathVariable("boardType") String boardType, @PathVariable("pageNum") int pageNum) {
        List<Board> list = bs.boardList(boardType, pageNum);
        return list;
    }

    @PostMapping("/board/{boardType}/write")
    public int writeBoard(@RequestBody Board board, @PathVariable("boardType") String boardType) {
        int result=0;

        System.out.println(board);
//        int result = bs.boardWrite(boardType, board);
        return result;
    }

    @GetMapping("/board/{boardType}/select/{bNum}")
    public Board getBoard(@PathVariable("boardType") String boardType,@PathVariable("bNum") int bNum) {
        Board board = bs.boardSearch(boardType, bNum);
        return board;
    }
    @GetMapping("/board/{boardType}/increaseView/{bNum}")
    public void increaseView(@PathVariable("boardType") String boardType,@PathVariable("bNum") int bNum){
        bs.increaseView(boardType,bNum);
    }
}
