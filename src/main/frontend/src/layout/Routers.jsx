import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Layout";


import AdminIndex from "../components/admin/AdminIndex";
import Index from "../components/Index"
import AdminLayout from "./AdminLayout";


// import AdminUserListLayout from "../components/admin/user/AdminUserListLayout";
import LoginForm from "../components/user/LoginForm";
import JoinForm from "../components/user/JoinForm";
import MyPage from "../components/user/MyPage";
// import UserInfo from "../components/user/UserInfo";
// import UserInfoUpdate from "../components/user/UserInfoUpdate";
import SerchIdForm from "../components/user/SerchIdForm";


import Main from "../components/product/Main";
import ProductItem from "../components/product/ProductItem";
import ProductEvent from "../components/product/ProductEvent";
import AdminProductMain from "../components/admin/product/AdminProductMain";
import AdminProductCreate from "../components/admin/product/AdminProductCreate";
import AdminProductUpdate from "../components/admin/product/AdminProductUpdate";
import AdminEventMain from "../components/admin/product/AdminEventMain";
import AdminEventCreate from "../components/admin/product/AdminEventCreate";
import AdminEventUpdate from "../components/admin/product/AdminEventUpdate";
import AdminOptionMain from "../components/admin/product/AdminOptionMain";
import AdminOptionCreate from "../components/admin/product/AdminOptionCreate";
import AdminOptionUpdate from "../components/admin/product/AdminOptionUpdate";
import ProductEventItem from "../components/product/ProductEventItem";
import AdminProcateMain from "../components/admin/product/AdminProcateMain";
import AdminProcateCreate from "../components/admin/product/AdminProcateCreate";
import AdminProcatetUpdate from "../components/admin/product/AdminProcateUpdate";


import AdminSubscribeItemMain from "../components/admin/subscribe/AdminSubscribeItemMain";
import AdminSubscribeCreate from "../components/admin/subscribe/AdminSubscribeCreate";
import AdminSubscribeUpdate from "../components/admin/subscribe/AdminSubscribeUpdate";
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
                <Route path="/admin" element={<AdminLayout><AdminIndex /></AdminLayout>} />
                {/* <Route path="/admin/user/list/:pageNum" element={<AdminLayout><AdminUserListLayout /></AdminLayout>} /> */}
            </Routes>
            <Routes>
                <Route path="/subscribe" element={<Layout><SubscribeMain/></Layout>}/>
                <Route path="/subscribe/adminSubscribeList" element={<Layout><AdminSubscribeItemMain/></Layout>}/>
                <Route path="/subscribe/subsribeCreate" element={<Layout><AdminSubscribeCreate/></Layout>}/>
                <Route path="/subscribe/updateSubscribe/:siNum" element={<Layout><AdminSubscribeUpdate/></Layout>}/>
                <Route path="/subscribe/itemList" element={<Layout><ItemList/></Layout>}/>
                <Route path="/subscribe/description/:siNum" element={<Layout><SubsDescription/></Layout>}/>
            </Routes>
            <Routes>
                <Route path="/loginForm" element={<Layout><LoginForm/></Layout>}/>
                <Route path="/login/serchIdForm" element={<Layout><SerchIdForm/></Layout>}/>
                <Route path="/myPage" element={<Layout><MyPage/></Layout>}/>
                {/* <Route path="/myPage/userInfo" element={<Layout><UserInfo/></Layout>}/> */}
                {/* <Route path="/myPage/userInfo/update" element={<Layout><UserInfoUpdate/></Layout>}/> */}
                <Route path="/user/joinForm" element={<Layout><JoinForm/></Layout>}/>
            </Routes>

            <Routes>
                <Route path="/main" element={<Layout><Main /></Layout>} />
                <Route path="/ProductItem/:piNum" element={<Layout><ProductItem /></Layout>} />
                <Route path="/ProductEvent" element={<Layout><ProductEvent /></Layout>} />
                <Route path="/ProductEventItem" element={<Layout><ProductEventItem /></Layout>} />
                <Route path="/product/create" element={<AdminLayout><AdminProductCreate /></AdminLayout>} />
                <Route path="/product/main" element={<AdminLayout><AdminProductMain /></AdminLayout>} />
                <Route path="/product/update/:piNum" element={<AdminLayout><AdminProductUpdate /></AdminLayout>} />
                <Route path="/procate/main" element={<AdminLayout><AdminProcateMain /></AdminLayout>} />
                <Route path="/procate/create" element={<AdminLayout><AdminProcateCreate /></AdminLayout>} />
                <Route path="/procate/update/:pcNum" element={<AdminLayout><AdminProcatetUpdate /></AdminLayout>} />
                <Route path="/event/main" element={<AdminLayout><AdminEventMain /></AdminLayout>} />
                <Route path="/event/create" element={<AdminLayout><AdminEventCreate /></AdminLayout>} />
                <Route path="/event/update/:eiNum" element={<AdminLayout><AdminEventUpdate /></AdminLayout>} />
                <Route path="/option/main" element={<AdminLayout><AdminOptionMain /></AdminLayout>} />
                <Route path="/option/create" element={<AdminLayout><AdminOptionCreate /></AdminLayout>} />
                <Route path="/option/update/:poNum" element={<AdminLayout><AdminOptionUpdate /></AdminLayout>} />
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