import { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getCookie } from '../../../js/cookieJs';

function UserInfoUpdate() {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const userId = getCookie("isLogin");

  useEffect(() => {
    axios.get("/userSearch/" + userId)
      .then((response) => {
        setUser((response.data));
        setValue("userName", response.data.userName);
        setValue("userPhone", response.data.userPhone);
      });
  }, [])

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm();

  const userPw = watch('userPw');

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('/user/updateAction', data)
        .then((response) => {
          console.log(response);
          if (response.data > 0) {
            alert('회원정보 수정 성공');
            navigate("/myPage");
          } else {
            alert('회원정보 수정 실패');
          }
        });
    } catch (error) {
      alert('에러 발생:', error);
    }
  };

  return (
    <>
      <div className='user_info container text-center'>
        <div className="user_info_content">
          <div className="user_info_title">회원정보 수정</div>
          <hr />
          <form onSubmit={handleSubmit(onSubmit)}>
            <input type="hidden"{...register("userId")} value={userId} />
            <div className="d-flex justify-content-between text-secondary">
              <div>아이디</div>
              <div>{user.userId}</div>
            </div>
            <div className="d-flex justify-content-between text-secondary">
              <div>비밀번호</div>
              <div>
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
            </div>
            <div className="d-flex justify-content-between text-secondary">
              <div>비밀번호 확인</div>
              <div>
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
            </div>
            <div className="d-flex justify-content-between text-secondary">
              <div>이름</div>
              <div>
                <input
                  className="form-control"
                  type="text"
                  placeholder="이름을 입력해 주세요"
                  {...register('userName', { required: '이름은 필수 입력 항목입니다.' })}
                />
                {errors.userName && <p>{errors.userName.message}</p>}
              </div>
            </div>
            <div className="d-flex justify-content-between text-secondary">
              <div>생일</div>
              <div>{user.userBirth}</div>
            </div>
            <div className="d-flex justify-content-between text-secondary">
              <div>휴대폰번호</div>
              <div>
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
            </div>
            <div className="user_info_update_btn_box text-secondary">
              <input
                className="user_info_update_btn"
                type="submit"
                value="저장"
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default UserInfoUpdate;