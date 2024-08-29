import './subs.css';
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import React, { useEffect, useState } from 'react';
import axios from "axios";
import { getCookie } from '../../js/cookieJs';
import SubsNote from './SubsNote';
import SubsAgree from './SubsAgree';
import SubsOrder from './SubsOrder';


function SubsPayMent() {
    const location = useLocation();
    const subsDeli = location.state;
    const { soNum, siNum } = useParams(); // useParams를 비구조화 할당으로 사용
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    const userId = getCookie("isLogin");
    const [delivery, setDelivery] = useState([]);
    const [selectedDeliveryId, setSelectedDeliveryId] = useState(null);
    const [isVisible, setIsVisible] = useState(false);
    const [selectClass,setSelectClass]=useState("");
    const [item, setItem] = useState({
        siNum: '',
        siMainImg: '',
        siSubject: '',
        siPrice: 0,
        siPayDate: '',
        siArrive: ''
    });

    useEffect(() => {
        axios.get(`/subscribe/description/${siNum}`)
            .then(response => {
                setItem(response.data);
            })
            .catch(error => {
                console.error('Error fetching the item data:', error);
                alert(error + ": 오류가 발생했습니다");
            });

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

    function creatVirtualAccount() {
        axios.post('/subscribe/virtualAccountCreat')
            .then(response => {
                // 서버 응답을 처리하고 상태를 업데이트하거나 사용자에게 알림
                console.log(response.data);
                alert("가상계좌가 생성되었습니다: " + JSON.stringify(response.data));
            })
            .catch(error => {
                console.error('Error creating virtual account:', error);
                alert("가상계좌 생성 중 오류가 발생했습니다: " + error.message);
            });
    }
    const handleClick = () => {
        setIsVisible(!isVisible);
    }
    const handleSelectDelivery = (selectedDelivery) => {
        if (selectedDeliveryId === selectedDelivery.mdNum) {
            setSelectedDeliveryId(null);
            setSelectClass("");
        } else {
            setSelectedDeliveryId(selectedDelivery.mdNum);
            setSelectClass("selectClass");
            // setDelivery([selectedDelivery]);
        }
    };
    const style = {
        paddingBottom: "10px",
        fontWeight: "bold"
    }
    return (
        <main className='container'>
            <div className='d-flex flex-column justify-content-center align-items-center'>
                <div className="mt-5 border p-4 rounded col-4">
                    <div>
                        <div className={`subsDeli ${selectClass}`}>
                            <div className="otherTitle">배송지 정보</div>
                            {delivery.length > 0 ? (
                                delivery.map((item, index) => (
                                    <div className={`otherInfo ${selectedDeliveryId === item.mdNum ? 'selected' : ''}`} key={index}>
                                        <div>{item.mdName}</div>
                                        <br />
                                        <div>{item.mdTel}</div>
                                        <br />
                                        <div>{item.mdAddr}</div>
                                        <div>{item.mdAddrDetail}</div>
                                        <br />
                                        <div>{item.mdMessage}</div>
                                        <br />
                                        <button className='btn btn-secondary' onClick={() => handleSelectDelivery(item)}>선택</button>
                                    </div>
                                ))
                            ) : (
                                <SubsOrder setDelivery={setDelivery}/>
                            )}
                        </div>

                    </div>
                </div>
                <div className="mt-5 border p-4 rounded col-4">
                    <div className="container">
                        <div className="itemDesc">
                            <div className="otherTitle">구독 상품 정보</div>
                            <div>
                                <div><img src={`http://localhost:8080/upload/subscribe/${item.siNum}/${item.siMainImg}`} alt="" /></div>
                                <div>
                                    <div className="subsItemInfo">
                                        <div>{item.siSubject}</div>
                                        <div>
                                            <div>1개</div>
                                            <div>{item.siPrice}원/월</div>
                                        </div>
                                    </div>
                                    <div className="dateOrNote">
                                        <div>결제일</div>
                                        <br />
                                        <div>{item.siPayDate}</div>
                                        <br />
                                        <div>배송일</div>
                                        <br />
                                        <div>{item.siArrive}</div>
                                        <br />
                                        <SubsNote />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-5 col-4 border p-4 rounded">
                    <div className="container">
                        <div className="otherTitle">결제 방법</div>
                        <div className="otherInfo">
                            <div className="spmButton">
                                <button>신용/체크카드</button>
                                <button onClick={() => creatVirtualAccount()}>가상계좌</button>
                                <button>카카오페이</button>
                                <button>네이버페이</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-5 col-4 border p-4 rounded">
                    <div className="container">
                        <div className="otherTitle">구독 결제 정보</div>
                        <div className='otherInfo'>
                            <p>결제 방법</p>
                            <p>(결제방법밸류)</p>
                            <p>상품 금액</p>
                            <p>{item.siPrice}원/월</p>
                            <p>상품 수량</p>
                            <p>1개</p>
                        </div>
                        <div className='payMentAmount d-flex justify-content-between'>
                            <div style={style}>정기결제 금액</div>
                            <div><p>{item.siPrice}원/월</p></div>
                        </div>
                    </div>
                </div>
                <div className="mt-5 col-4 border p-4 rounded">
                    <div className="container">
                        <div className="spmAgreeBox">
                            <div>
                                <div>
                                    <div>
                                        <input type="checkbox" name="agreeCheck" id="agreeCheck" className='form-check-input-checked-bg-image' />
                                        <label htmlFor="agreeCheck">구매자의 정보수집ㆍ이용에 동의(필수)</label>
                                    </div>
                                    <div>
                                        <button className='btn btn-secondary' onClick={handleClick}>보기</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            {isVisible && <SubsAgree />}
                        </div>
                    </div>
                </div>
                <div className="mt-5 col-4 rounded">
                    <button className='otherButton btn btn-primary'>구독 신청하기</button>
                </div>
            </div>
        </main>
    );
}

export default SubsPayMent;
