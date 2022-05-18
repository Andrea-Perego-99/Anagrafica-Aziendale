import { useSelector } from "react-redux";
// Components
import LoginForm from "../LoginForm/LoginForm";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const Login = () => {
  return (
    <div className="wrapper">
      <Header />
      <div
        className="d-flex justify-content-center mt-3"
        style={{ marginBottom: "110px" }}
      >
        <LoginForm />
      </div>
      <Footer />
    </div>
  );
};

export default Login;
