import AdminHeader from "./AdminHeader";
import Footer from "./Footer";
function AdminLayout(props){
  return (
    <div>
      <AdminHeader/>
        {props.children}
      <Footer/>
    </div>

  );
}
export default AdminLayout;