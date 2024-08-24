import './Admin.css'
import React from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useForm } from "react-hook-form";
import { useState } from 'react';

function AdminEventCreate(params) {

    const { register, handleSubmit, formState: { error } } = useForm();
    const [imageList, setImageList] = useState([]);
    const onChangeImageInput = e => {
        setImageList([...imageList, ...e.target.files]);
    };

    const loc = useNavigate();

    function onSubmit(data) {
        const formData = new FormData();
        formData.append('eiContentFile', data.eiContentFile[0]);
        formData.append("event", new Blob([JSON.stringify(data)], { type: "application/json" }))
        console.log(formData.getAll("event"));
        axios.post("/event/insert", formData, {
            headers: { 'Content-Type': 'multipart/form-data', chatset: 'utf-8' }
        })
            .then(response => {
                if (response.data == 1) {
                    alert("성공");
                    loc("/event/main");
                } else {
                    alert("실패");
                }
            })
        console.log(data)
        console.log(data.eiContentFile)
    }
    

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <table class="admin_board_wrap" id="user-admin">
                    <thead class="admin_boardList">
                        <tr>이벤트명
                            <td><input type="text" name="eiName" {...register("eiName")}></input></td>
                        </tr>
                        <tr>이미지
                            <td><input type="file" name="eiContentFile" {...register("eiContentFile")} accept="image/jpg,image/png,image/jpeg,image/gif" /></td>
                        </tr>
                        <tr>
                            <td><input type="submit" value="전송" /></td>
                        </tr>
                    </thead>

                </table>
            </form>
        </div>
    );
}

export default AdminEventCreate;