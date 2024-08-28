import "./Admin.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";

function AdminEventMain() {
    const { register, handleSubmit, formState: { error } } = useForm();
    const [events, setEvents] = useState([]);
    const listUrl = "/event/list";

    // Axios를 사용하여 Promise기반으로 상품정보를 가져오는 함수

    axios.get(listUrl)
        .then(response => {
            setEvents(response.data); // 가져온 상품정보를 상태에 저장
        })
        .catch(error => console.error("Fetching error:", error));

    function eventDelete(data) {
        let eiNum = [...(data.eiNum)];
        axios.post('/event/deleteList', eiNum)
            .then(response => {
                if (response.data == 1) {
                    alert("성공");
                } else {
                    alert("실패");
                }
            })
    }

    return (

        <div>
            <form name="frm">
                <table className="table">

                    <tr className="">
                        <input type="checkbox"></input>
                        <label>전체선택</label>
                        <td>이벤트 번호</td>
                        <td>이벤트명</td>
                        <td>이미지</td>

                    </tr>
                    {events.map((eitem) => {

                        return (
                            <tr>
                                <td><input type="checkbox" {...register("eiNum")} value={eitem.eiNum} /></td>
                                <td><Link to={"/event/update/" + eitem.eiNum}>{eitem.eiNum}</Link></td>
                                <td value={eitem.eiName}>{eitem.eiName}</td>
                                <td value={eitem.eiContent}>{eitem.eiContent}</td>
                            </tr>

                        );
                    })}
                    <tr>
                        <td><Link to="/event/create">상품추가</Link></td>
                        <td><button type="button" onClick={handleSubmit(eventDelete)}>상품삭제</button></td>
                    </tr>
                </table>
            </form>
        </div>

    );
}

export default AdminEventMain;
