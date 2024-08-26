import './subs.css';
import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useForm } from "react-hook-form";
import { getCookie } from '../../js/cookieJs';

function SubsOrder() {

    const { siNum } = useParams();
    const [item, setItem] = useState({
        siNum: '',
        siMainImg: '',
        siSubject: '',
        siPrice: 0,
        siPayDate: '',
        siArrive: ''
    });
    const [delivery, setDelivery] = useState([]);
    const { register, handleSubmit, setValue } = useForm();
    const userId = getCookie("isLogin");

    useEffect(() => {
        axios.get(`/subscribe/description/${siNum}`)
            .then(response => {
                console.log(userId);
                setItem(response.data);
            })
            .catch(error => {
                console.error('Error fetching the item data:', error);
                alert(error + ": 오류가 발생했습니다");
            })

    }, [siNum]);
    useEffect(() => {
        axios.get(`/delivery/select/${userId}`)
            .then(response => {
                if (response.data && Array.isArray(response.data.deliveryList)) {
                    setDelivery(response.data.deliveryList);
                    console.log(delivery);
                } else {
                    console.error('Unexpected data format:', response.data);
                }
            })
            .catch(error => {
                alert(error + ":오류 발생")
            })
    }, [userId])
    async function onSubmit(data) {
        try {
            const response = await axios.post(`/subscribe/subsOrder/regist`, data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.data > 0) {
                alert('성공');
            } else {
                alert('아이디 중복');
            }
        } catch (error) {
            console.error('Error details:', error.response ? error.response.data : error);
            alert('에러 발생: ' + (error.response ? error.response.data.message : error.message));
        }
    }
    function onChange(event) {
        const selectedIndex = event.target.value;
        const deliveryInfo = delivery[selectedIndex];
        if (deliveryInfo) {
            setValue("soName", deliveryInfo.mdName || "");
            setValue("soTel", deliveryInfo.mdTel || "");
            setValue("soAddr", deliveryInfo.mdAddr || "");
            setValue("soAddrDe", deliveryInfo.mdAddrDetail || "");
            setValue("soMemo", deliveryInfo.mdMessage || "");
        }
    }

    return (
        <div>
            <div className="soBox">
                <div className="container">
                    <select onChange={onChange} defaultValue="">
                        <option value="" disabled>--배송지선택--</option>
                        {delivery.length > 0 ? (
                            delivery.map((deliveryItem, index) => (
                                <option key={index} value={index}>
                                    {index + 1}번 배송지
                                </option>
                            ))
                        ) : (
                            <option>배송지가 없습니다.</option>
                        )}
                    </select>
                    <div className="adrressTitle">배송지</div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input type="hidden" {...register("siNum")} value={siNum} />
                        <input type="hidden" {...register("userId")} value={userId} />
                        <label htmlFor="soName">수령인</label>
                        <input
                            id='soName'
                            placeholder="성함을 입력해 주세요"
                            {...register("soName", { required: { value: true, message: "성함을 입력해 주세요" } })} />
                        <label htmlFor="soTel">연락처</label>
                        <input
                            id='soTel'
                            placeholder="-을 제외한 숫자만 입력해 주세요"
                            pattern='010[0-9]{4}[0-9]{4}'
                            {...register("soTel", { required: { value: true, message: "연락처를 입력해 주세요" } })} />
                        <label htmlFor="soAddr">배송지</label>
                        <input
                            id='soAddr'
                            placeholder="주소를 입력해 주세요"
                            {...register("soAddr", { required: { value: true, message: "주소를 입력해 주세요" } })} />
                        <input
                            id='soAddrDe'
                            placeholder="상세주소를 입력해 주세요"
                            {...register("soAddrDe", { required: { value: true, message: "상세주소를 입력해 주세요" } })} />
                        <label htmlFor="soMemo">배송메모</label>
                        <select id="soMemo"{...register("soMemo", { required: { value: true, message: "배송메모를 선택해 주세요" } })}>
                            <option value="" disabled>배송 요청 사항 선택하기.</option>
                            <option>직접 수령하겠습니다.</option>
                            <option>배송 전 연락 부탁드립니다.</option>
                            <option>부재 시 경비실에 맡겨주세요.</option>
                            <option>부재 시 문 앞에 놓아주세요.</option>
                            <option>부재 시 택배함에 넣어주세요.</option>
                            <option>파손의 위험이 있는 상품입니다. 배송시 주의해주세요.</option>
                            <option id='textSelf'>직접 입력하겠습니다.</option>
                        </select>
                        {/* <input type="text" placeholder='최대 50자까지 입력가능합니다.' maxLength={50} {...register("soMemo")} defaultValue={""}/> */}
                        <input type="submit" value={"배송지 저장하기"} />
                    </form>
                </div>
            </div>
            <div className="soBox">
                <div className="container">
                    <div className="itemDesc">
                        <div className="itemTitle">구독 상품 정보</div>
                        <div><img src={`http://localhost:8080/upload/subscribe/${item.siNum}/${item.siMainImg}`} alt="" /></div>
                        <div>{item.siSubject}</div>
                        <div>
                            <div>1개</div>
                            <div>{item.siPrice}원/월</div>
                        </div>
                        <div>
                            <div>결제일</div>
                            <div>{item.siPayDate}</div>
                            <div>배송일</div>
                            <div>{item.siArrive}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SubsOrder;