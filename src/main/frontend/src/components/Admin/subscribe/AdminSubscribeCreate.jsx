import { useForm } from "react-hook-form";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AdminSubscribeCreate() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    async function onSubmit(data) {
        // 콘솔에 제출된 데이터를 출력하여 확인합니다.
        console.log('제출된 데이터:', data);

        const formData = new FormData();

        // JSON 데이터를 추가
        formData.append("subscribeItem", new Blob([JSON.stringify({
            siSubject: data.siSubject,
            siContent: data.siContent,
            siDescription: data.siDescription,
            siPrice: data.siPrice,
            siTitle: data.siTitle,
            siPayDate: data.siPayDate,
            siArrive: data.siArrive
        })], { type: "application/json" }));
        // 파일 데이터를 추가
        formData.append("siMainImg", data.siMainImg[0]);
        formData.append("siDesImg", data.siDesImg[0]);
        formData.forEach((value, key) => {
            console.log(`${key}:`, value);
        });
        console.log("siMainImg :",data.siMainImg[0])
        console.log("siDesImg :",data.siDesImg[0])
        try {
            const result = await axios.post("/subscribe/subscribeInsert", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });

            console.log(result.data);
            if (result.data === 1) {
                alert("성공");
                navigate("/subscribe/adminSubscribeList");
            } else {
                alert("실패");
            }
        } catch (error) {
            console.error("오류가 발생했습니다!", error.response ? error.response.data : error.message);
            alert("오류가 발생했습니다.");
        }
    }

    return (
        <div className="container">
            <form onSubmit={handleSubmit(onSubmit)}>
                <table className="admin_board_wrap table table-bordered" id="user-admin">
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
                                <textarea {...register("siContent", { required: { value: true, message: "내용을 입력해주세요." } })}></textarea>
                                {errors.siContent && <p>{errors.siContent.message}</p>}
                            </td>
                        </tr>
                        <tr>
                            <th>구독상품설명</th>
                            <td>
                                <textarea {...register("siDescription", { required: { value: true, message: "설명을 입력해주세요." } })}></textarea>
                                {errors.siDescription && <p>{errors.siDescription.message}</p>}
                            </td>
                        </tr>
                        <tr>
                            <th>구독상품가격</th>
                            <td>
                                <input type="number" {...register("siPrice", { required: { value: true, message: "가격을 입력해 주세요." } })}/>
                                {errors.siPrice && <p>{errors.siPrice.message}</p>}
                            </td>
                        </tr>
                        <tr>
                            <th>구독상품유형</th>
                            <td>
                                <input type="text" {...register("siTitle", { required: { value: true, message: "유형을 입력해 주세요. ex)증류주,약주,종합" } })}/>
                                {errors.siTitle && <p>{errors.siTitle.message}</p>}
                            </td>
                        </tr>
                        <tr>
                            <th>메인이미지</th>
                            <td>
                                <input type="file" {...register("siMainImg", { required: { value: true, message: "파일을 첨부해주세요." } })}/>
                                {errors.siMainImg && <p>{errors.siMainImg.message}</p>}
                            </td>
                        </tr>
                        <tr>
                            <th>설명이미지</th>
                            <td>
                                <input type="file" {...register("siDesImg", { required: { value: true, message: "파일을 첨부해주세요." } })}/>
                                {errors.siDesImg && <p>{errors.siDesImg.message}</p>}
                            </td>
                        </tr>
                        <tr>
                            <th>결제일</th>
                            <td>
                                <input type="date" {...register("siPayDate", { required: { value: true, message: "결제일을 입력해 주세요." } })}/>
                                {errors.siPayDate && <p>{errors.siPayDate.message}</p>}
                            </td>
                        </tr>
                        <tr>
                            <th>도착일</th>
                            <td>
                                <input type="date" {...register("siArrive", { required: { value: true, message: "도착일을 입력해 주세요." } })}/>
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
