import "./Admin.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";

function AdminProcateMain() {
    const { register, handleSubmit, formState: { error } } = useForm();
    const [procates, setProcates] = useState([]);
    const listUrl = "/procate/list";

    // Axios를 사용하여 Promise기반으로 상품정보를 가져오는 함수

    axios.get(listUrl)
        .then(response => {
            setProcates(response.data); // 가져온 상품정보를 상태에 저장
        })
        .catch(error => console.error("Fetching error:", error));

    function procateDelete(data) {

        let pcNum = [...(data.pcNum)];

        axios.post('/procate/deleteList', pcNum)
            .then(response => {
                if (response.data == 1) {
                    alert("성공");
                } else {
                    alert("실패");
                }
            })
    }// 컴포넌트 마운트시 상품정보 가져오기 함수호출

    return (

        <div>
            <form name="frm">
                <table className="table">

                    <tr className="">
                        <input type="checkbox"></input>
                        <label>전체선택</label>
                        <td>카테고리 번호</td>
                        <td>카테고리 이름</td>
                        <td>이미지</td>

                    </tr>
                    {procates.map((procate) => {

                        return (
                            <tr>
                                <td><input type="checkbox" {...register("pcNum")} value={procate.pcNum} /></td>
                                <td><Link to={"/procate/update/" + procate.pcNum}>{procate.pcNum}</Link></td>
                                <td value={procate.pcName}>{procate.pcName}</td>
                                <td value={procate.pcImg}>{procate.pcImg}</td>
                            </tr>

                        );
                    })}
                    <tr>
                        <td><Link to="/procate/create">상품추가</Link></td>
                        <td><button type="button" onClick={handleSubmit(procateDelete)}>상품삭제</button></td>

                    </tr>
                </table>
            </form>
        </div>

    );
}

export default AdminProcateMain;
