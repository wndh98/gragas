import { Link, useNavigate, useParams } from "react-router-dom";

function UserDeliveryList(props) {
  const pathParam = useParams();
  const deliverys = props.deliverys;
  const navigate = useNavigate();
  const mdNum = deliverys.mdNum;
  function moveAddrUpdate() {
    navigate("/mypage/delivery/update/" + mdNum);
  }
  if(deliverys == null) {
    return(
      <>
        <div className="coment_blue">저장된 배송지가 없어요</div>
        <div className="coment_gray">배송지를 등록해 주세요.</div>
      </>
    )
  } else {
    return (
      <div className="userAddrContent">
        <div className="d-flex justify-content-between">
          <div>
            <span>{deliverys.mdName}</span>
          </div>
          <div>
            <button onClick={moveAddrUpdate}>수정</button>
          </div>
        </div>
        <div>{deliverys.mdTel}</div>
        <div>{deliverys.mdAddr} {deliverys.mdAddrDetail}</div>
      </div>
    );
  }
  
}

export default UserDeliveryList;