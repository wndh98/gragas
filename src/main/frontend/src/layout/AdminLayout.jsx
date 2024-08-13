import AdminFooter from "./AdminFooter";
import AdminHeader from "./AdminHeader";

function AdminLayout(props) {
  return (
    <div>
      <AdminHeader/>
        {props.children}
      <Footer/>
    </div>

  );
}
export default AdminLayout;