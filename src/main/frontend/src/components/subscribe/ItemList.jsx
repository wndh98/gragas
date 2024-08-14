import './subs.css'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function ItemList() {
    const [items, setItems] = useState([]);
    const navigate = useNavigate();

    function subsDescription(item) {
        let siTitle = item.siTitle;
        if (siTitle === "종합") siTitle = "basic";
        if (siTitle === "증류주") siTitle = "soju";
        if (siTitle === "약·청주") siTitle = "yakju";
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

    return (
        <>
            <div>구독상품 목록</div>
            <div className="container">{items.map(item => (
                <div className="row" key={item.siNum} onClick={() => subsDescription(item)}>
                    <div className="border col-10 subscribe_box">
                        <div>{item.siMainImg ? <img src={`/images/subscribe/subs_main/${item.siMainImg}`} alt="Main" style={{ width: '100px', height: 'auto' }} /> : '-'}</div>
                        <div>
                            <h2>{item.siTitle} 구독박스</h2>
                            <p>{item.siContent}</p>
                        </div>
                    </div>
                </div>
            ))}
            </div>
        </>
    );
}

export default ItemList;
