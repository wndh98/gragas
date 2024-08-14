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