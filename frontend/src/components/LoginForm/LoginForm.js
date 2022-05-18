import { useState } from "react";
import { useHistory } from "react-router-dom";
// Redux
import { useDispatch, useSelector } from "react-redux";
// Global functions
import GlobalCommunications from "../../GlobalFunctions/GlobalCommunications";

const LoginForm = () => {
  const dispatcher = useDispatch();
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [color, setColor] = useState("");
  const [message, setMessage] = useState("");

  const loginHandle = (e) => {
    if (message != "") {
      setMessage("");
    }
    e.preventDefault();
    GlobalCommunications.login(
      email,
      password,
      dispatcher,
      history,
      setMessage,
      setColor
    );
  };

  return (
    <div className="card card-outline card-primary w-50 justify-content-center">
      <div className="card-header text-center">
        <h1>
          <b>Login</b>
        </h1>
      </div>
      <div className="card-body">
        <p className="login-box-msg">Sign in to start your session</p>
        <form>
          <div className="input-group mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <div className="input-group-append">
              <div className="input-group-text">
                <span className="fas fa-envelope" />
              </div>
            </div>
          </div>
          <div className="input-group mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <div className="input-group-append">
              <div className="input-group-text">
                <span className="fas fa-lock" />
              </div>
            </div>
          </div>
          <div className="d-flex row justify-content-center">
            <div className="col-4">
              <button
                className="btn btn-primary btn-block"
                onClick={loginHandle}
              >
                SIGN IN
              </button>
            </div>
          </div>
          <label className="mt-3" style={{ color: color }}>
            {message}
          </label>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
