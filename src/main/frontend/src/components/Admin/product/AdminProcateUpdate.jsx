import "./Admin.css";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";

function AdminProcatetUpdate(params) {
  const pathParam = useParams();
  const pcNum = pathParam.pcNum;

  const [products, setProducts] = useState([]);
  const viewUrl = "/procate/view/" + pcNum;

  // Axios를 사용하여 Promise기반으로 상품정보를 가져오는 함수
  useEffect(() => {
    axios.get(viewUrl)
      .then(response => {

        setProducts(response.data); // 가져온 상품정보를 상태에 저장
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
    axios.post("/procate/update/" + pcNum, data).then((response) => {
      if (response.data == 1) {
        alert("수정성공");
        loc("/procate/main");
      } else {
        alert("실패");
      }
    });
  }


  function procateDelete(event) {
    console.log(pcNum)
    event.preventDefault();
    axios.get('/procate/delete/' + pcNum)
      .then(response => {
        if (response.data == 1) {
          alert("성공");
          loc("/procate/main");
        } else {
          alert("실패");
        }
      });
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <table class="admin_board_wrap" id="user-admin">

          <tr><th>카테고리이름</th><td><input type="text" {...register("pcName")} defaultValue={products.pcName}></input></td></tr>
          {/*  <tr><th>이미지</th><td><input type="text"  {...register("pcImg")} defaultValue={products.pcImg}></input></td></tr> */}
          <tr>
            <td><button type="button" onClick={(e) => { procateDelete(e) }}>삭제</button></td>
            <td><input type="submit" value="전송" />
            </td>
          </tr>

        </table>
      </form>
    </div >
  );
}

export default AdminProcatetUpdate;
