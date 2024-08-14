package com.green.gragas.board.dto;

import lombok.Data;
import org.apache.ibatis.type.Alias;

import java.sql.Date;


@Data
@Alias("board")
public class Board {
    private int bNum;
    private int siNum;
    private int piNum;
    private String userId;
    private int bRef;
    private String bSubject;
    private String bWriter;
    private String bContent;
    private int bStar;
    private Date bRegist;
    private String boardType;
}