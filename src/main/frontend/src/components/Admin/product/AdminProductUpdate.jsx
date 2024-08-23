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
  const [events, setEvents] = useState([]);
  const [selectEvents, setSelectEvents] = useState([{}]);
  useEffect(() => {

    axios.get("/event/list")
      .then(response => {
        setEvents(response.data);
      })
      .catch(error => console.error("Fetching error:", error));

    axios.get(viewUrl)
      .then(response => {

        setProducts(response.data); // 가져온 상품정보를 상태에 저장
      })
      .catch(error => console.error("Fetching error:", error))

    axios.get(`/pevent/listPi/${piNum}`)
      .then(response => {
        setSelectEvents(response.data);

      })
      .catch(error => console.error("Fetching error:", error));

  }, [])

  useEffect(() => {
    const eiNums = document.getElementsByName("eiNum");
    let checkValue = [];
    for (let i = 0; i < eiNums.length; i++) {
      for (let j = 0; j < selectEvents.length; j++) {
        if (eiNums[i].value == selectEvents[j].eiNum) {
          eiNums[i].checked = true;
          checkValue.push(eiNums[i].value);
          break;
        }
      }

    }
    setValue("eiNum", checkValue);
  }, [selectEvents])

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue
  } = useForm();

  const loc = useNavigate();

  function onSubmit(data) {

    console.log(data)
    axios.post("/product/update/" + piNum).then((response) => {

      if (response.data == 1) {
        alert("성공");
        loc("/product/main");
      } else {
        alert("실패");
      }
    });
    /* 
        axios.get("/pevent/delete/" + piNum, [...(data.eiNum)]).then((response) => {
    
    
        });
     */
  }

  function productDelete(event) {
    console.log(piNum)

    event.preventDefault();
    axios.get('/product/delete/' + piNum)
      .then(response => {
        if (response.data == 1) {
          alert("성공");
          loc("/product/main");
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
          <tr><th>상황별</th><td><input type="text"  {...register("piContent")} defaultValue={products.piContent}></input></td></tr>


          {
            events.map((product) => {

              return (

                <tr>이벤트
                  <td>
                    <input id="eiNum" type="checkbox" defaultValue={product.eiNum} {...register("eiNum")} />
                  </td>
                </tr>
              );
            })
          }



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
