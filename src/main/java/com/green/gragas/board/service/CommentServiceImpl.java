package com.green.gragas.board.service;

import com.green.gragas.board.dto.Comment;
import com.green.gragas.board.dto.SearchDTO;
import com.green.gragas.board.mapper.CommentMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class CommentServiceImpl implements CommentService {
    @Autowired
    private CommentMapper cm;

    @Override
    public int commentWrite(Comment comment) {
        return cm.insertComment(comment);
    }

    @Override
    public Map<String, Object> commentList(String boardType, int pageNum,int bNum) {
        Map<String, Object> map = new HashMap<>();
        int totalCnt = cm.totalCnt(boardType);
        SearchDTO search = new SearchDTO(totalCnt, pageNum, boardType);
        search.setBNum(bNum);
        map.put("searchDto", search);
        map.put("commentList", cm.selectList(search));
        return map;
    }

    @Override
    public int deleteComment(Comment comment) {

        return cm.deleteComment(comment);
    }

    @Override
    public Comment getComment(Comment comment) {
        return cm.selectComment(comment);
    }

    @Override
    public int commentUpdate(Comment comment) {
        return cm.updateComment(comment);
    }

    @Override
    public void deleteCommentBNum(String boardType, List<Integer> bNum) {
        Map<String, Object> map = new HashMap<>();
        map.put("boardType", boardType);
        for (int b : bNum) {
            map.put("bNum", b);
            cm.deleteCommentBNum(map);
        }
    }


}
