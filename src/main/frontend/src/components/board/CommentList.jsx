import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import CommentForm from "./CommentForm";

function CommentList(props) {

    const bNum = props.bNum;
    const boardType = props.boardType;
    const pageNum = props.pageNum;
    const setPageNum = props.setPageNum;
    const commentList = props.commentList;
    const setCommentList = props.setCommentList;
    const searchDto = props.searchDto
    const setSearchDto = props.setSearchDto;
    const commentListUrl = props.commentListUrl;
    const comment = props.comment;

    const [commentContent, setCommentContent] = useState(<p>{comment.cContent}</p>);
    function commentDelete(cNum) {
        const deleteUrl = `/comment/${boardType}/delete/${cNum}`;
        axios.get(deleteUrl)
            .then(response => {
                if (response.data == 1) {
                    axios.get(commentListUrl)
                        .then(result => {
                            setCommentList([...(result.data.commentList)]);
                            setSearchDto(result.data.searchDto);
                            setPageNum(result.data.searchDto.pageNum);
                        })
                } else {
                    alert("실패");
                }
            });
    }
    const [isForm, setIsForm] = useState(false);
    const [updateCNum, setUpdateCNum] = useState();
    function commentUpdate(cNum) {
        setUpdateCNum(cNum);
        setIsForm(!isForm);
    }
    useEffect(() => {
        if (isForm) {
            setCommentContent(
                <CommentForm
                    bNum={bNum}
                    boardType={boardType}
                    pageNum={pageNum}
                    setPageNum={setPageNum}
                    commentList={commentList}
                    setCommentList={setCommentList}
                    searchDto={searchDto}
                    setSearchDto={setSearchDto}
                    commentListUrl={commentListUrl}
                    mode={"update"}
                    cNum={updateCNum}
                    isForm={isForm}
                    setIsForm={setIsForm}
                />);
        } else {
            setCommentContent(<p>{comment.cContent}</p>);
        }
    }, [isForm])

    return (
        <div>

            {commentContent}
            <button class="btn btn-danger" onClick={() => { commentDelete(comment.cNum) }}>삭제</button>
            <button class="btn btn-primary" onClick={() => { commentUpdate(comment.cNum) }}>수정</button>


        </div>

    );
}

export default CommentList;