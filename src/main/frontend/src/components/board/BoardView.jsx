import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { setCookie, getCookie } from "../../js/cookieJs";
import CommentForm from "./CommentForm";
import CommentListLayout from "./CommentListLayout";
import CommentLayout from "./CommentLayout";
import { getUserId, isAdmin, isLogin } from "../../js/userInfo";
const boardTypeList = { "free": "자유게시판", "qa": "Q&A게시판", "notice": "공지게시판" };
function BoardView() {
    const pathParam = useParams();
    const boardType = pathParam.boardType; // 무슨게시판인지
    const pageNum = pathParam.pageNum;  // 리스트에서 몇페이지에서 들어왔는지
    const bNum = pathParam.bNum; // 게시판 번호
    const mode = pathParam.mode; // write(insert),update(update)
    const [board, setBoard] = useState({});
    const [fileList, setFileList] = useState([]);
    const navi = useNavigate();
    const selectUrl = "/board/" + boardType + "/select/" + bNum;
    const addViewUrl = "/board/" + boardType + "/addView/" + bNum;
    const fileListUrl = "/board/" + boardType + "/fileList/" + bNum;
    const deleteUrl = "/board/" + boardType + "/delete";
    useEffect(() => {
        axios.get(selectUrl)
            .then((result) => {
                setBoard(result.data);
            });
        axios.get(fileListUrl)
            .then((result) => {
                setFileList(result.data);

            });
        if (getCookie(bNum) == null) {
            axios.get(addViewUrl)
                .then((result) => {
                    setCookie(bNum, 1, 1);
                });
        }
    }, []);
    function downloadFile(file) {
        const downloadUrl = "/board/download/" + file.bfNum;
        axios.get(downloadUrl, { responseType: 'blob' })
            .then((result) => {
                const url = window.URL.createObjectURL(new Blob([result.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', file.bfOName); // 다운로드할 파일 이름 지정
                document.body.appendChild(link);
                link.click();
                link.remove();

            });
    }
    function deleteBoard() {
        axios.post(deleteUrl, [bNum])
            .then((result) => {
                if (result.data > 0) {
                    alert("삭제성공");
                    navi("/board/" + boardType + "/list/" + pageNum);
                } else {
                    alert("삭제실패");
                }
            });
    }
    return (
        <main className="container">
            <h1 className="mt-5 text-center">{boardTypeList[boardType]}</h1>
            <div className="mt-5 p-5 border rounded">
                <h3>{board.bSubject}</h3>

                <div className="mb-3 text-muted">
                    <span>작성자: {board.bWriter}</span> |
                    <span className="ms-2">작성일: {board.bRegist}</span> |
                    <span className="ms-2">조회수: {board.bView}</span>
                </div>
                <div class="dropdown">
                    <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        다운로드
                    </button>
                    <ul class="dropdown-menu">
                        {fileList.map((file) => {
                            return (
                                <li><button type="button" className="dropdown-item" onClick={() => { downloadFile(file) }}>{file.bfOName}</button></li>);
                        })}
                    </ul>
                </div>
                <hr />
                <div className="p-2" style={{ whiteSpace: "pre-wrap" }}>
                    {board.bContent}
                </div>
            </div>
            <CommentLayout bNum={bNum} boardType={boardType}></CommentLayout>

            <div className="d-flex justify-content-between p-5">
                <Link to={`/board/${boardType}/list/${pageNum}`} className="btn btn-primary">목록으로</Link>
                <div>
                    {getUserId() == board.userId || isAdmin() ?
                        <>
                            <Link to={"/board/" + boardType + "/update/" + pageNum + "/" + bNum} className="btn btn-warning">수정</Link>
                            <button type="button" className="btn btn-danger ms-2" onClick={() => { deleteBoard() }}> 삭제</button>
                        </>
                        : ""
                    }
                    <Link to={`/board/${boardType}/write/${pageNum}/${bNum}`} className="btn btn-dark ms-2  " > 답글</Link>
                </div>
            </div>

            {/* <CommentListLayout bNum={bNum} boardType={boardType}></CommentListLayout> */}
            {/* <CommentForm bNum={bNum} boardType={boardType}></CommentForm> */}
        </main>
    );
}
export default BoardView;