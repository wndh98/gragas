import "./ProPage.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';



function AdminOptionCreate(params) {
    const [optionInput, setOptionInput] = useState(
        {
            poNum: "",
            piNum: "",
            poName: "",
            poCnt: ""
        }
    );
    function handleInputChange(inputId, event) {
        setOptionInput((prevState => ({
            ...prevState,
            [inputId]: event.target.value,
        })));
    }
    const loc = useNavigate();
    function handleSubmit(event) {
        event.preventDefault();
        console.log(optionInput);
        axios.post("/option/insert", optionInput)
            .then(response => {
                if (response.data == 1) {
                    alert("성공");
                    loc("/option/main");
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

                        <tr>옵션명
                            <td><input type="text" name="poName" onChange={(event) => handleInputChange("poName", event)}></input></td>
                        </tr>
                        <tr>상품번호
                            <td><input type="text" name="piNum" onChange={(event) => handleInputChange("piNum", event)}></input></td>
                        </tr>
                        <tr>재고수량
                            <td><input type="text" name="poCnt" onChange={(event) => handleInputChange("poCnt", event)}></input></td>
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

export default AdminOptionCreate;