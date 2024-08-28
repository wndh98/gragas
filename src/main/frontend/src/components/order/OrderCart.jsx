import axios from "axios";
import { useEffect, useState } from "react";
import { getPrice } from "../../js/order";

function OrderCart(props) {
    const setOrderStep = props.setOrderStep;
    const handleSubmit = props.handleSubmit;
    const ocId = props.ocId;
    const [cartList, setCartList] = useState([{}]);
    useEffect(() => {
        axios.get(`/orderCart/list?oc_id=${ocId}`)
            .then(response => {
                setCartList([...(response.data)]);
            })
    }, []);
    return (
        <div className="d-flex flex-column">
            <h1>주문 목록</h1>
            {cartList.map(cart => {
                return (
                    <div className="d-felx">
                        <img src={`/upload/product/${cart.piNum}/${cart.piImg}`} />
                        <h3>{cart.piName}</h3>
                        <p>{cart.ocCnt}</p>
                        <span>{getPrice(cart.poPrice, cart.poSale)}</span>
                    </div>
                );
            })}

        </div>
    );
}
export default OrderCart;