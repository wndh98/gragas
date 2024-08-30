import './subs.css';
import '../../js/addressInsert';
import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useForm } from "react-hook-form";
import { getCookie } from '../../js/cookieJs';
import execDaumPostcode from '../../js/addressInsert';
function SubsOrder(props) {
    const { siNum } = useParams();
    const { register, handleSubmit } = useForm();
    const [isSuccess, setIsSuccess] = useState(false);
    const userId = getCookie("isLogin");
    const navigate = useNavigate();
    const setDelivery = props.setDelivery;
    useEffect(()=>{
        if(isSuccess){
            navigate(`/subscribe/subsPayForm/${siNum}`);
        }
    }, [isSuccess]);
    
    async function onSubmit(data) {
        try {
            const response = await axios.post(`/user/delivery/input`, data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.data > 0) {
                alert('성공');
                // setIsSuccess(true);
                axios.get(`/delivery/select/${userId}`)
                .then(response => {
                    if (response.data && Array.isArray(response.data.deliveryList)) {
                        setDelivery(response.data.deliveryList);
                    } else {
                        console.error('Unexpected data format:', response.data);
                    }
                })
                .catch(error => {
                    alert(error + ":오류 발생")
                })
            } else {
                alert('아이디 중복');
            }
        } catch (error) {
            console.error('Error details:', error.response ? error.response.data : error);
            alert('에러 발생: ' + (error.response ? error.response.data.message : error.message));
        }
    }
    return (
        <div>
            <div className="soBox">
                <div className="container">
                    <div className='d-flex flex-column justify-content-center align-items-center'>
                        <div className='border p-4 rounded mt-4'>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <input type="hidden" {...register("siNum")} value={siNum} />
                                <input type="hidden" {...register("userId")} value={userId} />
                                <div className='input-form-box'><label htmlFor="soName">수령인</label>
                                    <input
                                        id='soName'
                                        className='form-control'
                                        placeholder="성함을 입력해 주세요"
                                        {...register("mdName", { required: { value: true, message: "성함을 입력해 주세요" } })} />
                                </div>
                                <div className='input-form-box'><label htmlFor="soTel">연락처</label>
                                    <input
                                        id='soTel'
                                        className='form-control'
                                        placeholder="-을 제외한 숫자만 입력해 주세요"
                                        pattern='010[0-9]{4}[0-9]{4}'
                                        {...register("mdTel", { required: { value: true, message: "연락처를 입력해 주세요" } })} />
                                </div>
                                <br />

                                <div className='dispFlex'>
                                    <label htmlFor="mdAddr">배송지</label>
                                    <button onClick={() => execDaumPostcode()} className='btn btn-primary'>주소 검색</button>
                                </div>
                                <div className="input-form-box">
                                    <input
                                        id='mdAddr'
                                        className='form-control'
                                        placeholder="주소를 입력해 주세요"
                                        {...register("mdAddr", { required: { value: true, message: "주소를 입력해 주세요" } })} />
                                    <br />
                                    <input
                                        id='mdAddrDetail'
                                        className='form-control'
                                        placeholder="상세주소를 입력해 주세요"
                                        {...register("mdAddrDetail", { required: { value: true, message: "상세주소를 입력해 주세요" } })} />
                                </div>
                                <div className='input-form-box'><label htmlFor="mdMessage">배송메모</label>
                                    <select className='form-control' id="mdMessage"{...register("mdMessage", { required: { value: true, message: "배송메모를 선택해 주세요" } })}>
                                        <option value="" disabled>배송 요청 사항 선택하기.</option>
                                        <option>직접 수령하겠습니다.</option>
                                        <option>배송 전 연락 부탁드립니다.</option>
                                        <option>부재 시 경비실에 맡겨주세요.</option>
                                        <option>부재 시 문 앞에 놓아주세요.</option>
                                        <option>부재 시 택배함에 넣어주세요.</option>
                                        <option>파손의 위험이 있는 상품입니다. 배송시 주의해주세요.</option>
                                    </select>
                                </div>
                                <button className='otherButton btn btn-outline-secondary' type="submit" value={"배송지 저장하기"}>배송지 저장하기</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SubsOrder;