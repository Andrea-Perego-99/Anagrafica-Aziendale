import { useState } from "react";
import { useSelector } from "react-redux";
// Global functions
import GlobalCommunications from "../../../../GlobalFunctions/GlobalCommunications";
import GlobalUtilities from "../../../../GlobalFunctions/GlobalUtilities";

const PasswordShard = () => {
  const { token } = useSelector((state) => state.userControllerReducer);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [color, setColor] = useState("");

  const changePassword = () => {
    if (GlobalUtilities.passwordFilter(password, setColor, setMessage)) {
      GlobalCommunications.modifyPassword(
        token,
        password,
        setMessage,
        setColor
      );
    }
  };
  return (
    <>
      <label>
        La password affinchè venga convalidata deve rispettare le seguenti
        regole:
      </label>
      <label>
        <ul>
          <li>Almeno una lettera maiuscola</li>
          <li>Almeno una lettera minuscola</li>
          <li>Almeno un numero</li>
          <li>Deve essere di almeno 8 caratteri ma non più di 16</li>
        </ul>
      </label>
      <label style={{ color: color }}>{message}</label>
      <div className="d-flex justify-content-around mt-5 align-items-center">
        <div>
          <label>Password: </label>
          <input
            type="password"
            className="form-control"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            style={{
              backgroundImage: 'url("data:image/png',
              backgroundRepeat: "no-repeat",
              backgroundAttachment: "scroll",
              backgroundSize: "16px 18px",
              backgroundPosition: "98% 50%",
              cursor: "auto",
            }}
          />
        </div>
        <div>
          <div className="row">
            <label style={{ color: "red" }} className="mr-2">
              {error}
            </label>
            <label>Conferma Password:</label>
          </div>
          <input
            type="password"
            className="form-control"
            onChange={(e) => {
              if (password !== e.target.value) {
                setError("!");
              } else {
                setError("");
              }
            }}
            style={{
              backgroundImage: 'url("data:image/png',
              backgroundRepeat: "no-repeat",
              backgroundAttachment: "scroll",
              backgroundSize: "16px 18px",
              backgroundPosition: "98% 50%",
              cursor: "auto",
            }}
          />
        </div>
      </div>
      <div className="ml-4 mt-3">
        <button className="btn-sm btn-primary" onClick={changePassword}>
          SUBMIT
        </button>
      </div>
      {/* <label style={{ color: color }}>{message}</label> */}
    </>
  );
};
export default PasswordShard;
