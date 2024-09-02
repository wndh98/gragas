import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import CommentList from "./CommentList";

function CommentListLayout(props) {
    const bNum = props.bNum;
    const boardType = props.boardType;
    const pageNum = props.pageNum;
    const setPageNum = props.setPageNum;
    const commentList = props.commentList;
    const setCommentList = props.setCommentList;
    const searchDto = props.searchDto
    const setSearchDto = props.setSearchDto;
    const commentListUrl = props.commentListUrl;
    useEffect(() => {
        axios.get(commentListUrl)
            .then(response => {
                setCommentList([...(response.data.commentList)]);
                setSearchDto(response.data.searchDto);
                setPageNum(response.data.searchDto.pageNum);
            })
    }, []);

    return (
        <div>
            {commentList.map(comment => {
                return (
                    <CommentList
                        comment={comment}
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
                );
            })}
        </div>

    );
}

export default CommentListLayout;