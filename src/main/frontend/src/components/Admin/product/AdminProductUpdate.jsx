import "./Admin.css";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";

function AdminProductUpdate(params) {
  const pathParam = useParams();
  const piNum = pathParam.piNum;

  const [products, setProducts] = useState([]);
  const viewUrl = "/product/view/" + piNum;

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
    axios.post("/product/update/" + piNum, data).then((response) => {
      if (response.data == 1) {
        alert("수정성공");
        loc("/product/main");
      } else {
        alert("실패");
      }
    });
  }


  function productDelete(event) {
    console.log(piNum)
    event.preventDefault();
    axios.get('/product/delete/' + piNum)
      .then(response => {
        if (response.data == 1) {
          alert("성공");
          loc("/main");
        } else {
          alert("실패");
        }
      });
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <table class="admin_board_wrap" id="user-admin">

          <tr><th>카테고리번호</th><td><input type="text" {...register("pcNum")} defaultValue={products.pcNum}></input></td></tr>
          <tr><th>상품명</th><td><input type="text"  {...register("piName")} defaultValue={products.piName}></input></td></tr>
          <tr><th>알콜도수</th><td><input type="text"  {...register("piAlcohol")} defaultValue={products.piAlcohol}></input></td></tr>
          <tr><th>맛</th><td><input type="selected"  {...register("piSweet")} defaultValue={products.piSweet}></input></td></tr>
          <tr><th>탄산</th><td><input type="text"  {...register("piCarbonated")} defaultValue={products.piCarbonated}></input></td></tr>
          <tr><th>가격</th><td><input type="text"  {...register("poPrice")} defaultValue={products.poPrice}></input></td></tr>
          <tr><th>세일가</th><td><input type="text"  {...register("poSale")} defaultValue={products.poSale}></input></td></tr>
          <tr><th>상황별</th><td><input type="text"  {...register("piContent")} defaultValue={products.piContent}></input></td></tr>
          <tr><th>이벤트</th><td><input type="text"  {...register("eiNum")} defaultValue={products.eiNum}></input></td></tr>
          {/* <tr>이미지<td><input type="file" name="piPhoto"></input></td></tr> */}
          <tr>
            <td><button type="button" onClick={(e) => { productDelete(e) }}>삭제</button></td>
            <td><input type="submit" value="전송" />
            </td>
          </tr>

        </table>
      </form>
    </div >
  );
}

export default AdminProductUpdate;
