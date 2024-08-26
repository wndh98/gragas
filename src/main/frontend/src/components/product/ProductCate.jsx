import React from "react";
import Cateprop from "./Cateprop";
import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

function ProductCate(params) {

    const [procates, setProcates] = useState([]);

    useEffect(() => {
        axios.get("/procate/list")
            .then(response => {
                setProcates(response.data);
            })
            .catch(error => console.error("Fetching error:", error))
    }, []);

    return (
        <div className="catewrap">
            <div className="catebox">
                {procates.map(procate => {
                    return (
                        <Cateprop procate={procate}
                        />
                    );
                })}

            </div>
        </div>
    );
}
export default ProductCate;