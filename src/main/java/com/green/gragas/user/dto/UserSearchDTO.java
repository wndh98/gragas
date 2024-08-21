package com.green.gragas.user.dto;

import lombok.Data;
import org.apache.ibatis.type.Alias;

@Data
@Alias("userSearch")
public class UserSearchDTO {
    private int pageNum = 1;             // 현재 페이지 번호
    private int pageSize = 10;       // 페이지당 출력할 데이터 개수
    private int blockSize = 10;         // 화면 하단에 출력할 페이지 사이즈
    private int startPage;        // 리스트 추출 시작
    private int endPage;          // 리스트 추출 끝
    private int startBlock;       // 시작 페이지 번호
    private int endBlock;         // 끝 페이지번호
    private int totalCnt;
    private int totalBlock;
    private String keyword;       // 검색 키워드
    private String searchType;    // 검색 유형
    private String orderType="user_regist";
    private String orderAsc="desc";

    public UserSearchDTO(int totalCnt) {
        this.totalCnt = totalCnt;
        setSearch();
    }

    public UserSearchDTO(int totalCnt, int pageNum) {
        this.totalCnt = totalCnt;
        this.pageNum = pageNum;
        setSearch();
    }

    public void setSearch() {
        totalBlock = totalCnt / pageSize + 1;
        startBlock = (pageNum / 10) * blockSize + 1;
        endBlock = startBlock + blockSize - 1;
        endBlock = Math.min(endBlock, totalBlock);
        startPage = (pageNum - 1) * pageSize;
        endPage = startPage + pageSize;
    }

}
