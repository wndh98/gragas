import { useNavigate } from 'react-router-dom';
import styles from '../../css/user/login.css'
import InputForm from './InputForm';

function Login() {
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
  const navigate = useNavigate();
  const moveJoinForm = () => {
    navigate("/user/joinForm");
  }
  return (
    <div>
      <form action="/emailLogin" method='post'>
        <InputForm name="userId" type="text" place="이메일을"/>
        <div className='input-form-box'>
        <input className='form-control' type="password" name="userPw" placeholder='비밀번호를 입력해 주세요'/>
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

export default Login;