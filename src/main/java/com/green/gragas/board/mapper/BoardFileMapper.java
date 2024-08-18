package com.green.gragas.board.mapper;

import com.green.gragas.board.dto.BoardFile;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface BoardFileMapper {

    int insertBoardFile(BoardFile boardFile);
}
