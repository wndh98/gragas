package com.green.gragas.subscribe.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import org.apache.ibatis.type.Alias;

@Data
@Alias("subscribeFile")
public class SubscribeFile {
    @JsonProperty("siNum")
    private int siNum;          // 구독 아이템 번호
    private String sfType;      // 파일 타입 (예: MAIN, DES)
    private String sfRoot;
    @JsonProperty("sfRName")// 파일이 저장된 디렉토리 경로
    private String sfRName;     // 실제 저장된 파일 이름
    @JsonProperty("sfOName")
    private String sfOName;     // 원래 파일 이름
}