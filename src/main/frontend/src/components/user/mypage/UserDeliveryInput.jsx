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
    navigate(-1);
  }
  
  return(
    <div className="delivery_input container border border-secondary rounded">
      <div className="delivery_content">
        <form form onSubmit={SubmitEvent}>
          <input type="hidden" name="userId" value={userId} />
          <div className="form_title">
            새 배송지를 추가해 주세요.
          </div>
          <hr />
          <div className="input-form-box">
            수령인 
            <input 
                className="form-control" 
                type="text" 
                name="mdName" 
                placeholder="성함을 입력해 주세요" required />
          </div>
          <div className="input-form-box">
            연락처
            <input className="form-control" type="text" name="mdTel" placeholder="전화번호를 입력해 주세요" required />
          </div>
          <div className="input-form-box">
            배송지
            <input className="form-control form_addr" type="text" name="mdAddr" placeholder="주소를 입력해 주세요" required />
            <input className="form-control" type="text" name="mdAddrDetail" placeholder="상세주소를 입력해 주세요"/>
          </div>
          <div className="input-form-box">
            배송 메모
            <input className="form-control" type="text" name="mdMessage" placeholder="요청사항을 입력해 주세요"/>
          </div>
          <button className="btn btn-primary col-12" type="submit">저장</button>
          <button className="btn btn-outline-secondary col-12" type="button" onClick={moveBack}>취소</button>
        </form>
      </div>
    </div>
  );
}

export default UserDeliveryInput;