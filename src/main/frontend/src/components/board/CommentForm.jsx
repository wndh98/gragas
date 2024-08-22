import axios from "axios";
import { useForm } from "react-hook-form";

function CommentForm(props) {
    let bNum = props.bNum;
    let boardType = props.boardType;
    const commentWriteUrl = `/comment/${boardType}/write`;
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    setValue("userId", "111@111.11");
    setValue("bNum", bNum);
    function onSubmit(data) {
        axios.post(commentWriteUrl, data)
            .then(response => {
                if (response.data == 1) {
                    alert("성공");
                } else {
                    alert("실패");
                }
            })
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input type="hidden" {...register("userId")} value="111@111.11" />
            <input type="hidden" {...register("bNum")} value={bNum} />
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