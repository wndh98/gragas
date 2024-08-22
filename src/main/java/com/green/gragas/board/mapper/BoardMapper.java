package com.green.gragas.board.mapper;

import com.green.gragas.board.dto.Board;
import com.green.gragas.board.dto.SearchDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface BoardMapper {
    int totalCnt(String boardType);
    int nextBNum(String boardType);
    List<Board> selectList(SearchDTO search);

    int insertBoard(Board board);

    Board selectBoard(Board board);

    int increaseView(Board board);

    int deleteBoard(Map<String, Object> map);

    int updateBoard(Board board);
}
