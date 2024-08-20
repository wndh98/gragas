import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Layout";


import AdminIndex from "../components/Admin/AdminIndex";
import Index from "../components/Index"
import AdminLayout from "./AdminLayout";


import LoginForm from "../components/user/LoginForm";
import JoinForm from "../components/user/JoinForm";
import MyPage from "../components/user/MyPage";
import SerchIdForm from "../components/user/SerchIdForm";


import Main from "../components/product/Main";
import ProductItem from "../components/product/ProductItem";
import ProductEvent from "../components/product/ProductEvent";
import AdminProductMain from "../components/admin/product/AdminProductMain";
import AdminProductCreate from "../components/admin/product/AdminProductCreate";
import AdminProductUpdate from "../components/admin/product/AdminProductUpdate";


import SubscribeMain from "../components/subscribe/SubscribeMain";
import ItemList from "../components/subscribe/ItemList";
import SubsDescription from "../components/subscribe/SubsDescription";


import BoardListLayout from "../components/board/BoardListLayout";
import BoardForm from "../components/board/BoardForm";
import BoardView from "../components/board/BoardView";

function Routers() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout><Index /></Layout>} />
                <Route path="/admin/*" element={<AdminLayout><AdminIndex /></AdminLayout>} />
            </Routes>
            <Routes>
                <Route path="/subscribe" element={<Layout><SubscribeMain/></Layout>}/>
                <Route path="/subscribe/itemList" element={<Layout><ItemList/></Layout>}/>
                <Route path="/subscribe/description/:siNum" element={<Layout><SubsDescription/></Layout>}/>
            </Routes>
            <Routes>
                <Route path="/loginForm" element={<Layout><LoginForm/></Layout>}/>
                <Route path="/login/serchIdForm" element={<Layout><SerchIdForm/></Layout>}/>
                <Route path="/myPage" element={<Layout><MyPage/></Layout>}/>
                <Route path="/user/joinForm" element={<Layout><JoinForm/></Layout>}/>
            </Routes>

            <Routes>
                <Route path="/main" element={<Layout><Main /></Layout>} />
                <Route path="/ProductItem" element={<Layout><ProductItem /></Layout>} />
                <Route path="/ProductEvent" element={<Layout><ProductEvent /></Layout>} />
                <Route path="/ProductEventItem" element={<Layout><ProductEventItem /></Layout>} />
                <Route path="/product/create" element={<AdminLayout><AdminProductCreate /></AdminLayout>} />
                <Route path="/product/main" element={<AdminLayout><AdminProductMain /></AdminLayout>} />
                <Route path="/product/update/:piNum" element={<AdminLayout><AdminProductUpdate /></AdminLayout>} />
                <Route path="/procate/main" element={<AdminLayout><AdminProcateMain /></AdminLayout>} />
                <Route path="/procate/create" element={<AdminLayout><AdminProcateCreate /></AdminLayout>} />
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