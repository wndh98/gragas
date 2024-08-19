import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import BoardList from "./BoardList";
import Pagination from "react-js-pagination";

function BoardListLayout() {
    const pathParam = useParams();
    const boardType = pathParam.boardType;
    const pageNum = pathParam.pageNum;
    const listUrl = "/board/" + boardType + "/list/" + pageNum;
    const [boards, setBoards] = useState([]);
    const navi = useNavigate();
    const [searchDto, setSearchDto] = useState({});
    //let searchDto = {};
    const [pagination, setPagination] = useState();

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
            <>
                <table className="table table-dark table-striped">
                    <tbody>
                        <tr>
                            <td><Link to={"/board/" + boardType + "/write/" + searchDto.pageNum}>글쓰기</Link></td>
                            <td>게시글번호</td>
                            <td>게시글제목</td>
                            <td>작성자</td>
                            <td>등록일</td>
                            <td>조회수</td>
                        </tr>

                        {boards.map(board => {
                            return (<BoardList boards={board} searchDto={searchDto}></BoardList>);
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


export default BoardListLayout;