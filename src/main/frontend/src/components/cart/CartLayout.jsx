import { useEffect, useState } from "react";
import { getOcId } from "../../js/orderCart/cart";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";



function CartLayout() {
    const ocId = getOcId();
    const [cartList, setCartList] = useState([{}]);
    const navi = useNavigate();
    useEffect(() => {
        axios.get(`/orderCart/list?ocId=${ocId}`).then(response => {
            setCartList(response.data);
            console.log(response);
        })
    }, [])
    function cartDelete(cart) {
        axios.get(`/orderCart/deleteCart/${cart.ocNum}`).then(response => {
            if (response.data > 0) {
                axios.get(`/orderCart/list?ocId=${ocId}`).then(result => {
                    setCartList(result.data);
                })
            } else {
                alert("실패");
            }
        })
    }
    function changeCnt(cart, event) {
        const ocCnt = event.target.value;
        cart.ocCnt = ocCnt;
        axios.post("/orderCart/updateCart", cart).then(response => {
            console.log(response);
        })
    }
    function buyCart() {
        navi(`/order/orderForm/${ocId}`)
    }
    return (
        <div className="container">
            <form>
                <table className="table mt-5">
                    <tbody>
                        <tr>
                            <th>상품명</th>
                            <th>옵션명</th>
                            <th>가격</th>
                            <th>수량</th>
                            <th>삭제</th>
                        </tr>
                        {cartList.map(cart => {

                            return (
                                <tr>
                                    <td>{cart.piName}</td>
                                    <td>{cart.poName}</td>
                                    <td>{cart.poSale}</td>
                                    <td>
                                        <select className="form-control" onChange={(e) => { changeCnt(cart, e) }} defaultValue={cart.ocCnt}>
                                            {Array.from({ length: cart.poCnt }, (_, i) => (
                                                <option value={i + 1} >{i + 1}</option>
                                            ))}
                                        </select>
                                    </td>
                                    <td><button type="button" className="btn btn-danger" onClick={() => { cartDelete(cart) }}>삭제</button></td>
                                </tr>
                            );
                        })}
                        <tr>
                            <td colSpan={5} className="text-center"><button type="button" className="btn btn-success" onClick={() => { buyCart() }}>구매</button></td>
                        </tr>
                    </tbody>
                </table>

            </form>
        </div >
    );
}
export default CartLayout;