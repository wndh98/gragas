import axios from "axios"

function setOcId(){
    axios.get("/orderCart/getOcId").then(response=>{
        window.localStorage.setItem("ocId",response.data);
    });
}
function getOcId(){
    return window.localStorage.getItem("ocId");
}
function isOcId(){
    return !!window.localStorage.getItem("ocId");
}
function saveCart(orderCart){
    axios.post("/orderCart/saveCart",orderCart).then(response=>{
        if(response.data==1){
            alert("성공")
        }else{
            alert("실패")
        }
    })
}

export {setOcId,getOcId,isOcId,saveCart};