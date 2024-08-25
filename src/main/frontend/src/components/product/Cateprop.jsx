import React from "react";
import './App.css';

function Cateprop(props) {

    const cateinfo = ['탁주', '약ㆍ청주', '과실주', '증류주']

    const procate = props.procate;

    return (
        <div className="cateprops">
            <a rel="nosublink" href="/damhwaMarket/listing/takju">

                <div className="catecon">
                    
                        {cateinfo.map((list) => {
                            return (
                                <span><img src={`http://localhost:8080/upload/procate/${procate.pcNum}/${procate.pcImg}`} alt="탁주 아이콘">
                                    </img>{list.cateinfo}</span>
                            );
                        })}
                   
                </div>
            </a>
        </div>
    );
}
export default Cateprop;