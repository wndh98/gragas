import { BrowserRouter, Route, Routes } from "react-router-dom";
import { isOcId, setOcId } from "../js/orderCart/cart";

import Layout from "./Layout";
import AuthRoute from "./AuthRoute";

import AdminIndex from "../components/admin/AdminIndex";
import Index from "../components/Index"
import AdminLayout from "./AdminLayout";


import AdminUserListLayout from "../components/admin/user/AdminUserListLayout";
import LoginForm from "../components/user/login/LoginForm";
import JoinForm from "../components/user/login/JoinForm";
import MyPage from "../components/user/mypage/MyPage";
import UserInfo from "../components/user/mypage/UserInfo";
import UserInfoUpdate from "../components/user/mypage/UserInfoUpdate";
import SearchIdForm from "../components/user/login/SearchIdForm";
import UserDeliveryInput from "../components/user/mypage/UserDeliveryInput";
import UserDeliveryUpdateForm from "../components/user/mypage/UserDeliveryUpdateForm";
import Membership from "../components/user/Membership";
import SearchPwForm from "../components/user/login/SearchPwForm";

import TotalItemList from "../components/product/TotalItemList";
import MainList from "../components/product/MainList";
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
import EventMain from "../components/product/EventMain";
import AdminProcateMain from "../components/admin/product/AdminProcateMain";
import AdminProcateCreate from "../components/admin/product/AdminProcateCreate";
import AdminProcatetUpdate from "../components/admin/product/AdminProcateUpdate";
import CateMain from "../components/product/CateMain";


import AdminSubscribeItemMain from "../components/admin/subscribe/AdminSubscribeItemMain";
import AdminSubscribeCreate from "../components/admin/subscribe/AdminSubscribeCreate";
import AdminSubscribeUpdate from "../components/admin/subscribe/AdminSubscribeUpdate";
import SubscribeMain from "../components/subscribe/SubscribeMain";
import ItemList from "../components/subscribe/ItemList";
import SubsDescription from "../components/subscribe/SubsDescription";
import SubsOrder from "../components/subscribe/SubsOrder";
import SubsPayForm from "../components/subscribe/SubsPayForm";
import SubsPayMent from "../components/subscribe/SubsPayMent";
import SubsSuccess from "../components/subscribe/SubsSuccess";


import BoardListLayout from "../components/board/BoardListLayout";
import BoardForm from "../components/board/BoardForm";
import BoardView from "../components/board/BoardView";


import CartLayout from "../components/cart/CartLayout";
import OrderFormLayout from "../components/order/OrderFormLayout";
import OrderSuccess from "../components/order/OrderSuccess";

import Toss from "../components/Toss";


