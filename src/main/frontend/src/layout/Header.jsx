import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCookie } from "../js/cookieJs";
import LoginMenuBar from "../components/user/header/LoginMenuBar";
import LogoutMenuBar from "../components/user/header/LogoutMenuBar";
import TotalItemList from "../components/product/TotalItemList";

function Header() {
    const [isLogin, setIsLogin] = useState(false);
    const [loginButton, setLoginButton] = useState();
    useEffect(() => {
        if (isLogin == true) {
            setLoginButton(<LoginMenuBar setIsLogin={setIsLogin} />);
        } else {
            setLoginButton(<LogoutMenuBar setIsLogin={setIsLogin} />);
        }

    }, [isLogin])

    useEffect(() => {
        // 쿠키를 가져오기
        let cookie = getCookie("isLogin");
        // 쿠키가 있으면?
        if (cookie) {
            setIsLogin(true);
        } else {
            setIsLogin(false);
        }
    });

    return (
        <header className="p-3 text-bg-light">
            <div className="container">
                <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                    <Link to="/main" className="d-flex align-items-center mb-2 mb-lg-0 text-dark text-decoration-none">
                        로고
                    </Link>
                    <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                        <li><Link to="/total" className="nav-link px-2 text-dark">상품</Link></li>
                        <li><Link to="/subscribe/itemList" className="nav-link px-2 text-dark">구독</Link></li>
                        <li><Link to="/board/free/list/1" className="nav-link px-2 text-dark">게시판</Link></li>
                        <li>
                            <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
                                <input type="search" className="form-control form-control" placeholder="Search..." aria-label="Search" />
                            </form>
                        </li>
                    </ul>
                    {loginButton}
                </div>
            </div>
        </header >
    );

}

export default Header;