package com.green.gragas.order.dto;

import lombok.Data;
import org.apache.ibatis.type.Alias;

@Data
@Alias("orderDetail")
public class OrderDetail {
    private int odNum;
    private String olId;
    private int piNum;
    private String piName;
    private int poNum;
    private String poName;
    private int poPrice;
    private int poSale;
    private int odCnt;
    private int odPrice;
    private int odPoint;
    private String odStatus;
    public OrderDetail(){}
    public OrderDetail(String olId,OrderCart orderCart){
        this.olId=olId;
        this.piNum=orderCart.getPiNum();
        this.piName=orderCart.getPiName();
        this.poNum=orderCart.getPoNum();
        this.poName=orderCart.getPoName();
        this.poPrice=orderCart.getPoPrice();
        this.poSale=orderCart.getPoSale();
        this.odCnt=orderCart.getOcCnt();
        this.odPrice=orderCart.getPrice();
        this.odPoint=orderCart.getPrice()/10;
        this.odStatus="ready";
    }


}
