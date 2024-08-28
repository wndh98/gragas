import React from "react";
import './App.css';


function Cateprop(props) {


    const procate = props.procate;

    return (
        <div className="cateprops">
            <a rel="nosublink" href={`CateMain/${procate.pcNum}`}>
                <div className="catecon">
                    <span className="spdlatmxkdlfa"><img className="dlalwltmxkdlf" src={`http://localhost:8080/upload/procate/${procate.pcNum}/${procate.pcImg}`} alt="탁주 아이콘" /></span>

                </div>
                {procate.pcName}
            </a>
        </div>
    );
}
export default Cateprop;