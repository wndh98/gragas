import { useEffect, useState } from "react";
import { getOcId } from "../../js/orderCart/cart";
import axios from "axios";

function CartLayout() {
    const ocId = getOcId();
    const [cartList, setCartList] = useState([{}]);

    useEffect(() => {
        axios.get(`/orderCart/list?ocId=${ocId}`).then(response => {
            setCartList(response.data);
        })
    }, [])
    function cartDelete(cart) {
        axios.post(`/orderCart/deleteCart`,cart).then(response => {
            if (response.data > 0) {
                axios.get(`/orderCart/list?ocId=${ocId}`).then(result => {
                    setCartList(result.data);
                })
            }else{
                alert("실패");
            }
        })
    }
    return (
        <div className="container">
            <form>
                <table className="table">
                    <tbody>
                        <tr>
                            <th>상품번호</th>
                            <th>상품명</th>
                            <th>옵션명</th>
                            <th>가격</th>
                            <th>수량</th>
                            <th>삭제</th>
                        </tr>
                        {cartList.map(cart => {
                            return (
                                <tr>
                                    <td>{cart.piNum}</td>
                                    <td>{cart.piName}</td>
                                    <td>{cart.poName}</td>
                                    <td>{cart.poSale}</td>
                                    <td>{cart.ocCnt}</td>
                                    <td><button type="button" className="btn btn-danger" onClick={() => { cartDelete(cart) }}>삭제</button></td>
                                </tr>
                            );
                        })}

                    </tbody>
                </table>
            </form>
        </div>
    );
}
export default CartLayout;