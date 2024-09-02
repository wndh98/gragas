package com.green.gragas.board.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import org.apache.ibatis.type.Alias;

import java.sql.Date;

@Data
@Alias("comment")
public class Comment {
    @JsonProperty("cNum")
    private int cNum;
    @JsonProperty("bNum")
    private int bNum;
    private String userId;
    @JsonProperty("cContent")
    private String cContent;
    @JsonProperty("cRegist")
    private Date cRegist;
    private String boardType;
}
