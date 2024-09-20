import { useEffect } from "react";
import { Link } from "react-router-dom";
import { isAdmin } from "../js/userInfo";
import { useNavigate } from "react-router-dom/dist/umd/react-router-dom.development";
import { isAdmin } from "../js/userInfo";

function AdminHeader() {
    useEffect(()=>{
        if(!isAdmin()){
            alert("관리자만 접근 가능합니다.");
            window.history.back();
        }
    },[]);
    // const navi=useNavigate();
    // useEffect(() => {
    //     if (!isAdmin()) {alert("잘못된 접근입니다.");navi("/"); }
    // }, [])

    return (
        <div className="text-bg-light">
            <header className="container d-flex justify-content-center py-3">
                <ul className="nav nav-pills ">
                    <li className="nav-item">
                        <button className="nav-link dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">회원관리</button>
                        <ul class="dropdown-menu">
                            <li><Link className="dropdown-item" to="/admin/user/list/1">회원관리</Link></li>
                        </ul>
                    </li>
                    <li className="nav-item">
                        <button className="nav-link dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">상품관리</button>
                        <ul class="dropdown-menu">
                            <li><Link className="dropdown-item" to="/product/main">상품관리</Link></li>
                            <li><Link className="dropdown-item" to="/procate/main">카테고리관리</Link></li>
                            <li><Link className="dropdown-item" to="/event/main">이벤트관리</Link></li>
                        </ul>
                    </li>
                    <li className="nav-item">
                        <button className="nav-link dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">구독관리</button>
                        <ul class="dropdown-menu">
                            <li><Link className="dropdown-item" to="/subscribe/adminSubscribeList">구독관리</Link></li>
                        </ul>
                    </li>
                    {/* <li className="nav-item">
                        <button className="nav-link dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">주문관리</button>
                        <ul class="dropdown-menu">
                            <li><Link className="dropdown-item" to="">주문관리</Link></li>
                        </ul>
                    </li> */}
                </ul>
            </header>
        </div>

    );
}
export default AdminHeader;