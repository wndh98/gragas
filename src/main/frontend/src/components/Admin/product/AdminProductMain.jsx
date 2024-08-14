import React from "react";
import { Link } from "react-router-dom";
function AdminProductMain(params) {
    return (

        <div>
            <Link to="/create">상품추가</Link>
            <Link to="/update">상품수정</Link>
            
            
        </div>
    );
}

export default AdminProductMain;