import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import BoardList from "./BoardList";
import Pagination from "react-js-pagination";

function BoardListLayout() {
    const pathParam = useParams();
    const boardType = pathParam.boardType;
    const pageNum = pathParam.pageNum;
    const listUrl = "/board/" + boardType + "/list/" + pageNum;
    const [boards, setBoards] = useState([]);
    const [searchDto, setSearchDto] = useState();
    useEffect(() => {
        axios.get(listUrl)
            .then((result) => {
                setBoards([...(result.data.boardList)]);
                setSearchDto(result.data.searchDto);
                console.log(searchDto);
            });
    }, [])

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
                <Link to={"/board/" + boardType + "/write/" + pageNum}>글쓰기</Link>
            </>
        );
    } else {
        return (
            <>
                <table className="table table-dark table-striped">
                    <tbody>
                        <tr>
                            <td><Link to={"/board/" + boardType + "/write/" + pageNum}>글쓰기</Link></td>
                            <td>게시글번호</td>
                            <td>게시글제목</td>
                            <td>작성자</td>
                            <td>등록일</td>
                            <td>조회수</td>
                        </tr>

                        {boards.map(board => {
                            return (<BoardList boards={board}></BoardList>);
                        })}
                    </tbody>
                </table>
                <nav aria-label="Page navigation">
                    <Pagination
                        activePage={searchDto.pageNum}
                        itemsCountPerPage={searchDto.pageSize}
                        totalItemsCount={searchDto.totalCnt}
                        pageRangeDisplayed={searchDto.blockSize}
                        itemClass={"page-item"}
                        linkClass={"page-link"}
                        hideFirstLastPages={true}
                        onChange={handlePageChange}>
                    </Pagination>
                </nav>
            </>
        );
    }
}

function handlePageChange() {

}
export default BoardListLayout;