import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import BoardList from "./BoardList";
import Pagination from "react-js-pagination";
import { useForm } from "react-hook-form";
import { isLogin, getUserId, isAdmin } from "../../js/userInfo";
const boardTypeList = { "free": "자유게시판", "qa": "Q&A게시판", "notice": "공지게시판" };
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
    const { register, handleSubmit, formState: { errors }, control, setValue } = useForm();


    useEffect(() => {
        axios.get(listUrl)
            .then((result) => {
                setBoards([...(result.data.boardList)]);
                setSearchDto((result.data.searchDto));
                setPagination(paginationCreate(searchDto));
            });
    }, [])
    useEffect(() => {
        axios.get(listUrl)
            .then((result) => {
                setBoards([...(result.data.boardList)]);
                setSearchDto((result.data.searchDto));
                setPagination(paginationCreate(searchDto));
            });
    }, [boardType])
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
            onChange={handlePageChange}
            innerClass={"pagination justify-content-center"}
        >
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
                            setValue("bNum", []);

                        });
                } else {
                    alert("삭제실패");
                }
            });
    }

    return (
        <main className="container">
            <h1 className="mt-5 text-center">{boardTypeList[boardType]}</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <table className="table mt-5 table-hover">
                    <thead>
                        <tr className="table-secondary align-middle text-center">
                            <th>게시글번호</th>
                            <th>게시글제목</th>
                            <th>작성자</th>
                            <th>등록일</th>
                            <th>조회수</th>
                        </tr>
                    </thead>
                    <tbody>

                        {boards.length == 0 ? <tr><td colSpan="6" className="text-center p-5">등록된게시물이 없습니다.</td></tr> : ""}
                        {boards.map(board => {
                            return (<BoardList boards={board} searchDto={searchDto} register={register}></BoardList>);
                        })}
                    </tbody>
                </table>
                <div className={"d-flex justify-content-end"}>
                    {isLogin() == true ? <Link to={"/board/" + boardType + "/write/" + searchDto.pageNum} className="btn btn-success">글쓰기</Link> : ""}
                    {isAdmin() ? <input type="submit" value="삭제" className="btn btn-danger" /> : ""}
                </div>

                <nav aria-label="Page navigation">
                    {pagination}
                </nav>
            </form>
        </main >
    );
}


export default BoardListLayout;