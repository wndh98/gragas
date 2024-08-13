import { Link } from "react-router-dom";

function Header(){  
    return(
       <header>
            <Link to="/">1</Link>
            <Link to="/admin">2</Link>

       </header>
    );
}
export default Header;