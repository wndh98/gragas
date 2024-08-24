import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getUser } from "../../js/userInfo";

function CommentForm(props) {
    let bNum = props.bNum;
    let boardType = props.boardType;
    const pageNum = props.pageNum;
    const setPageNum = props.setPageNum;
    const commentList = props.commentList;
    const setCommentList = props.setCommentList;
    const searchDto = props.searchDto
    const setSearchDto = props.setSearchDto;
    const mode = props.mode;
    const cNum = props.cNum;
    const isForm = props.isForm;
    const setIsForm = props.setIsForm;
    const commentListUrl = props.commentListUrl;
    const setCommentForm = props.setCommentForm;
    const [user, setUser] = useState({});

    const { register, handleSubmit, formState: { errors }, setValue } = useForm();

    const [comment, setComment] = useState({});
    let commentSubmitUrl;
    if (mode == "write") { commentSubmitUrl = `/comment/${boardType}/write`; }
    else if (mode == "update") { commentSubmitUrl = `/comment/${boardType}/update/${cNum}`; }

    useEffect(() => {
        if (mode == "update") {
            const getCommentUrl = `/comment/${boardType}/select/${cNum}`;
            axios.get(getCommentUrl)
                .then(response => {
                    setComment(response.data);
                });
        }
        getUser(setUser);
        setValue("bNum", bNum);
    }, []);
    useEffect(() => {
        setValue("cNum", comment.cNum);
        setValue("cContent", comment.cContent);
    }, [comment]);
    useEffect(() => {
        setValue("userId", user.userId);
    }, [user]);
    function onSubmit(data) {
        axios.post(commentSubmitUrl, data)
            .then(response => {
                if (response.data == 1) {
                    setValue("cContent", "")
                    axios.get(commentListUrl)
                        .then(result => {
                            setCommentList([...(result.data.commentList)]);
                            setSearchDto(result.data.searchDto);
                            setPageNum(result.data.searchDto.pageNum);
                            if (mode == "update") {
                                setCommentForm();
                            }
                        })
                } else {
                    alert("실패");
                }
            })
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input type="hidden" {...register("cNum")} />
            <input type="hidden" {...register("userId")} />
            <input type="hidden" {...register("bNum")} />
            <table className="table table-secondry">
                <tobdy>
                    <tr>
                        <td><textarea class="form-control" {...register("cContent")}></textarea></td>
                        <td><input type="submit" value="댓글" /></td>
                    </tr>
                </tobdy>
            </table>
        </form>

    );
}

export default CommentForm;