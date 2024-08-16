import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function BoardList(props) {
    const pathParam = useParams();
    const boardType = pathParam.boardType;
    const pageNum = pathParam.pageNum;
    const boards = props.boards;

    if (boards == null) {
        return (
            <tr>
                <td colspan="5">등록된 게시글이 없습니다.</td>
            </tr>
        )
    } else {
        return (
            <tr>
                <td>{boards.bNum}</td>
                <td>{boards.bSubject}</td>
                <td>{boards.bWrtier}</td>
                <td>{boards.bRegist}</td>
                <td>{boards.bView}</td>
            </tr>
        );
    }

}
export default BoardList;