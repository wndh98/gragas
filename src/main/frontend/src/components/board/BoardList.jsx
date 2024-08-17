import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function BoardList(props) {
    const pathParam = useParams();
    const boardType = pathParam.boardType;
    const pageNum = pathParam.pageNum;
    const boards = props.boards;
    console.log(boards);

    return (
        <tr>
            <td>{boards.bNum}</td>
            <td>{boards.bSubject}</td>
            <td>{boards.bWriter}</td>
            <td>{boards.bRegist}</td>
            <td>{boards.bView}</td>
        </tr>
    );


}
export default BoardList;