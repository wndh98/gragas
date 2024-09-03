import './App.css';
import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

import { useParams } from 'react-router-dom';
import ProductEventMain from './ProductEventMain';


function EventMain() {
    const pathParam = useParams();
    const eiNum = pathParam.eiNum;

    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get("/pevent/list/" + eiNum)
            .then(response => {
                console.log(response)
                setProducts(response.data);
            })
            .catch(error => console.error("Fetching error:", error))
    }, []);


    useEffect(() => {
        axios.get("/product/list")
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => console.error("Fetching error:", error))
    }, []);

    return (
        <div>
            <ProductEventMain />
        </div>
    );
}


export default EventMain;
