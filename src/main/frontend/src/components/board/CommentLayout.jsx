import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import CommentList from "./CommentList";
import CommentForm from "./CommentForm";
import CommentListLayout from "./CommentListLayout";
import { isLogin } from "../../js/userInfo";

function CommentLayout(props) {
    const bNum = props.bNum;
    const boardType = props.boardType;
    const [pageNum, setPageNum] = useState(1);
    const [commentList, setCommentList] = useState([]);
    const [searchDto, setSearchDto] = useState({});
    const commentListUrl = `/comment/${boardType}/list/${pageNum}/${bNum}`;
    return (
        <div className="p-5">
            <CommentListLayout
                bNum={bNum}
                boardType={boardType}
                pageNum={pageNum}
                setPageNum={setPageNum}
                commentList={commentList}
                setCommentList={setCommentList}
                searchDto={searchDto}
                setSearchDto={setSearchDto}
                commentListUrl={commentListUrl}
            />
            {
                isLogin() ? <CommentForm
                    bNum={bNum}
                    boardType={boardType}
                    pageNum={pageNum}
                    setPageNum={setPageNum}
                    commentList={commentList}
                    setCommentList={setCommentList}
                    searchDto={searchDto}
                    setSearchDto={setSearchDto}
                    commentListUrl={commentListUrl}
                    mode={"write"} /> : ""
            }


        </div>

    );
}

export default CommentLayout;