package com.green.gragas.board.service;

import com.green.gragas.board.dto.Comment;

import java.util.List;
import java.util.Map;

public interface CommentService {
    int commentWrite(Comment comment);

    Map<String, Object> commentList(String boardType, int pageNum,int bNum);

    int deleteComment(Comment comment);

    Comment getComment(Comment comment);

    int commentUpdate(Comment comment);

    void deleteCommentBNum(String boardType,List<Integer> bNum);
}
