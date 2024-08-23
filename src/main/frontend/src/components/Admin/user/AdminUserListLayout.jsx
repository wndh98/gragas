import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Pagination from "react-js-pagination";
import AdminUserList from "./AdminUserList";

function AdminUserListLayout() {
  const pathParam = useParams();
  const pageNum = pathParam.pageNum;
  const listUrl = "/admin/user/list/" + pageNum;
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const [searchDto, setSearchDto] = useState({});
  const [pagination, setPagination] = useState();

  useEffect(() => {
    axios.get(listUrl)
        .then((result) => {
          setUsers([...(result.data.userList)]);
          setSearchDto((result.data.searchDto));
          setPagination(paginationCreate(searchDto));
        });
}, [])
useEffect(() => {
  setPagination(paginationCreate(searchDto));
  navigate("/admin/user/list/" + searchDto.pageNum);
}, [searchDto])
function paginationCreate(props) {
  return (<Pagination
      activePage={props.pageNum}
      itemsCountPerPage={props.pageSize}
      totalItemsCount={props.totalCnt}
      pageRangeDisplayed={props.blockSize}
      itemClass={"page-item"}
      linkClass={"page-link"}
      hideFirstLastPages={true}
      onChange={handlePageChange}>
  </Pagination>);
}
function handlePageChange(nextPage) {
  let newUrl = "/admin/user/list/" + nextPage;
  axios.get(newUrl)
      .then((result) => {
          setUsers([...(result.data.userList)]);
          setSearchDto(result.data.searchDto);
          setPagination(paginationCreate(searchDto));
      });
}

if (users.length == 0) {
  return (
      <>
          <table className="table">
              <tr>
                  <td>아이디</td>
                  <td>이름</td>
                  <td>등급</td>
                  <td>포인트</td>
                  <td>탈퇴여부</td>
                  <td>생성일</td>
              </tr>
              <tr>
                  <td colspan="6">유저가 없습니다.</td>
              </tr>

          </table>
      </>
  );
} else {
  return (
      <>
          <table className="table table-dark table-striped">
              <tbody>
                  <tr>
                    <td>삭제</td>
                    <td>아이디</td>
                    <td>이름</td>
                    <td>등급</td>
                    <td>포인트</td>
                    <td>탈퇴여부</td>
                    <td>생성일</td>
                  </tr>

                  {users.map(user => {
                      return (<AdminUserList users={user} searchDto={searchDto}></AdminUserList>);
                  })}
              </tbody>
          </table>
          <nav aria-label="Page navigation">
              {pagination}
          </nav>
      </>
  );
}
}

export default AdminUserListLayout;