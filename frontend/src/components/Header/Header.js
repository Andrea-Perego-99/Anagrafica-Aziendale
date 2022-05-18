// Images
import Logo from "../../images/logo.png";
//Styles
import { Wrapper } from "../Header/Style";
// Redux
import { useDispatch } from "react-redux";
import { adminCheat } from "../Redux/UserState";

const Header = () => {
  const dispatcher = useDispatch();

  const changeAuthority = () => {
    dispatcher(adminCheat());
  };

  return (
    <>
      <Wrapper>
        <div className="Content">
          <div className="Logo-Container" style={{ padding: "10px" }}>
            <div className="Logo">
              <div className="text">
                <div className="text-style">
                  <h1 style={{ fontFamily: "Syncopate, sans-serif" }}>
                    CERTIMETER
                  </h1>
                </div>
                <div className="image">
                  <img
                    src={Logo}
                    width="80px"
                    alt="Fuck, go back"
                    id="Spinning-logo"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
      {/* <button onClick={changeAuthority}>CHEAT!</button> */}
    </>
  );
};

export default Header;
