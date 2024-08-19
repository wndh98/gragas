import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { setCookie, getCookie } from "../../js/cookieJs";
function BoardView() {
    const pathParam = useParams();
    const boardType = pathParam.boardType; // 무슨게시판인지
    const pageNum = pathParam.pageNum;  // 리스트에서 몇페이지에서 들어왔는지
    const bNum = pathParam.bNum; // 게시판 번호
    const mode = pathParam.mode; // write(insert),update(update)
    const [board, setBoard] = useState([]);
    const selectUrl = "/board/" + boardType + "/select/" + bNum;
    const addViewUrl = "/board/" + boardType + "/addView/" + bNum;

    useEffect(() => {
        axios.get(selectUrl)
            .then((result) => {
                setBoard(result.data);
            });
        if (getCookie(bNum) == null) {
            axios.get(addViewUrl)
                .then((result) => {
                    setCookie(bNum, 1, 1);
                });
        }
    }, []);

    return (
        <table className="table">
            <tbody>
                <tr>
                    <td>제목</td>
                    <td>{board.bSubject}</td>
                </tr>
                <tr>
                    <td>글쓴이</td>
                    <td>{board.bWriter}</td>
                </tr>
                <tr>
                    <td>조회수</td>
                    <td>{board.bView}</td>
                </tr>
                <tr>
                    <td colSpan="2" style={{ whiteSpace: "pre-wrap" }}>{board.bContent}</td>
                </tr>
            </tbody>
        </table >

    );
}
export default BoardView;