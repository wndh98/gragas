import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import BoardList from "./BoardList";

function BoardListLayout() {
    const pathParam = useParams();
    const boardType = pathParam.boardType;
    const pageNum = pathParam.pageNum;

    

    return (
        <>
            <table>
                <tr>
                    <td>게시글번호</td>
                    <td>게시글제목</td>
                    <td>작성자</td>
                    <td>등록일</td>
                    <td>조회수</td>
                </tr>   
                <BoardList></BoardList>
            </table>
            <Link to={"/board/" + boardType + "/write/"+pageNum}>글쓰기</Link>
        </>
    );
}
export default BoardListLayout;