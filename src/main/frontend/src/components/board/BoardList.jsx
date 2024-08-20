import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function BoardList(props) {
    const pathParam = useParams();
    const boardType = pathParam.boardType;
    const boards = props.boards;
    const searchDto = props.searchDto;
    return (
        <tr>
            <td><input type="checkbox" className="form-check-input" /></td>
            <td>{boards.bNum}</td>
            <td><Link to={"/board/" + boardType + "/view/" + searchDto.pageNum + "/" + boards.bNum}>{boards.bSubject}</Link></td>
            <td>{boards.bWriter}</td>
            <td>{boards.bRegist}</td>
            <td>{boards.bView}</td>
        </tr>
    );


}
export default BoardList;