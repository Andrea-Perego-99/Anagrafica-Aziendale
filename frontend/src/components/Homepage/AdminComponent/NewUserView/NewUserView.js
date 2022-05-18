import { useState, useRef } from "react";
import { useSelector } from "react-redux";
// Global functions
import GlobalCommunications from "../../../../GlobalFunctions/GlobalCommunications";

const NewUserView = () => {
  const { token } = useSelector((state) => state.userControllerReducer);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [color, setColor] = useState("");

  const textRef = useRef("");

  return (
    <div>
      <label style={{ color: color }}>{error}</label>
      <p>Inserire l'indirizzo email del nuovo utente</p>
      <div className="row">
        <input
          type="text"
          className="form-control"
          placeholder="Indirizzo email"
          style={{
            backgroundImage: 'url("data:image/png',
            backgroundRepeat: "no-repeat",
            backgroundAttachment: "scroll",
            backgroundSize: "16px 18px",
            backgroundPosition: "98% 50%",
            cursor: "auto",
            width: "400px",
          }}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          ref={textRef}
          autoComplete="off"
        />
        <button
          className="btn btn-info ml-3"
          onClick={(e) => {
            if (error !== "") {
              setError("");
            }
            GlobalCommunications.securityRegistration(
              email,
              token,
              setColor,
              setError,
              textRef
            );
          }}
        >
          ADD
        </button>
      </div>
    </div>
  );
};

export default NewUserView;
