import "./Admin.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";


function AdminProductMain(props) {
    const { register, handleSubmit, formState: { error }, setValue } = useForm();
    const [products, setProducts] = useState([]);
    const listUrl = "/product/list";
    const loc = useNavigate()
    // Axios를 사용하여 Promise기반으로 상품정보를 가져오는 함수
    useEffect(() => {
        axios.get(listUrl)
            .then(response => {
                setProducts(response.data); // 가져온 상품정보를 상태에 저장
            })
            .catch(error => console.error("Fetching error:", error));
    }, [])


    function productDelete(data) {

        let piNum = [...(data.piNum)];

        axios.post('/product/deleteList', piNum)
            .then(response => {
                if (response.data == 1) {
                    alert("성공");
                    loc("/product/main");
                } else {
                    alert("실패");
                }
            })
    }



    //전체삭제^ㅇ^가져가세용가리
    const handleChangeCheck = (event) => {
        const piNumBoxs = document.getElementsByName("piNum");
        let piNums = [];
        if (event.target.checked == true) {
            for (let i = 0; i < piNumBoxs.length; i++) {
                piNumBoxs[i].checked = true;
                piNums.push(piNumBoxs[i].value);
            }
        } else {
            for (let i = 0; i < piNumBoxs.length; i++) {
                piNumBoxs[i].checked = false;
            }
            piNums = [];
        }
        setValue("piNum", piNums);
    };



    return (

        <div>
            <form name="frm">
                <table className="table">

                    <tr className="">
                        <input
                            type="checkbox"
                            /* 전체선택 */
                            onChange={(e) => handleChangeCheck(e)} />

                        <label>전체선택</label>
                        <td>상품번호</td>
                        <td>카테고리</td>
                        <td>상품명</td>
                        <td>알콜도수</td>
                        <td>맛</td>
                        <td>탄산</td>
                        <td>가격</td>
                        <td>세일가</td>
                        <td>재고</td>
                        <td>Content</td>
                        <td>이미지</td>
                    </tr>

                    {products.map((product) => {

                        return (
                            <tr>
                                <td><input type="checkbox" {...register("piNum")} value={product.piNum} /></td>
                                <td><Link to={"/product/update/" + product.piNum}>{product.piNum}</Link></td>

                                <td value={product.pcNum} >{product.pcNum}</td>
                                <td value={product.piName}>{product.piName}</td>
                                <td value={product.piAlcohol}>{product.piAlcohol}</td>
                                <td value={product.piSweet}>{product.piSweet}</td>
                                <td value={product.piCarbonated}>{product.piCarbonated}</td>
                                <td value={product.poPrice}>{product.poPrice}</td>
                                <td value={product.poSale}>{product.poSale}</td>
                                <td value={product.poCnt}>{product.poCnt}</td>
                                <td value={product.piContent}>{product.piContent}</td>
                                <td value={product.piImg}>{product.piImg}</td>
                            </tr>

                        );
                    })}

                    <tr>
                        <td><Link to="/product/create">상품추가</Link></td>
                        <td><button type="button" onClick={handleSubmit(productDelete)}>상품삭제</button></td>

                    </tr>
                </table>
            </form>
        </div>

    );
}

export default AdminProductMain;
