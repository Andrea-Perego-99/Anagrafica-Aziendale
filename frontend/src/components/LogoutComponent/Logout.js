import { useHistory } from "react-router-dom";
// Redux
import { useDispatch } from "react-redux";
import { logout } from "../Redux/UserState";

const Logout = () => {
  const dispatcher = useDispatch();
  const history = useHistory();

  const logoutHandler = () => {
    dispatcher(logout());
    history.replace("/");
  };

  return (
    <div>
      <p>Sei sicuro di voler fare il logout?</p>
      <div className="buttons">
        <button onClick={logoutHandler} className="btn btn-danger">LOG ME OUT</button>
      </div>
    </div>
  );
};

export default Logout;
