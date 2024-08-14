package com.green.gragas.board.mapper;

import com.green.gragas.board.dto.Board;
import com.green.gragas.board.dto.SearchDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface BoardMapper {
    int totalCnt(String boardType);

    List<Board> selectList(SearchDTO search);
}
