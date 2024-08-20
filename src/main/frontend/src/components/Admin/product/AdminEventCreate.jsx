import './Admin.css'
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';



function AdminEventCreate(params) {
    const [eventInput, setEventInput] = useState(
        {
            eiNum: "",
            eiName: ""
            /*         eiContent: "", */
        }
    );
    function handleInputChange(inputId, event) {
        setEventInput((prevState => ({
            ...prevState,
            [inputId]: event.target.value,
        })));
    }
    const loc = useNavigate();
    function handleSubmit(event) {
        event.preventDefault();
        console.log(eventInput);
        axios.post("/event/insert", eventInput)
            .then(response => {
                if (response.data == 1) {
                    alert("성공");
                    loc("/event/main");
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

                        <tr>이벤트명
                            <td><input type="text" name="eiName" onChange={(event) => handleInputChange("eiName", event)}></input></td>
                        </tr>
                        {/* <tr>이미지
                            <td><input type="text" name="eiContent" onChange={(event) => handleInputChange("eiContent", event)}></input></td>
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

export default AdminEventCreate;