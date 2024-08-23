package com.green.gragas.board.controller;

import com.green.gragas.board.dto.Board;
import com.green.gragas.board.dto.BoardFile;
import com.green.gragas.board.service.BoardFileService;
import com.green.gragas.board.service.BoardService;
import com.green.gragas.board.service.CommentService;
import com.green.gragas.board.service.CommentServiceImpl;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.ResourceRegion;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.net.http.HttpResponse;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

@RestController
public class BoardContoller {

    private BoardService bs;
    private BoardFileService bfs;
    private CommentService cs;
    @Autowired
    private BoardContoller(BoardService bs, BoardFileService bfs,CommentService cs) {
        this.bs = bs;
        this.bfs = bfs;
        this.cs = cs;
    }

    @GetMapping("/board/{boardType}/list/{pageNum}")
    public Map<String, Object> getBoardList(@PathVariable("boardType") String boardType, @PathVariable("pageNum") int pageNum) {
        Map<String, Object> map = bs.boardList(boardType, pageNum);
        return map;
    }


    @GetMapping("/board/{boardType}/select/{bNum}")
    public Board getBoard(@PathVariable("boardType") String boardType, @PathVariable("bNum") int bNum) {
        Board board = bs.boardSearch(boardType, bNum);
        return board;
    }

    //조회수 증가
    @GetMapping("/board/{boardType}/addView/{bNum}")
    public void addView(@PathVariable("boardType") String boardType, @PathVariable("bNum") int bNum) {
        bs.increaseView(boardType, bNum);
    }

    @GetMapping("/board/{boardType}/fileList/{bNum}")
    public List<BoardFile> getFileList(@PathVariable("boardType") String boardType, @PathVariable("bNum") int bNum) {
        List<BoardFile> list = bfs.getFileList(boardType, bNum);
        return list;
    }

    @GetMapping("/board/download/{bfNum}")
    public ResponseEntity<Resource> downloadFile(@PathVariable("bfNum") int bfNum) {
        return bfs.donwloadFile(bfNum);
    }
    @PostMapping("/board/{boardType}/delete")
    public int deleteBoard(@PathVariable("boardType") String boardType,@RequestBody List<Integer> bNum){
        int result=0;
        bfs.deleteFolder(boardType,bNum);
        cs.deleteCommentBNum(boardType,bNum);
        result = bs.deleteBoard(boardType,bNum);
        return result;
    }

    @PostMapping("/board/{boardType}/write")
    public int writeBoard(@RequestPart("board") Board board, @PathVariable("boardType") String boardType, @RequestParam(value = "bFile", required = false) MultipartFile[] bFiles,@RequestParam(value="bFileNum",required = false) int[] bFileNum) {
//        System.out.println(Arrays.toString(bFileNum));
//        return 0;
        int result = bs.boardWrite(boardType, board, bFiles,bFileNum);
        return result;
    }

    @PostMapping("/board/{boardType}/update/{bNum}")
    public int updateBoard(@RequestPart("board") Board board, @PathVariable("boardType") String boardType, @RequestParam(value = "bFile", required = false) MultipartFile[] bFiles,@RequestParam(value="bFileNum",required = false) Integer[] bFileNum){
        List<Integer> bfileList=null;
        if(bFileNum!=null && bFileNum.length!=0) {
            bfileList = Arrays.asList(bFileNum);
            bfs.deleteFile(boardType,board.getBNum(),bfileList);
        }
        int result = bs.updateBoard(boardType,board,bFiles,bfileList);
        return result;
    }

}
