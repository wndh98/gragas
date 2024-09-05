import './App.css';
import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";




function ProductEvent() {
    const { register, formState: { error } } = useForm();
    const [events, setEvents] = useState([]);
    // Axios를 사용하여 Promise기반으로 상품정보를 가져오는 함수
    useEffect(() => {

        axios.get("/event/list")
            .then(response => {
                setEvents(response.data); // 가져온 상품정보를 상태에 저장
            })
            .catch(error => console.error("Fetching error:", error))
    }, []);



    return (
        <div>

            {events.map((product) => {

                console.log(events)
                return (

                    <div>
                        <Link to={"/productEventMain/" + product.eiNum}
                            {...register("eiNum")}>  <img src={`http://192.168.110.87:8080/upload/event/${product.eiNum}/${product.eiContent}`} alt="" value={product.eiNum} /></Link>
                    </div>
                );
            })}

        </div>
    );
}
export default ProductEvent;