import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserHeader from "./UserHeader";
function HeaderRouters(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/*" element={<UserHeader/>}/>
                <Route path="/admin" element={<h2>test1</h2>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default HeaderRouters;