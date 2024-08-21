package com.green.gragas.subscribe.service;

import com.green.gragas.subscribe.dto.SubscribeItem;
import com.green.gragas.subscribe.mapper.SubscribeMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
public class SubscribeServiceImpl implements SubscribeService{
    @Autowired
    SubscribeMapper sm;
    public List<SubscribeItem> itemList() {return sm.itemList();}
    public SubscribeItem selectSubsItem(int siNum) {return sm.selectSubsItem(siNum);}
    public int subscribeInsert(SubscribeItem subscribeItem) {return sm.subscribeInsert(subscribeItem);}
    public int subscribeUpdate(SubscribeItem subscribeItem) {return sm.subscribeUpdate(subscribeItem); }
    public int subscribeDelete(int siNum) {return sm.subscribeDelete(siNum);}
    public List<SubscribeItem> titleList() { return sm.titleList();}
    /*public int subscribeInsert(String siTitle, SubscribeItem subscribeItem, MultipartFile siMainImg, MultipartFile siDesImg) {
        try {
            // UUID 생성 및 설정
            String uuid = UUID.randomUUID().toString();
            subscribeItem.setSiUuid(uuid); // 구독 아이템에 UUID 설정

            // 구독 아이템을 데이터베이스에 삽입하여 auto_increment 값을 가져옵니다.
            subscribeItem.setSiTitle(siTitle);
            int result = sim.insertSubscribeItem(subscribeItem);
            if (result == 0) {
                return -1; // 구독 아이템 삽입 실패 시 -1 리턴
            }

            // 삽입 후, 구독 아이템 번호를 가져옵니다.
            int siNum = subscribeItem.getSiNum();  // 구독 아이템 번호는 삽입 시 자동 생성됩니다.

            // 메인 이미지 업로드 처리
            if (siMainImg != null && !siMainImg.isEmpty()) {
                String mainImgName = BoardFileUpload.fileUpload(siMainImg, "subscribe", siNum, rootPath, uuid);
                SubscribeFile mainImgFile = new SubscribeFile();
                mainImgFile.setSiNum(siNum);
                mainImgFile.setSfType("MAIN");  // 이미지 타입을 구분하기 위해
                mainImgFile.setSfRoot("/upload/subscribe/" + siNum + "/main/");
                mainImgFile.setSfRName(mainImgName);
                mainImgFile.setSfOName(siMainImg.getOriginalFilename());
                if (sfm.insertSubscribeFile(mainImgFile) == 0) return -1; // 파일 업로드 실패 시 -1 리턴
            }

            // 설명 이미지 업로드 처리
            if (siDesImg != null && !siDesImg.isEmpty()) {
                String desImgName = BoardFileUpload.fileUpload(siDesImg, "subscribe", siNum, rootPath, uuid);
                SubscribeFile desImgFile = new SubscribeFile();
                desImgFile.setSiNum(siNum);
                desImgFile.setSfType("DES");  // 이미지 타입을 구분하기 위해
                desImgFile.setSfRoot("/upload/subscribe/" + siNum + "/description/");
                desImgFile.setSfRName(desImgName);
                desImgFile.setSfOName(siDesImg.getOriginalFilename());
                if (sfm.insertSubscribeFile(desImgFile) == 0) return -1; // 파일 업로드 실패 시 -1 리턴
            }

        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        return 1;  // 성공적으로 모든 작업이 완료되었을 경우 1 리턴
    }*/
}
