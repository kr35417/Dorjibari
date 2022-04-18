import * as React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import "./login.scss";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../firebase";
import { UserContext } from "../context";

const Login = () => {
  const { user, setUser } = React.useContext(UserContext);
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();
  const auth = getAuth(app);

  // chack if user
  React.useEffect(() => {
    if (user) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleLogin = (e) => {
    e.preventDefault();
    signInWithPopup(auth, provider).then((res) => {
      setUser({
        name: res.user.displayName,
        email: res.user.email,
        photo: res.user.photoURL,
        uid: res.user.uid,
      });
    });
  };

  return (
    <Layout>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "80vh",
        }}
      >
        <button className="btn btn-light l-btn" onClick={handleLogin}>
          <img
            src="https://img.icons8.com/color/48/000000/google-logo.png"
            alt="Google"
            width="40"
            style={{ marginRight: "10px" }}
          />
          Login with Google
        </button>
      </div>
    </Layout>
  );
};

export default Login;
