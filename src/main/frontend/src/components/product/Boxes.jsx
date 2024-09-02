import './App.css';
import React from 'react';

function Boxes(props) {
    const product = props.product;


    function price() {
        let prices = 0;
        prices = (product.poPrice) * (product.poSale)
        return prices;
    }

    return (
        <div className='swiper-side'>
            <div className='spdla product'>
                <a href={"/productItem/" + product.piNum}>
                    <div className='image-weapper'>
                        <span className='spdla tmvps'>
                            <img className='boximg' src={`http://localhost:8080/upload/product/${product.piNum}/${product.piImg}`} alt="img" />
                        </span>
                    </div>

                    <div className='spdla three'>
                        <div className='font subheadline-regular'>
                            {product.piName}
                        </div>
                        <div className='wrapper'>
                            <div className='spdla secn'>
                                <span class="font subheadline-regular alxwnf">{product.poPrice}</span>
                                <div className='spdla one'>
                                    <div className='spdla two'>
                                        <div className='discount-area'>
                                            <div className='special-price-percent'><span class="font body-bold">{product.poSale}%</span></div>
                                            <div className='discount-price'>
                                                <div color="black" text-decoration="none" letter-spacing="0.6px" class="sc-4bfd0cf4-0 eDMdoA"><div class="font body-bold">{price()}</div></div>
                                                <div class="won">
                                                    <div color="black" text-decoration="none" class="sc-4bfd0cf4-0 dnOYVH">
                                                        <div class="font subheadline-regular">원</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='flex'>
                            <img class="star-icon" src="/images/product/star.png" alt="별" height="12" />
                            <div color="rgba(61, 61, 61, 0.6)" text-decoration="none" class="sc-4bfd0cf4-0 gdqvpY"><span class="font footnote">4.8 (4)</span>
                            </div>
                        </div>
                        <div className='spdla name'>
                            <div>

                            </div>
                            <div>

                            </div>
                        </div>
                    </div>
                </a>
            </div>
        </div>
    );
}

export default Boxes;