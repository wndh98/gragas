import axios from "axios";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
function AdminProcateMain() {
    const { register, handleSubmit, formState: { error } } = useForm();
    const [procates, setProcates] = useState([]);
    const listUrl = "/procate/list";
 
    axios.get(listUrl)
        .then(response => {
            setProcates(response.data);
        })
        .catch(error => console.error("Fetching error:", error));
        
    const loc = useNavigate();
    function procateDelete(data) {
        console.log(data)
        let pcNum = [...(data.pcNum)];
        
        axios.post('/procate/deleteList', pcNum)
            .then(response => {
               
                if (response.data == 1) {
                    alert("성공");
                    loc("/procate/main");
                } else if (response.data == -1) {
                    alert("참조하고 있는 아이템이 있습니다. 삭제 후 다시 시도해 주세요");
                  }
            })
    }

    return (

        <main className="container">
            <form name="frm">
                <table className="table mt-5">
                    <tbody>

                        <tr className="table-secondary">
                            <td>
                                <input type="checkbox"></input></td>

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
                    </tbody>
                </table>


                <div className="d-flex justify-content-end">
                    <Link to="/procate/create" className="btn btn-primary">카테고리추가</Link>
                    <button type="button" className="btn btn-danger ms-2" onClick={handleSubmit(procateDelete)}>카테고리삭제</button>

                </div>
            </form>
        </main>
    );
}

export default AdminProcateMain;
