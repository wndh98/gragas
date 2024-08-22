import { Link } from "react-router-dom";

function HeaderLogin() {
    return (
        <>
          <li><Link to={"/loginForm"} className="btn btn-outline-dark me-2 px-2" >Login</Link></li>
        </>
    );
}

function HeaderLogout() {
  return (
      <>
        <li><Link to={"/logout"} className="btn btn-outline-dark me-2 px-2" >Logout</Link></li>
      </>
  );
}

export default HeaderLogin;