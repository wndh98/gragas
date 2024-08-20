import "./Admin.css";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";

function AdminEventUpdate(params) {
  const pathParam = useParams();
  const eiNum = pathParam.eiNum;

  const [events, setEvents] = useState([]);
  const viewUrl = "/event/view/" + eiNum;

  // Axios를 사용하여 Promise기반으로 상품정보를 가져오는 함수
  useEffect(() => {
    axios.get(viewUrl)
      .then(response => {

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
    axios.post("/event/update/" + eiNum, data).then((response) => {
      if (response.data == 1) {
        alert("수정성공");
        loc("/event/main");
      } else {
        alert("실패");
      }
    });
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

          <tr><th>이벤트명</th><td><input type="text" {...register("eiName")} defaultValue={events.eiName}></input></td></tr>
          {/*  <tr><th>이미지</th><td><input type="text"  {...register("eiContent")} defaultValue={events.eiContent}></input></td></tr> */}
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
