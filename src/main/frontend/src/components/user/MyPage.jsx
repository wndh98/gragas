
function MyPage() {
  return (
    <>
    <div className="container d-flex justify-content-center">
      <div className="myInfo col-4">
        <div className="userLevel">
          <p><strong>ㅇㅇ</strong>님</p>
          <img src="" alt="" />
          <button>xxx 혜택보기 > </button>
        </div>
        <div className="userCoupon">
          <p>잔여 포인트 <span>0</span></p>
          <p>잔여 쿠폰 <span>0</span></p>
        </div>
      </div>
      <nav className="myPageNav col-8">
        <MyPageNav name="구독관리"/>
        <MyPageNav name="주문내역"/>
        <MyPageNav name="취소/환불내역"/>
        <MyPageNav name="리뷰"/>
        <MyPageNav name="회원정보" url="/myPage/userInfo"/>
        <MyPageNav name="배송지관리"/>
      </nav>
    </div>
    </>
  );
}

function MyPageNav(props) {
  return (
    <div className="col-2">
      <a href={props.url}>
      <div>{props.name}</div>
      <img src="" alt="" />
      </a>
    </div>
  )
}

export default MyPage;