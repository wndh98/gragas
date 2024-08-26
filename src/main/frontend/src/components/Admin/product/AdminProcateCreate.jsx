import './Admin.css'
import React from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useForm } from "react-hook-form";
import { useState } from 'react';


function AdminProcateCreate(params) {
    const { register, handleSubmit, formState: { error } } = useForm();
    const [imageList, setImageList] = useState([]);
    const onChangeImageInput = e => {
        setImageList([...imageList, ...e.target.files]);
    };

    const loc = useNavigate();

    function onSubmit(data) {
        const formData = new FormData();
        formData.append('pcImgFile', data.pcImgFile[0]);
        formData.append("procate", new Blob([JSON.stringify(data)], { type: "application/json" }))
        console.log(formData.getAll("procate"));
        axios.post("/procate/insert", formData, {
            headers: { 'Content-Type': 'multipart/form-data', chatset: 'utf-8' }
        })
            .then(response => {
                if (response.data == 1) {
                    alert("성공");
                    loc("/procate/main");
                } else {
                    alert("실패");
                }
            })
        console.log(data)
        console.log(data.pcImgFile)
    }


    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <table class="admin_board_wrap" id="user-admin">
                    <thead class="admin_boardList">

                        <tr>카테고리 이름
                            <td><input type="text" name="pcName" {...register("pcName")}></input></td>
                        </tr>

                        <tr>이미지
                            <td><input type="file" name="pcImgFile" {...register("pcImgFile")} accept="image/jpg,image/png,image/jpeg,image/gif" /></td>
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
export default AdminProcateCreate;