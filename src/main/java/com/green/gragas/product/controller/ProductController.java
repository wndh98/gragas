package com.green.gragas.product.controller;

import com.green.gragas.product.dto.*;
import com.green.gragas.product.service.ProcateService;
import com.green.gragas.product.service.ProductService;
import com.green.gragas.product.service.ProopService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
public class ProductController {
    @Autowired
    private ProductService ps;

    @Autowired
    private ProcateService cs;

    @Autowired
    private ProopService os;

    @GetMapping("/product/list")
    public List<ProductItem> productList() {
        List<ProductItem> list = ps.productList();
        return list;
    }

    @GetMapping("/product/view/{piNum}")
    public ProductItem productView(@PathVariable("piNum") int piNum) {
        ProductItem productItem = ps.productCheck(piNum);
        return productItem;
    }

    @PostMapping("/product/insert")
    public int productInsert(
            @RequestPart("product") ProductItem product,
            @RequestPart("piImgFile") MultipartFile piImgFile,
            @RequestPart("piContentFile") MultipartFile piContentFile
    ) {
        ProductOption proop = new ProductOption();
        int nextPiNum = ps.nextPiNum();
        proop.setPiNum(nextPiNum);
        proop.setPoPrice(product.getPoPrice());
        proop.setPoSale(product.getPoSale());
        proop.setPoCnt(product.getPoCnt());
        proop.setPoName(product.getPiName());
        int result = ps.productInsert(product);
        if (result != 1) return result;
        result = os.proopInsert(proop);
        if (result == 0) return result;
        return nextPiNum;
    }


    @PostMapping("/pevent/insert/{piNum}")
    public int peventInsert(@RequestBody List<Integer> eiNum, @PathVariable("piNum") int piNum) {
        int result = ps.peventInsert(eiNum, piNum);
        return result;
    }

  /* @PostMapping("/pevent/update/{piNum}")
    public int peventUpdate(@RequestBody List<Integer> eiNum, @PathVariable("piNum") int piNum) {

        int result = ps.peventUpdate(eiNum, piNum);
        return result;
    }*/

    @GetMapping("/pevent/delete/{piNum}")
    public int peventDelete(@PathVariable("piNum") int piNum) {
        int result = ps.peventDelete(piNum);
        return result;
    }

    @GetMapping("/pevent/list/{eiNum}")
    public List<ProductEvent> peventList(@PathVariable("eiNum") int eiNum) {
        List<ProductEvent> list = ps.peventList(eiNum);
        return list;
    }
    @GetMapping("/pevent/listPi/{piNum}")
    public List<ProductEvent> peventListPi(@PathVariable("piNum") int piNum) {
        List<ProductEvent> list = ps.peventListPi(piNum);
        return list;
    }
    @GetMapping("/pevent/list/{eiNum}/{piNum}")
    public List<ProductEvent> peventList(@PathVariable("eiNum") int eiNum, @PathVariable("piNum") int piNum) {
        List<ProductEvent> list = ps.peventList(eiNum, piNum);
        return list;
    }

    @GetMapping("/pevent/cheke/{eiNum}")
    public List<ProductEvent> peventCheke(@PathVariable("eiNum") int eiNum) {
        List<ProductEvent> list = ps.peventCheke(eiNum);
        return list;
    }


    @PostMapping("/product/update/{piNum}")
    public int productUpdate(@PathVariable("piNum") int piNum, @RequestBody ProductItem product) {
        product.setPiNum(piNum);
        ps.peventUpdate(piNum,product.getEiNum());
        int result = ps.productUpdate(product);
        return result;
    }

    @GetMapping("/product/delete/{piNum}")
    public int productDelete(@PathVariable("piNum") int piNum) {
        int result = ps.productDelete(piNum);
        return result;
    }

    @PostMapping("/product/deleteList")
    public int productDeleteList(@RequestBody List<Integer> piNum) {
        int result = ps.productDelete(piNum);
        return result;
    }


    @GetMapping("/procate/list")
    public List<ProductCate> procateList() {
        List<ProductCate> list = cs.procateList();
        return list;
    }

    @GetMapping("/procate/view/{pcNum}")
    public ProductCate procateView(@PathVariable("pcNum") int pcNum) {
        ProductCate procateItem = cs.procateCheck(pcNum);
        return procateItem;
    }

    @PostMapping("/procate/insert")
    public int procateInsert(@RequestBody ProductCate procate) {
        int result = cs.procateInsert(procate);
        return result;
    }

    @PostMapping("/procate/update/{pcNum}")
    public int procateUpdate(@PathVariable("pcNum") int pcNum, @RequestBody ProductCate procate) {
        int result = cs.procateUpdate(pcNum, procate);
        return result;
    }

    @GetMapping("/procate/delete/{pcNum}")
    public int procateDelete(@PathVariable("pcNum") int pcNum) {
        int result = cs.procateDelete(pcNum);
        return result;
    }

    @PostMapping("/procate/deleteList")
    public int procateDeleteList(@RequestBody List<Integer> pcNum) {
        int result = cs.procateDelete(pcNum);
        return result;
    }

    /*======================================evnet===========================================*/
    @GetMapping("/event/list")
    public List<EventItem> proeventList() {
        List<EventItem> list = cs.proeventList();
        return list;
    }

    @GetMapping("/event/view/{eiNum}")
    public EventItem proeventView(@PathVariable("eiNum") List<Integer> eiNum) {
        EventItem eventItem = cs.proeventCheck(eiNum);
        return eventItem;
    }

    @PostMapping("/event/insert")
    public int proeventInsert(@RequestBody EventItem eitem) {
        int result = cs.proeventInsert(eitem);
        return result;
    }

    @PostMapping("/event/update/{eiNum}")
    public int proeventUpdate(@PathVariable("eiNum") int eiNum, @RequestBody EventItem eitem) {
        int result = cs.proeventUpdate(eiNum, eitem);
        return result;
    }

    @GetMapping("/event/delete/{eiNum}")
    public int proeventDelete(@PathVariable("eiNum") int eiNum) {
        int result = cs.proeventDelete(eiNum);
        return result;
    }

    @PostMapping("/event/deleteList")
    public int proeventDeleteList(@RequestBody List<Integer> eiNum) {
        int result = cs.proeventDelete(eiNum);
        return result;
    }

    /*======================================option===========================================*/
    @GetMapping("/option/list")
    public List<ProductOption> proopList() {
        List<ProductOption> list = os.proopList();
        return list;
    }

    @GetMapping("/option/view/{poNum}")
    public ProductOption proopView(@PathVariable("poNum") int poNum) {
        ProductOption proopItem = os.proopCheck(poNum);
        return proopItem;
    }

    @PostMapping("/option/insert")
    public int proopInsert(@RequestBody ProductOption proop) {
        int result = os.proopInsert(proop);

        return result;
    }

    @PostMapping("/option/update/{poNum}")
    public int proopUpdate(@PathVariable("poNum") int poNum, @RequestBody ProductOption proop) {
        int result = os.proopUpdate(poNum, proop);
        return result;
    }

    @GetMapping("/option/delete/{poNum}")
    public int proopDelete(@PathVariable("poNum") int poNum) {
        int result = os.proopDelete(poNum);
        return result;
    }

    @PostMapping("/option/deleteList")
    public int proopDeleteList(@RequestBody List<Integer> poNum) {

        int result = os.proopDelete(poNum);
        return result;
    }

}
