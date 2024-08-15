import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function BoardList() {
    const pathParam = useParams();
    const boardType = pathParam.boardType;
    const pageNum = pathParam.pageNum;
    const listUrl = "/board/" + boardType + "/list/" + pageNum;
    const [boardList, setBoardList] = useState([]);
    useEffect(() => {
        axios.get(listUrl)
            .then((result) => {
                setBoardList(result.data);
                console.log(1)
            });
    }, [])

    if (boardList.length == 0) {
        return(
            <tr>
                <td colspan="5">등록된 게시글이 없습니다.</td>
            </tr>
        )
    } else {
        return (
            <>
                {boardList.map(board => {
                    <tr>
                        <td>{board.bNum}</td>
                        <td>{board.bSubject}</td>
                        <td>{board.bWrtier}</td>
                        <td>{board.bRegist}</td>
                        <td>{board.bView}</td>
                    </tr>

                })}
            </>
        );
    }

}
export default BoardList;