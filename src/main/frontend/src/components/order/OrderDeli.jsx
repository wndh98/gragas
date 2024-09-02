import axios from "axios";
import { useEffect, useState } from "react";
import execDaumPostcode from "../../js/addInsert";
import { useForm } from "react-hook-form";
import { getUserId } from "../../js/userInfo";

function OrderDeli(props) {
    const register = props.register;
    const errors = props.errors;
    const setValue = props.setValue;
    const handleSubmit = props.handleSubmit;
    const [delivery, setDelivery] = useState([]);
    const userId = getUserId();
    useEffect(() => {
        axios.get(`/delivery/select/${userId}`)
            .then(response => {
                if (response.data && Array.isArray(response.data.deliveryList)) {
                    setDelivery(response.data.deliveryList);
                }
            })
            .catch(error => {
                alert(error + ":오류 발생")
            })
    }, [])
    function changeDeli(event) {
        const selectedIndex = event.target.value;
        if (selectedIndex == "") {
            setValue("olName", "");
            setValue("olTel", "");
            setValue("olAddress", "");
            setValue("olAddressDetail", "");
            setValue("olMemo", "");
            return;
        }
        const deliveryInfo = delivery[selectedIndex];
        if (deliveryInfo) {
            setValue("olName", deliveryInfo.mdName || "");
            setValue("olTel", deliveryInfo.mdTel || "");
            setValue("olAddress", deliveryInfo.mdAddr || "");
            setValue("olAddressDetail", deliveryInfo.mdAddrDetail || "");
            setValue("olMemo", deliveryInfo.mdMessage || "");
        }
    }
    function validOrder(data) {
        console.log(data);
    }
    return (
        <div className="d-flex flex-column border rounded p-4">
            <h3 >배송지</h3>
            <select onChange={(e) => { changeDeli(e) }} className="form-control mt-4">
                <option value="">--배송지선택--</option>
                {delivery.length > 0 ? (
                    delivery.map((deliveryItem, index) => (
                        <option value={index}>
                            {deliveryItem.mdAddr}
                        </option>
                    ))
                ) : (
                    <option>배송지가 없습니다.</option>
                )}
            </select>

            <label htmlFor="olName" className="mt-3">수령인</label>
            <input
                id='olName'
                placeholder="성함을 입력해 주세요"
                className="form-control mt-2"
                {...register("olName", { required: { value: true, message: "성함을 입력해 주세요" } })} />
            <label htmlFor="olTel" className="mt-3">연락처</label>
            <input
                id='olTel'
                placeholder="-을 제외한 숫자만 입력해 주세요"
                pattern='010[0-9]{4}[0-9]{4}'
                className="form-control mt-2"
                {...register("olTel", { required: { value: true, message: "연락처를 입력해 주세요" } })} />
            <button type="button" onClick={() => execDaumPostcode()} className="btn btn-info w-10 p-2 mt-3">주소 검색</button>
            <label htmlFor="olAddress" className="mt-3">배송지</label>
            <input
                id='mAddr'
                placeholder="주소를 입력해 주세요"
                className="form-control mt-2"
                {...register("olAddress", { required: { value: true, message: "주소를 입력해 주세요" } })} />
            <input
                id='mAddrDe'
                placeholder="상세주소를 입력해 주세요"
                className="form-control mt-2"
                {...register("olAddressDetail", { required: { value: true, message: "상세주소를 입력해 주세요" } })} />
            <label htmlFor="olMemo" className="mt-3">배송메모</label>
            <select id="olMemo" {...register("olMemo")} className="form-control mt-2">
                <option value="">배송 요청 사항 선택하기.</option>
                <option>직접 수령하겠습니다.</option>
                <option>배송 전 연락 부탁드립니다.</option>
                <option>부재 시 경비실에 맡겨주세요.</option>
                <option>부재 시 문 앞에 놓아주세요.</option>
                <option>부재 시 택배함에 넣어주세요.</option>
                <option>파손의 위험이 있는 상품입니다. 배송시 주의해주세요.</option>
                <option id='textSelf'>직접 입력하겠습니다.</option>
            </select>


        </div>
    );
}
export default OrderDeli;