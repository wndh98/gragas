import React from "react";
import './App.css';

function ProductItem(params) {
    return (
        <div>
            <div className="mainbox">
                <div className="left-side">
                    <div className="qhdms wper">
                        <div className="qhdms detail-box" id="image">
                            <div className="swiper last-box">
                                <img alt="" id="soju" src="https://d38cxpfv0ljg7q.cloudfront.net/admin_contents/detail/i5IM-1723788441559-mahan%20oak-thumb.jpg">
                                </img>
                            </div>
                        </div>
                        <div className="detail-box information">
                            <div className="boxwrapbox">
                                <div className="sector">
                                    <div className="wntjr1">위스키보다 더 맛있는 위스키</div>
                                    <div className="wntjr2">마한 오크 46%</div>
                                </div>
                            </div>
                            <div className="product-price-layout">

                            </div>
                            <div className="discount-button-layout">

                            </div>
                        </div>
                    </div>
                </div>
                <div className="right-side position-sticky top-0 border border-secondary-subtle rounded">
                    <div className="label" style={{ height: "150px" }}>
                        옵션
                    </div>
                    <select class="form-select form-select-lg mb-3" aria-label=".form-select-lg example">
                        <option selected></option>
                        <option value="1">어떤 옵션을 원하시나요?</option>
                        <option value="2">[375ml] 마한 오크 46%</option>
                    </select>
                    <div className="label">
                        수량
                    </div>
                    <div className="select-wrapper count">

                    </div>
                    <div className="label">
                        총 상품가격
                    </div>
                    <div className="position-sticky top-0 border border-secondary-subtle rounded" style={{ height: "35px" }}>
                        49,000원
                    </div>
                    <div className="buttons">
                        <div className="button">
                            <button type="button" class="btn btn-outline-secondary">Secondary</button><button type="button" class="btn btn-outline-secondary">Secondary</button>
                        </div>
                        <div class="d-grid gap-2 col-6 mx-auto">
                            <button class="btn btn-primary" type="button">Button</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
export default ProductItem;