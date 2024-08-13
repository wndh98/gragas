import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import App from "./App";
import AdminLayout from "./AdminLayout";
function Routers(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/*" element={<Layout><App/></Layout>}/>
                <Route path="/admin/*" element={<AdminLayout><App></App></AdminLayout>}/>
                
            </Routes>
        </BrowserRouter>
    );
}

export default Routers;