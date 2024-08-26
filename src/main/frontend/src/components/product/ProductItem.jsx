import React from "react";
import './App.css';
import InfoList from "./InfoList";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProductItemSide from "./ProductItemSide";
import { salePercent } from "../../js/order";



const information = [
    {
        info: "주종",
        mation: "증류식소주",
    },
    {
        info: "도수",
        mation: "46%",
    },
    {
        info: "용량",
        mation: "375ml",
    },
    {
        info: "소비기한",
        mation: "소비기한 없음",
    },
    {
        info: "보관방법",
        mation: "직사광선을 피하고 서늘한 곳에 보관",
    },

]
function ProductItem() {

    const pathParam = useParams();
    const piNum = pathParam.piNum;

    const [product, setProducts] = useState([]);
    const [option, setOptions] = useState([]);
    const [price,setPrice] = useState();
    const viewUrl = "/product/view/" + piNum;

    // Axios를 사용하여 Promise기반으로 상품정보를 가져오는 함수
    useEffect(() => {
        axios.get(viewUrl)
            .then(response => {
                setProducts(response.data); // 가져온 상품정보를 상태에 저장
            })
            .catch(error => console.error("Fetching error:", error))
    }, []);

    useEffect(() => {
        axios.get("/option/view/" + piNum)
            .then(response => {

                setOptions(response.data); // 가져온 상품정보를 상태에 저장

            })
            .catch(error => console.error("Fetching error:", error))
    }, []);
    



    return (

        <div>
            <div className="mainbox">
                <div className="left-side">
                    <div className="qhdms wper">
                        <div className="detail-box" id="image">
                            <div className="swiper last-box">
                                <img alt="" id="soju" src={`http://localhost:8080/upload/product/${product.piNum}/${product.piImg}`}>
                                </img>
                            </div>
                        </div>
                        <div className="detail-box information">
                            <div className="boxwrapbox">
                                <div className="sector">
                                    <div className="wntjr1">위스키보다 더 맛있는 위스키</div>
                                    <div className="wntjr2">{product.piName}</div>
                                </div>

                                <div>
                                    <div className="product-price-layout">
                                        <div className="flex discount">
                                            <div className="price-label">
                                                <div color="black" text-decoration="none" class="sc-4bfd0cf4-0 dnOYVH"><div class=" body-regular">판매가격:</div>
                                                </div>
                                            </div>
                                            <span class="originPrice">{product.poPrice}원</span>
                                            <div className="direct-purchase-box">
                                                <div className="flex">
                                                    <div class="font title1-bold-bol">{salePercent(product.poPrice,product.poSale)}%</div>
                                                    <div class="title1-bold">{product.poSale}원</div>
                                                </div>
                                                <div className="reviews">
                                                    <div className="layout">
                                                        <img src="https://www.sooldamhwa.com/assets/filled-star-small.svg" alt="" />
                                                        <div class="jsx-1280624852 review"><div class="jsx-2907305229"><div class="jsx-1280624852 review-text">리뷰 0</div><svg xmlns="http://www.w3.org/2000/svg" width="15" height="20" viewBox="0 0 24 24" fill="none"><path d="M9.29289 3.51473C9.66286 3.14476 10.2506 3.12528 10.6435 3.45631L10.7071 3.51473L18.4853 11.2929L18.5361 11.3476C18.8562 11.7187 18.8588 12.269 18.5441 12.643L18.4853 12.7071L10.7071 20.4853L10.6524 20.5361C10.2813 20.8562 9.73103 20.8588 9.357 20.5441L9.29289 20.4853L9.24206 20.4306C8.922 20.0595 8.91934 19.5092 9.23406 19.1352L9.29289 19.0711L16.3643 11.9997L9.29289 4.92894L9.24206 4.87423C8.90318 4.48136 8.92012 3.8875 9.29289 3.51473Z" fill="#0096f3"></path></svg></div></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="discount-button-layout">
                                        <button class="sc-b97fbf16-0 fUxzeD" font-size="16px" font-weight="700" width="100%" height="44px"><div class="jsx-6161c83bd9011827 button-content-layout"><div class="jsx-6161c83bd9011827">최대 10,000원 할인 쿠폰받기</div><div class="jsx-6161c83bd9011827 icon"><svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M14.2676 6.73305C14.2358 6.30186 13.8759 5.96191 13.4366 5.96191C12.9763 5.96191 12.6032 6.33501 12.6032 6.79525L12.603 14.4538L10.8485 12.6993L10.8029 12.657C10.4755 12.3746 9.9806 12.3887 9.66996 12.6993C9.34452 13.0248 9.34452 13.5524 9.66996 13.8779L12.9109 17.1188L12.9565 17.1611C13.2839 17.4435 13.7787 17.4294 14.0894 17.1188L17.3303 13.8779L17.3726 13.8323C17.655 13.5049 17.6409 13.01 17.3303 12.6993L17.2847 12.657C16.9573 12.3746 16.4624 12.3887 16.1518 12.6993L14.2697 14.5805L14.2699 6.79525L14.2676 6.73305ZM20.1668 16.6286C20.1668 16.1684 19.7937 15.7953 19.3335 15.7953C18.8733 15.7953 18.5002 16.1684 18.5002 16.6286L18.4998 16.7465L18.4966 16.9623L18.4901 17.1536L18.4799 17.323C18.4598 17.5886 18.4237 17.774 18.3666 17.9339L18.3298 18.0273C18.3102 18.0728 18.2885 18.1171 18.2647 18.1615C18.1245 18.4237 17.9237 18.6245 17.6616 18.7647C17.3833 18.9135 17.1115 18.9799 16.4836 18.9961L16.2465 18.9998H10.7538L10.538 18.9966L10.3467 18.99L10.1773 18.9799C9.9117 18.9598 9.72627 18.9237 9.56635 18.8666L9.47303 18.8298C9.42745 18.8101 9.3832 18.7885 9.33877 18.7647C9.07659 18.6245 8.87581 18.4237 8.73559 18.1615C8.71183 18.1171 8.69018 18.0728 8.67049 18.0273L8.63371 17.9339C8.57665 17.774 8.54051 17.5886 8.52042 17.323L8.51026 17.1536L8.50371 16.9623L8.50055 16.7465L8.50016 16.6286C8.50016 16.1684 8.12707 15.7953 7.66683 15.7953C7.20659 15.7953 6.8335 16.1684 6.8335 16.6286C6.8335 17.7704 6.94489 18.3473 7.2659 18.9475C7.56145 19.5002 8.00014 19.9388 8.55277 20.2344C9.15301 20.5554 9.72986 20.6668 10.8717 20.6668L16.2744 20.6662C17.3207 20.6567 17.8734 20.5415 18.4476 20.2344C19.0002 19.9388 19.4389 19.5002 19.7344 18.9475C20.0554 18.3473 20.1668 17.7704 20.1668 16.6286Z" fill="currentColor"></path></svg></div></div></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="forwrap">
                        <div className="productwrap">
                            <div className="productinfo">
                                <div class="font title3-bold">상품정보</div>
                            </div>
                            <div className="info">
                                <div className="infotable">
                                    {information.map((list) => {

                                        return (
                                            <InfoList info={list.info} mation={list.mation} />
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="sc-dfc3cf52-0 gGztHs">
                        <p>
                            <img src={`http://localhost:8080/upload/product/${product.piNum}/${product.piContent}`} alt="data-center-image" />
                        </p>
                    </div>
                </div>
                <ProductItemSide piNum={piNum}></ProductItemSide>
            </div>
        </div >
    );
}
export default ProductItem;