import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getOcId, isOcId, setOcId } from "../../js/orderCart/cart";
import { getUserId, isLogin } from "../../js/userInfo";
import { useNavigate } from "react-router-dom";
import { numberFormat } from "../../js/order";

function ProductItemSide(props) {
    const navi = useNavigate();
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const piNum = props.piNum
    const [option, setOption] = useState([]);
    const [price, setPrice] = useState(0);
    const ocId = getOcId();
    // Axios를 사용하여 Promise기반으로 상품정보를 가져오는 함수
    useEffect(() => {
        axios.get("/option/list/" + piNum)
            .then(response => {
                setOption(response.data); // 가져온 상품정보를 상태에 저장
                if (response.data[0].poSale > 0) {
                    setPrice(response.data[0].poSale)
                } else {
                    setPrice(response.data[0].poPrice)
                }
                setValue("poNum", response.data[0].poNum)
            })
            .catch(error => console.error("Fetching error:", error))
        setValue("userId", getUserId());
    }, []);


    setValue("piNum", piNum);

    function directBuy(data) {
        if (!isLogin()) {
            alert("로그인후 이용가능합니다.");
            navi("/loginForm");
            return false;
        }
        data.ocId = crypto.randomUUID();
        axios.post("/orderCart/select", data).then(response => {
            console.log(response);
            if (response.data != "") {
                alert("이미 추가한 물건입니다.");
                return false;
            } else {
                axios.post("/orderCart/saveCart", data).then(result => {
                    if (result.data == 1) {
                        navi(`/order/orderForm/${data.ocId}`);
                    }
                });
            }
        });
    }
    function addCart(data) {
        if (!isLogin()) {
            alert("로그인후 이용가능합니다.");
            navi("/loginForm")
            return false;
        }
        data.ocId = ocId;
        axios.post("/orderCart/select", data).then(response => {
            console.log(response);
            if (response.data != "") {
                alert("이미 추가한 물건입니다.");
                return false;
            } else {
                axios.post("/orderCart/saveCart", data).then(result => {
                    if (result.data == 1) {
                        alert("장바구니에 물건을 담았습니다.");
                    }
                });
            }
        });

    }
    return (
        <div className="right-side position-sticky top-0 border border-secondary-subtle rounded">
            <form >
                <input type="hidden" {...register("piNum")} />
                <input type="hidden" {...register("userId")} />
                <div className="label">
                    옵션
                </div>
                <div className="select-wrapper">
                    <select class="form-select" {...register("poNum")}>
                        {option.map(op => {
                            return (<option value={op.poNum}>{op.poName}</option>)
                        })}

                    </select>
                </div>
                <div className="label">
                    수량
                </div>
                <div className="count">
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <button class="btn btn-outline-secondary" type="button" id="button-minus">-</button>
                        </div>
                        <input type="text" class="form-control quantity-input" id="quantity" value="1" readonly {...register("poCnt")} />
                        <div class="input-group-append">
                            <button class="btn btn-outline-secondary" type="button" id="button-plus">+</button>
                        </div>
                    </div>
                </div>
                <div className="label">
                    총 상품가격
                </div>
                <div className="select-wrapper position-sticky top-0 border border-secondary-subtle" style={{ height: "40px" }}>
                    {numberFormat(price)}원
                </div>
                <div className="buttons">
                    <div className="button cart-button-gift-button">
                        <button type="button" class="btn btn-outline-secondary" onClick={handleSubmit(addCart)}>장바구니</button><button type="button" class="btn btn-outline-secondary">선물하기</button>
                    </div>
                    <div>
                        <button class="btn btn-primary" type="button" onClick={handleSubmit(directBuy)}>바로 구매하기</button>
                    </div>
                </div>
            </form>
        </div>
    );
}
export default ProductItemSide;