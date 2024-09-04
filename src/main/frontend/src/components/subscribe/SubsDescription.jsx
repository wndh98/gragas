import './subs.css';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { getCookie } from '../../js/cookieJs';
import { numberFormat } from '../../js/order';

function SubsDescription() {
    const { siNum } = useParams();
    const [items, setItems] = useState({});
    const [siTitles, setTitles] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(siNum);
    const [basicMap, setBasicMap] = useState(['basic', 'yakchungju', 'soju']);
    const navigate = useNavigate();
    const userId = getCookie("isLogin");

    function descriptionCategory(num) {
        navigate(`/subscribe/description/${num}`);
    }

    function subscribeOrder(num) {
        navigate(`/subscribe/subsPayForm/${num}`);
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
    const handleButtonClick = (index, siNum) => {
        setSelectedIndex(siNum);
        descriptionCategory(siTitles[index].siNum);
    };

    const moveTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }
    return (
        <div>
            <div className='subscribe_header'>
                <div className='container button_wrap'>
                    <div className='button_flex'>
                        {siTitles.map((item, index) => (
                            <button
                                key={item.siNum}
                                onClick={() => handleButtonClick(index, item.siNum)}
                                className={selectedIndex == item.siNum ? 'selected-button' : 'unselected-button'}>
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
                    <img className='subs_img img-thumbnail' src={`http://localhost:8080/upload/subscribe/${items.siNum}/${items.siMainImg}`} alt="Main" style={{ width: '464px', height: '464px' }} />
                </div>
                <div className='col main_div2'>
                    <div>
                        <div className="smallMarginBox" />
                        <div className='siSubject'>{items.siSubject}</div>
                        <div className='siPrice'>월 {numberFormat(items.siPrice)}원</div>
                        <div className="smallMarginBox">
                            <div className='smallBox' style={{ justifyContent: 'flex-start' }}>
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
                        {/* <button>리뷰</button> */}
                    </div>
                </div>
                <div className="desMain container">
                    <div className="siDescription">
                        <img src={`http://localhost:8080/upload/subscribe/${items.siNum}/${items.siDesImg}`} alt="Des" className='des_img' />
                    </div>
                </div>
            </div>
            <div class="moveTopBtn border border-0" onClick={() => moveTop()}>
                <svg className='w-100 h-100' xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-arrow-up-square" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm8.5 9.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707z" />
                </svg>
            </div>
        </div>
    );
}

export default SubsDescription;
