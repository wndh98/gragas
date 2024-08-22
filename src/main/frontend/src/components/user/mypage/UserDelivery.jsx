import { Link, useNavigate } from "react-router-dom";

function UserDelivery() {

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
              <span>김주오</span>
            </div>
            <div>
              <button>수정</button>
            </div>
          </div>
          <div>전화번호</div>
          <div>주소</div>
        </div>
      </div>
      <Link to="/mypage/userAddr/input">새 배송지 추가하기+</Link>
    </div>
  );
}

export default UserDelivery;