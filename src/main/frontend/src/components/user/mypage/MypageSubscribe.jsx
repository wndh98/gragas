import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { getCookie } from '../../../js/cookieJs';

function MypageSubscribe() {
  const [items, setItems] = useState([{}]);
  const [selectedItem, setSelectedItem] = useState({});
  const [activeButton, setActiveButton] = useState(0);
  const [subscribeStatus, setSubscribeStatus] = useState("구독 고민중");
  const navigate = useNavigate();
  const userId = getCookie('isLogin');
  const [siNum, setSiNum] = useState(null);

  const data = {
    userId: userId,
    siNum: siNum,
  };

  function subsDescription(item, index) {
    console.log(item);
    setSelectedItem(item);
    setActiveButton(index);
    setSiNum(item.siNum);
  }

  useEffect(() => {
    axios.get('/subscribe/itemList')
      .then(response => {
        setItems(response.data);
        setSelectedItem(response.data[0]);
        setSiNum(response.data[0].siNum);
      })
      .catch(error => {
        console.error('There was an error fetching the users!', error);
      });
  }, []);

  useEffect(() => {
    axios.post('/subscribe/order', data)
      .then(response => {
        console.log(response);
        if (response.data > 0) {
          setSubscribeStatus("구독 중");
        } else {
          setSubscribeStatus("구독 고민중");
        }
      });
  });

  function moveSubsDescription(siNum) {
    navigate('/subscribe/description/' + siNum);
  }

  return (
    <div className="container text-center">
      <div className='btn_box'>
        {items.map((item, index) => (
          <button
            className='mypage_sub_btn'
            key={item.siNum}
            onClick={() => subsDescription(item, index)}
            style={{
              backgroundColor: activeButton === index ? 'rgb(0, 150, 243)' : 'initial',
              color: activeButton === index ? 'white' : 'rgba(61,61,61, 0.8)'
            }}>{item.siTitle} 담화박스</button>
        ))}
      </div>
      <div className='top_nav'>
        <div className='item_details'>
          <div>
            <div className='subscribe_title d-flex justify-content-between'>
              <h3>{selectedItem.siTitle} 담화박스</h3>
              <div className='subscribe_status'>{subscribeStatus}</div>
            </div>
            <div>
              <img src={`http://localhost:8080/upload/subscribe/${selectedItem.siNum}/${selectedItem.siMainImg}`} alt="Main" style={{ width: '300px', height: '250px' }} />
            </div>
          </div>
        </div>
        <div>
          <button className='mypage_sub_btn2' onClick={() => moveSubsDescription(selectedItem.siNum)}>구독하기</button>
        </div>
      </div>
    </div>
  );
}

export default MypageSubscribe;