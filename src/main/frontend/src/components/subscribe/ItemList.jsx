import './subs.css'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Index from '../Index';

function ItemList() {
    const [items, setItems] = useState([]);
    const navigate = useNavigate();
    const [basicMap, setBasicMap] = useState(['basic', 'yakchungju', 'soju']);
    function subsDescription(item) {
        navigate(`/subscribe/description/${item.siNum}`, { state: { item } });
    }

    useEffect(() => {
        axios.get('/subscribe/itemList')
            .then(response => {
                setItems(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the users!', error);
            });
    }, []);

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
    const smallBox = (index) => {
        if (index === 0) {
            return (
                <div className='smallBox'>
                    <p>입문용</p>
                    <p>다양한 주종</p>
                    <p>인기</p>
                </div>
            )
        } else if (index === 1) {
            return (
                <div className='smallBox'>
                    <p>맑은술 애호가</p>
                    <p>깔끔한 맛</p>
                    <p>프리미엄</p>
                </div>
            )
        } else {
            return (
                <div className='smallBox'>
                    <p>고도수 애호가</p>
                    <p>매니아층</p>
                </div>
            )
        }
    }
    return (
        <>
            <div className="container">
                <div className='fs-2 fw-bold mt-5'>
                    구독 박스를 선택해서 구성을 확인해보세요.
                </div>
                <div className='dispFlex container-md itemDiv'>{items.map((item, index) => (
                    <div className='dispContent' key={item.siNum} onClick={() => subsDescription(item)}>
                        <div className='subsItemBox otherInfo'>
                            <div>{item.siMainImg ? <img src={`http://localhost:8080/upload/subscribe/${item.siNum}/${item.siMainImg}`} alt="Main" /> : '-'}
                            </div>
                            <div>
                                <div className='imgBoxFlex'>
                                    <img onLoad={() => handleLoad(index)}
                                        src={`https://www.sooldamhwa.com/_next/image?url=%2Fimages%2Fmodules%2Fsubscribe%2Ficon_${basicMap[index]}_damhwabox.png&w=32&q=75`}
                                        alt="" style={{ width: '32px', height: '32px' }} />
                                    <h4>{item.siSubject}</h4>
                                </div>
                                <p className='text-secondary'>{item.siDescription}</p>
                                {smallBox(index)}
                            </div>
                        </div>
                    </div>
                ))}
                </div>
            </div>
        </>
    );
}

export default ItemList;
