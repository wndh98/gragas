import { Link } from "react-router-dom";

function Header(){  
    return(
       <header>
            헤더
            <Link to="/">1</Link>
            <Link to="/admin">2</Link>
            <Link to="/login">3</Link>

       </header>
    );
}
export default Header;