import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../../css/user/login.css';
import axios from 'axios';

import { getCookie,setCookie,deleteCookie } from '../../../js/cookieJs';
function LoginForm() {
  return (
    <div className="container d-flex justify-content-center">
      <div>
        <div>
          <div className="loginTitle">
            반가워요!
            <img src="/images/user/login-greeting-icon.png" alt="" />
          </div>
        </div>
        <ApiLogin/>
        <EmailLogin/>
      </div>
    </div>
  );
}

function ApiLogin() {
  return(
    <div className="api">
      <div className="kakaoLogin">카카오 로그인</div>
      <div className="naverLogin">네이버 로그인</div>
    </div>
  );
}

function EmailLogin() {

  const [userId, setUserId] = useState('');
  const [userPw, setUserPw] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const user={userId:userId,userPw:userPw};
    
    axios.post("/login",user).then(response=>{
      console.log(response);
      if(response.data > 0) {
        alert("로그인 성공");
        setCookie("isLogin",userId,1);
        navigate("/");
      }else if(response.data == 0) {
        alert("아이디 불일치");
      }else if(response.data == -1){
        alert("비밀번호 불일치");
      }else {
        alert("삭제된 아이디 입니다.");
      }
    });
  };

  const navigate = useNavigate();
  const moveJoinForm = () => {
    navigate("/user/joinForm");
  }
  
  return (
    <div>
      <form onSubmit={handleSubmit}>
      <div className='input-form-box'>
          <input className='form-control' type="text" onChange={(e) => setUserId(e.target.value)} placeholder="아이디를 입력해 주세요"/>
        </div>
        <div className='input-form-box'>
        <input className='form-control' type="password" onChange={(e) => setUserPw(e.target.value)} placeholder='비밀번호를 입력해 주세요'/>
        </div>
        <div className='button-login-box'>
          <input className='btn btn-primary btn-xs col-12' type="submit" value="로그인"/>
        </div>
      </form>
      <button className='btn btn-secondary btn-xs col-12' onClick={moveJoinForm}>이메일 회원가입</button>
      <div className='text-center'>
        <a href="/login/serchIdForm">아이디 찾기</a>
        <a href="#">비밀번호 찾기</a>
      </div>
    </div>
  );
}

export default LoginForm;