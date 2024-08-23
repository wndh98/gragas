import { getCookie } from "../../../js/cookieJs";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function UserDeliveryInput() {

  const userId = getCookie("isLogin");

  const navigate = useNavigate();

  function SubmitEvent(event) {
    event.preventDefault(); 

    const formData = new FormData(event.target);
    formData.append('userId', userId);

    const data = {
      userId: formData.get('userId'),
      mdName: formData.get('mdName'),
      mdTel: formData.get('mdTel'),
      mdAddr: formData.get('mdAddr'),
      mdAddrDetail: formData.get('mdAddrDetail'),
      mdMessage: formData.get('mdMessage')
    };

    axios.post('/user/delivery/input', data)
    .then((result) => {
        if (result.data > 0) {
            alert("성공");
            navigate("/mypage");
        } else {
          alert("실패");
        }
    }) 
    .catch((error) => {
      console.error("Error during delivery input:", error);
      alert("서버에 오류가 발생했습니다.");
    });
  }

  function moveBack() {
    navigate("/mypage");
  }
  
  return(
    <div className="container col-5">
      <div>
        <form form onSubmit={SubmitEvent}>
          <input type="hidden" name="userId" value={userId} />
          <div>
            새 배송지를 추가해 주세요.
          </div>
          <div>
            수령인 
            <input type="text" name="mdName" required />
          </div>
          <div>
            연락처
            <input type="text" name="mdTel" required />
          </div>
          <div>
            배송지
            <input type="text" name="mdAddr" required />
            <input type="text" name="mdAddrDetail"/>
          </div>
          <div>
            배송 메모
            <input type="text" name="mdMessage"/>
          </div>
          <button type="submit">저장</button>
          <button onClick={moveBack}>취소</button>
        </form>
      </div>
    </div>
  );
}

export default UserDeliveryInput;