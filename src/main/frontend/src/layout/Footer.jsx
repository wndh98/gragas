import { Link } from "react-router-dom";

function Footer() {

    return (
        <div className="container">
            <footer className="py-3 my-4">
                <ul className="nav justify-content-center border-bottom pb-3 mb-3">
                    <li className="nav-item"><Link to="/main" className="nav-link px-2 text-body-secondary">홈</Link></li>
                    <li className="nav-item"><Link to="/total" className="nav-link px-2 text-body-secondary">상품</Link></li>
                    <li className="nav-item"><Link to="#" className="nav-link px-2 text-body-secondary">구독</Link></li>
                    <li className="nav-item"><Link to="#" className="nav-link px-2 text-body-secondary">게시판</Link></li>
                    <li className="nav-item"><Link to="/productEvent" className="nav-link px-2 text-body-secondary">이벤트</Link></li>
                </ul>
                <p className="text-center text-body-secondary">그린컴퓨터아카데미</p>
            </footer>
        </div>
    );
}
export default Footer;