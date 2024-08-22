import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import CommentList from "./CommentList";

function CommentListLayout(props) {
    const bNum = props.bNum;
    const boardType = props.boardType;
    const [pageNum, setPageNum] = useState(1);
    const commentListUrl = `/comment/${boardType}/list/${pageNum}`;
    const [commentList, setCommentList] = useState([]);
    const [searchDto, setSearchDto] = useState({});
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

                return (<CommentList comment={comment} bNum={bNum} boardType={boardType}></CommentList>);
            })}
        </div>

    );
}

export default CommentListLayout;