import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";

function BoardForm() {
    const pathParam = useParams();
    const boardType = pathParam.boardType;
    const pageNum = pathParam.pageNum;
    const bNum = pathParam.bNum;
    const writeUrl = "/board/" + boardType + "/write";
    const selectUrl = "/board/" + boardType + "/update/"+bNum;
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [board, setBoard] = useState([]);
    useEffect(() => {
        axios.get(selectUrl)
            .then((result) => {
                setBoard(result.data);
            });
    }, [])
    function onSubmit(data) {
        console.log(data);
        axios.post(writeUrl,data)
        .then((result) => {
            console.log(result);
            if(result.data==1){
                alert("성공");
            }
            else{
                alert("실패");
            }
        });
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input type="hidden"  {...register("userId", { required: { value: true, message: "제목을 입력해 주세요." } })} value={board.userId}/>
            <input type="hidden"  {...register("bNum", { required: { value: true, message: "제목을 입력해 주세요." } })} value={board.bNum}/>
            <input type="hidden"  {...register("bRef", { required: { value: true, message: "제목을 입력해 주세요." } })} value={board.bRef}/>
            <input type="hidden"  {...register("bWriter", { required: { value: true, message: "제목을 입력해 주세요." } })} value={board.bWriter}/>
            <table>
                <tr>
                    <th>제목</th>
                    <td>
                        <input {...register("bSubject", { required: { value: true, message: "제목을 입력해 주세요." } })} value={board.bSubject}/>
                        {errors.bSubject && <p>{errors.bSubject.message}</p>}
                    </td>
                </tr>
                <tr>
                    <th>내용</th>
                    <td>
                        <textarea {...register("bContent", { required: true, message: "내용을 입력해주세요." })}>{board.bContent}</textarea>
                        {errors.bContent && <p>{errors.bContent.message}</p>}
                    </td>
                </tr>
                <tr>
                    <td colspan="2"><input type="submit" /></td>
                </tr>
            </table>
        </form>
    );


}
export default BoardForm;