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
        <div className='spdla mainbox'>
            <div className='spdla hb'>


                <img src={picture.img} alt={products.piNum} width="45" height="45"></img>
                <div className='spdla tle'></div>
                <div className='spdla more'></div>
            </div>

            <div className='spdla sebox'>

                <button className='swiper-custom-button leftbutton'></button>
                <div className='swiper spdla-swiper'>
                    <div className='swiper-wrapper'>
                        {products.map(product => {
                            return (
                                <ProductEventMain product={product}
                                />
                            );
                        })}


                    </div>
                </div>
                <button className='swiper-custom-button nextbutton'></button>

            </div>
        </div>
    );
}


export default EventMain;
