import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { getCookie } from "../../../js/cookieJs";
import { useEffect, useState } from "react";
import UserDeliveryList from "./UserDeliverList";
import "../../../css/user/mypage.css";

function UserDelivery() {

  const userId = getCookie("isLogin");
  const [deliverys, setDeliverys] = useState([]);

  useEffect(() => {
    axios.get('/delivery/select/' + userId)
      .then((reslut) => {
        // console.log(reslut);
        setDeliverys((reslut.data.deliveryList));
      });
  }, [])

  return (
    <div className="user_delivery container">
      <div className="title"><h3>전체 배송지 관리</h3></div>
      <hr />
      <div className="container userSubAddr">
        <div className="text-center d-flex justify-content-between">
          <div>현재 구독중인 배송지</div>
          <div><button className="move_sub">구독하러가기</button></div>
        </div>
        <div className="text-center">구독을 안하고 계세요</div>
      </div>
      <div className="userAddr container">
        <div className="userAddrHeader">그 외 배송지 목록</div>
        {(deliverys.length == 0) ?
          <>
            <div className="coment_blue">저장된 배송지가 없어요</div>
            <div className="coment_gray">배송지를 등록해 주세요.</div>
          </>
          : ""}
        {deliverys.map(delivery => {
          return (<UserDeliveryList deliverys={delivery}></UserDeliveryList>);
        })}
        <Link className="delivery_btn btn btn-outline-secondary" to="/mypage/userAddr/input">새 배송지 추가하기 +</Link>
      </div>
    </div>
  );
}

export default UserDelivery;