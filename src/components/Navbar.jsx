import * as React from "react";
import "./navbar.scss";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context";
import { getAuth } from "firebase/auth";
import { app } from "../firebase";

// list

const Li = ({ title, to }) => {
  return (
    <>
      <li className="nav-item">
        <Link to={to} className="nav-link">
          {title}
        </Link>
      </li>
    </>
  );
};

const Navbar = () => {
  const { user, setUser } = React.useContext(UserContext);
  const auth = getAuth(app);
  const navigate = useNavigate();

  // logout
  const handleLogOut = (e) => {
    e.preventDefault();
    auth.signOut();
    setUser(null);
    navigate("/");
  };

  return (
    <div className="navbar">
      <div className="container">
        <div className="nav-brand">Dorjibari</div>
        <ul className="nav">
          <Li title="Home" to="/" />
          <Li title="Products" to="/products" />
          <Li title="Cart" to="/cart" />
          {user?.uid && <Li title="Admin" to="/admin" />}
          {!user && (
            <>
              <Li title="Login or Sign up" to="/login" />
            </>
          )}
          {user && (
            <li className="nav-item">
              <Link to="/" onClick={handleLogOut} className="nav-link">
                Log Out
              </Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};
export default Navbar;
