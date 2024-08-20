package com.green.gragas.board.service;

import com.green.gragas.board.dto.Board;
import com.green.gragas.board.dto.BoardFile;
import com.green.gragas.board.dto.SearchDTO;
import com.green.gragas.board.mapper.BoardFileMapper;
import com.green.gragas.board.mapper.BoardMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class BoardServiceImpl implements  BoardService{
    @Autowired
    BoardMapper bm;
    @Autowired
    BoardFileMapper bfm;
    @Value("${proejct.upload.path}")
    private String rootPath;


    @Override
    public Map<String,Object> boardList(String boardType, int pageNum) {
        Map<String,Object> map = new HashMap<>();
        int totalCnt=bm.totalCnt(boardType);
        SearchDTO search = new SearchDTO(totalCnt,pageNum,boardType);
        map.put("searchDto",search);
        map.put("boardList",bm.selectList(search));
        return map;
    }

    @Override
    public int boardWrite(String boardType, Board board, MultipartFile[] bFiles) {
        int bNum = bm.nextBNum(boardType);
        if(board.getBNum()==0){
            board.setBRef(bNum);
        }else{
            bNum=board.getBNum();
            board.setBRef(bNum);
        }
        try {
            List<String> fileNames=BoardFileUpload.fileUpload(bFiles,boardType,bNum,rootPath);
            BoardFile boardFile = new BoardFile();
            boardFile.setBNum(bNum);
            boardFile.setBfBoard(boardType);
            boardFile.setBfRoot("/board/"+boardType+"/"+bNum+"/");
            int i=0;
            for(String fileName:fileNames) {
                boardFile.setBfRName(fileName);
                boardFile.setBfOName(bFiles[i++].getOriginalFilename());
                if(bfm.insertBoardFile(boardFile)==0)return -1; // 파일업로드가 안되었을시 -1 리턴
            }
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        board.setBoardType(boardType);
        return bm.insertBoard(board);
    }

    @Override
    public Board boardSearch(String boardType, int bNum) {
        Board board=new Board();
        board.setBoardType(boardType);
        board.setBNum(bNum);
        return bm.selectBoard(board);
    }

    @Override
    public void increaseView(String boardType, int bNum) {
        Board board=new Board();
        board.setBoardType(boardType);
        board.setBNum(bNum);

        bm.increaseView(board);
    }

}
