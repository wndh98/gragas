import { Link } from "react-router-dom";

function Header(){  
    return(
       <header>
            <Link to="/">1.main</Link>&nbsp;&nbsp;
            <Link to="/admin">2.admin</Link>&nbsp;&nbsp;
            <Link to="/loginForm">3.login</Link>&nbsp;&nbsp;
            <Link to="/myPage">4.mypage</Link>

       </header>
    );
}
export default Header;