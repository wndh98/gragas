import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import Index from "../components/Index";
import Main from "../components/product/Main";
import ProductItem from "../components/product/ProductItem";
import ProductEvent from "../components/product/ProductEvent";
import ProductEventItem from "../components/product/ProductEventItem";
import AdminIndex from "../components/admin/AdminIndex";
import AdminLayout from "./AdminLayout";

import AdminProductMain from "../components/admin/product/AdminProductMain";
import AdminProductCreate from "../components/admin/product/AdminProductCreate";
import AdminProductUpdate from "../components/admin/product/AdminProductUpdate";
import AdminProcateMain from "../components/admin/product/AdminProcateMain";
import AdminProcateCreate from "../components/admin/product/AdminProcateCreate";
import AdminProcatetUpdate from "../components/admin/product/AdminProcateUpdate";
import AdminEventMain from "../components/admin/product/AdminEventMain";
import AdminEventCreate from "../components/admin/product/AdminEventCreate";
import AdminEventUpdate from "../components/admin/product/AdminEventUpdate";

import BoardListLayout from "../components/board/BoardListLayout";
import BoardForm from "../components/board/BoardForm";
import BoardView from "../components/board/BoardView";

function Routers() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout><Index /></Layout>} />
                <Route path="/test1" element={<Layout><Index /></Layout>} />
                <Route path="/main" element={<Layout><Main /></Layout>} />
                <Route path="/ProductItem/:piNum" element={<Layout><ProductItem /></Layout>} />

                <Route path="/ProductEvent" element={<Layout><ProductEvent /></Layout>} />
                <Route path="/ProductEventItem" element={<Layout><ProductEventItem /></Layout>} />
                <Route path="/admin/*" element={<AdminLayout><AdminIndex /></AdminLayout>} />
                <Route path="/product/create" element={<AdminLayout><AdminProductCreate /></AdminLayout>} />
                <Route path="/product/main" element={<AdminLayout><AdminProductMain /></AdminLayout>} />
                <Route path="/product/update/:piNum" element={<AdminLayout><AdminProductUpdate /></AdminLayout>} />
                <Route path="/procate/main" element={<AdminLayout><AdminProcateMain /></AdminLayout>} />
                <Route path="/procate/create" element={<AdminLayout><AdminProcateCreate /></AdminLayout>} />
                <Route path="/procate/update/:pcNum" element={<AdminLayout><AdminProcatetUpdate /></AdminLayout>} />
                <Route path="/event/main" element={<AdminLayout><AdminEventMain /></AdminLayout>} />
                <Route path="/event/create" element={<AdminLayout><AdminEventCreate /></AdminLayout>} />
                <Route path="/event/update/:eiNum" element={<AdminLayout><AdminEventUpdate /></AdminLayout>} />
            </Routes>
            <Routes>
                <Route path="/board/:boardType/list/:pageNum" element={<Layout><BoardListLayout /></Layout>} />
                <Route path="/board/:boardType/:mode/:pageNum" element={<Layout><BoardForm /></Layout>} />
                <Route path="/board/:boardType/:mode/:pageNum/:bNum" element={<Layout><BoardForm /></Layout>} />
                <Route path="/board/:boardType/view/:pageNum/:bNum" element={<Layout><BoardView /></Layout>} />
                {/* <Route path="/board/:boardType/update/:pageNum/:pNum" element={<Layout><BoardUpdateForm /></Layout>} /> */}
            </Routes>
        </BrowserRouter>
    );
}

export default Routers;

// https://tthinks.tistory.com/entry/React-%EB%A6%AC%EC%95%A1%ED%8A%B8%EC%97%90%EC%84%9C-%ED%8E%98%EC%9D%B4%EC%A7%80-%EC%9D%B4%EB%8F%99%ED%95%98%EA%B8%B0-Link%EC%99%80-useNavigate
// 라우터 참고