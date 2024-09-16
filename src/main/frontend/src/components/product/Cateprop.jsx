import React from "react";
import './App.css';
import { Link } from "react-router-dom";


function Cateprop(props) {


    const procate = props.procate;

    return (
        <div className="cateprops">
            <Link rel="nosublink" to={`CateMain/${procate.pcNum}`}>
                <div className="catecon">
                    <span className="spdlatmxkdlfa"><img className="dlalwltmxkdlf" src={`http://192.168.110.87:8080/upload/procate/${procate.pcNum}/${procate.pcImg}`} alt="탁주 아이콘" /></span>

                </div>
                {procate.pcName}
            </Link>
        </div>
    );
}
export default Cateprop;