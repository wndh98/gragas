package com.green.gragas.board.controller;

import com.green.gragas.board.dto.Board;
import com.green.gragas.board.service.BoardService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.net.http.HttpResponse;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

@RestController
public class BoardContoller {

    private BoardService bs;

    @Autowired
    private BoardContoller(BoardService bs) {
        this.bs = bs;
    }

    @GetMapping("/board/{boardType}/list/{pageNum}")
    public Map<String,Object> getBoardList(@PathVariable("boardType") String boardType, @PathVariable("pageNum") int pageNum) {
        Map<String,Object> map = bs.boardList(boardType, pageNum);
        return map;
    }

    @PostMapping("/board/{boardType}/write")
    public int writeBoard(@RequestPart("board") Board board, @PathVariable("boardType") String boardType,@RequestParam(value = "bFile", required = false) MultipartFile[] bFiles) {

        int result = bs.boardWrite(boardType, board,bFiles);
        return result;
    }

    @GetMapping("/board/{boardType}/select/{bNum}")
    public Board getBoard(@PathVariable("boardType") String boardType,@PathVariable("bNum") int bNum) {
        Board board = bs.boardSearch(boardType, bNum);
        return board;
    }
    //조회수 증가
    @GetMapping("/board/{boardType}/addView/{bNum}")
    public void addView(@PathVariable("boardType") String boardType, @PathVariable("bNum") int bNum) {
        bs.increaseView(boardType,bNum);
    }
}
