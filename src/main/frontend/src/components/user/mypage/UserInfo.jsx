import { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from "react-router-dom";
import { getCookie,setCookie,deleteCookie } from '../../../js/cookieJs';
import axios from "axios";

function UserInfo() {
  const navigate = useNavigate();
  const [user,setUser] = useState({});
  const userId = getCookie("isLogin");

  useEffect(() => {
    axios.get("/userSearch/" + userId)
    .then((response) => {
      console.log(response);
      setUser((response.data));
      setValue("userId",response.data.userId);
      setValue("userName",response.data.userName);
      setValue("userBirth",response.data.userBirth);
      setValue("userPhone",response.data.userPhone);
    });
  }, [])

  const {
    setValue,
    formState: { errors }
  } = useForm();

  async function userDelete() {
    // eslint-disable-next-line no-restricted-globals
    if (confirm("정말 삭제 하시겠습니까?")) {
      axios.get('/user/delete/'+userId)
      .then(response=>{
        if (response.data > 0) {
          alert("회원 탈퇴가 완료되었습니다.");
          deleteCookie("isLogin");
          navigate("/"); 
        } else {
          alert("회원 탈퇴에 실패했습니다.");
        }
      });
    
    }
  }

  return (
    <div className="container col-7 text-center">
      <div className="userInfo">
        <div className="d-flex justify-content-between">
          <div className="title">회원정보</div>
          <Link to="/mypage/userInfo/update">회원정보 수정</Link>
        </div>
        <hr />
        <div className="d-flex justify-content-between">
          <div>아이디</div> 
          <div>{user.userId}</div>
        </div>
        <div className="d-flex justify-content-between">
          <div>이름</div> 
          <div>{user.userName}</div>
        </div>
        <div className="d-flex justify-content-between">
          <div>생일</div> 
          <div>{user.userBirth}</div>
        </div>
        <div className="d-flex justify-content-between">
          <div>휴대폰번호</div> 
          <div>{user.userPhone}</div>
        </div>
      </div>
      
      <a onClick={userDelete}>회원탈퇴</a>
    </div>
  );
}

export default UserInfo;