import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";

function AdminSubscribeUpdate() {
    const { siNum } = useParams();
    const selectUrl = `/subscribe/description/${siNum}`;
    const { register, handleSubmit, formState: { errors }} = useForm();
    const [subscribeItem, setSubscribeItem] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(selectUrl)
            .then((result) => {
                setSubscribeItem(result.data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, [selectUrl]);

    async function onSubmit(data) {
        const formData = new FormData();

        // 기본 정보 추가
         formData.append("subscribeItem", new Blob([JSON.stringify({
            siNum: data.siNum,
            siSubject: data.siSubject,
            siContent: data.siContent,
            siDescription: data.siDescription,
            siPrice: data.siPrice,
            siTitle: data.siTitle,
            siPayDate: data.siPayDate,
            siArrive: data.siArrive
        })], { type: "application/json" }));

        if (data.siMainImg && data.siMainImg.length > 0) {
            formData.append("siMainImg", data.siMainImg[0]);
        }
        if (data.siDesImg && data.siDesImg.length > 0) {
            formData.append("siDesImg", data.siDesImg[0]);
        }
        
        try {
            const result = await axios.post("/subscribe/adminSubsUpdate", formData, {
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

    if (!subscribeItem) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="hidden" {...register("siNum")} value={siNum} />
                <table className="admin_board_wrap" id="user-admin">
                    <tbody>
                        <tr>
                            <th>구독상품명</th>
                            <td>
                                <input
                                    {...register("siSubject", { required: { value: true, message: "상품명을 입력해 주세요." } })} defaultValue={subscribeItem.siSubject}
                                />
                                {errors.siSubject && <p>{errors.siSubject.message}</p>}
                            </td>
                        </tr>
                        <tr>
                            <th>구독상품내용</th>
                            <td>
                                <textarea
                                    {...register("siContent", { required: { value: true, message: "내용을 입력해주세요." } })}defaultValue={subscribeItem.siContent}
                                ></textarea>
                                {errors.siContent && <p>{errors.siContent.message}</p>}
                            </td>
                        </tr>
                        <tr>
                            <th>구독상품설명</th>
                            <td>
                                <textarea
                                    {...register("siDescription", { required: { value: true, message: "설명을 입력해주세요." } })}defaultValue={subscribeItem.siDescription}
                                ></textarea>
                                {errors.siDescription && <p>{errors.siDescription.message}</p>}
                            </td>
                        </tr>
                        <tr>
                            <th>구독상품가격</th>
                            <td>
                                <input
                                    type="number"
                                    {...register("siPrice", { required: { value: true, message: "가격을 입력해 주세요." } })}defaultValue={subscribeItem.siPrice}
                                />
                                {errors.siPrice && <p>{errors.siPrice.message}</p>}
                            </td>
                        </tr>
                        <tr>
                            <th>구독상품유형</th>
                            <td>
                                <input
                                    type="text"
                                    {...register("siTitle", { required: { value: true, message: "유형을 입력해 주세요. ex)증류주,약주,종합" } })}defaultValue={subscribeItem.siTitle}
                                />
                                {errors.siTitle && <p>{errors.siTitle.message}</p>}
                            </td>
                        </tr>
                        <tr>
                            <th>메인이미지</th>
                            <td>
                                <input
                                    type="file"
                                    {...register("siMainImg")}
                                />
                                {errors.siMainImg && <p>{errors.siMainImg.message}</p>}
                            </td>
                        </tr>
                        <tr>
                            <th>설명이미지</th>
                            <td>
                                <input
                                    type="file"
                                    {...register("siDesImg")}
                                />
                                {errors.siDesImg && <p>{errors.siDesImg.message}</p>}
                            </td>
                        </tr>
                        <tr>
                            <th>결제일</th>
                            <td>
                                <input
                                    type="date"
                                    {...register("siPayDate", { required: { value: true, message: "결제일을 입력해 주세요." } })}defaultValue={subscribeItem.siPayDate}
                                />
                                {errors.siPayDate && <p>{errors.siPayDate.message}</p>}
                            </td>
                        </tr>
                        <tr>
                            <th>도착일</th>
                            <td>
                                <input
                                    type="date"
                                    {...register("siArrive", { required: { value: true, message: "도착일을 입력해 주세요." } })}defaultValue={subscribeItem.siArrive}
                                />
                                {errors.siArrive && <p>{errors.siArrive.message}</p>}
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2">
                                <input type="submit" value="전송" />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
    );
}

export default AdminSubscribeUpdate;
