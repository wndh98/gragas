package com.green.gragas.board.dto;

import lombok.Data;
import org.apache.ibatis.type.Alias;

import java.sql.Date;

@Data
@Alias("comment")
public class Comment {
    	private int cNum;
    	private int bNum;
		private String userId;
		private String cContent;
		private Date cRegist;
}
