import './App.css';
import React, { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';

function ProHeaderList(props) {
    const pcNum = props.pcNum != null ? props.pcNum : 0;
    const [tList, setTList] = useState([{}]);
    const [procate, setProcates] = useState([]);
    let nameArr = [{ pcNum: 0, heainfo: '전체상품', heainfo2: '담화마켓의 모든 술을 만나보세요!', imgList: '/images/product/icon-total.png' }];
    const headinfo2 = ['맛있는 막걸리는 여기 다 있어요.', '맑고 깨끗한 술들이 모여있어요.', '우리, 와인은 몰라도 분위기는 알잖아요.', '소주도 취향 타는 거 알고 계셨어요?'];
    useEffect(() => {
        axios.get("/procate/list")
            .then(response => {
                setProcates(response.data);
                response.data.map((pcNums, index) => {
                    nameArr.push({ pcNum: pcNums.pcNum, heainfo: pcNums.pcName, heainfo2: headinfo2[index], imgList: `/upload/procate/${pcNums.pcNum}/${pcNums.pcImg}` });
                })
                setTList(nameArr);

            })
            .catch(error => console.error("Fetching error:", error))
    }, [])

    return (
        <>
            {tList.map(heaList => {
                return (
                    pcNum == heaList.pcNum ? <ProHeader heaList={heaList} /> : ""
                )
                // return (
                //     <ProHeader heaList={heaList} />
                // )
            })}

        </>
    )
}


function ProHeader(props) {
    let heaList = props.heaList;

    return (
        <div className="heawrap">

            <div className="heawrap2">
                <div>
                    <div class="sc-56cd1c58-4 cXVSbx">{heaList.heainfo}</div>
                    <div class="sc-56cd1c58-5 znzLJ">{heaList.heainfo2}</div>
                </div>
                <div class="icon-wrapper">
                    <img src={heaList.imgList} alt="sool-data-icon" />
                </div>
            </div>

        </div>
    )
}

export default ProHeaderList;