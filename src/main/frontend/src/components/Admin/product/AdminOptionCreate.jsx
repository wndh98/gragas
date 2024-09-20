import "./ProPage.css";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useParams } from "react-router-dom";

function AdminOptionCreate() {
    const pathParam = useParams();
    const piNum = pathParam.piNum;
    const { register, handleSubmit, formState: { errors } } = useForm();

    const loc = useNavigate();

    function onSubmit(data) {
        console.log(data)
        axios.post("/option/insert", data)
            .then(response => {
                if (response.data == 1) {
                    alert("성공");
                    loc("/option/main/"+piNum);
                } else {
                    alert("실패");
                }
        })
    }
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <table class="admin_board_wrap" id="user-admin">
                    <input type="hidden" {...register("piNum")} defaultValue={piNum}/>
                    <thead class="admin_boardList">
                        <tr>
                            <td>옵션명</td>
                            <td><input type="text"  {...register("poName")}></input></td>
                        </tr>
                        <tr><td>세일가</td>
                            <td><input type="number"  {...register("poSale")}></input></td>
                        </tr>
                        <tr><td>가격</td>
                            <td><input type="number"  {...register("poPrice")}></input></td>
                        </tr>
                        <tr><td>재고수량</td>
                            <td><input type="number"  {...register("poCnt")}></input></td>
                        </tr>
                        <tr>
                            <td colSpan={2}><input type="submit" value="전송" /></td>
                        </tr>
                    </thead>

                </table>
            </form>
        </div>
    );

}
export default AdminOptionCreate;