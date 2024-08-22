import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCookie } from "../js/cookieJs";

function Header() {
    const [isLogin, setIsLogin] = useState(false);

    useEffect(() => {
        // 쿠키를 가져오기
        let cookie = getCookie("isLogin");
        // 확인
        console.log(cookie);
        // 쿠키가 있으면?
        if(cookie){
            setIsLogin(true);
        }else{
            setIsLogin(false);
        }
    });
    if(isLogin){
    return (
        <header className="p-3 text-bg-light">
            <div className="container">
                <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                    <Link to="/" className="d-flex align-items-center mb-2 mb-lg-0 text-dark text-decoration-none">
                        로고
                    </Link>
                  <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                      <li><Link to="#" className="nav-link px-2 text-dark">상품</Link></li>
                      <li><Link to="#" className="nav-link px-2 text-dark">구독</Link></li>
                      <li><Link to="#" className="nav-link px-2 text-dark">게시판</Link></li>
                      <li>
                          <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
                              <input type="search" className="form-control form-control" placeholder="Search..." aria-label="Search" />
                          </form>
                      </li>
                  </ul>
                  <ul className="nav col-12 col-lg-auto me-rg-auto mb-2 justify-content-center mb-md-0 align-items-center">
                      <li><Link to={"/myPage"} className="btn btn-outline-dark me-2 px-2" >마이페이지</Link></li>
                      <li><Link to={"/logout"} className="btn btn-warning px-2">로그아웃</Link></li>
                      <li> <Link className="px-2"><i class="bi bi-bag"></i></Link></li>
                  </ul>
              </div>
            </div>
        </header >
    );
}
    return (
        <header className="p-3 text-bg-light">
            <div className="container">
                <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                    <Link to="/" className="d-flex align-items-center mb-2 mb-lg-0 text-dark text-decoration-none">
                        로고
                    </Link>
                  <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                      <li><Link to="#" className="nav-link px-2 text-dark">상품</Link></li>
                      <li><Link to="#" className="nav-link px-2 text-dark">구독</Link></li>
                      <li><Link to="#" className="nav-link px-2 text-dark">게시판</Link></li>
                      <li>
                          <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
                              <input type="search" className="form-control form-control" placeholder="Search..." aria-label="Search" />
                          </form>
                      </li>
                  </ul>
                  <ul className="nav col-12 col-lg-auto me-rg-auto mb-2 justify-content-center mb-md-0 align-items-center">
                      <li><Link to={"/loginForm"} className="btn btn-outline-dark me-2 px-2" >로그인</Link></li>
                      <li><Link to={"/user/joinForm"} className="btn btn-warning px-2">회원가입</Link></li>
                      <li> <Link className="px-2"><i class="bi bi-bag"></i></Link></li>
                  </ul>
              </div>
            </div>
        </header >
    );
}
export default Header;