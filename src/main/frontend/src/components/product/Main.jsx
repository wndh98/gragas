import './App.css';
import React from 'react';
import Boxes from './Boxes';
import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCate from './ProductCate';
const division = (arr, n) => {
  const length = arr.length;
  const divide = Math.floor(length / n) + (Math.floor(length % n) > 0 ? 1 : 0);
  const newArray = [];

  for (let i = 0; i <= divide; i++) {
    // 배열 0부터 n개씩 잘라 새 배열에 넣기
    newArray.push(arr.splice(0, n));
  }

  return newArray;
}
function Main() {
  const [products, setProducts] = useState([]);
  // Axios를 사용하여 Promise기반으로 상품정보를 가져오는 함수
  useEffect(() => {
    axios.get("/product/list")
      .then(response => {
        console.log(response.data);
        // const newArr=division(response.data,3);
        setProducts(division(response.data, 4));
        // setProducts(response.data); // 가져온 상품정보를 상태에 저장
      })
      .catch(error => console.error("Fetching error:", error))
  }, []);

  console.log(setProducts)
  return (
    <div>
      <ProductCate />
      <div id="carouselExampleControls" class="carousel slide spdla mainbox" data-bs-interval="false">
        <div class="carousel-inner spdla hb" data-bs-interval="false">
          {products.map((product) => {

            return (
              <>
                {product[0] != null ?
                  <div class="carousel-item active">
                    <div className="d-flex">
                      {product.map(p => {
                        return (
                          <>
                            <Boxes product={p} />
                          </>
                        );
                      })}
                    </div>
                  </div> : ""}
              </>
            )
          })}
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>

    </div >
  );
}


export default Main;