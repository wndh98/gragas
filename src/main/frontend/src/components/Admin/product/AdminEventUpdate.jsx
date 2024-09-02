import "./ProPage.css";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";

function AdminEventUpdate(params) {
  const pathParam = useParams();
  const eiNum = pathParam.eiNum;

  const [events, setEvents] = useState([]);
  const viewUrl = "/event/view/" + eiNum;
  const [imageList, setImageList] = useState([]);
  const onChangeImageInput = e => {
    setImageList([...imageList, ...e.target.files]);
  };

  // Axios를 사용하여 Promise기반으로 상품정보를 가져오는 함수
  useEffect(() => {
    axios.get(viewUrl)
      .then(response => {
        console.log(response);
        setEvents(response.data); // 가져온 상품정보를 상태에 저장
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
    const formData = new FormData();
    formData.append('eiContentFile', data.eiContentFile[0]);
    formData.append("event", new Blob([JSON.stringify(data)], { type: "application/json" }))
    axios.post("/event/update/" + eiNum, formData, {
      headers: { 'Content-Type': 'multipart/form-data', chatset: 'utf-8' }
    })
      .then(response => {
        if (response.data == 1) {
          alert("성공");
          loc("/event/main");
        } else {
          alert("실패");
        }
      })
    console.log(eiNum);
  }


  function eventDelete(event) {

    event.preventDefault();
    axios.get('/event/delete/' + eiNum)
      .then(response => {
        if (response.data == 1) {
          alert("성공");
          loc("/event/main");
        } else {
          alert("실패");
        }
      });
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <table class="admin_board_wrap" id="user-admin">

          <tr><th>이벤트명</th><td><input type="text" name="eiName" {...register("eiName")} defaultValue={events.eiName}></input></td></tr>
          <tr><th>이미지</th><td><input type="file" name="eiContentFile" {...register("eiContentFile", { required: "이미지를 넣어주세요." })} accept="image/jpg,image/png,image/jpeg,image/gif"></input>
          {errors.eiContentFile && <p>{errors.eiContentFile.message}</p>}
          </td></tr>
          <tr>
            <td><button type="button" onClick={(e) => { eventDelete(e) }}>삭제</button></td>
            <td><input type="submit" value="전송" />
            </td>
          </tr>

        </table>
      </form>
    </div >
  );
}

export default AdminEventUpdate;
