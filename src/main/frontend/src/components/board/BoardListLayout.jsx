import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import BoardList from "./BoardList";
import Pagination from "react-js-pagination";
import { useForm } from "react-hook-form";
function BoardListLayout() {
    const pathParam = useParams();
    const boardType = pathParam.boardType;
    const pageNum = pathParam.pageNum;
    const listUrl = "/board/" + boardType + "/list/" + pageNum;
    const deleteUrl = "/board/" + boardType + "/delete";
    const [boards, setBoards] = useState([]);
    const navi = useNavigate();
    const [searchDto, setSearchDto] = useState({});
    //let searchDto = {};
    const [pagination, setPagination] = useState();
    const { register, handleSubmit, formState: { errors }, control } = useForm();


    useEffect(() => {
        axios.get(listUrl)
            .then((result) => {
                setBoards([...(result.data.boardList)]);
                setSearchDto((result.data.searchDto));
                setPagination(paginationCreate(searchDto));
            });
    }, [])

    useEffect(() => {
        setPagination(paginationCreate(searchDto));
        navi("/board/" + boardType + "/list/" + searchDto.pageNum);
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
        let newUrl = "/board/" + boardType + "/list/" + nextPage;
        axios.get(newUrl)
            .then((result) => {
                setBoards([...(result.data.boardList)]);
                setSearchDto(result.data.searchDto);
                setPagination(paginationCreate(searchDto));
            });
    }
    function onSubmit(data) {
        let newUrl = "/board/" + boardType + "/list/" + searchDto.pageNum;
        axios.post(deleteUrl, [...(data.bNum)])
            .then((result) => {
                if (result.data > 0) {
                    axios.get(newUrl)
                        .then((result) => {
                            setBoards([...(result.data.boardList)]);
                            setSearchDto(result.data.searchDto);
                            setPagination(paginationCreate(searchDto));
                        });
                } else {
                    alert("삭제실패");
                }
            });
    }
    if (boards.length == 0) {
        return (
            <>
                <table className="table">
                    <tr>
                        <td>게시글번호</td>
                        <td>게시글제목</td>
                        <td>작성자</td>
                        <td>등록일</td>
                        <td>조회수</td>
                    </tr>
                    <tr>
                        <td colspan="5">등록된 게시글이 없습니다.</td>
                    </tr>

                </table>
                <Link to={"/board/" + boardType + "/write/" + searchDto.pageNum}>글쓰기</Link>
            </>
        );
    } else {
        return (
            <form onSubmit={handleSubmit(onSubmit)}>
                <table className="table table-dark table-striped">
                    <tbody>
                        <tr>
                            <td>
                                <Link to={"/board/" + boardType + "/write/" + searchDto.pageNum}>글쓰기</Link>
                                <input type="submit" value="삭제" className="btn btn-light" />
                            </td>
                            <td>게시글번호</td>
                            <td>게시글제목</td>
                            <td>작성자</td>
                            <td>등록일</td>
                            <td>조회수</td>
                        </tr>

                        {boards.map(board => {
                            return (<BoardList boards={board} searchDto={searchDto} register={register}></BoardList>);
                        })}
                    </tbody>
                </table>
                <nav aria-label="Page navigation">
                    {pagination}
                </nav>
            </form>
        );
    }
}


export default BoardListLayout;