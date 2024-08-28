
import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SearchPwForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();


  const onSubmit = async (data) => {
    try {
      const response = await axios.post('/user/searchPw', data)
      .then((response) => {
        console.log(response);
      if(response.data != null) {
        alert(response.data);
        navigate("/loginForm");
      } else {
        alert('입력하신 정보가 옳지 않습니다');
      }});
    } catch (error) {
      alert('에러 발생:', error);
    }
  };

  return (
    <div className='container user_search_id'>
    <h2>비밀번호 찾기</h2>
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="input-form-box">
        <input
          className="form-control"
          name='userId'
          type="text"
          placeholder="아이디를 입력해 주세요"
          {...register('userId', { required: '아이디는 필수 입력 항목입니다.' })}
        />
        {errors.userId && <p>{errors.userId.message}</p>}
      </div>
      <div className="input-form-box">
        <input
          className="form-control"
          name='userName'
          type="text"
          placeholder="이름을 입력해 주세요"
          {...register('userName', { required: '이름은 필수 입력 항목입니다.' })}
        />
        {errors.userName && <p>{errors.userName.message}</p>}
      </div>      
      <div className="input-form-box">
        <input
          className="form-control"
          name='userBirth'
          type="text"
          placeholder="생년월일을 입력해 주세요"
          {...register('userBirth', { required: '생년월일은 필수 입력 항목입니다.' })}
        />
        {errors.userBirth && <p>{errors.userBirth.message}</p>}
      </div>
      <div className="button-signup-box">
        <input
          className="btn btn-secondary btn-xs col-12"
          type="submit"
          value="비밀번호 찾기"
        />
      </div>
    </form>
  </div>
    
  );
}

export default SearchPwForm;
