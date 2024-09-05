import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Pagination from "react-js-pagination";
import AdminUserList from "./AdminUserList";
import { useForm } from "react-hook-form";

function AdminUserListLayout() {
  const pathParam = useParams();
  const pageNum = pathParam.pageNum;
  const listUrl = "/admin/user/list/" + pageNum;
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const [searchDto, setSearchDto] = useState({});
  const [pagination, setPagination] = useState();
  const { register, handleSubmit, formState: { errors }, control, setValue } = useForm();

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
      onChange={handlePageChange}
      innerClass={"pagination justify-content-center"}
    >
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

  function onSubmit(data) {

    let newUrl = "/admin/user/list/" + searchDto.pageNum;
    axios.post("/admin/user/delete", [...(data.userId)])
      .then((result) => {
        if (result.data > 0) {
          axios.get(newUrl)
            .then((result) => {
              setUsers([...(result.data.userList)]);
              setSearchDto(result.data.searchDto);
              setPagination(paginationCreate(searchDto));
              setValue("usrId", []);
            });
        } else {
          alert("삭제실패");
        }
      });
  }

  if (users.length == 0) {
    return (
      <div className="container">
        <table className="table mt-5">
          <tr className="table-secondary align-middle text-center">
            <td>아이디</td>
            <td>이름</td>
            <td>등급</td>
            <td>포인트</td>
            <td>탈퇴여부</td>
            <td>생성일</td>
          </tr>
          <tr className="text-center">
            <td colspan="6">유저가 없습니다.</td>
          </tr>

        </table>
      </div>
    );
  } else {
    return (
      <div className="container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <table className="table mt-5">
            <tbody>
              <tr className="table-secondary align-middle text-center">
                <td><button>삭제</button></td>
                <td>아이디</td>
                <td>이름</td>
                <td>등급</td>
                <td>포인트</td>
                <td>탈퇴여부</td>
                <td>생성일</td>
              </tr>

              {users.map(user => {
                return (<AdminUserList users={user} searchDto={searchDto} register={register}></AdminUserList>);
              })}
            </tbody>
          </table>
          <nav aria-label="Page navigation">
            {pagination}
          </nav>
        </form>
      </div>
    );
  }
}

export default AdminUserListLayout;