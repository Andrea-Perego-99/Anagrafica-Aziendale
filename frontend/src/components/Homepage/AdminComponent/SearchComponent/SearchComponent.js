import { useState, useRef } from "react";
// Redux
import { useSelector } from "react-redux";
// Global functions
import GlobalCommunications from "../../../../GlobalFunctions/GlobalCommunications";
// Components
import ModificationPage from "../../../ModificationPage/ModificationPage";
import UserView from "../UserView/UserView";

const SearchComponent = () => {
  const inputRef = useRef("");
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const [color, setColor] = useState("");
  const [clicked, setClicked] = useState(false);
  const [mode, setMode] = useState("");
  const { token } = useSelector((state) => state.userControllerReducer);

  const searchUser = () => {
    GlobalCommunications.getUserByEmail(
      inputRef.current.value,
      token,
      setUser,
      setMessage,
      setColor
    );
  };

  const redirectModification = (e) => {
    if (clicked) {
      setClicked(false);
    }
    GlobalCommunications.getUserByEmail(
      user.name + "." + user.surname + "@certimeter.it",
      token,
      setUser
    );
    setMode("modification");
    setClicked(!clicked);
    return;
  };

  const redirectVisualization = (e) => {
    if (clicked) {
      setClicked(false);
    }
    GlobalCommunications.getUserByEmail(
      user.name + "." + user.surname + "@certimeter.it",
      token,
      setUser
    );
    setMode("visualization");
    setClicked(!clicked);
    return;
  };

  const changeUserStatus = async (e) => {
    GlobalCommunications.changeUserStatus(
      token,
      user.name + "." + user.surname + "@certimeter.it",
      !user.enabled
    ).then((res) => {
      if (res) {
        GlobalCommunications.getUserByEmail(
          user.name + "." + user.surname + "@certimeter.it",
          token,
          setUser
        );
      }
    });
  };

  return (
    <div className="tab-pane" id="search-worker">
      {!clicked ? (
        <>
          <label>Inserire la mail dell'utente qui sotto</label>
          <div className="row">
            <input
              type="text"
              className="form-control"
              placeholder="Email"
              ref={inputRef}
              style={{
                backgroundImage: 'url("data:image/png',
                backgroundRepeat: "no-repeat",
                backgroundAttachment: "scroll",
                backgroundSize: "16px 18px",
                backgroundPosition: "98% 50%",
                cursor: "auto",
                width: "400px",
              }}
            />
            <button className="btn btn-info ml-3" onClick={searchUser}>
              SEARCH
            </button>
            <label style={{ color: color }}>{message}</label>
          </div>
          <br />
          {user ? (
            <div className="col">
              <table className="table table-borderless mt-3">
                <thead
                  className="thead-light"
                  style={{ border: "1px solid white", borderRadius: "20px" }}
                >
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Surname</th>
                    <th scope="col">Modify Data</th>
                    <th scope="col">View Data</th>
                    <th scope="col">Disable User</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <h6>{user.name}</h6>
                    </td>
                    <td>
                      <h6>{user.surname}</h6>
                    </td>
                    <td>
                      <h6>
                        <button
                          type="button"
                          className="btn btn-info btn-sm"
                          onClick={redirectModification}
                        >
                          MODIFY DATA
                        </button>
                      </h6>
                    </td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-info btn-sm"
                        onClick={redirectVisualization}
                      >
                        VIEW DATA
                      </button>
                    </td>
                    <td>
                      {user.enable ? (
                        <button
                          type="button"
                          className="btn btn-success btn-sm"
                          onClick={changeUserStatus}
                        >
                          DISABLE
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="btn btn-secondary btn-sm"
                          onClick={changeUserStatus}
                        >
                          DISABLE
                        </button>
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ) : (
            <></>
          )}
        </>
      ) : mode === "modification" ? (
        <ModificationPage
          user={user}
          setClicked={setClicked}
          setUser={setUser}
        />
      ) : mode === "visualization" ? (
        <UserView user={user} setClicked={setClicked} setUser={setUser} />
      ) : (
        <></>
      )}
    </div>
  );
};

export default SearchComponent;
