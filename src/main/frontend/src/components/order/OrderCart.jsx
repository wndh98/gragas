import axios from "axios";
import { useEffect, useState } from "react";
import { getPrice } from "../../js/order";

function OrderCart(props) {
    const ocId = props.ocId;
    const [cartList, setCartList] = useState([{}]);
    useEffect(() => {
        axios.get(`/orderCart/list?ocId=${ocId}`)
            .then(response => {
                setCartList([...(response.data)]);
            })
    }, []);
    return (
        <div className="d-flex flex-column mt-5 border rounded p-4">
            <h3 className="rounded p-3 mb-4">주문 목록</h3>
            {cartList.map(cart => {
                return (
                    <div className="d-flex flex-wrap border-top border-bottom pt-3 pb-3">
                        <img src={`/upload/product/${cart.piNum}/${cart.piImg}`} className="w-25" />
                        <div className="w-50 d-flex flex-column ms-3">
                            <strong className="fs-4">{cart.piName}</strong>
                            <span className="mt-2">
                                {cart.poName}
                            </span>
                            <span className="mt-2">
                                {cart.ocCnt}개/{getPrice(cart.poPrice, cart.poSale)}원
                            </span>
                        </div>
                    </div>
                );
            })}
            <h3 className="rounded mt-5">쿠폰</h3>
            <div className="mt-4 p-3 d-flex flex-column border rounded">
                <div className="d-flex justify-content-between">
                    <strong className="fs-3">쿠폰사용</strong>
                    <div>
                        <input type="checkbox" className="form-control" />
                    </div>
                </div>
                <div className="d-flex justify-content-between p-3">
                    <span>할인금액</span>
                    <span>100원</span>
                </div>
            </div>
            <div className="mt-5 p-3 d-flex flex-column border rounded">
                <div className="d-flex justify-content-between">
                    <strong className="fs-3">총금액</strong>
                    <strong className="fs-4">100원</strong>
                </div>
                <div className="d-flex justify-content-between p-3">
                    <span>상품금액</span>
                    <span>100원</span>
                </div>
                <div className="d-flex justify-content-between p-3">
                    <span>배송비</span>
                    <span>100원</span>
                </div>
                <div className="d-flex justify-content-between p-3">
                    <span>쿠폰사용</span>
                    <span>-100원</span>
                </div>
            </div>
        </div>
    );
}
export default OrderCart;