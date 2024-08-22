import axios from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

function CommentList(props) {
    const bNum = props.bNum;
    const boardType = props.boardType;
    const comment = props.comment;
    console.log(comment);

    return (
        <div>
            <p>{comment.cContent}</p>
        </div>

    );
}

export default CommentList;