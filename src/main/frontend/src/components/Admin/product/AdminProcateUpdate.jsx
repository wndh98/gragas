import "./ProPage.css";
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

  const [imageList, setImageList] = useState([]);

  const onChangeImageInput = e => {
    setImageList([...imageList, ...e.target.files]);
  };

  const loc = useNavigate();
  function onSubmit(data) {
    const formData = new FormData();
    formData.append('pcImgFile', data.pcImgFile[0]);
    formData.append("procate", new Blob([JSON.stringify(data)], { type: "application/json" }))
    console.log(formData.getAll("procate"));
    axios.post("/procate/update/" + pcNum, formData, {
      headers: { 'Content-Type': 'multipart/form-data', chatset: 'utf-8' }
    })
      .then(response => {
        if (response.data == 1) {
          alert("성공");
          loc("/procate/main");
        } else {
          alert("실패");
        }
      })
    console.log(data)
    console.log(data.pcImgFile)
  }

  function procateDelete(event) {
    console.log(pcNum)
    event.preventDefault();
    axios.get('/procate/delete/' + pcNum)
      .then(response => {
        if (response.data == 1) {
          alert("성공");
          loc("/procate/main");
        } else if (response.data == -1) {
          alert("참조하고 있는 아이템이 있습니다. 삭제 후 다시 시도해 주세요");
        }
      });
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <table class="admin_board_wrap" id="user-admin">

          <tr><th>카테고리이름</th><td><input type="text" {...register("pcName")} defaultValue={products.pcName}></input></td></tr>
          <tr><th>이미지</th><td><input type="file"  {...register("pcImgFile", { required: "이미지를 넣어주세요." })} defaultValue={products.pcImgFile} accept="image/jpg,image/png,image/jpeg,image/gif"></input></td></tr>
          {errors.pcImgFile && <p>{errors.pcImgFile.message}</p>}
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
