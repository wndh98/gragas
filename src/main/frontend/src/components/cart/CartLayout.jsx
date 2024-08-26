import { useEffect, useState } from "react";
import { getOcId } from "../../js/orderCart/cart";
import axios from "axios";
import { useForm } from "react-hook-form";

function CartLayout() {
    const ocId = getOcId();
    const [cartList, setCartList] = useState([{}]);
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    useEffect(() => {
        axios.get(`/orderCart/list?ocId=${ocId}`).then(response => {
            setCartList(response.data);
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
                                    <td>
                                        <input type="number" className="form-control" {...register("ocCnt")} onChange={(e) => { changeCnt(cart, e) }} />
                                    </td>
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