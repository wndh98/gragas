import AdminFooter from "./AdminFooter";
import AdminHeader from "./AdminHeader";

function AdminLayout(props) {
  return (
    <>
      <AdminHeader/>
        {props.children}
      <AdminFooter/>
    </>

  );
}
export default AdminLayout;