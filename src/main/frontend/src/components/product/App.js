import './App.css';
import React from 'react';
import Main from './Main';
import MainList from './MainList';

 function App() {
  return (
    <div className="App">
      <header></header>
      <MainList>
        <Main/>
      </MainList>
    </div>
  );
}
 
export default App;



/* 
 function Main(params) {
  return(
    <div className='spdla mainbox'>
      <div className='spdla hb'>
        <img width="45" height="45"></img>
        <div className='spdla tle'></div>
        <div className='spdla more'></div>
      </div>

      <div className='spdla sebox'>

      <button className='swiper-custom-button leftbutton'></button>
      <div className='swiper spdla-swiper'>
        <div className='swiper-wrapper'>
          <div></div>
          <div></div>
          <div className='swiper-side' width="259.75px" margin-right="15px">
          <div className='spdla product'>
            <a href="/damhwaMarket/detail/1690">
              <div className='image-weapper'>
                
              </div>
            </a>
          </div>
          </div>
         
        </div>
      </div>
      <button className='swiper-custom-button nextbutton'></button>

      </div>
    </div>
  );
}
 */
