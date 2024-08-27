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
          setDeliverys((reslut.data.deliveryList));
        });
}, [])

  return(
    <div className="user_delivery container">
      <div className="title"><h3>전체 배송지 관리</h3></div>
      <hr />
      <div className="text-center">구독 배송지 들어갈 예정</div>
      <div className="userAddr container">
        <div className="userAddrHeader">그 외 배송지 목록</div>
        {deliverys.map(delivery => {
                      return (<UserDeliveryList deliverys={delivery}></UserDeliveryList>);
                  })}
      <Link className="delivery_btn btn btn-outline-secondary" to="/mypage/userAddr/input">새 배송지 추가하기 +</Link>
      </div>
    </div>
  );
}

export default UserDelivery;