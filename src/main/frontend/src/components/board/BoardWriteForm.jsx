import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";

function BoardWriteForm() {
    const pathParam = useParams();
    const boardType = pathParam.boardType;
    const pageNum = pathParam.pageNum;
    const bNum = pathParam.bNum;
    const writeUrl = "/board/" + boardType + "/write";
    const selectUrl = "/board/" + boardType + "/select/" + bNum;
    const selectUserUrl = "/user/select/test1@test.com";
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [board, setBoard] = useState([]);
    const [user, setUser] = useState([]);



    useEffect(() => {
        if (bNum != null) {
            axios.get(selectUrl)
                .then((result) => {
                    setBoard(result.data);
                });
        }
        axios.get(selectUserUrl)
            .then((result) => {
                setUser(result.data);
            });
    }, [])
    function onSubmit(data) {
        const formData = new FormData();

        formData.append("board", new Blob([JSON.stringify(data)], { type: "application/json" }));
        if (data.bFile && data.bFile.length > 0) {
            for (let i = 0; i < data.bFile.length; i++) {
                formData.append("bFile", data.bFile[i]);
            }
        }
        console.log(formData.get("board"));
        axios.post(writeUrl, formData, { headers: { "Content-Type": "multipart/form-data" } })
            .then((result) => {
                console.log(result);
                if (result.data == 1) {
                    alert("성공");
                }
                else {
                    alert("실패");
                }
            });
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {/* <input type="hidden"  {...register("userId", { required: { value: true } })} value={board.userId} /> */}
            <input type="hidden"  {...register("userId")} value="test1@test.com" />
            <input type="hidden"  {...register("bWriter")} value="111" />
            <input type="hidden"  {...register("bNum")} />
            <table className="table table-dark table-bordered">
                <tbody>
                    <tr >
                        <th>제목</th>
                        <td>
                            <input {...register("bSubject", { required: true, message: "제목을 입력해 주세요." })} className="form-control" />
                            {errors.bSubject && <p>{errors.bSubject.message}</p>}
                        </td>
                    </tr>
                    <tr>
                        <th>내용</th>
                        <td>
                            <textarea {...register("bContent", { required: true, message: "내용을 입력해주세요." })} className="form-control"></textarea>
                            {errors.bContent && <p>{errors.bContent.message}</p>}
                        </td>
                    </tr>
                    <tr>
                        <th>파일1</th>
                        <td>

                            <td><input type="file" {...register("bFile", { required: false })} className="form-control" /></td>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="2"><input type="submit" className="btn btn-dark" /></td>
                    </tr>
                </tbody>
            </table>
        </form>
    );
}
export default BoardWriteForm;