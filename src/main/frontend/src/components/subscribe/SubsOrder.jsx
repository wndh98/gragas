import './subs.css';
import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useForm } from "react-hook-form";

function SubsOrder() {
    const { siNum } = useParams();
    const [item, setItem] = useState({});
    const { register, handleSubmit} = useForm();

    useEffect(()=>{
        axios.get(`/subscribe/description/${siNum}`)
        .then(response=>{
            setItem(response.data);
        })
        .catch(error =>{
            console.error('Error fetching the item data:', error);
        })
    },[siNum]);

    function onSubmit(data) {
        // 콘솔에 제출된 데이터를 출력하여 확인합니다.
        console.log('제출된 데이터:', data);
    }
    const formData = new FormData();
    return (

        <div>
            <div className="soBox">
                <div className="container">
                    <div className="adrressTitle">배송지</div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input type="hidden" value={siNum}/>
                        <label htmlFor="soName">수령인</label>
                        <input id='soName' placeholder="성함을 입력해 주세요" {...register("soName")} />
                        <label htmlFor="soTel">연락처</label>
                        <input id='soTel' placeholder="-을 제외한 숫자만 입력해 주세요" {...register("soTel")} />
                        <label htmlFor="soAddr">배송지</label>
                        <input id='soAddr' placeholder="주소를 입력해 주세요" {...register("soAddr")} />
                        <input id='soAddrDe' placeholder="상세주소를 입력해 주세요" {...register("soAddrDe")} />
                        <label htmlFor="soMemo">배송메모<p>(선택)</p></label>
                        <select id="soMemo" {...register("soMemo")}></select>
                        <input type="submit" value={"배송지 저장하기"}/>
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