import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import Index from "../components/Index";
import Main from "../components/product/Main";
import ProductItem from "../components/product/ProductItem";
import AdminIndex from "../components/admin/AdminIndex";
import AdminLayout from "./AdminLayout";
import AdminProductMain from "../components/admin/product/AdminProductMain";
import AdminProductCreate from "../components/admin/product/AdminProductCreate";
import AdminProductUpdate from "../components/admin/product/AdminProductUpdate";

function Routers() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout><Index /></Layout>} />
                <Route path="/test1" element={<Layout><Index /></Layout>} />
                <Route path="/main" element={<Layout><Main /></Layout>} />
                <Route path="/ProductItem" element={<Layout><ProductItem /></Layout>} />
                <Route path="/admin/*" element={<AdminLayout><AdminIndex /></AdminLayout>} />
                <Route path="/product/create" element={<AdminLayout><AdminProductCreate /></AdminLayout>} />
                <Route path="/product/main" element={<AdminLayout><AdminProductMain /></AdminLayout>} />
                <Route path="/product/update/:piNum" element={<AdminLayout><AdminProductUpdate /></AdminLayout>} />
            </Routes>
        </BrowserRouter>
    );
}

export default Routers;

// https://tthinks.tistory.com/entry/React-%EB%A6%AC%EC%95%A1%ED%8A%B8%EC%97%90%EC%84%9C-%ED%8E%98%EC%9D%B4%EC%A7%80-%EC%9D%B4%EB%8F%99%ED%95%98%EA%B8%B0-Link%EC%99%80-useNavigate
// 라우터 참고