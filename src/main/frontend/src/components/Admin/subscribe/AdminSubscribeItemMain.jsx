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
        <div className="container">
            <form name="frm">
                <table className="table table-bordered text-center">
                    <tr className="bg-secondary text-white">
                        <th>구독번호(수정)</th>
                        <th>구독상품</th>
                        <th>가격</th>
                        <th>메인이미지</th>
                        <th>설명이미지</th>
                        <th>한줄설명</th>
                        <th>결제일</th>
                        <th>배송일</th>
                        <th>삭제</th>
                    </tr>
                    {subscribes.map((subscribe) => (
                        <tr key={subscribe.siNum}>
                            <td className="border">
                                <Link to={`/subscribe/updateSubscribe/${subscribe.siNum}`} className="btn btn-primary">
                                    {subscribe.siNum}
                                </Link>
                            </td>
                            <td className=".text-truncate border">{subscribe.siSubject}</td>
                            <td className=".text-truncate border">{subscribe.siPrice}</td>
                            <td className=".text-truncate border col-2">{subscribe.siMainImg}</td>
                            <td className=".text-truncate border col-2">{subscribe.siDesImg}</td>
                            <td className=".text-truncate border col-2">{subscribe.siContent}</td>
                            <td className="border">{subscribe.siPayDate}</td>
                            <td className=" border">{subscribe.siArrive}</td>
                            <td>
                                <button
                                    type="button"
                                    onClick={() => subscribeDelete(subscribe.siNum)}
                                    className="btn btn-secondary bg-secondary text-white"
                                >
                                    삭제
                                </button>
                            </td>
                        </tr>
                    ))}
                    <tr>
                        <td colSpan="10">
                            <Link to="/subscribe/subsribeCreate" className="btn btn-primary bg-primary text-white">상품추가</Link>
                        </td>
                    </tr>

                </table>
            </form>
        </div>
    );
}

export default AdminSubscribeItemMain;
