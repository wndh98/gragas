import { BrowserRouter, Route, Routes } from "react-router-dom";

function FooterRouters(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<h2>homefooter</h2>}/>
                <Route path="/test/test1" element={<h2>test1footer</h2>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default FooterRouters;