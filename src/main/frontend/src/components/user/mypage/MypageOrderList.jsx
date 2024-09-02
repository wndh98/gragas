

function MypageOrderList() {

  return (
    <div className="top_nav container">
      <div style={{ margin: '0 40px' }}>
        <div className="d-flex justify-content-between">
          <div className="title fs-3">주문내역</div>
          <div><img src="/images/user/mypage/orders.jpg" alt=""
            style={{ width: '30px' }} /></div>
        </div>
        <hr />
        <div className="mypage_order_list_nav container" style={{ width: '390px' }}>
          <button className="mypage_order_list_nav_content">전체보기 &gt;</button>
          <div className="top_nav d-flex text-center">
            <button className="mypage_order_list_nav_content">
              <span>0</span>
              <div>입금대기중</div>
            </button>
            <button className="mypage_order_list_nav_content">
              <span>0</span>
              <div>상품 준비</div>
            </button>
            <button className="mypage_order_list_nav_content">
              <span>0</span>
              <div>배송 중</div>
            </button>
            <button className="mypage_order_list_nav_content">
              <span>0</span>
              <div>배송 완료</div>
            </button>
            <button className="mypage_order_list_nav_content">
              <span>0</span>
              <div>수령 확인</div>
            </button>
          </div>
          <div className="text-center">
            입금대기중인 상품이 없어요!
          </div>
        </div>
      </div>
    </div>
  );
}

export default MypageOrderList;