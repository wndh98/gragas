import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function AdminUserList(props) {
    const pathParam = useParams();
    const users = props.users;
    const searchDto = props.searchDto;
    const register = props.register;
    const [selectedUsers, setSelectedUsers] = useState([]);
    return (
        <tr className="text-center">
            <td><input type="checkbox" {...register("userId")} value={users.userId}  className="form-check-input" /></td>
            <td>
                {/* <Link to={"admin/user/view/" + searchDto.pageNum + "/" + users.userId}> */}
                    {users.userId}
                {/* </Link> */}
            </td>
            <td>{users.userName}</td>
            <td>{users.userLevel}</td>
            <td>{users.userPoint}</td>
            <td>{users.userDel}</td>
            <td>{users.userRegist}</td>
        </tr>
    );


}
export default AdminUserList;