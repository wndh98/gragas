import "./Admin.css";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";

function AdminOptionUpdate(params) {
  const pathParam = useParams();
  const poNum = pathParam.poNum;

  const [option, setOptions] = useState([]);
  const viewUrl = "/option/view/" + poNum;

  // Axios를 사용하여 Promise기반으로 상품정보를 가져오는 함수
  useEffect(() => {
    axios.get(viewUrl)
      .then(response => {

        setOptions(response.data); // 가져온 상품정보를 상태에 저장
      })
      .catch(error => console.error("Fetching error:", error))
  }, []);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();


  const loc = useNavigate();
  function onSubmit(data) {
    axios.post("/option/update/" + poNum, data).then((response) => {
      if (response.data == 1) {
        alert("수정성공");
        loc("/option/main");
      } else {
        alert("실패");
      }
    });
  }


  function optionDelete(event) {

    event.preventDefault();
    axios.get('/option/delete/' + poNum)
      .then(response => {
        if (response.data == 1) {
          alert("성공");
          loc("/option/main");
        } else {
          alert("실패");
        }
      });
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <table class="admin_board_wrap" id="user-admin">

          <tr><th>옵션명</th><td><input type="text" {...register("poName")} defaultValue={option.poName}></input></td></tr>
          <tr><th>재고수량</th><td><input type="text" {...register("poCnt")} defaultValue={option.poCnt}></input></td></tr>
          <tr><th>가격</th><td><input type="text" {...register("poPrice")} defaultValue={option.poPrice}></input></td></tr>
          <tr><th>세일가</th><td><input type="text" {...register("poSale")} defaultValue={option.poSale}></input></td></tr>

          <tr>
            <td><button type="button" onClick={(e) => { optionDelete(e) }}>삭제</button></td>
            <td><input type="submit" value="전송" />
            </td>
          </tr>

        </table>
      </form>
    </div >
  );
}

export default AdminOptionUpdate;
