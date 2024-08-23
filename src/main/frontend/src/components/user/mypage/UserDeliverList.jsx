import { Link, useNavigate, useParams } from "react-router-dom";

function UserDeliveryList(props) {
    const pathParam = useParams();
    const deliverys = props.deliverys;
    const navigate = useNavigate();
    const mdNum = deliverys.mdNum;
    function moveAddrUpdate() {
        navigate("/mypage/delivery/update/" + mdNum);
    }

    return(
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

export default UserDeliveryList;