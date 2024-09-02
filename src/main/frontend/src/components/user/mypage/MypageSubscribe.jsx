import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function MypageSubscribe() {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState({});
  const navigate = useNavigate();

  function subsDescription(item) {
    setSelectedItem(item);
  }
  useEffect(() => {
    axios.get('/subscribe/itemList')
      .then(response => {
        setItems(response.data);
        setSelectedItem(response.data[0]);
      })
      .catch(error => {
        console.error('There was an error fetching the users!', error);
      });
  }, []);
  
  function moveSubsDescription(siNum) {
    navigate('/subscribe/description/' + siNum);
  }

  return (
    <div className="container text-center">
      <div className='btn_box'>
        {items.map(item => (
          <button className='subs_btn' key={item.siNum} onClick={() => subsDescription(item)}>{item.siTitle} 담화박스</button>
        ))}
      </div>
      <div className='item_details'>
        <div>
          <h3>{selectedItem.siTitle} 담화박스</h3>
          <div>
            <img src={`http://localhost:8080/upload/subscribe/${selectedItem.siNum}/${selectedItem.siMainImg}`} alt="Main" style={{ width: '300px', height: '250px' }} />
          </div>
          {/* 필요에 따라 더 많은 정보를 표시할 수 있습니다 */}
        </div>
      </div>
      <div>
        <button onClick={() => moveSubsDescription(selectedItem.siNum)}>이 달의 술 보기</button>
        <button>구독하기</button>
      </div>
    </div>
  );
}

export default MypageSubscribe;