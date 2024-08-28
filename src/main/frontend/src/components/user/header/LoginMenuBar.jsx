import { Link, useNavigate } from "react-router-dom";
import { deleteCookie } from "../../../js/cookieJs";
import axios from "axios";

function LoginMenuBar(props) {
    const setIsLogin=props.setIsLogin;
    const navigate = useNavigate();

    function logout() {
        console.log();
        deleteCookie("isLogin");
        axios.get('/logout')
        .then((result) => {
            if(result) {
                setIsLogin(false);
                alert("로그아웃 되었습니다.");
                navigate("/");
            }
        });
    }


    return (
        <ul className="nav col-12 col-lg-auto me-rg-auto mb-2 justify-content-center mb-md-0 align-items-center">
            <li><Link to={"/myPage"} className="btn btn-outline-dark me-2 px-2" >마이페이지</Link></li>
            <li><Link onClick={()=>{logout()}} className="btn btn-warning px-2">로그아웃</Link></li>
            <li> <Link className="px-2"><i class="bi bi-bag"></i></Link></li>
        </ul>
    );
}
export default LoginMenuBar;