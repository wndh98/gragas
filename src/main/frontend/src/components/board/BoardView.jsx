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
    const [board, setBoard] = useState({});
    const [fileList, setFileList] = useState([]);
    const selectUrl = "/board/" + boardType + "/select/" + bNum;
    const addViewUrl = "/board/" + boardType + "/addView/" + bNum;
    const fileListUrl = "/board/" + boardType + "/fileList/" + bNum;
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
                    <td>파일</td>
                    <td>
                        <div class="dropdown">
                            <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                download files
                            </button>
                            <ul class="dropdown-menu">
                                {fileList.map((file) => {
                                    return (
                                        <li><button type="button" className="dropdown-item" onClick={() => { downloadFile(file) }}>{file.bfOName}</button></li>);
                                })}
                            </ul>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td colSpan="2" style={{ whiteSpace: "pre-wrap" }}>{board.bContent}</td>
                </tr>
                <tr>
                    <td colSpan="2" ><Link to={"/board/" + boardType + "/update/" + pageNum + "/" + bNum}>수정</Link></td>
                </tr>
            </tbody>
        </table >

    );
}
export default BoardView;