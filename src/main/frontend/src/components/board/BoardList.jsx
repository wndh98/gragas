import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getUserId, isAdmin } from "../../js/userInfo";

function BoardList(props) {
    const pathParam = useParams();
    const boardType = pathParam.boardType;
    const boards = props.boards;
    const searchDto = props.searchDto;
    const register = props.register;
    return (
        <tr className="text-center">
            <td>
                {isAdmin() ? <input type="checkbox" {...register("bNum")} value={boards.bNum} className="form-check-input" /> : ""}
                {boards.bNum}
            </td>
            <td className="text-start"><Link to={"/board/" + boardType + "/view/" + searchDto.pageNum + "/" + boards.bNum}>{boards.bSubject}</Link></td>
            <td>{boards.bWriter}</td>
            <td>{boards.bRegist}</td>
            <td>{boards.bView}</td>
        </tr>
    );

}
export default BoardList;