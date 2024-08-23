import "./Admin.css";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
function AdminProductCreate(params) {


    const { register, handleSubmit, formState: { error } } = useForm();
    const [events, setEvents] = useState([]);

    useEffect(() => {

        axios.get("/event/list")
            .then(response => {
                setEvents(response.data);
            })
            .catch(error => console.error("Fetching error:", error));
    }, [])


    /*    const [productInput, setProductInput] = useState(
           {
               piNum: "",
               pcNum: "",
               piName: "",
               piAlcohol: "",
               piSweet: "",
               piCarbonated: "",
               poPrice: "",
               poSale: "",
               piContent: "",
               poName: ""
           }
       );
       const [productOptionInput, setProductOptionInput] = useState(
           {
               poPrice: "",
               poSale: "",
               poCnt: "",
               poName: ""
           }
       );
    */

    const loc = useNavigate();
    function onSubmit(data) {
        axios.post("/product/insert", data)
            .then(response => {
                if (response.data != 0) {
                    axios.post("/pevent/insert/" + response.data, [...(data.eiNum)])
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
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <table class="admin_board_wrap" id="user-admin">
                    <thead class="admin_boardList">

                        <tr>카테고리번호
                            <td><input type="text" {...register("pcNum")} /></td>
                        </tr>
                        <tr>상품명
                            <td><input type="text" {...register("piName")} /></td>
                        </tr>
                        <tr>알콜도수
                            <td><input type="text" {...register("piAlcohol")} /></td>
                        </tr>
                        <tr>맛
                            <td><input type="text" {...register("piSweet")} /></td>
                        </tr>
                        <tr>탄산
                            <td><input type="text" {...register("piCarbonated")} /></td>
                        </tr>
                        <tr>가격
                            <td><input type="text" {...register("poPrice")} /></td>
                        </tr>
                        <tr>세일가
                            <td><input type="text" {...register("poSale")} /></td>
                        </tr>
                        <tr>재고
                            <td><input type="text" {...register("poCnt")} /></td>
                        </tr>
                        <tr>상황별
                            <td><input type="text" {...register("piContent")} /></td>
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

                        {/* <tr>이미지
                                    <td><input type="file" name="piPhoto"></input></td>
                                    </tr> */}
                        <tr>
                            <td><input type="submit" value="전송" /></td>
                        </tr>
                    </thead>
                </table>
            </form>
        </div>
    );
}

export default AdminProductCreate;