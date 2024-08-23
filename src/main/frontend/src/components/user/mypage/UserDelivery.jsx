import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { getCookie } from "../../../js/cookieJs";
import { useEffect, useState } from "react";
import UserDeliveryList from "./UserDeliverList";

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
    <div className="container col-7">
      <div className="title"><h2>전체 배송지 관리</h2></div>
      <hr />
      <div className="text-center">구독 배송지 들어갈 예정</div>
      <div className="userAddr">
        <div className="userAddrHeader"><h3>그 외 배송지 목록</h3></div>
        {deliverys.map(delivery => {
                      return (<UserDeliveryList deliverys={delivery}></UserDeliveryList>);
                  })}
      </div>
      <Link to="/mypage/userAddr/input">새 배송지 추가하기+</Link>
    </div>
  );
}

export default UserDelivery;