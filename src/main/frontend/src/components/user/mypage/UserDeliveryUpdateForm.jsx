import { useParams } from "react-router-dom";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

function UserDeliveryUpdateForm() {
    const pathParam = useParams();
    const [detail, setDetail] = useState({});
    const mdNum = pathParam.mdNum;
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("/user/delivery/update/" + mdNum)
            .then((response) => {
                setDetail((response.data));
                setValue("mdNum", response.data.mdNum);
                setValue("mdName", response.data.mdName);
                setValue("mdTel", response.data.mdTel);
                setValue("mdAddr", response.data.mdAddr);
                setValue("mdAddrDetail", response.data.mdAddrDetail);
                setValue("mdMessage", response.data.mdMessage);
            });
    }, [])

    const {
        register,
        setValue,
        formState: { errors }
    } = useForm();

    function SubmitEvent(event) {
        event.preventDefault();

        const formData = new FormData(event.target);

        const data = {
            mdNum: formData.get('mdNum'),
            mdName: formData.get('mdName'),
            mdTel: formData.get('mdTel'),
            mdAddr: formData.get('mdAddr'),
            mdAddrDetail: formData.get('mdAddrDetail'),
            mdMessage: formData.get('mdMessage')
        };

        axios.post("/user/delivery/updateAction", data)
            .then((result) => {
                if (result.data > 0) {
                    alert("성공");
                    navigate(-1);
                } else {
                    alert("실패");
                }
            })
            .catch((error) => {
                console.error("Error during delivery input:", error);
                alert("서버에 오류가 발생했습니다.");
            });
    }

    function deleteDelivery() {
        axios.get("/user/delivery/delete/" + mdNum)
            .then((response) => {
                if (response.data > 0) {
                    alert("삭제 성공");
                    navigate('/myPage');
                } else {
                    alert("실패");
                }
            });
    }
    return (
        <div className="delivery_input container border border-secondary rounded">
            <div className="delivery_content">
                <form onSubmit={SubmitEvent}>
                    <input type="hidden" name="mdNum" value={mdNum} />
                    <div className="form_title">
                        배송지 내용을 수정해 주세요.
                    </div>
                    <hr />
                    <div className="input-form-box">
                        수령인
                        <input
                            className="form-control"
                            type="text"
                            {...register('mdName', { required: '이름을 입력해주세요.' })}
                        />
                        {errors.mdName && <p>{errors.mdName.message}</p>}
                    </div>
                    <div className="input-form-box">
                        연락처
                        <input
                            className="form-control"
                            type="text"
                            {...register('mdTel', { required: '전화번호를 입력해주세요.' })}
                        />
                        {errors.mdTel && <p>{errors.mdTel.message}</p>}
                    </div>
                    <div className="input-form-box">
                        배송지
                        <input
                            className="form-control form_addr"
                            type="text"
                            {...register('mdAddr', { required: '배송지를 입력해주세요.' })}
                        />
                        {errors.mdAddr && <p>{errors.mdAddr.message}</p>}
                        <input
                            className="form-control"
                            type="text"
                            {...register('mdAddrDetail', { required: '상세주소를 입력해주세요.' })}
                        />
                        {errors.mdAddrDetail && <p>{errors.mdAddrDetail.message}</p>}
                    </div>
                    <div className="input-form-box">
                        배송 메모
                        <input
                            className="form-control"
                            type="text"
                            {...register('mdMessage', { required: '메시지를 입력해주세요.' })}
                        />
                        {errors.mdMessage && <p>{errors.mdMessage.message}</p>}
                    </div>
                    <button className="btn btn-primary col-12" type="submit">저장</button>
                    <button className="btn btn-outline-secondary col-12" type="button" onClick={deleteDelivery}>삭제</button>
                </form>
            </div>
        </div>
    );
}

export default UserDeliveryUpdateForm;