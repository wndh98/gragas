import './App.css';
import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

import { useParams } from 'react-router-dom';
import ProductEventMain from './ProductEventMain';


function EventMain(picture) {
    const pathParam = useParams();
    const eiNum = pathParam.eiNum;
    /*     const [events, setEvents] = useState([]); */
    const [products, setProducts] = useState([]);
    // Axios를 사용하여 Promise기반으로 상품정보를 가져오는 함수
    useEffect(() => {
        axios.get("/pevent/list/" + eiNum)
            .then(response => {
                console.log(response)
                setProducts(response.data); // 가져온 상품정보를 상태에 저장
            })
            .catch(error => console.error("Fetching error:", error))
    }, []);

    /* 
        useEffect(() => {
            axios.get("/product/list")
                .then(response => {
                    setProducts(response.data);
                })
                .catch(error => console.error("Fetching error:", error))
        }, []);
     */
    return (
        <div>
            {products.map(product => {
                return (
                    <ProductEventMain product={product}
                    />
                );
            })}
        </div>
    );
}


export default EventMain;
