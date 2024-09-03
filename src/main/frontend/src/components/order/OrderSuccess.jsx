import axios from "axios";
import { useEffect } from "react";
import { deleteOcId } from "../../js/orderCart/cart";
import { useNavigate } from "react-router-dom";

function OrderSuccess() {
    const urlParams = new URLSearchParams(window.location.search);
    const paymentKey = urlParams.get("paymentKey");
    const olId = urlParams.get("orderId");
    const olCnt = urlParams.get("amount");
    const navi = useNavigate();
    useEffect(() => {
        // TODO: API를 호출해서 서버에게 paymentKey, orderId, amount를 넘겨주세요.
        // 서버에선 해당 데이터를 가지고 승인 API를 호출하면 결제가 완료됩니다.
        // https://docs.tosspayments.com/reference#%EA%B2%B0%EC%A0%9C-%EC%8A%B9%EC%9D%B8
        axios.post(`/order/success`, JSON.stringify({ paymentKey, olId, olCnt }), {
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => {
                if (response.data == 1) {
                    alert("성공");
                    deleteOcId(olId);
                    navi("/");
                } else {
                    alert("실패");
                }
            })
            .catch(e => { console.log(e) })
    }, []);
    return (
        <></>
    );
}
export default OrderSuccess;