import "./ProPage.css";
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
        <main className="container">
            <form onSubmit={handleSubmit(onSubmit)}>
                <table class="admin_board_wrap table mt-5" id="user-admin">
                    <tbody class="admin_boardList">
                        <tr>
                            <td className="table-secondary text-center align-middle">이벤트명</td>
                            <td><input type="text" name="eiName" {...register("eiName")} className="form-control w-50"></input></td>
                        </tr>
                        <tr>
                            <td className="table-secondary text-center align-middle">이미지</td>
                            <td><input type="file" name="eiContentFile" {...register("eiContentFile")} accept="image/jpg,image/png,image/jpeg,image/gif" className="form-control w-50" /></td>
                        </tr>

                    </tbody>

                </table>
                <div className="d-flex justify-content-center">
                    <input type="submit" value="전송" className="btn btn-success" />
                </div>
            </form>
        </main>
    );
}

export default AdminEventCreate;