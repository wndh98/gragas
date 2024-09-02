import './App.css';
import React from 'react';
const proHeader = [
    {
        pcNum: "0",
        heainfo: '전체상품',
        heainfo2: '담화마켓의 모든 술을 만나보세요!',
        imgList: '/images/product/icon-total.png',
    },
    {
        pcNum: "8",
        heainfo: '탁주',
        heainfo2: '맛있는 막걸리는 여기 다 있어요.',
        imgList: '/images/product/icon-yakchungju.png',
    },
    {
        pcNum: "9",
        heainfo: '약·청주',
        heainfo2: '맑고 깨끗한 술들이 모여있어요.',
        imgList: '/images/product/icon-takju.png',
    },
    {
        pcNum: "10",
        heainfo: '과실주',
        heainfo2: '우리, 와인은 몰라도 분위기는 알잖아요.',
        imgList: '/images/product/icon-wine.png',
    },
    {
        pcNum: "11",
        heainfo: '증류주',
        heainfo2: '소주도 취향 타는 거 알고 계셨어요?',
        imgList: '/images/product/icon-soju.png',
    },
]
function ProHeaderList(props) {
    const pcNum = props.pcNum != null ? props.pcNum : 0;

    return (
        <>
            {proHeader.map(heaList => {
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