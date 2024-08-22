import { Link, useNavigate } from "react-router-dom";
import { getCookie,setCookie,deleteCookie } from '../../js/cookieJs';
import axios from "axios";
function UserInfo() {
  const navigate = useNavigate();
  const userId = getCookie("isLogin");

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
    <div className="container col-12 text-center">
      <Link to="/mypage/userInfo/update">회원정보 수정</Link>&nbsp;
      <a onClick={userDelete}>회원탈퇴</a>
    </div>
  );
}

export default UserInfo;