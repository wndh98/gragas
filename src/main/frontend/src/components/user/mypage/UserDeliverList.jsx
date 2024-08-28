import { Link, useNavigate, useParams } from "react-router-dom";
import "../../../css/user/mypage.css";

function UserDeliveryList(props) {
  const pathParam = useParams();
  const deliverys = props.deliverys;
  const navigate = useNavigate();
  const mdNum = deliverys.mdNum;
  function moveAddrUpdate() {
    navigate("/mypage/delivery/update/" + mdNum);
  }


    return (
      <div className="userAddrContent">
        <div className="d-flex justify-content-between">
          <div>
            <span className="userAddrName">{deliverys.mdName}</span>
          </div>
          <div>
            <button className="userAddrBtn text-secondary" onClick={moveAddrUpdate}>수정</button>
          </div>
        </div>
        <div className="userAddrMargin">{deliverys.mdTel}</div>
        <div className="userAddrMargin">{deliverys.mdAddr} {deliverys.mdAddrDetail}</div>
        <div className="userAddrMargin addrMessage">{deliverys.mdMessage}</div>
      </div>
    );
  }
  


export default UserDeliveryList;