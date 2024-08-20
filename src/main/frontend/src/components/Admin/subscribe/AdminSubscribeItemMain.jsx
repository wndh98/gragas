import axios from "axios";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";

function AdminSubscribeItemMain() {
    const { register, handleSubmit, formState: { error } } = useForm();
    const [subscribes, setSubscribe] = useState([]);
    const listUrl = "/subscribe/itemList";

    // Axios를 사용하여 Promise기반으로 상품정보를 가져오는 함수

    axios.get(listUrl)
        .then(response => {
            setSubscribe(response.data); // 가져온 상품정보를 상태에 저장
        })
        .catch(error => console.error("Fetching error:", error));

    function subscribeDelete(data) {

        let siNum = [...(data.siNum)];

        axios.post('/subscribe/deleteSubscribe', siNum)
            .then(response => {
                if (response.data == 1) {
                    alert("성공");
                } else {
                    alert("실패");
                }
            })


    }
    // 컴포넌트 마운트시 상품정보 가져오기 함수호출

    return (
        <>
        <div>
            <form name="frm">
                <table className="table">

                    <tr className="">
                        <input type="checkbox"></input>
                        <label>전체선택</label>
                        <td>구독상품번호</td>
                        <td>구독상품분류</td>
                        <td>구독상품명</td>
                        <td>구독상품가격</td>
                        <td>메인이미지</td>
                        <td>설명이미지</td>
                        <td>한줄설명</td>
                        <td>결제일</td>
                        <td>배송일</td>
                    </tr>
                    {subscribes.map((subscribe) => {

                        return (
                            <tr>
                                <td><input type="checkbox" {...register("siNum")} value={subscribe.siNum} /></td>
                                <td><Link to={"/subscribe/updateSubscribe/" + subscribe.siNum}>{subscribe.siNum}</Link></td>

                                <td value={subscribe.siTitle}>{subscribe.siTitle}</td>
                                <td value={subscribe.siSubject}>{subscribe.siSubject}</td>
                                <td value={subscribe.siPrice}>{subscribe.siPrice}</td>
                                <td value={subscribe.siMainImg}>{subscribe.siMainImg}</td>
                                <td value={subscribe.siDesImg}>{subscribe.siDesImg}</td>
                                <td value={subscribe.siContent}>{subscribe.siContent}</td>
                                <td value={subscribe.siPayDate}>{subscribe.siPayDate}</td>
                                <td value={subscribe.siArrive}>{subscribe.siArrive}</td>
                            </tr>

                        );
                    })}
                    <tr>
                        <td><Link to="/subscribe/subsribeCreate">상품추가</Link></td>
                       { <td><button type="button" onClick={handleSubmit(subscribeDelete)}>상품삭제</button></td>}

                    </tr>
                </table>
            </form>
        </div>
    </>            
    );
}

export default AdminSubscribeItemMain;
