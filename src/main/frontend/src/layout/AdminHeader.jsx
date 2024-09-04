import { Link } from "react-router-dom";

function AdminHeader() {
    return (
        <div className="container">
            <header className="d-flex justify-content-center py-3">
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
                            <li><Link className="dropdown-item" to="">상품관리</Link></li>
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