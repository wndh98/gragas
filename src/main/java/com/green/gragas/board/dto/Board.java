package com.green.gragas.board.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import org.apache.ibatis.type.Alias;

import java.sql.Date;


@Data
@Alias("board")
public class Board {
    @JsonProperty("bNum")
    private int bNum;
    private int siNum;
    private int piNum;
    private String userId;
    @JsonProperty("bRef")
    private int bRef;
    @JsonProperty("bSubject")
    private String bSubject;
    @JsonProperty("bWriter")
    private String bWriter;
    @JsonProperty("bContent")
    private String bContent;
    @JsonProperty("bStar")
    private int bStar;
    private Date bRegist;
    private String boardType;
}