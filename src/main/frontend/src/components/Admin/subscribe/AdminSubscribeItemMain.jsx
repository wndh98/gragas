import axios from "axios";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function AdminSubscribeItemMain() {
    const [subscribes, setSubscribe] = useState([]);
    const listUrl = "/subscribe/itemList";

    useEffect(() => {
        axios.get(listUrl)
            .then(response => {
                setSubscribe(response.data);
            })
            .catch(error => console.error("Fetching error:", error));
    }, [listUrl]);

    function subscribeDelete(siNum) {
        axios.post(`/subscribe/deleteSubscribe/${siNum}`)
            .then(response => {
                if (response.data === 1) {
                    alert("성공");
                    // 상품 삭제 후 리스트 새로고침
                    axios.get(listUrl)
                        .then(response => {
                            setSubscribe(response.data); 
                        })
                        .catch(error => console.error("Fetching error:", error));
                } else {
                    alert("실패");
                }
            })
            .catch(error => {
                console.error("Deleting error:", error);
                alert("오류가 발생했습니다.");
            });
    }

    return (
        <div>
            <form name="frm">
                <table className="table">
                    
                        <tr>
                            <th>구독상품번호</th>
                            <th>구독상품분류</th>
                            <th>구독상품명</th>
                            <th>구독상품가격</th>
                            <th>메인이미지</th>
                            <th>설명이미지</th>
                            <th>한줄설명</th>
                            <th>결제일</th>
                            <th>배송일</th>
                            <th>삭제</th>
                        </tr>
                   
                        {subscribes.map((subscribe) => (
                            <tr key={subscribe.siNum}>
                                <td>
                                    <Link to={`/subscribe/updateSubscribe/${subscribe.siNum}`}>
                                        {subscribe.siNum}
                                    </Link>
                                </td>
                                <td>{subscribe.siTitle}</td>
                                <td>{subscribe.siSubject}</td>
                                <td>{subscribe.siPrice}</td>
                                <td>{subscribe.siMainImg}</td>
                                <td>{subscribe.siDesImg}</td>
                                <td>{subscribe.siContent}</td>
                                <td>{subscribe.siPayDate}</td>
                                <td>{subscribe.siArrive}</td>
                                <td>
                                    <button
                                        type="button"
                                        onClick={() => subscribeDelete(subscribe.siNum)}
                                    >
                                        삭제
                                    </button>
                                </td>
                            </tr>
                        ))}
                        <tr>
                            <td colSpan="10">
                                <Link to="/subscribe/subsribeCreate">상품추가</Link>
                            </td>
                        </tr>
                    
                </table>
            </form>
        </div>
    );
}

export default AdminSubscribeItemMain;
