import "./ProPage.css";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function AdminProductCreate() {


    const { register, handleSubmit, formState: { errors } } = useForm();
    const [events, setEvents] = useState([]);
    const [procates, setProcates] = useState([]);
    useEffect(() => {
        axios.get("/event/list")
            .then(response => {
                setEvents(response.data);
            })
            .catch(error => console.error("Fetching error:", error));
        axios.get("/procate/list")
            .then(response => {
                setProcates(response.data);
            })
            .catch(error => console.error("Fetching error:", error));
    }, [])
    const [imageList, setImageList] = useState([]);

    const onChangeImageInput = e => {
        setImageList([...imageList, ...e.target.files]);
    };


    const loc = useNavigate();

    function onSubmit(data) {
        if (data.eiNum == null || data.eiNum == "") data.eiNum = [];
        data.eiNum = [...(data.eiNum)];
        const formData = new FormData();
        formData.append('piImgFile', data.piImgFile[0]);
        formData.append('piContentFile', data.piContentFile[0]);
        formData.append("product", new Blob([JSON.stringify(data)], { type: "application/json" }))
        console.log(formData.getAll("product"));
        axios.post("/product/insert", formData, {
            headers: { 'Content-Type': 'multipart/form-data', chatset: 'utf-8' }
        })
            .then(response => {
                if (response.data != 0) {
                    axios.post("/pevent/insert/" + response.data, data.eiNum)
                        .then(result => {
                            if (result.data == 1) {
                                alert("성공");
                                loc("/product/main");
                            } else {
                                alert("실패");
                            }
                        });
                } else {
                    alert("실패");
                }
            })
        console.log(data)
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <table class="admin_board_wrap" id="user-admin">
                    <thead class="admin_boardList">
                        <tr><th>카테고리번호</th><td>
                            <select {...register("pcNum")}>
                                {procates.map((procate) => {
                                    return (
                                        <option
                                            defaultValue={procate.pcNum}
                                            value={procate.pcNum}>
                                            {procate.pcName}
                                        </option>
                                    );
                                })}
                            </select>
                        </td></tr>
                        <tr>상품명
                            <td><input type="text" {...register("piName")} /></td>
                        </tr>
                        <tr>알콜도수
                            <td><input type="text" {...register("piAlcohol")} /></td>
                        </tr>

                        <tr><th>맛</th><td>
                            <select {...register("piSweet")}>
                                <option value='soft'>약한</option>
                                <option value='middle'>중간</option>
                                <option value='hard'>강한</option>
                            </select>
                        </td></tr>
                        <tr><th>탄산</th><td>
                            <select {...register("piCarbonated")}>
                                <option value='soft'>약한</option>
                                <option value='middle'>중간</option>
                                <option value='hard'>강한</option>
                            </select>
                        </td></tr>


                        <tr>가격
                            <td><input type="number" {...register("poPrice")} /></td>
                        </tr>
                        <tr>세일가
                            <td><input type="number" {...register("poSale")} /></td>
                        </tr>
                        <tr>재고
                            <td><input type="text" {...register("poCnt")} /></td>
                        </tr>


                        {events.map((product) => {

                            return (

                                <tr>이벤트
                                    <td>
                                        <input id="eiNum" type="checkbox" value={product.eiNum} {...register("eiNum")} />
                                    </td>
                                </tr>
                            );
                        })}

                        <tr>옵션명
                            <td><input type="text" {...register("poName")} /></td>
                        </tr>

                        <tr>이미지
                            <td><input type="file" {...register("piImgFile", { required: "이미지를 넣어주세요." })} accept="image/jpg,image/png,image/jpeg,image/gif" />
                                {errors.piImgFile && <p>{errors.piImgFile.message}</p>}
                            </td>
                        </tr>
                        <tr>Content
                            <td><input type="file" {...register("piContentFile", { required: "이미지를 넣어주세요." })} accept="image/jpg,image/png,image/jpeg,image/gif" />
                                {errors.piContentFile && <p>{errors.piContentFile.message}</p>}
                            </td>
                        </tr>
                        <tr>
                            <td><input type="submit" value="전송" /></td>
                        </tr>
                    </thead>
                </table>
            </form>
        </div >
    );
}

export default AdminProductCreate;