import "./Admin.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

function AdminProductMain() {
    const { register, handleSubmit, formState: { error } } = useForm();
    const [products, setProducts] = useState([]);
    const listUrl = "/product/list";

    // Axios를 사용하여 Promise기반으로 상품정보를 가져오는 함수

    axios.get(listUrl)
        .then(response => {
            setProducts(response.data); // 가져온 상품정보를 상태에 저장
        })
        .catch(error => console.error("Fetching error:", error));

    function productDelete(data) {

        let piNum = [...(data.piNum)];

        axios.post('/product/deleteList', piNum)
            .then(response => {
                if (response.data == 1) {
                    alert("성공");
                } else {
                    alert("실패");
                }
            })
    }

    // 컴포넌트 마운트시 상품정보 가져오기 함수호출


    // axios
    //     .get("/product/list")
    //     .then(function (response) { })
    //     .catch(function (error) { })
    //     .then(function () { });
    return (

        <div>
            <form name="frm">
                <table className="table">

                    <tr className="">
                        <input type="checkbox"></input>
                        <label>전체선택</label>
                        <td>상품번호</td>
                        <td>카테고리</td>
                        <td>상품명</td>
                        <td>알콜도수</td>
                        <td>맛</td>
                        <td>탄산</td>
                        <td>종류</td>
                    </tr>
                    {products.map((product) => {

                        return (
                            <tr>
                                <td><input type="checkbox" {...register("piNum")} value={product.piNum} /></td>
                                <td><Link to={"/product/update/" + product.piNum}>{product.piNum}</Link></td>
                                <td>{product.pcNum}</td>
                                <td>{product.pcNum}</td>
                                <td>{product.piName}</td>
                                <td>{product.piAlcohol}</td>
                                <td>{product.piSweet}</td>
                                <td>{product.piCarbonated}</td>
                                <td>{product.piContent}</td>
                            </tr>

                        );
                    })}
                    <tr>
                        <td><Link to="/create">상품추가</Link></td>
                        <td><button type="button" onClick={handleSubmit(productDelete)}>상품삭제</button></td>

                    </tr>
                </table>
            </form>
        </div>

    );
}

export default AdminProductMain;
