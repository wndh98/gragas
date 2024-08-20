package com.green.gragas.board.mapper;

import com.green.gragas.board.dto.BoardFile;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface BoardFileMapper {

    int insertBoardFile(BoardFile boardFile);

    List<BoardFile> selectList(BoardFile boardFile);
}
