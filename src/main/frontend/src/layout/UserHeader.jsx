import { Link } from "react-router-dom";

function UserHeader() {
  return (
    <div>
      <Link to="/">
        <li>1</li>
      </Link>
      <Link to="/test/test1">
        <li>2</li>
      </Link>
    </div>
  );
}
export default UserHeader;