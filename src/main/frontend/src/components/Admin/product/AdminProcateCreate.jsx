import './Admin.css'
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';



function AdminProcateCreate(params) {
    const [procateInput, setProcateInput] = useState(
        {
            pcNum: "",
            pcName: ""
            /*         pcImg: "", */
        }
    );
    function handleInputChange(inputId, event) {
        setProcateInput((prevState => ({
            ...prevState,
            [inputId]: event.target.value,
        })));
    }
    const loc = useNavigate();
    function handleSubmit(event) {
        event.preventDefault();
        console.log(procateInput);
        axios.post("/procate/insert", procateInput)
            .then(response => {
                if (response.data == 1) {
                    alert("성공");
                    loc("/procate/main");
                } else {
                    alert("실패");
                }
            })
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <table class="admin_board_wrap" id="user-admin">
                    <thead class="admin_boardList">

                        <tr>카테고리 이름
                            <td><input type="text" name="pcName" onChange={(event) => handleInputChange("pcName", event)}></input></td>
                        </tr>
                        {/* <tr>이미지
                            <td><input type="text" name="pcImg" onChange={(event) => handleInputChange("pcImg", event)}></input></td>
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

export default AdminProcateCreate;