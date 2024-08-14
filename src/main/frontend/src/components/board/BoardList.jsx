import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";

function BoardList() {
    const pathParam = useParams();
    const boardType = pathParam.boardType;
    const pageNum = pathParam.pageNum;
    const listUrl = "/board/" + boardType + "/list/" + pageNum;
    const [boardList, setBoardList] = useState([]);
    axios.get(listUrl)
        .then((result) => {
            setBoardList(result.data);
        });

    return (
        <table>
            <tr>
                <td>게시글번호</td>
                <td>게시글제목</td>
                <td>작성자</td>
                <td>등록일</td>
                <td>조회수</td>
            </tr>
            {boardList.map(board => {
                <tr>
                    <td>{board.bNum}</td>
                    <td>{board.bSubject}</td>
                    <td>{board.bWrtier}</td>
                    <td>{board.bRegist}</td>
                    <td>{board.bView}</td>
                </tr>

            })}
        </table>
    );
}
export default BoardList;