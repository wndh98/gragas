import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";
import { useFieldArray } from "react-hook-form";
function BoardForm() {
    const pathParam = useParams();
    const boardType = pathParam.boardType; // 무슨게시판인지
    const pageNum = pathParam.pageNum;  // 리스트에서 몇페이지에서 들어왔는지
    const bNum = pathParam.bNum; // 게시판 번호
    const mode = pathParam.mode; // write(insert),update(update)

    let ajaxUrl;
    if (mode == "write") {
        ajaxUrl = "/board/" + boardType + "/write";
    } else if (mode == "update") {
        ajaxUrl = "/board/" + boardType + "/update/" + bNum;
    }
    const { register, handleSubmit, formState: { errors }, control } = useForm();
    const [board, setBoard] = useState([]);
    const { fields, append } = useFieldArray({
        control,
        name: "bFile" // 'items'라는 필드에 대해 배열로 관리
    });
    const selectUrl = "/board/" + boardType + "/select/" + bNum;

    useEffect(() => {
        if (bNum != null) {
            axios.get(selectUrl)
                .then((result) => {
                    setBoard(result.data);
                });
        }
    }, []);

    function onSubmit(data) {
        const formData = new FormData();
        const bFiles = formData.getAll('bFile');
        formData.append("board", new Blob([JSON.stringify(data)], { type: "application/json" }));
        if (data.bFile && data.bFile.length > 0) {
            for (let i = 0; i < data.bFile.length; i++) {
                formData.append("bFile", data.bFile[i]);
            }
        }
        console.log(bFiles);
        // axios.post(ajaxUrl, formData, { headers: { "Content-Type": "multipart/form-data" } })
        //     .then((result) => {
        //         if (result.data == 1) {
        //             alert("성공");
        //         }
        //         else if (result.data == -1) {
        //             alert("파일업로드실패");
        //         } else {
        //             alert("글입력실패");
        //         }
        //     });
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} >
            {/* <input type="hidden"  {...register("userId", { required: { value: true } })} value={board.userId} /> */}
            <input type="hidden"  {...register("userId")} value="111@111.11" />
            <input type="hidden"  {...register("bNum")} value={board.bNum} />
            <input type="hidden"  {...register("bRef")} value={board.bRef} />
            <input type="hidden"  {...register("bWriter")} value="11" />
            <table>
                <tbody>
                    <tr>
                        <th>제목</th>
                        <td>
                            <input {...register("bSubject", { required: { value: true, message: "제목을 입력해 주세요." } })} value={board.bSubject} />
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
                        <th>파일1</th>
                        <td>

                            <input type={"file"}{...register(`bFile.0.value`)} className="form-control" />
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="2"><input type="submit" /></td>
                    </tr>
                </tbody>
            </table>
        </form>
    );
}
export default BoardForm;