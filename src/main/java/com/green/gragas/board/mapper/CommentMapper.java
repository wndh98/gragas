package com.green.gragas.board.mapper;

import com.green.gragas.board.dto.Comment;
import com.green.gragas.board.dto.SearchDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface CommentMapper {
    int insertComment(Comment comment);

    int totalCnt(String boardType);

    List<Comment> selectList(SearchDTO search);

    int deleteComment(Comment comment);

    Comment selectComment(Comment comment);

    int updateComment(Comment comment);

    int deleteCommentBNum(Map<String, Object> map);
}
