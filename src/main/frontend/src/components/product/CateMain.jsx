import './App.css';
import React from 'react';
import Boxes from './Boxes';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Type from './Type';

function CateMain() {
    const pathParam = useParams();
    const pcNum = pathParam.pcNum;

    const [products, setProducts] = useState([]);
    // Axios를 사용하여 Promise기반으로 상품정보를 가져오는 함수
    useEffect(() => {
        axios.get("/product/list/" + pcNum)
            .then(response => {
                console.log(response.data);
                setProducts(response.data);
            })
            .catch(error => console.error("Fetching error:", error))
    }, []);
    const typeList = ['주종', '도수', '단맛', '신맛', '탄산', '가격']



    console.log(setProducts)
    return (
        <div>
            <div className='spdla type'>
                <div className='spdla typetwo'>
                    <div className='flextype'>
                        <Type />
                        {typeList.map(typest => {
                            return (
                                <div className='filter-container'>
                                    <button className='filterflex'>
                                        <span>{typest}</span>
                                        <img src="https://d38cxpfv0ljg7q.cloudfront.net/assets/arrow-down.png" width="20px" class="img" alt="arrow-down"></img>
                                    </button>
                                    <div width="350px" className='spdla typebox'>
                                        {/* <Type />버튼 누르면 튀어나오게 */}

                                    </div>
                                </div>
                            );
                        })}
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

export default CateMain;