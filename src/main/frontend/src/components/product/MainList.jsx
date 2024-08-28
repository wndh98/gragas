import Main from "./Main";
import React from "react";
import ProductCate from "./ProductCate";
function MainList(params) {
    return (
        <div>
            <ProductCate />
            <Main />
            <Main />
            <Main />
            <Main />
        </div>
    );
}
export default MainList;