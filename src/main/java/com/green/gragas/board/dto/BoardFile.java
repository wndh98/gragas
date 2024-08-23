package com.green.gragas.board.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import org.apache.ibatis.type.Alias;

import java.sql.Date;

@Data
@Alias("boardFile")
public class BoardFile {
    @JsonProperty("bfNum")
    private int bfNum;
    @JsonProperty("bNum")
    private int bNum;
    @JsonProperty("bfRName")
    private String bfRName;
    @JsonProperty("bfOName")
    private String bfOName;
    private String bfRoot;
    private String bfBoard;
    private Date bfRegist;
    private int bfOrder;
}
