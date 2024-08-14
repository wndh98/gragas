import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import AdminIndex from "../components/Admin/AdminIndex";
import Index from "../components/Index"
import AdminLayout from "./AdminLayout";
import Login from "../components/user/Login";
import JoinForm from "../components/user/JoinForm";
function Routers(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout><Index/></Layout>}/>
                <Route path="/login/*" element={<Layout><Login/></Layout>}/>
                <Route path="/user/joinForm" element={<Layout><JoinForm/></Layout>}/>
                <Route path="/admin/*" element={<AdminLayout><AdminIndex/></AdminLayout>}/>

            </Routes>
        </BrowserRouter>
    );
}

export default Routers;

// https://tthinks.tistory.com/entry/React-%EB%A6%AC%EC%95%A1%ED%8A%B8%EC%97%90%EC%84%9C-%ED%8E%98%EC%9D%B4%EC%A7%80-%EC%9D%B4%EB%8F%99%ED%95%98%EA%B8%B0-Link%EC%99%80-useNavigate
// 라우터 참고