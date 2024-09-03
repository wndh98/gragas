import './App.css';
import React from 'react';
import Boxes from './Boxes';
import { useState, useEffect } from 'react';
import axios from 'axios';
import ProHeaderList from './ProHeader';
import { useNavigate, useSearchParams } from 'react-router-dom';

function TotalItemList(props) {
    const [boxClose, setBoxClose] = useState(false);
    const [products, setProducts] = useState([]);
    const [procate, setProcates] = useState([]);
    const [name, setNames] = useState([{}]);
    const [pcNums, setPcNums] = useState([{}]);
    const [orderType, setOrderType] = useState();
    const [itemList, setItemLists] = useState();

    const [checkBox, setCheckBox] = useState([]);

    let nameArr = [];
    let pcNumsArr = [];

    const typeList = [{ type: '주종', cate: name }, { type: '도수', cate: ['0%-10%', '10%-20%', '20%-30%', '30%이상'] }, { type: '단맛', cate: ['약한', '중간', '강한'] }, { type: '신맛', cate: ['약한', '중간', '강한'] }, { type: '탄산', cate: ['약한', '중간', '강한'] }, { type: '가격', cate: ['~1만원', '1만원~3만원', '1만원~3만원', '5만원~10만원', '10만원 이상'] }]

    const [searchParams, setSearchParams] = useSearchParams();
    const navi = useNavigate();

    function changeOrderType(e) {
        const newOrderType = e.target.value;
        setOrderType(newOrderType)
        navi(`/total?orderType=${newOrderType}`);


    }
    const handleCheck = (e) => {
        setCheckBox(<img className='cpzm' src="/images/product/icon_checked_square.png" alt="checkbox" />)

        const newItemLists = e.target.value;
        setItemLists(newItemLists)
        navi(`/total?pcNums=${newItemLists}`);

    }

    useEffect(() => {
        // 데이터 가져오기
        axios.get(`/product/listPcNum/0?orderType=${orderType}`)
            .then((response) => {
                setProducts(response.data);
            })
            .catch((error) => console.error('Error fetching products:', error));
    }, []);

    useEffect(() => {

        axios.get(`/product/listPcNum/${pcNums.pcNum}?orderType=${orderType}`)
            .then((response) => {
                setProducts(response.data);
            })
            .catch((error) => console.error('Error fetching products:', error));

        axios.get("/procate/list")
            .then(response => {

                setProcates(response.data);
                response.data.map(cate => {
                    pcNumsArr.push(cate.pcNum);
                    nameArr.push(cate.pcName);
                })
                setNames(nameArr);
                setPcNums(pcNumsArr);
            })
            .catch(error => console.error("Fetching error:", error))
    }, [pcNums]); // orderType 또는 orderDesc가 변경되면 다시 호출


    return (

        <div>
            <ProHeaderList />
            <div className='spdla type'>
                <div className='spdla typetwo'>
                    <div className='flextype'>
                        <div className='filter-container'>
                            {typeList.map(type => {
                                return (<TList type={type} cate={props.cate} boxClose={boxClose} setBoxClose={setBoxClose} />);
                            })}
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
                                <div className='spdla search'>
                                    {products.length}
                                </div>
                                <div>건의 결과가 있어요</div></div>
                            <div className='filter-wrapper'>
                                <div class="MuiInputBase-root MuiInput-root MuiInputBase-colorPrimary MuiNativeSelect-root css-1f63zq5">
                                    <select class="MuiNativeSelect-select MuiNativeSelect-standard MuiInputBase-input MuiInput-input css-1vynybe" id="outlined-age-native-simple" name="orderType" onChange={changeOrderType}>
                                        <option value="NUM_DESC">최신순</option>
                                        <option value="PRICE_DESC">높은 가격순</option>
                                        <option value="PRICE_ASC">낮은 가격순</option>
                                    </select>

                                    <svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium MuiNativeSelect-icon MuiNativeSelect-iconStandard css-1utq5rl" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="ArrowDropDownIcon"><path d="M7 10l5 5 5-5z"></path></svg></div>
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

function Type({ props, handleCheck }) {

    const cate = props.cate;
    const checkBox = props.checkBox;
    return (
        <div width="350px" className='spdla typebox'>
            <div className='spdla tybox'>
                {cate.map((testItem, testIndex) => {
                    return (
                        <div className='spdla mutlple'>
                            <div class="check-box flex">
                                <div class="sc-d5ff5581-0 hNTfqe">
                                    <button type="button" onClick={handleCheck()} class="custom-checkbox" value={cate.pcNum}>
                                        <img src="/images/product/icon_unchecked_square.png" alt="checkbox" /></button>
                                    {checkBox}
                                </div>
                                <button class="option-text" key={testIndex}>{testItem}</button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );

}

function TList(props) {
    // const setBoxon = props.setBoxon;
    const type = props.type;
    const cate = props.cate;
    const boxClose = props.boxClose;
    const setBoxClose = props.setBoxClose;
    const [boxoff, setBoxon] = useState();
    const [isOpen, setIsOpen] = useState(false);
    useEffect(() => {
        if (boxClose != false) {
            setBoxon("");
            if (isOpen) {
                setIsOpen(false);
            } else if (boxClose == type.type) {
                setBoxon(<Type cate={type.cate} />);
                setIsOpen(true);
            }
        }
        setBoxClose(false);
    }, [boxClose])

    const handleClick = async () => {
        await setBoxClose(type.type);

    }

    return (
        <>
            <div>
                <button onClick={() => { handleClick() }} className='filterflex'>
                    <span name="typeList">{type.type}</span>
                    <img src="https://d38cxpfv0ljg7q.cloudfront.net/assets/arrow-down.png" width="20px" class="img" alt="arrow-down"></img></button>
                {boxoff}
            </div>
        </>
    )
}




export default TotalItemList;