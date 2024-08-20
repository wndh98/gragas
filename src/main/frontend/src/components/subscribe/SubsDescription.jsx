import './subs.css'
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function SubsDescription(){
    const { siNum } = useParams();
    const [item, setItem] = useState([]);
    const navigate = useNavigate();
    const num = 0;

    function descriptionCategory(num){
        navigate(`/subscribe/description/${num}`);
    }

    useEffect(()=>{
            axios.get(`/subscribe/description/${siNum}`)
            .then(response=>{
                setItem(response.data);
            })
            .catch(error=>{
                console.error('Error fetching the item data:', error);
            });
    }, [siNum]);

    if(!item){
        return <p>loading...</p>
    }

    return(
        <div>
            <div className='subscribe_header'>
                <div className='button_wrap'>
                    <div className='button_flex'>
                    <button onClick={() => descriptionCategory(5)} id="basic">종합 구독</button>
                    <button onClick={() => descriptionCategory(6)} id="soju">증류주 구독</button>
                    <button onClick={() => descriptionCategory(7)} id="yakju">약·청주 구독</button>
                    </div>
                </div>
            </div>
            <div className="container subs_box">
                <div className='col main_div1'>
                    <img className='subs_img' src={`/images/subscribe/subs_main/${item.siMainImg}`} alt="Main"/>
                </div>
                <div className='col main_div2'>
                    <div>{item.siSubject}</div>
                    <div>월 {item.siPrice}</div>
                    <div>{item.siContent}</div>
                    <div>결제일 {item.siPayDate}</div>
                    <div>배송일 {item.siArrive}</div>
                </div>
            </div>
        </div>
    )
}

export default SubsDescription;