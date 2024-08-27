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
import "../../../css/user/mypage.css";

function MyPage() {
  const [user, setUser] = useState({});
  const userId = getCookie("isLogin");
  const [navContent, setNavContent] = useState(<MypageSubscribe />);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("/userSearch/" + userId)
      .then((response) => {
        console.log(response);
        setUser((response.data));
        setValue("userName", response.data.userName);
        setValue("userLevel", response.data.userLevel);
        setValue("userPoint", response.data.userPoint);
        setValue("userCoupon", response.data.userCoupon);
        setValue("ulImg", response.data.ulImg);
      });
  }, [])

  const {
    setValue
  } = useForm();

  const handleNavClick = (content) => {
    setNavContent(content);
  };

  function moveBenefits() {
    navigate("/membership");
  }

  return (
    <div className="mypage container">
      <div className="top_nav d-flex justify-content-center">
        <div className="myInfo col-4 d-flex justify-content-between">
          <div className="userLevel ">
            <p><strong>{user.userName}</strong>님</p>
            <img className="level_img" src={user.ulImg} alt="" />
            <button onClick={moveBenefits}>{user.userLevel} 혜택보기 &gt; </button>
          </div>
          <div className="userCoupon">
            <div className="member_info_column">
              <p className="blue">잔여 포인트 </p>
              <p className="blue">잔여 쿠폰 </p>
            </div>
            <div className="member_info_column">
             <span className="top_nav_number">{user.userPoint}</span>
             <span className="top_nav_number">{user.userCoupon}</span>
            </div>
          </div>
        </div>
        <nav className="myPageNav col-8 d-flex">
          <MyPageNav name="구독관리" url="/images/user/mypage/subscribe.jpg" onClick={() => handleNavClick(<MypageSubscribe />)} />
          <MyPageNav name="주문내역" url="/images/user/mypage/orders.jpg" onClick={() => handleNavClick(<MypageOrderList />)} />
          <MyPageNav name="취소/환불내역" url="/images/user/mypage/return.jpg" onClick={() => handleNavClick(<MypageRefund />)} />
          <MyPageNav name="리뷰" url="/images/user/mypage/review.jpg" onClick={() => handleNavClick(<MypageReview />)} />
          <MyPageNav name="회원정보" url="/images/user/mypage/memberInfo.jpg" onClick={() => handleNavClick(<UserInfo />)} />
          <MyPageNav name="배송지관리" url="/images/user/mypage/delivery.jpg" onClick={() => handleNavClick(<UserDelivery />)} />
        </nav>
      </div>
      <Test>{navContent}</Test>
    </div>
  );
}

function MyPageNav(props) {
  return (
    <div className="col-2 nav_title text-secondary" onClick={props.onClick}>
      <div>{props.name}</div>
      <img className="icon_img" src={props.url} alt="" />
    </div>
  )
}

export default MyPage;