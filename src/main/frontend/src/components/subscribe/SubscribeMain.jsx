import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function SubscribeMain(){
    const navigate = useNavigate();
    function subscribeType(){
        navigate("/subscribe/basic");
    }
    return(
        <>
        <button onClick={subscribeType}>이번 달 구독박스 살펴보기</button>
        <ul>
            <Link to="/subscribe/itemlist">골라보기</Link>
            <br />
            <Link to="/subscribe/review">리뷰</Link>
        </ul>
        </>
    );
}
export default SubscribeMain;