function Routers() {
    if (!isOcId()) setOcId();
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout><MainList /></Layout>} />
                <Route path="/toss" element={<Layout><Toss /></Layout>} />
                <Route path="/admin" element={<AdminLayout><AdminIndex /></AdminLayout>} />
                <Route path="/test" element={<AuthRoute to="/loginForm"><AdminLayout><AdminIndex /></AdminLayout></AuthRoute>} />
                <Route path="/admin/user/list/:pageNum" element={<AdminLayout><AdminUserListLayout /></AdminLayout>} />

            </Routes>
            <Routes>
                <Route path="/subscribe" element={<Layout><SubscribeMain /></Layout>} />
                <Route path="/subscribe/adminSubscribeList" element={<AuthRoute to="/loginForm"><AdminLayout><AdminSubscribeItemMain /></AdminLayout></AuthRoute>} />
                <Route path="/subscribe/subsribeCreate" element={<Layout><AdminSubscribeCreate /></Layout>} />
                <Route path="/subscribe/updateSubscribe/:siNum" element={<Layout><AdminSubscribeUpdate /></Layout>} />
                <Route path="/subscribe/itemList" element={<Layout><ItemList /></Layout>} />
                <Route path="/subscribe/description/:siNum" element={<Layout><SubsDescription /></Layout>} />
                <Route path="/subscribe/subsOrder/:siNum" element={<Layout><SubsOrder /></Layout>} />
                <Route path="/subscribe/subsPayForm/:siNum" element={<AuthRoute to="/loginForm"><Layout><SubsPayForm /></Layout></AuthRoute>} />
                <Route path="/subscribe/SubsPayMent" element={<AuthRoute to="/loginForm"><Layout><SubsPayMent /></Layout></AuthRoute>} />
                <Route path="/subscribe/success" element={<AuthRoute to="/loginForm"><Layout><SubsSuccess /></Layout></AuthRoute>} />
            </Routes>
            <Routes>
                <Route path="/loginForm" element={<Layout><LoginForm /></Layout>} />
                <Route path="/login/searchIdForm" element={<Layout><SearchIdForm /></Layout>} />
                <Route path="/login/SearchPwForm" element={<Layout><SearchPwForm /></Layout>} />
                <Route path="/myPage" element={<Layout><MyPage /></Layout>} />
                <Route path="/myPage/userInfo" element={<Layout><UserInfo /></Layout>} />
                <Route path="/myPage/userInfo/update" element={<Layout><UserInfoUpdate /></Layout>} />
                <Route path="/user/joinForm" element={<Layout><JoinForm /></Layout>} />
                <Route path="/mypage/userAddr/input" element={<Layout><UserDeliveryInput /></Layout>} />
                <Route path="/mypage/delivery/update/:mdNum" element={<Layout><UserDeliveryUpdateForm /></Layout>} />
                <Route path="/mypage/:content" element={<Layout><MyPage /></Layout>} />
                <Route path="/membership" element={<Layout><Membership /></Layout>} />

            </Routes>
            <Routes>
                <Route path="/main" element={<Layout><MainList /></Layout>} />
                <Route path="/total" element={<Layout><TotalItemList /></Layout>} />
                <Route path="/main/CateMain/:pcNum" element={<Layout><CateMain /></Layout>} />
                <Route path="/productItem/:piNum" element={<Layout><ProductItem /></Layout>} />
                <Route path="/productEvent" element={<Layout><ProductEvent /></Layout>} />
                <Route path="/productEventMain/:eiNum" element={<Layout><EventMain /></Layout>} />
                <Route path="/productEventItem/:eiNum/:piNum" element={<Layout><ProductEventItem /></Layout>} />
                <Route path="/product/create" element={<AdminLayout><AdminProductCreate /></AdminLayout>} />
                <Route path="/product/main" element={<AdminLayout><AdminProductMain /></AdminLayout>} />
                <Route path="/product/update/:piNum" element={<AdminLayout><AdminProductUpdate /></AdminLayout>} />
                <Route path="/procate/main" element={<AdminLayout><AdminProcateMain /></AdminLayout>} />
                <Route path="/procate/create" element={<AdminLayout><AdminProcateCreate /></AdminLayout>} />
                <Route path="/procate/update/:pcNum" element={<AdminLayout><AdminProcatetUpdate /></AdminLayout>} />
                <Route path="/event/main" element={<AdminLayout><AdminEventMain /></AdminLayout>} />
                <Route path="/event/create" element={<AdminLayout><AdminEventCreate /></AdminLayout>} />
                <Route path="/event/update/:eiNum" element={<AdminLayout><AdminEventUpdate /></AdminLayout>} />
                <Route path="/option/main/:piNum" element={<AdminLayout><AdminOptionMain /></AdminLayout>} />
                <Route path="/option/create" element={<AdminLayout><AdminOptionCreate /></AdminLayout>} />
                <Route path="/option/update/:poNum" element={<AdminLayout><AdminOptionUpdate /></AdminLayout>} />
            </Routes>
            <Routes>
                <Route path="/board/:boardType/list/:pageNum" element={<Layout><BoardListLayout /></Layout>} />
                <Route path="/board/:boardType/:mode/:pageNum" element={<AuthRoute to="/loginForm"><Layout><BoardForm /></Layout></AuthRoute>} />
                <Route path="/board/:boardType/:mode/:pageNum/:bNum" element={<AuthRoute to="/loginForm"><Layout><BoardForm /></Layout></AuthRoute>} />
                <Route path="/board/:boardType/view/:pageNum/:bNum" element={<Layout><BoardView /></Layout>} />
            </Routes>
            <Routes>
                <Route path="/cart/list" element={<AuthRoute to="/loginForm"><Layout><CartLayout /></Layout></AuthRoute>} />
                <Route path="/order/orderForm" element={<AuthRoute to="/loginForm"><Layout><OrderFormLayout /></Layout></AuthRoute>} />
                <Route path="/order/success" element={<AuthRoute to="/loginForm"><Layout><OrderSuccess /></Layout></AuthRoute>} />
                <Route path="/order/orderForm/:ocId" element={<AuthRoute to="/loginForm"><Layout><OrderFormLayout /></Layout></AuthRoute>} />

            </Routes>
        </BrowserRouter>
    );
}

export default Routers;

// https://tthinks.tistory.com/entry/React-%EB%A6%AC%EC%95%A1%ED%8A%B8%EC%97%90%EC%84%9C-%ED%8E%98%EC%9D%B4%EC%A7%80-%EC%9D%B4%EB%8F%99%ED%95%98%EA%B8%B0-Link%EC%99%80-useNavigate
// 라우터 참고