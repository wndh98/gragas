package com.green.gragas.product.service;

import com.green.gragas.product.dto.ProductEvent;
import com.green.gragas.product.dto.ProductItem;
import com.green.gragas.product.dto.SearchDTO;
import com.green.gragas.product.mappers.ProductMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.File;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ProductServiceImpl implements ProductService {
    @Autowired
    ProductMapper pm;
    @Value("${project.upload.path}")
    private String rootPath;


    public List<ProductItem> productList() {
        return pm.productList();
    }


    @Override
    public List<ProductItem> productListPcNum(int pcNum, String orderType) {
        SearchDTO searchDTO = new SearchDTO(1,1,pcNum);
        if(orderType!=null) {
            if (orderType.equals("NUM_DESC")) {
                searchDTO.setOrderType("PI_NUM");
                searchDTO.setOrderAsc("DESC");
            } else if (orderType.equals("PRICE_DESC")) {
                searchDTO.setOrderType("PI_PRICE");
                searchDTO.setOrderAsc("DESC");
            } else if (orderType.equals("PRICE_ASC")) {
                searchDTO.setOrderType("PI_PRICE");
                searchDTO.setOrderAsc("ASC");
            }
        }

        return pm.productListPcNum(searchDTO);
    }


    public ProductItem productCheck(int piNum) {
        return pm.productCheck(piNum);
    }

    @Override
    public int productInsert(ProductItem product) {
        return pm.productInsert(product);
    }

    @Override
    public int productUpdate(ProductItem product) {
        return pm.productUpdate(product);
    }

    @Override
    public int productDelete(int piNum) {
        return pm.productDelete(piNum);
    }

    @Override
    public int productDelete(List<Integer> piNum) {
        int result = 0;
        for (int num : piNum) {
            result = pm.productDelete(num);
            if (result == 0) break;
        }
        return result;
    }

    @Override
    public int nextPiNum() {
        return pm.nextPiNum();
    }

    @Override
    public int peventInsert(List<Integer> eiNum, int piNum) {
        int result = 0;
        Map<String, Object> map = new HashMap<>();

        map.put("piNum", piNum);
        for (Integer e : eiNum) {
            map.put("eiNum", e);
            result = pm.peventInsert(map);
            if (result == 0) return result;
        }
        return result;
    }

    @Override
    public int peventDelete(int piNum) {
        return pm.peventDelete(piNum);
    }


    public List<ProductItem> peventList(int eiNum,String orderType) {
        SearchDTO productSearch= new SearchDTO(1,1,eiNum);
        productSearch.setEiNum(eiNum);
            if(orderType!=null) {
                if (orderType.equals("NUM_DESC")) {
                    productSearch.setOrderType("PI_NUM");
                    productSearch.setOrderAsc("DESC");
                } else if (orderType.equals("PRICE_DESC")) {
                    productSearch.setOrderType("PI_PRICE");
                    productSearch.setOrderAsc("DESC");
                } else if (orderType.equals("PRICE_ASC")) {
                    productSearch.setOrderType("PI_PRICE");
                    productSearch.setOrderAsc("ASC");
                }
            }
            return pm.peventList(productSearch);
    }


    @Override
    public List<ProductEvent> peventList(int eiNum, int piNum) {
        ProductEvent productEvent = new ProductEvent();
        productEvent.setEiNum(eiNum);
        productEvent.setPiNum(piNum);

        return pm.peventListPe(productEvent);
    }

    @Override
    public List<ProductEvent> peventCheke(int eiNum) {
        return pm.peventCheke(eiNum);
    }

    @Override
    public int peventUpdate(int piNum, int[] eiNum) {
        int result = 0;
        result = pm.peventDelete(piNum);
        if (eiNum != null && eiNum.length > 0) {
            Map<String, Object> map = new HashMap<>();
            map.put("piNum", piNum);
            for (int e : eiNum) {
                map.put("eiNum", e);
                result = pm.peventInsert(map);
                if (result == 0) return result;
            }
        }
        return result;
    }

    @Override
    public List<ProductEvent> peventListPi(int piNum) {
        return pm.peventListPi(piNum);
    }

    @Override
    public void deleteFile(int piNum, String type) {
        ProductItem productItem = pm.productCheck(piNum);
        String filePath = rootPath + "/product/" + piNum;
        if (type.equals("piImg")) {
            filePath += "/" + productItem.getPiImg();
        } else if (type.equals("piContent")) {
            filePath += "/" + productItem.getPiContent();
        }
        File file = new File(filePath);
        if (type.equals("all")) {
            if (file.exists()) {
                File[] files = file.listFiles();
                for (File f : files) {
                    f.delete(); // 하위 파일 삭제
                }
                file.delete();
            }
        } else {
            if (file.exists()) {
                file.delete();
            }
        }
    }


}
