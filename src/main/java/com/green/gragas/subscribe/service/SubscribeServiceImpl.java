package com.green.gragas.subscribe.service;

import com.green.gragas.subscribe.dto.SubscribeFile;
import com.green.gragas.subscribe.dto.SubscribeItem;
import com.green.gragas.subscribe.mapper.SubscribeMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

@Service
public class SubscribeServiceImpl implements SubscribeService{
    @Autowired
    private SubscribeMapper sm;
    @Autowired
    private SubscribeFileService sfs;

    public List<SubscribeItem> itemList() {return sm.itemList();}
    public SubscribeItem selectSubsItem(int siNum) {return sm.selectSubsItem(siNum);}
    public int subscribeInsert(SubscribeItem subscribeItem) {return sm.subscribeInsert(subscribeItem);}
    public int subscribeUpdate(SubscribeItem subscribeItem) {return sm.subscribeUpdate(subscribeItem); }
    public int subscribeDelete(int siNum) {return sm.subscribeDelete(siNum);}
    public List<SubscribeItem> titleList() { return sm.titleList();}
    public int nextSiNum() {return sm.nextSiNum(); }
    public int getPrice(int siNum) {return sm.getPrice(siNum);}
    public String getSiSubject(int siNum) {return sm.getSiSubject(siNum);}
    public int subscribeUploadFile(SubscribeItem subscribeItem, MultipartFile siMainImg, MultipartFile siDesImg, String rootPath) {
        try {
            // Insert the subscribe item into the database
            sm.subscribeInsert(subscribeItem);

            // Get the generated ID for the new subscribe item
            int siNum = subscribeItem.getSiNum(); // The ID should be set by the DB on insert

            // Upload files and get the new filenames
            String mainImgFileName = SubscribeFileUpload.fileUpload(siMainImg,siNum, rootPath);
            String desImgFileName = SubscribeFileUpload.fileUpload(siDesImg, siNum, rootPath);
            System.out.println(mainImgFileName);
            System.out.println(desImgFileName);
            // Save file info in the database
            if (mainImgFileName != null) {
                SubscribeFile mainImgFile = new SubscribeFile();
                mainImgFile.setSiNum(siNum);
                mainImgFile.setSfType("MAIN");
                mainImgFile.setSfRoot(rootPath);
                mainImgFile.setSfRName(mainImgFileName);
                mainImgFile.setSfOName(siMainImg.getOriginalFilename());
                sfs.saveSubscribeFile(mainImgFile);
            }

            if (desImgFileName != null) {
                SubscribeFile desImgFile = new SubscribeFile();
                desImgFile.setSiNum(siNum);
                desImgFile.setSfType("DES");
                desImgFile.setSfRoot(rootPath);
                desImgFile.setSfRName(desImgFileName);
                desImgFile.setSfOName(siDesImg.getOriginalFilename());
                sfs.saveSubscribeFile(desImgFile);
            }

            return siNum;  // Return the ID of the inserted item

        } catch (IOException e) {
            e.printStackTrace();
            return 0;
        }
    }
}
