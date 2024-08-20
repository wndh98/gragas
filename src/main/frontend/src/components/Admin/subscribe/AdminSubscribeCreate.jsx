import { useForm } from "react-hook-form";
import axios from 'axios';

function AdminSubscribeCreate() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    function onSubmit(data) {
        // Prepare the form data
        const formData = new FormData();
        formData.append("subscribe", new Blob([JSON.stringify(data)], { type: "application/json" }));
        if (data.siMainImg && data.siMainImg.length > 0) {
            for (let i = 0; i < data.siMainImg.length; i++) {
                formData.append("siMainImg", data.siMainImg[i]);
            }
        }
        if (data.siDesImg && data.siDesImg.length > 0) {
            for (let i = 0; i < data.siDesImg.length; i++) {
                formData.append("siDesImg", data.siDesImg[i]);
            }
        }

        axios.post("/subscribe/subscribeInsert", formData, { headers: { "Content-Type": "multipart/form-data" } })
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
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <table className="admin_board_wrap" id="user-admin">
                    <thead className="admin_boardList">
                    <tr>
                        <th>구독상품명</th>
                        <td>
                            <input {...register("siSubject", { required: { value: true, message: "상품명을 입력해 주세요." } })}/>
                            {errors.siSubject && <p>{errors.siSubject.message}</p>}
                        </td>
                    </tr>
                    <tr>
                        <th>구독상품내용</th>
                        <td>
                            <textarea {...register("siContent", { required: true, message: "내용을 입력해주세요." })}></textarea>
                            {errors.siContent && <p>{errors.siContent.message}</p>}
                        </td>
                    </tr>
                    <tr>
                        <th>구독상품설명</th>
                        <td>
                            <textarea {...register("siDescription", { required: true, message: "설명을 입력해주세요." })}></textarea>
                            {errors.siDescription && <p>{errors.siDescription.message}</p>}
                        </td>
                    </tr>
                    <tr>
                        <th>구독상품가격</th>
                        <td>
                            <input type="number"{...register("siPrice", { required: { value: true, message: "가격을 입력해 주세요." } })}/>
                            {errors.siPrice && <p>{errors.siPrice.message}</p>}
                        </td>
                    </tr>
                    <tr>
                        <th>메인이미지</th>
                        <td>

                            <input type="file" {...register("siMainImg", { required: false })} className="form-control" />
                        </td>
                    </tr>
                    <tr>
                        <th>설명이미지</th>
                        <td>

                            <input type="file" {...register("siDesImg", { required: false })} className="form-control" />
                        </td>
                    </tr>
                    <tr>
                        <th>결제일</th>
                        <td>
                            <input type="date"{...register("siPayDate", { required: { value: true, message: "결제일을 입력해 주세요." } })}/>
                            {errors.siPayDate && <p>{errors.siPayDate.message}</p>}
                        </td>
                    </tr>
                    <tr>
                        <th>도착일</th>
                        <td>
                            <input type="date"{...register("siArrive", { required: { value: true, message: "도착일을 입력해 주세요." } })}/>
                            {errors.siArrive && <p>{errors.siArrive.message}</p>}
                        </td>
                    </tr>
                        <tr>
                            <td colSpan="2">
                                <input type="submit" value="전송" />
                            </td>
                        </tr>
                    </thead>
                </table>
            </form>
        </div>
    );
}

export default AdminSubscribeCreate;
