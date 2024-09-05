import './subs.css';
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { getUser, getUserId } from "../../js/userInfo";
import React, { useEffect, useState } from 'react';
import axios from "axios";
import { getCookie } from '../../js/cookieJs';
import SubsNote from './SubsNote';
import SubsAgree from './SubsAgree';
import SubsOrder from './SubsOrder';
import SubsPayment from './SubsPayMent';
import { numberFormat } from '../../js/order';
const generateRandomString = () => window.btoa(Math.random()).slice(0, 20);

function SubsPayForm() {
    const [soId, setSoId] = useState("");
    const { siNum } = useParams();
    const intSiNum = parseInt(siNum);
    const { register, handleSubmit, setValue } = useForm();
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [amount, setAmount] = useState({});
    const [delivery, setDelivery] = useState([]);
    const [selectedDeliveryId, setSelectedDeliveryId] = useState(null);
    const [isVisible, setIsVisible] = useState(false);
    const [selectClass, setSelectClass] = useState("");
    const [item, setItem] = useState({
        siNum: '',
        siMainImg: '',
        siSubject: '',
        siPrice: 0,
        siPayDate: '',
        siArrive: ''
    });
    function generateUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
    useEffect(async () => {
        getUser(setUser);
        const generatedSoId = generateUUID();
        setSoId(generatedSoId);
        setValue("soId", generatedSoId);
        setValue("soPayment", "card")
    }, [])
    useEffect(() => {
        setValue("userId", user.userId);
        setValue("siNum", intSiNum);
    }, [user])

    useEffect(() => {
        axios.get(`/subscribe/description/${siNum}`)
            .then(response => {
                setItem(response.data);
                setValue("soPrice", response.data.siPrice);
            })
            .catch(error => {
                console.error('Error fetching the item data:', error);
                alert(error + ": 오류가 발생했습니다");
            });

    }, [siNum]);

    useEffect(() => {
        axios.get(`/delivery/select/${user.userId}`)
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
    }, [user.userId])

    const handleClick = () => {
        setIsVisible(!isVisible);
    }
    const handleSelectDelivery = (member) => {
        if (selectedDeliveryId === member.mdNum) {
            setSelectedDeliveryId(null);
            setSelectClass("");
            setValue("soName", "");
            setValue("soTel", "");
            setValue("soAddr", "");
            setValue("soAddrDe", "");
            setValue("soMemo", "");
        } else {
            setSelectedDeliveryId(member.mdNum);
            setSelectClass("selectClass");
            setValue("soName", member.mdName);
            setValue("soTel", member.mdTel);
            setValue("soAddr", member.mdAddr);
            setValue("soAddrDe", member.mdAddrDetail);
            setValue("soMemo", member.mdMessage);
        }
    };
    function onSubmit(data) {
        console.log(data);
        axios.post("/subsOrder/insert", data)
            .then(response => {
                return response.data;
            })
            .catch(e => { console.log(e) })
    }

    console.log(soId);
    return (
        <main className='container'>
            <form onSubmit={handleSubmit(onSubmit)} className='formBox'>
                <div className='d-flex flex-column justify-content-center align-items-center'>
                    <div className="mt-5 border p-4 rounded col-6">
                        <div>
                            <div className={`subsDeli ${selectClass}`}>
                                <div className="otherTitle fs-3">배송지 정보</div>
                                {delivery.length > 0 ? (
                                    delivery.map((member, index) => (
                                        <div className={`otherInfo ${selectedDeliveryId === member.mdNum ? 'selected' : ''}`} key={index}>
                                            <div>{member.mdName}</div>
                                            <br />
                                            <div>{member.mdTel}</div>
                                            <br />
                                            <div>{member.mdAddr}</div>
                                            <div>{member.mdAddrDetail}</div>
                                            <br />
                                            <div>{member.mdMessage}</div>
                                            <br />
                                            <button type='button' className='btn btn-secondary' onClick={() => handleSelectDelivery(member)}>선택</button>
                                        </div>
                                    ))
                                ) : (
                                    <SubsOrder />
                                )}
                            </div>

                        </div>
                    </div>
                    <div className="mt-5 border p-4 rounded col-6">
                        <div className="container">
                            <div className="itemDesc">
                                <div className="otherTitle fs-3">구독 상품 정보</div>
                                <div>
                                    <div><img className='img-thumbnail' src={`http://192.168.110.87:8080/upload/subscribe/${item.siNum}/${item.siMainImg}`} alt="" /></div>
                                    <div>
                                        <div className="subsItemInfo">
                                            <div className='fw-bold fs-3'>{item.siSubject}</div>
                                            <div>
                                                <div className='text-end fs-5'>1개</div>
                                                <div className='fs-3 mt-4 mb-4'><span className='text-primary fs-2'>{numberFormat(item.siPrice)}</span>원/월</div>
                                            </div>
                                        </div>
                                        <div className="dateOrNote">
                                            <div className='mt-3 fw-bold'>결제일</div>
                                            <div className='text-secondary px-4 mt-2'>{item.siPayDate}</div>
                                            <br />
                                            <div className='fw-bold'>배송일</div>
                                            <div className='text-secondary px-4 mt-2'>{item.siArrive}</div>
                                            <br />
                                            <SubsNote
                                                siSubject={item.siSubject}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-5 mb-5 col-6 border p-4 rounded">
                        <SubsPayment
                            soId={soId}
                            handleSubmit={handleSubmit}
                            onSubmit={onSubmit}
                            amount={amount}
                            setAmount={setAmount}
                            siNum={siNum}
                            isVisible={isVisible}
                            setIsVisible={setIsVisible}
                        ></SubsPayment>
                    </div>
                </div>
            </form>
        </main>
    );
}

export default SubsPayForm;
