
import axios from "axios";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

function AdminOptionMain() {
    const { register, handleSubmit, formState: { error } } = useForm();
    const [option, setOptions] = useState([]);
    const pathParam = useParams();
    const piNum = pathParam.piNum;
    const viewUrl = "/option/list/" + piNum;
    // Axios를 사용하여 Promise기반으로 상품정보를 가져오는 함수

    useEffect(() => {
        axios.get(viewUrl)
            .then(response => {
                setOptions(response.data); // 가져온 상품정보를 상태에 저장
            })
            .catch(error => console.error("Fetching error:", error));
    }, []);



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

        <main className="container">
            <form name="frm">
                <table className="table mt-5">
                    <tbody>

                        <tr className="table-secondary">
                            <td> <input type="checkbox"></input>
                            </td>
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
                    </tbody>
                </table>
                <div className="d-flex justify-content-end">
                    <Link to="/option/create" className="btn btn-primary">옵션추가</Link>
                    <button type="button" className="btn btn-danger ms-2" onClick={handleSubmit(optionDelete)}>옵션삭제</button>

                </div>
            </form>
        </main>

    );
}

export default AdminOptionMain;
