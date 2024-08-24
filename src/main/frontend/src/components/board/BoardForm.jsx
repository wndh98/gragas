import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getUser, getUserId, isAdmin } from "../../js/userInfo";

function BoardForm() {
    const navi = useNavigate();
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

    const [board, setBoard] = useState([]);
    const { register, handleSubmit, formState: { errors }, setValue } = useForm(
        {
            defaultValues: {
                bSubject: "",
                bContent: "",
                bNum: ""
            }
        }
    );

    const [user, setUser] = useState({});
    getUser(setUser);
    useEffect(() => {
        setValue("userId", user.userId);
        setValue("bWriter", user.userName);
        if (mode === "update") {
            if (user.userId != getUserId() && !isAdmin()) {
                alert("잘못된접근입니다.");
                navi(-1);
            };
        }
    }, [user]);

    const selectUrl = "/board/" + boardType + "/select/" + bNum;

    useEffect(() => {
        if (bNum != null) {
            axios.get(selectUrl)
                .then((result) => {
                    setBoard(result.data);
                    if (mode == "update") {
                        setValue('bSubject', result.data.bSubject);
                        setValue('bContent', result.data.bContent);
                    }
                    setValue('bNum', result.data.bNum);
                    setValue('bRef', result.data.bNum);
                });
        }
    }, []);

    function onSubmit(data) {
        const formData = new FormData();
        //console.log(data.bFile[0]);
        formData.append("board", new Blob([JSON.stringify(data)], { type: "application/json" }));
        if (data.bFile && data.bFile.length > 0) {
            for (let i = 0; i < data.bFile.length; i++) {
                if (data.bFile[i][0] != null) {
                    formData.append("bFileNum", i * 1);
                }
                formData.append("bFile", data.bFile[i][0]);
            }
        }

        console.log(data);
        axios.post(ajaxUrl, formData, { headers: { "Content-Type": "multipart/form-data" } })
            .then((result) => {
                if (result.data == 1) {
                    alert("성공");
                }
                else if (result.data == -1) {
                    alert("파일업로드실패");
                } else {
                    alert("글입력실패");
                }
            });
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} >
            {/* <input type="hidden"  {...register("userId", { required: { value: true } })} value={board.userId} /> */}
            <input type="hidden"  {...register("userId")} value={user.userId} />
            <input type="hidden"  {...register("bNum")} />
            <input type="hidden"  {...register("bRef")} value={board.bRef} />
            <input type="hidden"  {...register("bWriter")} value={user.userName} />
            <table>
                <tbody>
                    <tr>
                        <th>제목</th>
                        <td>
                            <input {...register("bSubject", { required: { message: "제목을 입력해 주세요." } })} />
                            {errors.bSubject && <p>{errors.bSubject.message}</p>}
                        </td>
                    </tr>
                    <tr>
                        <th>내용</th>
                        <td>
                            <textarea {...register("bContent", { required: true, message: "내용을 입력해주세요." })}></textarea>
                            {errors.bContent && <p>{errors.bContent.message}</p>}
                        </td>
                    </tr>

                    <tr>
                        <th>파일1</th>
                        <td>

                            <input type="file" {...register(`bFile[0]`)} className="form-control" />
                        </td>
                    </tr>
                    <tr>
                        <th>파일2</th>
                        <td>

                            <input type="file" {...register(`bFile[1]`)} className="form-control" />
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