
function UserDeliveryInput() {

  return(
    <div className="container col-5">
      <div>
        <form action="">
          <div>
            새 배송지를 추가해 주세요.
          </div>
          <div>
            수령인 
            <input type="text" name="mdName"/>
          </div>
          <div>
            연락처
            <input type="text" name="mdTel"/>
          </div>
          <div>
            배송지
            <input type="text" name="mdAddress"/>
            <input type="text" name="mdAddressDetail"/>
          </div>
          <div>
            배송 메모
            <input type="text" name="mdMessage"/>
          </div>
          <button>저장</button>
          <button>취소</button>
        </form>
      </div>
    </div>
  );
}

export default UserDeliveryInput;