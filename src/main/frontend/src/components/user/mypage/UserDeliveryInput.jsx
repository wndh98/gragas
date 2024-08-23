import { getCookie } from "../../../js/cookieJs";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function UserDeliveryInput() {

  const userId = getCookie("isLogin");

  const navigate = useNavigate();

  function SubmitEvent() {
    axios.post()
    .then((result) => {
        if (result.data == 1) {
            alert("성공");
        } else {
          alert("실패");
        }
    });
  }

  function moveBack() {
    navigate("/mypage");
  }
  
  return(
    <div className="container col-5">
      <div>
        <form action="/user/delivery/input" method="post">
          <input type="hidden" name="userId" value={userId} />
          <div>
            새 배송지를 추가해 주세요.
          </div>
          <div>
            수령인 
            <input type="text" name="mdName"/>
          </div>
          <div>
            연락처
            <input type="text" name="mdTel"/>
          </div>
          <div>
            배송지
            <input type="text" name="mdAddress"/>
            <input type="text" name="mdAddressDetail"/>
          </div>
          <div>
            배송 메모
            <input type="text" name="mdMessage"/>
          </div>
          <button onClick={SubmitEvent}>저장</button>
          <button onClick={moveBack}>취소</button>
        </form>
      </div>
    </div>
  );
}

export default UserDeliveryInput;