import { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import { getCookie } from '../../../js/cookieJs';
import axios from 'axios';
import Test from './Test';
import UserInfo from "./UserInfo";
import UserDelivery from "./UserDelivery";
import MypageSubscribe from "./MypageSubscribe";
import MypageOrderList from "./MypageOrderList";
import MypageRefund from "./MypageRefund";
import MypageReview from "./MypageReview";
import { useNavigate, useParams } from "react-router-dom";

function MyPage() {
  const [user, setUser] = useState({});
  const userId = getCookie("isLogin");
  const [navContent, setNavContent] = useState(<MypageSubscribe />);

  useEffect(() => {
    axios.get("/userSearch/" + userId)
      .then((response) => {
        console.log(response);
        setUser((response.data));
        setValue("userName", response.data.userName);
        setValue("userLevel", response.data.userLevel);
        setValue("userPoint", response.data.userPoint);
        setValue("userCoupon", response.data.userCoupon);
      });

  }, [])

  const {
    setValue
  } = useForm();

  const handleNavClick = (content) => {
    setNavContent(content);
  };

  return (
    <>
      <div className="container d-flex justify-content-center">
        <div className="myInfo col-4 d-flex justify-content-between">
          <div className="userLevel ">
            <p><strong>{user.userName}</strong>님</p>
            <img src="" alt="" />
            <button>{user.userLevel} 혜택보기 &gt; </button>
          </div>
          <div className="userCoupon">
            <p>잔여 포인트 <span>{user.userPoint}</span></p>
            <p>잔여 쿠폰 <span>{user.userCoupon}</span></p>
          </div>
        </div>
        <nav className="myPageNav col-8 d-flex">
          <MyPageNav name="구독관리" onClick={() => handleNavClick(<MypageSubscribe />)} />
          <MyPageNav name="주문내역" onClick={() => handleNavClick(<MypageOrderList />)} />
          <MyPageNav name="취소/환불내역" onClick={() => handleNavClick(<MypageRefund />)} />
          <MyPageNav name="리뷰" onClick={() => handleNavClick(<MypageReview />)} />
          <MyPageNav name="회원정보" onClick={() => handleNavClick(<UserInfo />)} />
          <MyPageNav name="배송지관리" onClick={() => handleNavClick(<UserDelivery />)} />
        </nav>
      </div>
      <Test>{navContent}</Test>
    </>
  );
}

function MyPageNav(props) {
  return (
    <div className="col-2" onClick={props.onClick}>
      <div>{props.name}</div>
      <img src="" alt="" />
    </div>
  )
}

export default MyPage;