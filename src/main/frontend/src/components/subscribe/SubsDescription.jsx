import './subs.css';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { getCookie } from '../../js/cookieJs';

function SubsDescription() {
    const { siNum } = useParams();
    const [items, setItems] = useState({});
    const [siTitles, setTitles] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [basicMap, setBasicMap] = useState(['basic', 'yakchungju', 'soju']);
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
            navigate(`/subscribe/subsPayForm/${num}`)
    }
    useEffect(() => {
        axios.get(`/subscribe/description/${siNum}`)
            .then(response => {
                setItems(response.data);
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
    const handleLoad = (index) => {
        setBasicMap(prevState => {
            let newBasicValue;
            if (index === 0) {
                newBasicValue = 'basic';
            } else if (index === 1) {
                newBasicValue = 'yakchungju';
            } else {
                newBasicValue = 'soju';
            }

            return {
                ...prevState,
                [index]: newBasicValue
            };
        });
    }
    if (!items || siTitles.length === 0) {
        return (
            <div class="spinContainer" style={{}}>
                <div class="spinner"></div>
            </div>
        )
    }
    const handleButtonClick = (index) => {
        setSelectedIndex(index);
        descriptionCategory(siTitles[index].siNum);
    };
    return (
        <div>
            <div className='subscribe_header'>
                <div className='container button_wrap'>
                    <div className='button_flex'>
                    {siTitles.map((item, index) => (
                            <button 
                                key={item.siNum} 
                                onClick={() => handleButtonClick(index)} 
                                className={selectedIndex == index ? 'selected-button' : 'unselected-button'}>
                                <img 
                                    onLoad={() => handleLoad(index)}
                                    src={`https://www.sooldamhwa.com/_next/image?url=%2Fimages%2Fmodules%2Fsubscribe%2Ficon_${basicMap[index]}_damhwabox.png&w=32&q=75`} 
                                    alt="" 
                                    style={{ 
                                        width: '18px', 
                                        height: '18px',
                                    }} 
                                />
                                {item.siTitle} 구독
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            <div className="container subs_box">
                <div className='col main_div1'>
                    <img className='subs_img' src={`http://localhost:8080/upload/subscribe/${items.siNum}/${items.siMainImg}`} alt="Main" style={{ width: '464px', height: '464px' }} />
                </div>
                <div className='col main_div2'>
                    <div>
                        <div className="smallMarginBox"/>
                        <div className='siSubject'>{items.siSubject}</div>
                        <div className='siPrice'>월 {items.siPrice}원</div>
                        <div className="smallMarginBox">
                            <div className='smallBox' style={{justifyContent : 'flex-start'}}>
                                <p>단품 구매보다 저렴해요!</p>
                            </div>
                        </div>
                        <div className='siContent fs-5'>{items.siContent}</div>
                        <div className="largeMarginBox"></div>
                        <div className='smallFont'>결제일 {items.siPayDate}</div>
                        <div className="smallMarginBox"></div>
                        <div className='smallFont'>배송일 {items.siArrive}</div>
                    </div>
                    <div className='mt-5 w-75'>
                        <button type='button' className='otherButton btn btn-primary mt-5 mb-0' onClick={() => subscribeOrder(items.siNum)}><strong>구독 신청하기</strong></button>
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
                        <img src={`http://localhost:8080/upload/subscribe/${items.siNum}/${items.siDesImg}`} alt="Des" className='des_img' />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SubsDescription;
