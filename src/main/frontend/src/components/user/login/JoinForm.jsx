import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function JoinForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isDirty, isValid }
  } = useForm({ mode: 'onChange' });

  const userPw = watch('userPw');

  const onSubmit = async (data) => {
    const strArr = data.userBirth.split('-');
    const date = new Date(strArr[0]);
    const date2 = new Date();
    date2.setFullYear(date2.getFullYear() - 19);
    date2.setMonth(0);
    date2.setDate(1);
    if (date <= date2) {
      try {
        const response = await axios.post('/user/joinForm', data)
          .then((response) => {
            if (response.data > 0) {
              alert('회원가입 성공');
              navigate("/");
            } else {
              alert('아이디 중복');
            }
          });
      } catch (error) {
        alert('에러 발생:', error);
      }
    }else {
      alert("미성년자 가입 불가");
    }
  };

  return (
    <div className='container col-4'>
      <h2>회원가입</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-form-box">
          <input
            className="form-control"
            type="email"
            placeholder="이메일을 입력해 주세요"
            {...register('userId', { required: '이메일을 입력해주세요.' })}
          />
          {errors.userId && <p>{errors.userId.message}</p>}
          <button>중복체크</button>
        </div>
        <div className="input-form-box">
          <input
            className="form-control"
            type="password"
            placeholder="비밀번호를 입력해 주세요"
            {...register('userPw', {
              required: '비밀번호를 입력해 주세요.',
              minLength: {
                value: 8,
                message: '비밀번호는 최소 8글자 이상이어야 합니다.'
              },
              maxLength: {
                value: 16,
                message: '비밀번호는 최대 16글자 이하이어야 합니다.'
              },
              pattern: {
                value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/,
                message: '비밀번호는 영문자와 숫자를 포함해야 합니다.'
              }
            })}
          />
          {errors.userPw && <p>{errors.userPw.message}</p>}
        </div>
        <div className="input-form-box">
          <input
            className="form-control"
            type="password"
            placeholder="비밀번호 확인을 입력해 주세요"
            {...register('userPw2', {
              required: '비밀번호 확인을 입력해 주세요.',
              validate: (value) =>
                value === userPw || '비밀번호가 일치하지 않습니다.',
              minLength: {
                value: 8,
                message: '비밀번호가 일치하지 않습니다.'
              },
              maxLength: {
                value: 16,
                message: '비밀번호가 일치하지 않습니다.'
              },
              pattern: {
                value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/,
                message: '비밀번호가 일치하지 않습니다.'
              }
            })}
          />
          {errors.userPw2 && <p>{errors.userPw2.message}</p>}
        </div>
        <div className="input-form-box">
          <input
            className="form-control"
            type="text"
            placeholder="이름을 입력해 주세요"
            {...register('userName', { required: '이름은 필수 입력 항목입니다.' })}
          />
          {errors.userName && <p>{errors.userName.message}</p>}
        </div>
        <div className="input-form-box">
          <input
            className="form-control"
            type="date"
            {...register('userBirth', { required: '생년월일은 필수 입력 항목입니다.' })}
          />
          {errors.userBirth && <p>{errors.userBirth.message}</p>}
        </div>
        <div className="input-form-box">
          <input
            className="form-control"
            type="tel"
            placeholder="010-xxxx-xxxx"
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
            value="회원가입"
          />
        </div>
      </form>
    </div>

  );
}

export default JoinForm;
