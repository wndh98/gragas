import axios from "axios";
import { useEffect } from "react";

function SubsSuccess() {
    const urlParams = new URLSearchParams(window.location.search);
    const paymentKey = urlParams.get("paymentKey");
    const soId = urlParams.get("orderId");
    const amount = urlParams.get("amount");
    useEffect(() => {
        console.log(paymentKey);
        console.log(soId);
        console.log(amount);
        // TODO: API를 호출해서 서버에게 paymentKey, orderId, amount를 넘겨주세요.
        // 서버에선 해당 데이터를 가지고 승인 API를 호출하면 결제가 완료됩니다.
        // https://docs.tosspayments.com/reference#%EA%B2%B0%EC%A0%9C-%EC%8A%B9%EC%9D%B8
        axios.post(`/subscribe/success`, JSON.stringify({ paymentKey, soId, amount }), {
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => {
                console.log(response.data)
                if (response.data == 1) {
                    alert("성공");
                } else {
                    alert("실패");
                }
            })
            .catch(e => { console.log("error : "+e) })
    }, []);
    return (
        <></>
    );
}
export default SubsSuccess;