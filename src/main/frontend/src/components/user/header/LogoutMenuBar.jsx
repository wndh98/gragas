import { Link } from "react-router-dom";

function LogoutMenuBar() {

    return (
        <ul className="nav col-12 col-lg-auto me-rg-auto mb-2 justify-content-center mb-md-0 align-items-center">
            <li><Link to={"/loginForm"} className="btn btn-outline-dark me-2 px-2" >로그인</Link></li>
            <li><Link to={"/user/joinForm"} className="btn btn-warning px-2">회원가입</Link></li>
            <li> <Link className="px-2"><i class="bi bi-bag"></i></Link></li>
        </ul>
    );
}
export default LogoutMenuBar;