import React from "react";


// const types = ['탁주', '약·청주', '과실주', '증류주', '기타주류']

// const prices = ['~1만원', '1만원~3만원', '3만원~5만원', '5만원~10만원', '10만원 이상']

const typeList = [
    {
        id: 1,
        message1: '탁주',
        message2: '단맛',
        message3: '~1만원',
    },
    {
        id: 2,
        message1: '약·청주',
        message3: '1만원~3만원',
    },
    {
        id: 3,
        message1: '과실주',
        message3: '1만원~3만원',
    },
    {
        id: 4,
        message1: '증류주',
        message3: '5만원~10만원',
    },
    {
        id: 5,
        message1: '기타주류',
        message3: '10만원 이상',
    },
];
function Type(params) {


    return (
        <div width="350px" className='spdla typebox'>
            <div className='spdla tybox'>
                {typeList.map(list => {
                    return (
                        <div className='spdla mutlple'>
                            <div class="check-box flex">
                                <div class="sc-d5ff5581-0 hNTfqe">
                                    <button type="button" class="custom-checkbox "><img src="/images/product/icon_unchecked_square.png" alt="checkbox" /></button></div><button class="option-text">{list.message1}</button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Type;
