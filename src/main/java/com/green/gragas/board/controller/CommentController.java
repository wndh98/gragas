package com.green.gragas.board.controller;

import com.green.gragas.board.dto.Comment;
import com.green.gragas.board.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
public class CommentController {
    @Autowired
    CommentService cs;

    @PostMapping("/comment/{boardType}/write")
    public int writeComment(@PathVariable("boardType") String boardType, @RequestBody Comment comment) {
        int result = 0;
        comment.setBoardType(boardType);
        result = cs.commentWrite(comment);
        return result;
    }
    @PostMapping("/comment/{boardType}/update/{cNum}")
    public int writeComment(@PathVariable("boardType") String boardType,@PathVariable("cNum") int cNum, @RequestBody Comment comment) {
        int result = 0;
        comment.setBoardType(boardType);
        comment.setCNum(cNum);
        result = cs.commentUpdate(comment);
        return result;
    }
    @GetMapping("/comment/{boardType}/list/{pageNum}/{bNum}")
    public  Map<String, Object> getCommentList(@PathVariable("boardType") String boardType, @PathVariable("pageNum") int pageNum, @PathVariable("bNum") int bNum) {
        Map<String, Object> map = cs.commentList(boardType, pageNum,bNum);
        return map;
    }
    @GetMapping("/comment/{boardType}/select/{cNum}")
    public Comment getComment(@PathVariable("boardType") String boardType,@PathVariable("cNum") int cNum){
        Comment comment=new Comment();
        comment.setBoardType(boardType);
        comment.setCNum(cNum);
        Comment findComment = cs.getComment(comment);
        return findComment;
    }
    @GetMapping("/comment/{boardType}/delete/{cNum}")
    public int deleteComment(@PathVariable("boardType") String boardType,@PathVariable("cNum") int cNum){
        Comment comment=new Comment();
        comment.setBoardType(boardType);
        comment.setCNum(cNum);
        int result=cs.deleteComment(comment);
        return result;
    }

}
