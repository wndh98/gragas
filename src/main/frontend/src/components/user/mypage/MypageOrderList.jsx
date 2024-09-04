import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCookie } from "../../../js/cookieJs";


function MypageOrderList() {
  const [orderList, setOrderList] = useState([]);
  const [activeButton, setActiveButton] = useState('ALL');
  const userId = getCookie("isLogin");

  useEffect(() => {
    axios.get(`/order/list/${userId}`)
      .then(response => {
        setOrderList(response.data);
      })
  }, []);

  function changeOrderAll() {
    axios.get(`/order/list/${userId}`)
      .then(response => {
        setOrderList(response.data);
      })
    setActiveButton('ALL');
  }
  console.log(orderList);
  return (
    <div className="top_nav container">
      <div style={{ margin: '0 40px' }}>
        <div className="d-flex justify-content-between">
          <div className="title fs-3">주문내역</div>
          <div><img src="/images/user/mypage/orders.jpg" alt=""
            style={{ width: '30px' }} /></div>
        </div>
        <hr />
        <div className="mypage_order_list_nav container" style={{ width: '390px' }}>
          <button onClick={() => { changeOrderAll() }} className="mypage_order_list_nav_content"
            style={{
              color: activeButton === 'ALL' ? 'rgb(0, 150, 243)' : 'gray',
            }}>전체보기 &gt;</button>
          <div className="top_nav d-flex justify-content-around text-center">
            <OrdersNav orderStatus="상품 준비" olStatus="READY" setOrderList={setOrderList} isActive={activeButton === 'READY'}
            onClick={() => setActiveButton('READY')}/>
            <OrdersNav orderStatus="배송 중" olStatus="DELI" setOrderList={setOrderList} isActive={activeButton === 'DELI'}
            onClick={() => setActiveButton('DELI')}/>
            <OrdersNav orderStatus="배송 완료" olStatus="COMPLETE" setOrderList={setOrderList} isActive={activeButton === 'COMPLETE'}
            onClick={() => setActiveButton('COMPLETE')}/>
            <OrdersNav orderStatus="수령 완료" olStatus="RECEIPT" setOrderList={setOrderList} isActive={activeButton === 'RECEIPT'}
            onClick={() => setActiveButton('RECEIPT')}/>
          </div>
        </div>
        <div className="order_list_content text-center">
          {orderList.length > 0 ?
            orderList.map(order => {
              return (
                <div>
                  <table className="order_list_table">
                    <colgroup>
                      <col width={"20%"} />
                      <col width={"8%"} />
                      <col width={"8%"} />
                      <col width={"8%"} />
                      <col width={"25%"} />
                      <col />
                      <col width={"12%"}/>
                    </colgroup>
                    <tr>
                      <th>주문번호</th>
                      <th>결제금액</th>
                      <th>개수</th>
                      <th>배송비</th>
                      <th>배송지</th>
                      <th>배송 메모</th>
                      <th>주문날짜</th>
                    </tr>
                    <tr>
                      <td><a href="#">{order.olId}</a></td>
                      <td>{order.olPay}</td>
                      <td>{order.olCnt}</td>
                      <td>{order.olDeli}</td>
                      <td>{order.olAddress} {order.olAddressDetail}</td>
                      <td>{order.olMemo}</td>
                      <td>{order.olRegist}</td>
                    </tr>
                  </table>
                </div>
              );
            })
            : "해당 상품이 없어요!"
          }
        </div>
      </div>
    </div>
  );
}

function OrdersNav(props) {
  const { olStatus, setOrderList, isActive, onClick } = props;
  const userId = getCookie("isLogin");
  const [orderCnt, setOrderCnt] = useState();

  useEffect(() => {
    axios.get(`/order/cnt/${olStatus}`)
      .then(response => {
        setOrderCnt(response.data);
      })
  }, [olStatus]);

  function changeOrderList(olStatus) {
    axios.get(`/order/list/${userId}?olStatus=${olStatus}`)
      .then(response => {
        setOrderList(response.data);
      });
      onClick();
  }
  return (
    <button className="mypage_order_list_nav_content" onClick={() => { changeOrderList(olStatus) }} style={{
      color: isActive ? 'rgb(0, 150, 243)' : 'gray',
    }}>
      <span>{orderCnt}</span>
      <div>{props.orderStatus}</div>
    </button>
  );
}

export default MypageOrderList;