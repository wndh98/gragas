

function MyPage() {
  return (
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
        <MyPageNav/>
        <MyPageNav/>
        <MyPageNav/>
        <MyPageNav/>
        <MyPageNav/>
        <MyPageNav/>
      </nav>
    </div>
  );
}

function MyPageNav() {
  return (
    <div>
      <div>구독관리</div>
      <img src="" alt="" />
    </div>
  )
}

export default MyPage;