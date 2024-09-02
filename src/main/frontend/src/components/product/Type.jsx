import React from "react";


const types = ['탁주', '약·청주', '과실주', '증류주', '기타주류']
const sort = ['약한', '중간', '강한']
const prices = ['~1만원', '1만원~3만원', '3만원~5만원', '5만원~10만원', '10만원 이상']


function Type(params) {


    return (
        <div className='spdla tybox'>
            {sort.map(list => {
                return (
                    <div className='spdla mutlple'>
                        <div class="check-box flex">
                            <div class="sc-d5ff5581-0 hNTfqe">
                                <button type="button" class="custom-checkbox"><img src="/images/product/icon_unchecked_square.png" alt="checkbox" /></button></div><button class="option-text">{list}</button>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Type;