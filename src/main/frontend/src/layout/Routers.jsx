import { BrowserRouter, Route, Routes } from "react-router-dom";

function Routers(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<h2>home</h2>}/>
                <Route path="/test1" element={<h2>test1</h2>}/>
                <Route path="/test2" element={<h2>test2</h2>}/>
                <Route path="/test2" element={<h2>test2</h2>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default Routers;