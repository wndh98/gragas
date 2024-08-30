import './App.css';
import React from 'react';
import Boxes from './Boxes';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ProHeader from './ProHeader';

const typeList = [{ type: '주종', test: ['탁주', '청주'] }, { type: '도수', test: ['0%-10%', '10%-20%', '20%-30%', '30%이상'] }, { type: '단맛', test: ['약한', '중간', '강한'] }, { type: '신맛', test: ['약한', '중간', '강한'] }, { type: '탄산', test: ['약한', '중간', '강한'] }, { type: '가격', test: ['~1만원', '1만원~3만원', '1만원~3만원', '5만원~10만원', '10만원 이상'] }]

function Type(props) {

    return (
        <div width="350px" className='spdla typebox'>
            <div className='spdla tybox'>
                {typeList.map(list => {
                    return (
                        <div className='spdla mutlple'>
                            <div class="check-box flex">
                                <div class="sc-d5ff5581-0 hNTfqe">
                                    <button type="button" class="custom-checkbox "><img src="/images/product/icon_unchecked_square.png" alt="checkbox" /></button></div>
                                {list.test.map(listTest => {
                                    return (
                                        <button class="option-text">{listTest}</button>
                                    )
                                })}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

function TList(props) {
    const setBoxon = props.setBoxon;
    const type = props.type;
    const test = props.test;

    const handleClick = () => {
        setBoxon(<Type test={test} />)

    }

    return (
        <>
            <button onClick={handleClick} className='filterflex'>
                <span name="typeList">{type.type}</span>
                <img src="https://d38cxpfv0ljg7q.cloudfront.net/assets/arrow-down.png" width="20px" class="img" alt="arrow-down"></img></button>
        </>
    )
}


function TotalItemList() {
    const pathParam = useParams();
    const pcNum = pathParam.pcNum;
    const [boxoff, setBoxon] = useState();
    const [products, setProducts] = useState([]);

    // Axios를 사용하여 Promise기반으로 상품정보를 가져오는 함수
    useEffect(() => {
        axios.get("/product/list/" + pcNum)
            .then(response => {

            })
            .catch(error => console.error("Fetching error:", error))
    }, []);


    return (
        <div>
            <ProHeader />
            <div className='spdla type'>
                <div className='spdla typetwo'>
                    <div className='flextype'>
                        <div className='filter-container'>
                            {typeList.map(type => {
                                return (<TList type={type} setBoxon={setBoxon} />);
                            })}
                            {boxoff}
                        </div>
                        {/* <Type />버튼 누르면 튀어나오게 */}
                    </div>
                </div>
            </div>


            <div className='spdla prowrap'>
                <div className='prowraptwo'>
                    <div className='spdla wrappertwo'>
                        <div className='wrapperflex'>
                            <div class='spdla search-result'>
                                <div className='spdla search'>{pcNum}</div>
                                <div>건의 결과가 있어요</div></div>
                            <div className='filter-wrapper'>
                                <div class="MuiInputBase-root MuiInput-root MuiInputBase-colorPrimary MuiNativeSelect-root css-1f63zq5"><select class="MuiNativeSelect-select MuiNativeSelect-standard MuiInputBase-input MuiInput-input css-1vynybe" id="outlined-age-native-simple" name="age"><option value="recommend">추천순</option><option value="released_at">최신순</option><option value="rating">평점순</option><option value="star_count">리뷰 많은 순</option><option value="selling_count">판매순</option><option value="price_high">높은 가격순</option><option value="price_low">낮은 가격순</option><option value="discount_high">할인율 높은 순</option></select><svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium MuiNativeSelect-icon MuiNativeSelect-iconStandard css-1utq5rl" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="ArrowDropDownIcon"><path d="M7 10l5 5 5-5z"></path></svg></div>
                            </div>
                        </div>

                    </div>
                    <div className='spdla foq'>
                        <div className='spdla foqtwo'>
                            {products.map((product) => {

                                return (
                                    <Boxes product={product} />
                                )
                            })}
                        </div>
                    </div>

                </div>

            </div>
        </div>



    );
}


export default TotalItemList;