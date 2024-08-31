import Main from "./Main";
import React from "react";
import ProductCate from "./ProductCate";
import Side from "./Side";
function MainList(params) {
    return (

        <div>
            <Side/>
            <ProductCate />
            <Main />
            <Main />
            <Main />
            <Main />
        </div>

    );
}
export default MainList;