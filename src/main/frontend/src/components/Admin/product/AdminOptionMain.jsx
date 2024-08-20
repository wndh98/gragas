import "./Admin.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";

function AdminOptionMain() {
    const { register, handleSubmit, formState: { error } } = useForm();
    const [option, setOptions] = useState([]);
    const listUrl = "/option/list";

    // Axios를 사용하여 Promise기반으로 상품정보를 가져오는 함수

    axios.get(listUrl)
        .then(response => {
            setOptions(response.data); // 가져온 상품정보를 상태에 저장
        })
        .catch(error => console.error("Fetching error:", error));

    function optionDelete(data) {

        let poNum = [...(data.poNum)];

        axios.post('/option/deleteList', poNum)
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
                        <td>옵션 번호</td>
                        <td>상품 번호</td>
                        <td>옵션명</td>
                        <td>재고</td>

                    </tr>
                    {option.map((proop) => {

                        return (
                            <tr>
                                <td><input type="checkbox" {...register("poNum")} value={proop.poNum} /></td>
                                <td><Link to={"/option/update/" + proop.poNum}>{proop.poNum}</Link></td>
                                <td value={proop.piNum}>{proop.piNum}</td>
                                <td value={proop.poName}>{proop.poName}</td>
                                <td value={proop.poCnt}>{proop.poCnt}</td>
                            </tr>

                        );
                    })}
                    <tr>
                        <td><Link to="/option/create">옵션추가</Link></td>
                        <td><button type="button" onClick={handleSubmit(optionDelete)}>옵션삭제</button></td>
                    </tr>
                </table>
            </form>
        </div>

    );
}

export default AdminOptionMain;
