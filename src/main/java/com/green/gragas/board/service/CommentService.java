package com.green.gragas.board.service;

import com.green.gragas.board.dto.Comment;

import java.util.Map;

public interface CommentService {
    int commentWrite(Comment comment);

    Map<String, Object> commentList(String boardType, int pageNum);
}
