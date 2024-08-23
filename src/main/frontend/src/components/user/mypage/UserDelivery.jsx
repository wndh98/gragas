import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { getCookie } from "../../../js/cookieJs";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

function UserDelivery() {

  const userId = getCookie("isLogin");
  const [delivery, setDelivery] = useState({});

   useEffect(() => {
    axios.get('/delivery/select/' + userId)
        .then((response) => {
          setDelivery((response.data));
          setValue("mdName", response.data.mdName);
        });
}, [])

const {
  setValue,
  formState: { errors }
} = useForm();

 function moveAddrUpdate() {}

  return(
    <div className="container col-7">
      <div className="title"><h2>전체 배송지 관리</h2></div>
      <hr />
      <div className="text-center">구독 배송지 들어갈 예정</div>
      <div className="userAddr">
        <div className="userAddrHeader"><h3>그 외 배송지 목록</h3></div>
        <div className="userAddrContent">
          <div className="d-flex justify-content-between">
            <div>
              <span>{delivery.mdName}</span>
            </div>
            <div>
              <button onClick={moveAddrUpdate}>수정</button>
            </div>
          </div>
          <div>{delivery.mdTel}</div>
          <div>{delivery.mdAddr} {delivery.mdAddrDetail}</div>
        </div>
      </div>
      <Link to="/mypage/userAddr/input">새 배송지 추가하기+</Link>
    </div>
  );
}

export default UserDelivery;