import Main from "./Main";
import React, { useEffect, useState } from "react";
import ProductCate from "./ProductCate";
import Side from "./Side";
import axios from "axios";

function MainList(params) {
    const [procate, setProcates] = useState([]);

    useEffect(() => {
        axios.get("/procate/list")
            .then(response => {
                setProcates(response.data);
            })
            .catch(error => console.error("Fetching error:", error))
    }, []);



    return (

        <div>
            <Side />
            <ProductCate />
            {procate.map(cateList => {
                return (
                    <Main pcNum={cateList.pcNum} cateList={cateList} />
                );
            })}
        </div>

    );
}
export default MainList;