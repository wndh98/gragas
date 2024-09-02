
import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SerchIdForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();


  const onSubmit = async (data) => {
    try {
      const response = await axios.post('/user/searchId', data)
      .then((response) => {
      if(response.data.userList.length != 0) {
        for(const key in response.data.userList) {
          alert(parseInt(key)+ 1 + "번째 아이디 : " + response.data.userList[key].userId);
        }
        navigate("/loginForm");
      } else {
        alert('입력하신 정보가 옳지 않습니다');
      }});
    } catch (error) {
      alert('에러 발생:', error);
    }
  };

  return (
    <div className='input_container container'>
    <h2>아이디 찾기</h2>
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="id_input_box input-form-box">
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
          name='userPhone'
          type="tel"
          placeholder="휴대폰 번호를 입력해 주세요"
          pattern='010-[0-9]{4}-[0-9]{4}'
          title='010-xxxx-xxxx 형식'
          {...register('userPhone', { required: '휴대폰 번호는 필수 입력 항목입니다.' })}
        />
        {errors.userPhone && <p>{errors.userPhone.message}</p>}
      </div>
      <div className="button-signup-box">
        <input
          className="btn btn-primary btn-xs col-12"
          type="submit"
          value="아이디 찾기"
        />
      </div>
    </form>
  </div>
    
  );
}

export default SerchIdForm;
