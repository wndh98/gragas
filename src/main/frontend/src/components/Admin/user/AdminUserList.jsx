import { Link, useParams } from "react-router-dom";

function AdminUserList(props) {
    const pathParam = useParams();
    const users = props.users;
    const searchDto = props.searchDto;
    return (
        <tr>
            <td><input type="checkbox" className="form-check-input" /></td>
            <td><Link to={"admin/user/view/" + searchDto.pageNum + "/" + users.userId}>{users.userId}</Link></td>
            <td>{users.userName}</td>
            <td>{users.userLevel}</td>
            <td>{users.userPoint}</td>
            <td>{users.userDel}</td>
            <td>{users.userRegist}</td>
        </tr>
    );


}
export default AdminUserList;