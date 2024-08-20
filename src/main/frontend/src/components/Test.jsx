import { useForm } from "react-hook-form";
function Test() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <table className="table">
        <tr className="table-primary">
          <td >1</td>
          <td>2</td>
          <td>3</td>
        </tr>
      </table>
      <label htmlFor="email">이메일</label>
      <input {...register("email", { required: "이메일을 입력해주세요." })} />
      {errors.email && <p>{errors.email.message}</p>}
      <label htmlFor="password">비밀번호</label>
      <input
        {...register("password", { required: "비밀번호를 입력해주세요." })}
      />
      {errors.password && <p>{errors.password.message}</p>}
      <button type="submit">로그인</button>
    </form>
  );
}

export default Test;
