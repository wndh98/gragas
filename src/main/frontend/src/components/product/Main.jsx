import './App.css';
import React from 'react';
import Boxes from './Boxes';
import { useState, useEffect } from 'react';
import axios from 'axios';


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


function Main(props) {

  const pcNum = props.pcNum;
  const cateList = props.cateList;

  const [products, setProducts] = useState([]);

  // Axios를 사용하여 Promise기반으로 상품정보를 가져오는 함수
  useEffect(() => {
    axios.get("/product/listPcNum/" + pcNum)
      .then(response => {
        console.log(response.data);
        // const newArr=division(response.data,3);
        setProducts(division(response.data, 4));
        // setProducts(response.data); 
      })
      .catch(error => console.error("Fetching error:", error))
  }, []);

  return (
    <>

      <div id={`carouselExampleControls${pcNum}`} class="carousel slide spdla mainbox" data-bs-interval="false" data-bs-theme="dark">
        <div className='spdla hb'>
          <img src={`http://192.168.110.87:8080/upload/procate/${cateList.pcNum}/${cateList.pcImg}`} alt='메달' width="45" height="45"></img>
          <div className='spdla tle'>
            <div color="#000" text-decoration="none" class="sc-4bfd0cf4-0 ejEHhD"><span class="font title2-bold">{cateList.pcName}</span></div>
            <div color="rgba(61, 61, 61, 0.6)" text-decoration="none" class="sc-4bfd0cf4-0 bXHhAM"><span class="font body-bold"></span></div>
          </div>
          <div class="spdla more"><a class="flex view-more" href="/damhwaMarket/listing/309"><div>더보기</div><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" class="arrow" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M294.1 256L167 129c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.3 34 0L345 239c9.1 9.1 9.3 23.7.7 33.1L201.1 417c-4.7 4.7-10.9 7-17 7s-12.3-2.3-17-7c-9.4-9.4-9.4-24.6 0-33.9l127-127.1z"></path></svg></a></div>
        </div>
        <div class="carousel-inner spdla hb" data-bs-interval="false">
          <button class="carousel-control-prev" type="button" data-bs-target={`#carouselExampleControls${pcNum}`} data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          {products.map((product, index) => {
            console.log(products)
            return (
              <>
                {product[0] != null ?
                  <div className={`carousel-item ${index == 0 ? "active" : ""}`}>
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
          <button class="carousel-control-next" type="button" data-bs-target={`#carouselExampleControls${pcNum}`} data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </>
  );
}


export default Main;