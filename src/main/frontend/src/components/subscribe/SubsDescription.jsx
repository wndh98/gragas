import './subs.css';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { getCookie } from '../../js/cookieJs';

function SubsDescription() {
    const { siNum } = useParams();
    const [item, setItem] = useState({});
    const [siTitles, setTitles] = useState([]);
    const navigate = useNavigate();
    const userId = getCookie("isLogin");

    function descriptionCategory(num) {
        navigate(`/subscribe/description/${num}`);
    }

    function subscribeOrder(num) {
        if (userId == null) {
            alert("로그인이 필요합니다.")
            return false;
        } else
            navigate(`/subscribe/subsOrder/${num}`)
    }
    useEffect(() => {
        axios.get(`/subscribe/description/${siNum}`)
            .then(response => {
                setItem(response.data);
                axios.get('/subscribe/itemList')
                    .then(response => {
                        setTitles(response.data);
                    })
                    .catch(error => {
                        console.error('Error fetching categories:', error);
                    });
            })
            .catch(error => {
                console.error('Error fetching the item data:', error);
            });
    }, [siNum]);

    if (!item || siTitles.length === 0) {
        return <p>Loading...</p>; // 데이터 로딩 중 메시지 표시
    }

    return (
        <div>
            <div className='subscribe_header'>
                <div className='container button_wrap'>
                    <div className='button_flex'>
                        {siTitles.map(({ siNum, siTitle }) => (
                            <button key={siNum} onClick={() => descriptionCategory(siNum)}>
                                {siTitle} 구독
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            <div className="container subs_box">
                <div className='col main_div1'>
                    <img className='subs_img' src={`http://localhost:8080/upload/subscribe/${item.siNum}/${item.siMainImg}`} alt="Main" />
                </div>
                <div className='col main_div2'>
                    <div>
                        <div className='siSubject'>{item.siSubject}</div>
                        <div className='siPrice'>월 {item.siPrice}원</div>
                        <div className="mediumMarginBox"></div>
                        <div className='siContent'>{item.siContent}</div>
                        <div className="largeMarginBox"></div>
                        <div className='smallFont'>결제일 {item.siPayDate}</div>
                        <div className="smallMarginBox"></div>
                        <div className='smallFont'>배송일 {item.siArrive}</div>
                    </div>
                    <div className='subscribeButton'>
                        <button type='button' onClick={() => subscribeOrder(item.siNum)}><strong>구독 신청하기</strong></button>
                    </div>
                </div>
            </div>
            <div className="description">
                <div className="blackBox">
                    <div className="desBar container">
                        <button>상품정보</button>
                        <button>리뷰</button>
                    </div>
                </div>
                <div className="desMain container">
                    <div className="siDescription">
                        <img src={`http://localhost:8080/upload/subscribe/${item.siNum}/${item.siDesImg}`} alt="Des" className='des_img' />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SubsDescription;
