package com.green.gragas.board.dto;

import lombok.Data;
import org.apache.ibatis.type.Alias;

import java.sql.Date;

@Data
@Alias("boardFile")
public class BoardFile {
    private int bfNum;
    private int bNum;
    private String bfRName;
    private String bfOName;
    private String bfRoot;
    private String bfBoard;
    private Date bfRegist;
}
