package com.green.gragas.order.service;

import com.green.gragas.board.dto.SearchDTO;
import com.green.gragas.order.dto.OrderCart;
import com.green.gragas.order.dto.OrderDetail;
import com.green.gragas.order.dto.OrderList;
import com.green.gragas.order.dto.OrderSearchDto;
import com.green.gragas.order.mapper.OrderCartMapper;
import com.green.gragas.order.mapper.OrderDetailMapper;
import com.green.gragas.order.mapper.OrderListMapper;
import com.green.gragas.product.mappers.ProopMapper;
import com.green.gragas.user.dto.MemberPoint;
import com.green.gragas.user.service.MemberPointService;
import com.green.gragas.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class OrderListServiceImpl implements OrderListService {
    @Autowired
    private OrderListMapper olm;
    @Autowired
    private OrderDetailMapper odm;
    @Autowired
    private OrderCartMapper ocm;
    @Autowired
    private UserService us;
    @Autowired
    private MemberPointService mps;
    @Autowired
    private ProopMapper pom;
    @Override
    public int preOrderListInsert(OrderList orderList) {
        int result = 0;
        List<OrderCart> orderCarts = ocm.selectOrderCartList(orderList.getOlId());
        String olId = orderList.getOlId();
        olm.deletePreOrderList(olId);
        odm.deletePreOrderDetail(olId);
        orderList.setOlStatus("READY");
        result = olm.preOrderListInsert(orderList);
        if (result == 0) return result;

        for (OrderCart orderCart : orderCarts) {
            OrderDetail orderDetail = new OrderDetail(olId, orderCart);
            result = odm.preOrderDetailInsert(orderDetail);
            if (result == 0) return result;
        }
        return result;
    }

    @Override
    public int orderListInsert(OrderList orderList) {
        int result = 0;
        OrderList orderListSelect = olm.preOrderListSelect(orderList.getOlId());
        if (orderListSelect.getOlUseCoupon().equals("Y")) {
            us.useCouponUpdate(orderListSelect.getUserId());
        }
        MemberPoint memberPoint=new MemberPoint();
        memberPoint.setUserId(orderListSelect.getUserId());
        if(orderListSelect.getOlPoint()>0){
            memberPoint.setMpPoint(orderListSelect.getOlPoint()*-1);
            memberPoint.setMpSubject("상품구매 포인트 사용");
            mps.usePoint(memberPoint);
        }
        memberPoint.setMpPoint(orderListSelect.getOlPay()/10);
        memberPoint.setMpSubject("상품구매 포인트 적립");
        mps.usePoint(memberPoint);
        result = olm.orderListInsert(orderListSelect);
        if (result == 0) return result;
        List<OrderDetail> orderDetails = odm.preOrderDetailSelects(orderList.getOlId());
        for (OrderDetail orderDetail : orderDetails) {
            result = odm.orderDetailInsert(orderDetail);
            Map<String,Integer> poMap = new HashMap<>();
            poMap.put("poNum",orderDetail.getPoNum());
            poMap.put("poCnt",orderDetail.getOdCnt()*-1);
            pom.updatePoCnt(poMap);
            if (result == 0) return result;
        }
        olm.deletePreOrderList(orderList.getOlId());
        ocm.deleteCartId(orderList.getOlId());
        return 1;
    }

    @Override
    public List<OrderList> getOrderList(String userId,String olStatus) {
        Map<String,Object> map = new HashMap<>();
        map.put("userId",userId);
        map.put("olStatus",olStatus);
        return olm.selectOrderList(map);
    }

    @Override
    public int ordersCnt(String userId, String olStatus) {
        Map<String,Object> map = new HashMap<>();
        map.put("userId",userId);
        map.put("olStatus",olStatus);
        return olm.ordersCnt(map);
    }

    @Override
    public Map<String, Object> adminOrderList(int pageNum) {
        Map<String, Object> map = new HashMap<>();
        int totalCnt = olm.totalCnt();
        OrderSearchDto search = new OrderSearchDto(totalCnt, pageNum);
        map.put("OrderSearchDto", search);
        map.put("orderList", olm.selectList(search));
        return map;
    }
}
