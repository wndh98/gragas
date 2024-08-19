import './Admin.css'
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';



function AdminProductCreate(params) {
    const [productInput, setProductInput] = useState(
        {
            piNum: "",
            pcNum: "",
            piName: "",
            piAlcohol: "",
            piSweet: "",
            piCarbonated: "",
            piPrice: 0,
            piContent: ""
        }
    );
    function handleInputChange(inputId, event) {
        setProductInput((prevState => ({
            ...prevState,
            [inputId]: event.target.value,
        })));
    }
    const loc = useNavigate();
    function handleSubmit(event) {
        event.preventDefault();
        console.log(productInput);
        axios.post("/product/insert", productInput)
            .then(response => {
                if (response.data == 1) {
                    alert("성공");
                    loc("/main");
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

                        <tr>카테고리번호
                            <td><input type="text" name="pcNum" onChange={(event) => handleInputChange("pcNum", event)}></input></td>
                        </tr>
                        <tr>상품명
                            <td><input type="text" name="piName" onChange={(event) => handleInputChange("piName", event)}></input></td>
                        </tr>
                        <tr>알콜도수
                            <td><input type="text" name="piAlcohol" onChange={(event) => handleInputChange("piAlcohol", event)}></input></td>
                        </tr>
                        <tr>맛
                            <td><input type="selected" name="piSweet" onChange={(event) => handleInputChange("piSweet", event)}></input></td>
                        </tr>
                        <tr>탄산
                            <td><input type="text" name="piCarbonated" onChange={(event) => handleInputChange("piCarbonated", event)}></input></td>
                        </tr>
                        <tr>가격
                            <td><input type="text" name="piPrice" onChange={(event) => handleInputChange("piPrice", event)}></input></td>
                        </tr>
                        <tr>상황별
                            <td><input type="text" name="piContent" onChange={(event) => handleInputChange("piContent", event)}></input></td>
                        </tr>
                        <tr>이벤트
                            <td><input type="text" name="eiNum" onChange={(event) => handleInputChange("eiNum", event)}></input></td>
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